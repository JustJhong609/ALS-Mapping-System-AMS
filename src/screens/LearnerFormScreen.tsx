import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, Portal, Dialog, Paragraph } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Learner, LearnerFormData, RootStackParamList, ValidationErrors } from '../types';
import { COLORS } from '../utils/constants';
import { validateSection, calculateAge, generateId } from '../utils/validation';
import { createEmptyFormData } from '../utils/helpers';
import {
  PersonalInfoSection,
  AddressSection,
  FamilySection,
  EducationSection,
  LogisticsSection,
  StepIndicator,
} from '../components';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LearnerForm'>;
  route: RouteProp<RootStackParamList, 'LearnerForm'>;
  learners: Learner[];
  setLearners: React.Dispatch<React.SetStateAction<Learner[]>>;
};

const LearnerFormScreen: React.FC<Props> = ({
  navigation,
  route,
  learners,
  setLearners,
}) => {
  const editingLearner = route.params?.learner;
  const isEditing = !!editingLearner;

  // Initialise form data from existing learner or empty
  const initialFormData = (): LearnerFormData => {
    if (editingLearner) {
      return {
        region: editingLearner.region,
        division: editingLearner.division,
        district: editingLearner.district,
        calendarYear: editingLearner.calendarYear,
        lastName: editingLearner.lastName,
        firstName: editingLearner.firstName,
        middleName: editingLearner.middleName,
        nameExtension: editingLearner.nameExtension || '',
        sex: editingLearner.sex,
        birthdate: new Date(editingLearner.birthdate),
        age: editingLearner.age,
        motherTongue: editingLearner.motherTongue,
        ipEthnicGroup: editingLearner.ipEthnicGroup || '',
        religion: editingLearner.religion || '',
        completeAddress: editingLearner.completeAddress,
        fatherName: editingLearner.fatherName || '',
        motherName: editingLearner.motherName || '',
        guardianName: editingLearner.guardianName || '',
        guardianOccupation: editingLearner.guardianOccupation || '',
        lastGradeCompleted: editingLearner.lastGradeCompleted,
        reasonForNotAttending: editingLearner.reasonForNotAttending,
        distanceKm: String(editingLearner.distanceKm),
        travelTime: editingLearner.travelTime,
        transportMode: editingLearner.transportMode,
        preferredSessionTime: editingLearner.preferredSessionTime,
      };
    }
    return createEmptyFormData();
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<LearnerFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const handleFieldChange = (field: keyof LearnerFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field on change
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleNext = () => {
    const result = validateSection(currentStep, formData);
    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Last step → show save dialog
      setShowSaveDialog(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setErrors({});
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSave = () => {
    const learner: Learner = {
      id: isEditing ? editingLearner!.id : generateId(),
      region: formData.region,
      division: formData.division,
      district: formData.district,
      calendarYear: formData.calendarYear,
      lastName: formData.lastName.trim(),
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      nameExtension: formData.nameExtension.trim() || undefined,
      sex: formData.sex as 'Male' | 'Female',
      birthdate: formData.birthdate!,
      age: formData.age ?? calculateAge(formData.birthdate!),
      motherTongue: formData.motherTongue,
      ipEthnicGroup: formData.ipEthnicGroup.trim() || undefined,
      religion: formData.religion.trim() || undefined,
      completeAddress: formData.completeAddress.trim(),
      fatherName: formData.fatherName.trim() || undefined,
      motherName: formData.motherName.trim() || undefined,
      guardianName: formData.guardianName.trim() || undefined,
      guardianOccupation: formData.guardianOccupation.trim() || undefined,
      lastGradeCompleted: formData.lastGradeCompleted,
      reasonForNotAttending: formData.reasonForNotAttending,
      distanceKm: parseFloat(formData.distanceKm),
      travelTime: formData.travelTime.trim(),
      transportMode: formData.transportMode,
      preferredSessionTime: formData.preferredSessionTime,
    };

    if (isEditing) {
      setLearners(prev => prev.map(l => (l.id === learner.id ? learner : l)));
    } else {
      setLearners(prev => [...prev, learner]);
    }

    setShowSaveDialog(false);
    navigation.goBack();
  };

  const renderCurrentSection = () => {
    const sectionProps = {
      data: formData,
      errors,
      onChange: handleFieldChange,
    };

    switch (currentStep) {
      case 0:
        return <PersonalInfoSection {...sectionProps} />;
      case 1:
        return <AddressSection {...sectionProps} />;
      case 2:
        return <FamilySection {...sectionProps} />;
      case 3:
        return <EducationSection {...sectionProps} />;
      case 4:
        return <LogisticsSection {...sectionProps} />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Learner' : 'New Learner'}
        </Text>
        <Text style={styles.headerSubtitle}>ALS Form 1 Data Entry</Text>
      </View>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Form Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {renderCurrentSection()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <Button
          mode="outlined"
          onPress={currentStep === 0 ? () => navigation.goBack() : handlePrevious}
          style={styles.navButton}
          textColor={COLORS.primary}>
          {currentStep === 0 ? 'Cancel' : 'Previous'}
        </Button>
        <Button
          mode="contained"
          onPress={handleNext}
          style={[styles.navButton, styles.nextButton]}
          buttonColor={currentStep === 4 ? COLORS.success : COLORS.primary}>
          {currentStep === 4 ? 'Save' : 'Next'}
        </Button>
      </View>

      {/* Save Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showSaveDialog}
          onDismiss={() => setShowSaveDialog(false)}>
          <Dialog.Title>
            {isEditing ? 'Update Learner?' : 'Save Learner?'}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {isEditing
                ? `Are you sure you want to update the record for ${formData.firstName} ${formData.lastName}?`
                : `Are you sure you want to save the new learner record for ${formData.firstName} ${formData.lastName}?`}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowSaveDialog(false)}>Cancel</Button>
            <Button onPress={handleSave} textColor={COLORS.success}>
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  nextButton: {
    elevation: 2,
  },
});

export default LearnerFormScreen;
