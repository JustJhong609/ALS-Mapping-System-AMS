import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText, RadioButton, TouchableRipple } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { FAMILY_ROLE_OPTIONS, YES_NO_OPTIONS, COLORS } from '../../utils/constants';
import DropdownPicker from '../common/DropdownPicker';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const FamilySection: React.FC<Props> = ({ data, errors, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>👨‍👩‍👧 Family Information</Text>
      <Text style={styles.subtitle}>
        Role in the family is required. Other fields are optional.
      </Text>

      {/* Role in the Family */}
      <Text style={styles.label}>Role in the Family *</Text>
      <DropdownPicker
        label="Role in the Family"
        selectedValue={data.roleInFamily}
        onValueChange={v => onChange('roleInFamily', v)}
        options={FAMILY_ROLE_OPTIONS}
        placeholder="-- Select Relationship to Head --"
        error={!!errors.roleInFamily}
      />
      {errors.roleInFamily && (
        <HelperText type="error">{errors.roleInFamily}</HelperText>
      )}

      <TextInput
        label="Father's Name"
        value={data.fatherName}
        onChangeText={v => onChange('fatherName', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="Last Name, First Name, Middle Name"
      />

      <TextInput
        label="Mother's Name"
        value={data.motherName}
        onChangeText={v => onChange('motherName', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="Last Name, First Name, Middle Name"
      />

      <TextInput
        label="Guardian's Name"
        value={data.guardianName}
        onChangeText={v => onChange('guardianName', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
        placeholder="Last Name, First Name, Middle Name"
      />

      <TextInput
        label="Guardian's Occupation"
        value={data.guardianOccupation}
        onChangeText={v => onChange('guardianOccupation', v)}
        mode="outlined"
        style={styles.input}
        outlineColor={COLORS.border}
        activeOutlineColor={COLORS.primary}
      />

      {/* IP / Indigenous Peoples */}
      <Text style={styles.label}>Belongs to Indigenous Peoples (IP)?</Text>
      <RadioButton.Group
        onValueChange={v => {
          onChange('isIP', v);
          if (v === 'No') onChange('ipTribe', '');
        }}
        value={data.isIP}>
        <View style={styles.radioRow}>
          {YES_NO_OPTIONS.map(option => (
            <TouchableRipple
              key={`ip-${option}`}
              onPress={() => {
                onChange('isIP', option);
                if (option === 'No') onChange('ipTribe', '');
              }}
              style={styles.radioItem}>
              <View style={styles.radioItemInner}>
                <RadioButton value={option} color={COLORS.primary} />
                <Text>{option}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
      </RadioButton.Group>
      {data.isIP === 'Yes' && (
        <TextInput
          label="Tribe / Ethnic Group *"
          value={data.ipTribe}
          onChangeText={v => onChange('ipTribe', v)}
          mode="outlined"
          style={styles.input}
          error={!!errors.ipTribe}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          placeholder="e.g. Talaandig, Higaonon, Manobo"
        />
      )}
      {errors.ipTribe && (
        <HelperText type="error">{errors.ipTribe}</HelperText>
      )}

      {/* 4P's Member */}
      <Text style={styles.label}>Member of 4P's (Pantawid Pamilya)?</Text>
      <RadioButton.Group
        onValueChange={v => onChange('is4PsMember', v)}
        value={data.is4PsMember}>
        <View style={styles.radioRow}>
          {YES_NO_OPTIONS.map(option => (
            <TouchableRipple
              key={`4ps-${option}`}
              onPress={() => onChange('is4PsMember', option)}
              style={styles.radioItem}>
              <View style={styles.radioItemInner}>
                <RadioButton value={option} color={COLORS.primary} />
                <Text>{option}</Text>
              </View>
            </TouchableRipple>
          ))}
        </View>
      </RadioButton.Group>
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
    marginBottom: 14,
    backgroundColor: COLORS.white,
    fontSize: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 12,
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
});

export default FamilySection;
