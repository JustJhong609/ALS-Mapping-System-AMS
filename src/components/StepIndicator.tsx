import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FORM_SECTIONS, COLORS } from '../utils/constants';

interface Props {
  currentStep: number;
}

const StepIndicator: React.FC<Props> = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {FORM_SECTIONS.map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <View key={index} style={styles.stepWrapper}>
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
      </View>
      <Text style={styles.sectionLabel}>
        Step {currentStep + 1} of {FORM_SECTIONS.length}:{' '}
        {FORM_SECTIONS[currentStep]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connector: {
    width: 28,
    height: 3,
    backgroundColor: COLORS.border,
  },
  connectorActive: {
    backgroundColor: COLORS.primary,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: COLORS.primary,
  },
  circleCompleted: {
    backgroundColor: COLORS.success,
  },
  circleText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  circleTextActive: {
    color: COLORS.white,
  },
  sectionLabel: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default StepIndicator;
