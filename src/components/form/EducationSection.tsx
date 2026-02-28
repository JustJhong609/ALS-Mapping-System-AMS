import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, HelperText, RadioButton, TouchableRipple } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { GRADE_LEVELS, REASON_OPTIONS, CURRENTLY_STUDYING_OPTIONS, COLORS } from '../../utils/constants';
import DropdownPicker from '../common/DropdownPicker';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const EducationSection: React.FC<Props> = ({ data, errors, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🎓 Education Background</Text>
      <Text style={styles.subtitle}>
        All fields are required. Select the most appropriate options.
      </Text>

      {/* Currently Studying */}
      <Text style={styles.label}>Currently Studying? *</Text>
      <RadioButton.Group
        onValueChange={v => onChange('currentlyStudying', v)}
        value={data.currentlyStudying}>
        <View style={styles.radioRow}>
          {CURRENTLY_STUDYING_OPTIONS.map(option => (
            <TouchableRipple
              key={option}
              onPress={() => onChange('currentlyStudying', option)}
              style={styles.radioItem}>
              <View style={styles.radioItemInner}>
                <RadioButton value={option} color={COLORS.primary} />
                <Text style={styles.radioLabel}>{option}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
      </RadioButton.Group>
      {errors.currentlyStudying && (
        <HelperText type="error">{errors.currentlyStudying}</HelperText>
      )}

      {/* Last Grade Completed */}}
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
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 6,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  radioItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: COLORS.text,
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
