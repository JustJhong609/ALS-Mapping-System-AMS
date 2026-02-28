import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Text, Searchbar, TouchableRipple } from 'react-native-paper';
import { COLORS } from '../../utils/constants';

interface DropdownPickerProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: boolean;
}

/**
 * Cross-platform dropdown picker that works on web, iOS, and Android.
 * Uses a modal with a searchable list.
 */
const DropdownPicker: React.FC<DropdownPickerProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
  placeholder = '-- Select --',
  error = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (value: string) => {
    onValueChange(value);
    setVisible(false);
    setSearch('');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[styles.trigger, error && styles.triggerError]}
        activeOpacity={0.7}>
        <Text
          style={selectedValue ? styles.selectedText : styles.placeholderText}>
          {selectedValue || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
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
            <Text style={styles.modalTitle}>{label}</Text>

            {options.length > 6 && (
              <Searchbar
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchBar}
                inputStyle={styles.searchInput}
              />
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={item => item}
              style={styles.list}
              renderItem={({ item }) => (
                <TouchableRipple
                  onPress={() => handleSelect(item)}
                  style={[
                    styles.option,
                    item === selectedValue && styles.optionSelected,
                  ]}>
                  <Text
                    style={[
                      styles.optionText,
                      item === selectedValue && styles.optionTextSelected,
                    ]}>
                    {item}
                  </Text>
                </TouchableRipple>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No matches found</Text>
              }
            />

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
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
  selectedText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 8,
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
    padding: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  searchBar: {
    marginBottom: 8,
    elevation: 0,
    backgroundColor: COLORS.background,
  },
  searchInput: {
    fontSize: 14,
  },
  list: {
    maxHeight: 300,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: '#E3F2FD',
  },
  optionText: {
    fontSize: 15,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    paddingVertical: 20,
  },
  cancelButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '600',
  },
});

export default DropdownPicker;
