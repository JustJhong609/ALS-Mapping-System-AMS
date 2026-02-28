import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import {
  TRANSPORT_OPTIONS,
  SESSION_TIME_OPTIONS,
  COLORS,
} from '../../utils/constants';
import DropdownPicker from '../common/DropdownPicker';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const LogisticsSection: React.FC<Props> = ({ data, errors, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🚌 Logistics & Schedule</Text>
      <Text style={styles.subtitle}>
        All fields are required. This is the last section!
      </Text>

      {/* Distance in km */}
      <TextInput
        label="Distance from Nearest ALS Venue (km) *"
        value={data.distanceKm}
        onChangeText={v => onChange('distanceKm', v)}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        error={!!errors.distanceKm}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="e.g. 3.5"
      />
      {errors.distanceKm && (
        <HelperText type="error">{errors.distanceKm}</HelperText>
      )}

      {/* Travel Time */}
      <TextInput
        label="Estimated Travel Time *"
        value={data.travelTime}
        onChangeText={v => onChange('travelTime', v)}
        mode="outlined"
        style={styles.input}
        error={!!errors.travelTime}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="e.g. 30 minutes, 1 hour"
      />
      {errors.travelTime && (
        <HelperText type="error">{errors.travelTime}</HelperText>
      )}

      {/* Transport Mode */}
      <Text style={styles.label}>Mode of Transport *</Text>
      <DropdownPicker
        label="Transport Mode"
        selectedValue={data.transportMode}
        onValueChange={v => onChange('transportMode', v)}
        options={TRANSPORT_OPTIONS}
        placeholder="-- Select Transport Mode --"
        error={!!errors.transportMode}
      />
      {errors.transportMode && (
        <HelperText type="error">{errors.transportMode}</HelperText>
      )}

      {/* Preferred Session Time */}
      <Text style={styles.label}>Preferred Session Time *</Text>
      <DropdownPicker
        label="Preferred Session Time"
        selectedValue={data.preferredSessionTime}
        onValueChange={v => onChange('preferredSessionTime', v)}
        options={SESSION_TIME_OPTIONS}
        placeholder="-- Select Preferred Time --"
        error={!!errors.preferredSessionTime}
      />
      {errors.preferredSessionTime && (
        <HelperText type="error">{errors.preferredSessionTime}</HelperText>
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
  input: {
    marginBottom: 10,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 6,
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

export default LogisticsSection;
