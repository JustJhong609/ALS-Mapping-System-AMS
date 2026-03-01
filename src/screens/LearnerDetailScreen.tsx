import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { Card, Text, Divider, Button, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { COLORS } from '../utils/constants';
import { formatDate } from '../utils/validation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LearnerDetail'>;
  route: RouteProp<RootStackParamList, 'LearnerDetail'>;
};

/** Simple label-value row */
const InfoRow: React.FC<{ label: string; value?: string | number }> = ({
  label,
  value,
}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue} selectable>{value ?? '—'}</Text>
  </View>
);

const LearnerDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { learner } = route.params;
  const fullName = `${learner.firstName} ${learner.middleName} ${learner.lastName}${
    learner.nameExtension ? ` ${learner.nameExtension}` : ''
  }`;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerName}>{fullName}</Text>
        <Text style={styles.headerMeta}>
          {learner.age} yrs old | {learner.sex}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Administrative */}
        <Card style={styles.card}>
          <Card.Title
            title="Administrative"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <InfoRow label="Region" value={learner.region} />
            <InfoRow label="Division" value={learner.division} />
            <InfoRow label="District" value={learner.district} />
            <InfoRow label="Calendar Year" value={learner.calendarYear} />
          </Card.Content>
        </Card>

        {/* Personal Information */}
        <Card style={styles.card}>
          <Card.Title
            title="Personal Information"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <InfoRow label="Last Name" value={learner.lastName} />
            <InfoRow label="First Name" value={learner.firstName} />
            <InfoRow label="Middle Name" value={learner.middleName} />
            <InfoRow label="Name Extension" value={learner.nameExtension} />
            <InfoRow label="Sex" value={learner.sex} />
            <InfoRow
              label="Birthdate"
              value={formatDate(new Date(learner.birthdate))}
            />
            <InfoRow label="Age" value={learner.age} />
            <InfoRow label="Mother Tongue" value={learner.motherTongue} />
            <InfoRow label="Indigenous Peoples (IP)" value={learner.isIP ? 'Yes' : 'No'} />
            {learner.isIP && learner.ipTribe && (
              <InfoRow label="Tribe / Ethnic Group" value={learner.ipTribe} />
            )}
            <InfoRow label="4P's Member" value={learner.is4PsMember ? 'Yes' : 'No'} />
            <InfoRow label="Religion" value={learner.religion} />
            <InfoRow label="Civil Status" value={learner.civilStatus} />
          </Card.Content>
        </Card>

        {/* Address */}
        <Card style={styles.card}>
          <Card.Title title="Address" titleStyle={styles.cardTitle} />
          <Card.Content>
            <InfoRow label="Barangay" value={learner.barangay} />
            <InfoRow label="Complete Address" value={learner.completeAddress} />
          </Card.Content>
        </Card>

        {/* Family Information */}
        <Card style={styles.card}>
          <Card.Title
            title="Family Information"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <InfoRow label="Role in the Family" value={learner.roleInFamily} />
            <InfoRow label="Father's Name" value={learner.fatherName} />
            <InfoRow label="Mother's Name" value={learner.motherName} />
            <InfoRow label="Guardian's Name" value={learner.guardianName} />
            <InfoRow
              label="Guardian's Occupation"
              value={learner.guardianOccupation}
            />
          </Card.Content>
        </Card>

        {/* Education Background */}
        <Card style={styles.card}>
          <Card.Title
            title="Education Background"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <InfoRow
              label="Currently Studying"
              value={learner.currentlyStudying}
            />
            <InfoRow
              label="Last Grade Completed"
              value={learner.lastGradeCompleted}
            />
            <InfoRow
              label="Reason for Not Attending"
              value={learner.reasonForNotAttending}
            />
          </Card.Content>
        </Card>

        {/* Logistics & Schedule */}
        <Card style={styles.card}>
          <Card.Title
            title="Logistics & Schedule"
            titleStyle={styles.cardTitle}
          />
          <Card.Content>
            <InfoRow
              label="Distance (km)"
              value={`${learner.distanceKm} km`}
            />
            <InfoRow label="Travel Time" value={learner.travelTime} />
            <InfoRow label="Transport Mode" value={learner.transportMode} />
            <InfoRow
              label="Preferred Session Time"
              value={learner.preferredSessionTime}
            />
            <InfoRow label="Mapped By" value={learner.mappedBy} />
            <InfoRow
              label="Date Mapped"
              value={formatDate(new Date(learner.dateMapped))}
            />
          </Card.Content>
        </Card>

        {/* Edit Button */}
        <Button
          mode="contained"
          icon="pencil"
          onPress={() =>
            navigation.navigate('LearnerForm', { learner })
          }
          style={styles.editButton}
          contentStyle={styles.editButtonContent}
          labelStyle={styles.editButtonLabel}
          buttonColor={COLORS.primary}>
          Edit Learner
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.2,
  },
  headerMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 14,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  infoRow: {
    flexDirection: 'column',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
    lineHeight: 22,
  },
  editButton: {
    marginTop: 8,
    borderRadius: 14,
    elevation: 3,
  },
  editButtonContent: {
    height: 52,
  },
  editButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LearnerDetailScreen;
