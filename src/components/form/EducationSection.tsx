import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, HelperText } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { GRADE_LEVELS, REASON_OPTIONS, COLORS } from '../../utils/constants';
import DropdownPicker from '../common/DropdownPicker';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const EducationSection: React.FC<Props> = ({ data, errors, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Education Background</Text>
      <Text style={styles.subtitle}>
        Both fields are required.
      </Text>

      {/* Last Grade Completed */}
      <Text style={styles.label}>Last Grade / Level Completed *</Text>
      <DropdownPicker
        label="Last Grade Completed"
        selectedValue={data.lastGradeCompleted}
        onValueChange={v => onChange('lastGradeCompleted', v)}
        options={GRADE_LEVELS}
        placeholder="-- Select Grade Level --"
        error={!!errors.lastGradeCompleted}
      />
      {errors.lastGradeCompleted && (
        <HelperText type="error">{errors.lastGradeCompleted}</HelperText>
      )}

      {/* Reason for Not Attending */}
      <Text style={styles.label}>Reason for Not Attending School *</Text>
      <DropdownPicker
        label="Reason for Not Attending"
        selectedValue={data.reasonForNotAttending}
        onValueChange={v => onChange('reasonForNotAttending', v)}
        options={REASON_OPTIONS}
        placeholder="-- Select Reason --"
        error={!!errors.reasonForNotAttending}
      />
      {errors.reasonForNotAttending && (
        <HelperText type="error">{errors.reasonForNotAttending}</HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
});

export default EducationSection;
