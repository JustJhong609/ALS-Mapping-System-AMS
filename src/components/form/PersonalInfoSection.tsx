import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  RadioButton,
  Text,
  HelperText,
  TouchableRipple,
} from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { SEX_OPTIONS, MOTHER_TONGUE_OPTIONS, COLORS } from '../../utils/constants';
import { calculateAge } from '../../utils/validation';
import DropdownPicker from '../common/DropdownPicker';
import DatePickerField from '../common/DatePickerField';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const PersonalInfoSection: React.FC<Props> = ({ data, errors, onChange }) => {
  const handleDateChange = (selectedDate: Date) => {
    onChange('birthdate', selectedDate);
    onChange('age', calculateAge(selectedDate));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <Text style={styles.subtitle}>Fields marked with * are required</Text>

      {/* Last Name */}
      <TextInput
        label="Last Name *"
        value={data.lastName}
        onChangeText={v => onChange('lastName', v)}
        mode="outlined"
        style={styles.input}
        error={!!errors.lastName}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />
      {errors.lastName && (
        <HelperText type="error">{errors.lastName}</HelperText>
      )}

      {/* First Name */}
      <TextInput
        label="First Name *"
        value={data.firstName}
        onChangeText={v => onChange('firstName', v)}
        mode="outlined"
        style={styles.input}
        error={!!errors.firstName}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />
      {errors.firstName && (
        <HelperText type="error">{errors.firstName}</HelperText>
      )}

      {/* Middle Name */}
      <TextInput
        label="Middle Name *"
        value={data.middleName}
        onChangeText={v => onChange('middleName', v)}
        mode="outlined"
        style={styles.input}
        error={!!errors.middleName}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />
      {errors.middleName && (
        <HelperText type="error">{errors.middleName}</HelperText>
      )}

      {/* Name Extension */}
      <TextInput
        label="Name Extension (Jr., Sr., III, etc.)"
        value={data.nameExtension}
        onChangeText={v => onChange('nameExtension', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />

      {/* Sex */}
      <Text style={styles.label}>Sex *</Text>
      <RadioButton.Group
        onValueChange={v => onChange('sex', v)}
        value={data.sex}>
        <View style={styles.radioRow}>
          {SEX_OPTIONS.map(option => (
            <TouchableRipple
              key={option}
              onPress={() => onChange('sex', option)}
              style={styles.radioItem}>
              <View style={styles.radioItemInner}>
                <RadioButton value={option} color={COLORS.primary} />
                <Text>{option}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
      </RadioButton.Group>
      {errors.sex && <HelperText type="error">{errors.sex}</HelperText>}

      {/* Birthdate */}
      <Text style={styles.label}>Birthdate *</Text>
      <DatePickerField
        value={data.birthdate}
        onChange={handleDateChange}
        placeholder="Select birthdate"
        error={!!errors.birthdate}
        maximumDate={new Date()}
      />
      {errors.birthdate && (
        <HelperText type="error">{errors.birthdate}</HelperText>
      )}

      {/* Age (auto-calculated, read-only) */}
      {data.age !== null && (
        <TextInput
          label="Age"
          value={String(data.age)}
          mode="outlined"
          style={styles.input}
          editable={false}
          outlineColor={COLORS.border}
        />
      )}

      {/* Mother Tongue */}
      <Text style={styles.label}>Mother Tongue *</Text>
      <DropdownPicker
        label="Mother Tongue"
        selectedValue={data.motherTongue}
        onValueChange={v => onChange('motherTongue', v)}
        options={MOTHER_TONGUE_OPTIONS}
        placeholder="-- Select Mother Tongue --"
        error={!!errors.motherTongue}
      />
      {errors.motherTongue && (
        <HelperText type="error">{errors.motherTongue}</HelperText>
      )}

      {/* IP / Ethnic Group (optional) */}
      <TextInput
        label="IP / Ethnic Group"
        value={data.ipEthnicGroup}
        onChangeText={v => onChange('ipEthnicGroup', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />

      {/* Religion (optional) */}
      <TextInput
        label="Religion"
        value={data.religion}
        onChangeText={v => onChange('religion', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />
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
  input: {
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  radioItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 14,
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  dateButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
  },
  datePlaceholder: {
    fontSize: 16,
    color: COLORS.textSecondary,
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

export default PersonalInfoSection;
