import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { FORM_SECTIONS, COLORS } from '../utils/constants';

interface Props {
  currentStep: number;
}

const SECTION_ICONS = ['👤', '🎓', '🏠', '👨\u200d👩\u200d👧', '🚌'];

const StepIndicator: React.FC<Props> = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stepsRow}>
        {FORM_SECTIONS.map((section, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <View key={index} style={styles.stepItem}>
              {/* Connector line (left) */}
              {index > 0 && (
                <View
                  style={[
                    styles.connector,
                    (isActive || isCompleted) && styles.connectorActive,
                  ]}
                />
              )}
              {/* Circle */}
              <View
                style={[
                  styles.circle,
                  isActive && styles.circleActive,
                  isCompleted && styles.circleCompleted,
                ]}>
                <Text
                  style={[
                    styles.circleText,
                    (isActive || isCompleted) && styles.circleTextActive,
                  ]}>
                  {isCompleted ? '✓' : String(index + 1)}
                </Text>
              </View>
              {/* Connector line (right) */}
              {index < FORM_SECTIONS.length - 1 && (
                <View
                  style={[
                    styles.connector,
                    isCompleted && styles.connectorActive,
                  ]}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
      {/* Current step label */}
      <View style={styles.labelRow}>
        <Text style={styles.sectionLabel}>
          {SECTION_ICONS[currentStep]} {FORM_SECTIONS[currentStep]}
        </Text>
        <Text style={styles.stepCount}>
          {currentStep + 1}/{FORM_SECTIONS.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connector: {
    width: 24,
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  connectorActive: {
    backgroundColor: COLORS.primary,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    elevation: 3,
  },
  circleCompleted: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  circleText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  circleTextActive: {
    color: COLORS.white,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 4,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stepCount: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default StepIndicator;
