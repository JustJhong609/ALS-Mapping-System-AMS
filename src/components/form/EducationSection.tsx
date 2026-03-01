import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, HelperText, RadioButton, TouchableRipple, TextInput } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { GRADE_LEVELS, REASON_OPTIONS, CURRENTLY_STUDYING_OPTIONS, COLORS } from '../../utils/constants';
import DropdownPicker from '../common/DropdownPicker';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const EducationSection: React.FC<Props> = ({ data, errors, onChange }) => {
  const isBlp = data.isBlp === 'Yes';

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🎓 Education Background</Text>
      <Text style={styles.subtitle}>
        All fields are required. Select the most appropriate options.
      </Text>

      {/* BLP */}
      <Text style={styles.label}>Is this learner for BLP (Basic Literacy Program)? *</Text>
      <RadioButton.Group
        onValueChange={v => {
          onChange('isBlp', v);
          if (v === 'Yes') {
            onChange('currentlyStudying', '');
            onChange('lastGradeCompleted', '');
            onChange('interestedInALS', '');
          }
        }}
        value={data.isBlp}>
        <View style={styles.radioRow}>
          {['Yes', 'No'].map(option => (
            <TouchableRipple
              key={`blp-${option}`}
              onPress={() => {
                onChange('isBlp', option);
                if (option === 'Yes') {
                  onChange('currentlyStudying', '');
                  onChange('lastGradeCompleted', '');
                  onChange('interestedInALS', '');
                }
              }}
              style={styles.radioItem}>
              <View style={styles.radioItemInner}>
                <RadioButton value={option} color={COLORS.primary} />
                <Text style={styles.radioLabel}>{option}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
      </RadioButton.Group>
      {errors.isBlp && (
        <HelperText type="error">{errors.isBlp}</HelperText>
      )}

      {/* Reason for Not Attending — always visible */}
      <Text style={styles.label}>Reason for Not Attending School *</Text>
      <DropdownPicker
        label="Reason for Not Attending"
        selectedValue={data.reasonForNotAttending}
        onValueChange={v => {
          onChange('reasonForNotAttending', v);
          if (v !== 'Others (Specify)') onChange('reasonForNotAttendingOther', '');
        }}
        options={REASON_OPTIONS}
        placeholder="-- Select Reason --"
        error={!!errors.reasonForNotAttending}
      />
      {errors.reasonForNotAttending && (
        <HelperText type="error">{errors.reasonForNotAttending}</HelperText>
      )}
      {data.reasonForNotAttending === 'Others (Specify)' && (
        <>
          <TextInput
            label="Please specify *"
            value={data.reasonForNotAttendingOther}
            onChangeText={v => onChange('reasonForNotAttendingOther', v)}
            mode="outlined"
            style={styles.outlinedInput}
            placeholder="Describe the reason..."
            error={!!errors.reasonForNotAttendingOther}
            outlineColor={COLORS.border}
            activeOutlineColor={COLORS.primary}
          />
          {errors.reasonForNotAttendingOther && (
            <HelperText type="error">{errors.reasonForNotAttendingOther}</HelperText>
          )}
        </>
      )}

      {/* Hide remaining fields if BLP */}
      {!isBlp && (
        <>
          {/* Currently Studying */}
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

          {/* Nature of Work / Occupation - moved to Personal Info page */}

          {/* Interested in ALS A&E Program */}
          <Text style={styles.label}>Interested in ALS A&E Program for Elementary and JHS? *</Text>
          <RadioButton.Group
            onValueChange={v => onChange('interestedInALS', v)}
            value={data.interestedInALS}>
            <View style={styles.radioRow}>
              {['Yes', 'No'].map(option => (
                <TouchableRipple
                  key={option}
                  onPress={() => onChange('interestedInALS', option)}
                  style={styles.radioItem}>
                  <View style={styles.radioItemInner}>
                    <RadioButton value={option} color={COLORS.primary} />
                    <Text style={styles.radioLabel}>{option}</Text>
                  </View>
                </TouchableRipple>
              ))}
            </View>
          </RadioButton.Group>
          {errors.interestedInALS && (
            <HelperText type="error">{errors.interestedInALS}</HelperText>
          )}
        </>
      )}

      {/* Contact Number */}
      <TextInput
        label="Contact Number *"
        value={data.contactNumber}
        onChangeText={v => onChange('contactNumber', v)}
        mode="outlined"
        style={styles.outlinedInput}
        keyboardType="phone-pad"
        placeholder="e.g. 09XXXXXXXXX"
        error={!!errors.contactNumber}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />
      {errors.contactNumber && (
        <HelperText type="error">{errors.contactNumber}</HelperText>
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
  outlinedInput: {
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 4,
  },
  textInputError: {
    borderColor: COLORS.error,
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
