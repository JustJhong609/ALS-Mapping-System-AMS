import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, Portal, Dialog, Paragraph, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Learner, LearnerFormData, RootStackParamList, ValidationErrors } from '../types';
import { COLORS, FORM_SECTIONS } from '../utils/constants';
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
        mappedBy: editingLearner.mappedBy,
        lastName: editingLearner.lastName,
        firstName: editingLearner.firstName,
        middleName: editingLearner.middleName,
        nameExtension: editingLearner.nameExtension || '',
        sex: editingLearner.sex,
        civilStatus: editingLearner.civilStatus,
        birthdate: new Date(editingLearner.birthdate),
        age: editingLearner.age,
        motherTongue: editingLearner.motherTongue,
        isIP: editingLearner.isIP ? 'Yes' : 'No',
        ipTribe: editingLearner.ipTribe || '',
        religion: editingLearner.religion || '',
        is4PsMember: editingLearner.is4PsMember ? 'Yes' : 'No',
        barangay: editingLearner.barangay,
        completeAddress: editingLearner.completeAddress,
        fatherName: editingLearner.fatherName || '',
        motherName: editingLearner.motherName || '',
        guardianName: editingLearner.guardianName || '',
        guardianOccupation: editingLearner.guardianOccupation || '',
        roleInFamily: editingLearner.roleInFamily,
        currentlyStudying: editingLearner.currentlyStudying,
        lastGradeCompleted: editingLearner.lastGradeCompleted,
        reasonForNotAttending: editingLearner.reasonForNotAttending,
        distanceKm: String(editingLearner.distanceKm),
        travelTime: editingLearner.travelTime,
        transportMode: editingLearner.transportMode,
        preferredSessionTime: editingLearner.preferredSessionTime,
        dateMapped: editingLearner.dateMapped ? new Date(editingLearner.dateMapped) : null,
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
      mappedBy: formData.mappedBy.trim(),
      lastName: formData.lastName.trim(),
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      nameExtension: formData.nameExtension.trim() || undefined,
      sex: formData.sex as 'Male' | 'Female',
      civilStatus: formData.civilStatus,
      birthdate: formData.birthdate!,
      age: formData.age ?? calculateAge(formData.birthdate!),
      motherTongue: formData.motherTongue,
      isIP: formData.isIP === 'Yes',
      ipTribe: formData.isIP === 'Yes' ? formData.ipTribe.trim() : undefined,
      religion: formData.religion.trim() || undefined,
      is4PsMember: formData.is4PsMember === 'Yes',
      barangay: formData.barangay,
      completeAddress: formData.completeAddress.trim(),
      fatherName: formData.fatherName.trim() || undefined,
      motherName: formData.motherName.trim() || undefined,
      guardianName: formData.guardianName.trim() || undefined,
      guardianOccupation: formData.guardianOccupation.trim() || undefined,
      roleInFamily: formData.roleInFamily,
      currentlyStudying: formData.currentlyStudying,
      lastGradeCompleted: formData.lastGradeCompleted,
      reasonForNotAttending: formData.reasonForNotAttending,
      distanceKm: parseFloat(formData.distanceKm),
      travelTime: formData.travelTime.trim(),
      transportMode: formData.transportMode,
      preferredSessionTime: formData.preferredSessionTime,
      dateMapped: formData.dateMapped!,
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
        return <EducationSection {...sectionProps} />;
      case 2:
        return <AddressSection {...sectionProps} />;
      case 3:
        return <FamilySection {...sectionProps} />;
      case 4:
        return <LogisticsSection {...sectionProps} />;
      default:
        return null;
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <IconButton
              icon="arrow-left"
              iconColor={COLORS.white}
              size={24}
              onPress={() => navigation.goBack()}
              style={styles.headerBackBtn}
            />
            <View style={styles.headerTextGroup}>
              <Text style={styles.headerTitle}>
                {isEditing ? 'Edit Learner' : 'New Learner'}
              </Text>
              <Text style={styles.headerSubtitle}>
                {FORM_SECTIONS[currentStep]}
              </Text>
            </View>
          </View>
          {/* Progress bar */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentStep + 1) / FORM_SECTIONS.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Form Content */}
        <ScrollView
          ref={scrollViewRef}
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
            icon={currentStep === 0 ? 'close' : 'chevron-left'}
            onPress={currentStep === 0 ? () => navigation.goBack() : () => { handlePrevious(); scrollToTop(); }}
            style={styles.navButton}
            contentStyle={styles.navButtonContent}
            labelStyle={styles.navButtonLabel}
            textColor={COLORS.primary}>
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            mode="contained"
            icon={currentStep === 4 ? 'check-bold' : 'chevron-right'}
            contentStyle={[styles.navButtonContent, { flexDirection: 'row-reverse' }]}
            labelStyle={styles.navButtonLabel}
            onPress={() => { handleNext(); scrollToTop(); }}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingTop: 4,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackBtn: {
    margin: 0,
    marginRight: 4,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 1,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: COLORS.white,
    borderRadius: 2,
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
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 12,
  },
  navButtonContent: {
    height: 50,
  },
  navButtonLabel: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  nextButton: {
    elevation: 3,
  },
});

export default LearnerFormScreen;
