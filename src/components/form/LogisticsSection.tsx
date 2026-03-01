import React, { useState } from 'react';
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
  const [dateMappedText, setDateMappedText] = useState(
    data.dateMapped
      ? `${data.dateMapped.getMonth() + 1}/${data.dateMapped.getDate()}/${data.dateMapped.getFullYear()}`
      : '',
  );

  const handleDateMappedChange = (text: string) => {
    setDateMappedText(text);
    const parsed = new Date(text);
    if (!isNaN(parsed.getTime()) && text.length >= 8) {
      onChange('dateMapped', parsed);
    } else {
      onChange('dateMapped', null);
    }
  };

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

      {/* Mapped By */}
      <TextInput
        label="Mapped By (Facilitator Name) *"
        value={data.mappedBy}
        onChangeText={v => onChange('mappedBy', v)}
        mode="outlined"
        style={styles.input}
        error={!!errors.mappedBy}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="Full name of ALS facilitator"
      />
      {errors.mappedBy && (
        <HelperText type="error">{errors.mappedBy}</HelperText>
      )}

      {/* Date Mapped */}
      <TextInput
        label="Date Mapped (MM/DD/YYYY) *"
        value={dateMappedText}
        onChangeText={handleDateMappedChange}
        mode="outlined"
        style={styles.input}
        error={!!errors.dateMapped}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="e.g. 02/28/2026"
        keyboardType="numeric"
      />
      {errors.dateMapped && (
        <HelperText type="error">{errors.dateMapped}</HelperText>
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
