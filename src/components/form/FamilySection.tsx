import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { LearnerFormData, ValidationErrors } from '../../types';
import { COLORS } from '../../utils/constants';

interface Props {
  data: LearnerFormData;
  errors: ValidationErrors;
  onChange: (field: keyof LearnerFormData, value: any) => void;
}

const FamilySection: React.FC<Props> = ({ data, errors: _errors, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Family Information</Text>
      <Text style={styles.subtitle}>
        All fields in this section are optional.
      </Text>

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
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
});

export default FamilySection;
