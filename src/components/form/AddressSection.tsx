import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { BARANGAY_OPTIONS, COLORS } from '../../utils/constants';
import DropdownPicker from '../common/DropdownPicker';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const AddressSection: React.FC<Props> = ({ data, errors, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Address</Text>
      <Text style={styles.subtitle}>
        Provide the learner’s barangay and complete address.
      </Text>

      {/* Barangay */}
      <Text style={styles.label}>Barangay *</Text>
      <DropdownPicker
        label="Barangay"
        selectedValue={data.barangay}
        onValueChange={v => onChange('barangay', v)}
        options={BARANGAY_OPTIONS}
        placeholder="-- Select Barangay --"
        error={!!errors.barangay}
      />
      {errors.barangay && (
        <HelperText type="error">{errors.barangay}</HelperText>
      )}

      {/* Complete Address */}
      <TextInput
        label="Complete Address *"
        value={data.completeAddress}
        onChangeText={v => onChange('completeAddress', v)}
        mode="outlined"
        style={styles.input}
        multiline
        numberOfLines={4}
        error={!!errors.completeAddress}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="House No. / Street / Purok / Barangay / Municipality / Province"
      />
      {errors.completeAddress && (
        <HelperText type="error">{errors.completeAddress}</HelperText>
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
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    marginBottom: 8,
    backgroundColor: COLORS.white,
    minHeight: 100,
  },
});

export default AddressSection;
