import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { COLORS } from '../../utils/constants';
import { formatDate } from '../../utils/validation';

interface DatePickerFieldProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: boolean;
  maximumDate?: Date;
}

/**
 * Cross-platform date picker that works on web, iOS, and Android.
 * On web: renders three dropdown selectors (month, day, year).
 * On native: renders a touchable that shows date when selected.
 */
const DatePickerField: React.FC<DatePickerFieldProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  error = false,
  maximumDate = new Date(),
}) => {
  const [visible, setVisible] = useState(false);

  // Local state for the picker modal
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(
    value ? value.getFullYear() : 2000,
  );
  const [selectedMonth, setSelectedMonth] = useState(
    value ? value.getMonth() : 0,
  );
  const [selectedDay, setSelectedDay] = useState(
    value ? value.getDate() : 1,
  );

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const currentYear = now.getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 100; y--) {
    years.push(y);
  }

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const handleConfirm = () => {
    const day = Math.min(selectedDay, daysInMonth);
    const date = new Date(selectedYear, selectedMonth, day);
    if (date <= maximumDate) {
      onChange(date);
    } else {
      onChange(maximumDate);
    }
    setVisible(false);
  };

  const openPicker = () => {
    if (value) {
      setSelectedYear(value.getFullYear());
      setSelectedMonth(value.getMonth());
      setSelectedDay(value.getDate());
    }
    setVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openPicker}
        style={[styles.trigger, error && styles.triggerError]}
        activeOpacity={0.7}>
        <Text style={value ? styles.dateText : styles.placeholderText}>
          {value ? formatDate(value) : placeholder}
        </Text>
        <Text style={styles.icon}>📅</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}>
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Select Birthdate</Text>

            {/* Month Selector */}
            <Text style={styles.fieldLabel}>Month</Text>
            <View style={styles.scrollRow}>
              {months.map((m, i) => (
                <TouchableOpacity
                  key={m}
                  style={[
                    styles.chip,
                    i === selectedMonth && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedMonth(i)}>
                  <Text
                    style={[
                      styles.chipText,
                      i === selectedMonth && styles.chipTextSelected,
                    ]}>
                    {m.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Day Selector */}
            <Text style={styles.fieldLabel}>Day</Text>
            <View style={styles.scrollRow}>
              {days.map(d => (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.chip,
                    d === selectedDay && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedDay(d)}>
                  <Text
                    style={[
                      styles.chipText,
                      d === selectedDay && styles.chipTextSelected,
                    ]}>
                    {String(d)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Year Selector */}
            <Text style={styles.fieldLabel}>Year</Text>
            <View style={styles.scrollRow}>
              {years.slice(0, 60).map(y => (
                <TouchableOpacity
                  key={y}
                  style={[
                    styles.chip,
                    y === selectedYear && styles.chipSelected,
                  ]}
                  onPress={() => setSelectedYear(y)}>
                  <Text
                    style={[
                      styles.chipText,
                      y === selectedYear && styles.chipTextSelected,
                    ]}>
                    {String(y)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Preview */}
            <Text style={styles.preview}>
              {months[selectedMonth]} {Math.min(selectedDay, daysInMonth)},{' '}
              {selectedYear}
            </Text>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <Button
                mode="outlined"
                onPress={() => setVisible(false)}
                style={styles.modalButton}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleConfirm}
                buttonColor={COLORS.primary}
                style={styles.modalButton}>
                Confirm
              </Button>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
    padding: 14,
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  triggerError: {
    borderColor: COLORS.error,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  icon: {
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 420,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 6,
  },
  scrollRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.text,
  },
  chipTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },
  preview: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
  },
});

export default DatePickerField;
