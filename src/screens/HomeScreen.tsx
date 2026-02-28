import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Divider, IconButton, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import { AnimatedCard, AnimatedFade, AnimatedZoom } from '../utils/animations';
import { Learner, RootStackParamList } from '../types';
import {
  COLORS,
  REGION,
  DIVISION,
  DISTRICT,
  BARANGAY_OPTIONS,
} from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  learners: Learner[];
  user: { name: string; email: string };
  onLogout: () => void;
};

// ── Menu card sub-component ────────────────────────────
const MenuCard: React.FC<{
  icon: string;
  label: string;
  description: string;
  onPress: () => void;
  color: string;
}> = ({ icon, label, description, onPress, color }) => (
  <Card style={styles.menuCard} onPress={onPress}>
    <View style={styles.menuRow}>
      <View style={[styles.menuIconBox, { backgroundColor: `${color}14` }]}>
        <IconButton icon={icon} iconColor={color} size={26} style={{ margin: 0 }} />
      </View>
      <View style={styles.menuText}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuDesc}>{description}</Text>
      </View>
      <IconButton icon="chevron-right" iconColor={COLORS.textSecondary} size={22} />
    </View>
  </Card>
);

const HomeScreen: React.FC<Props> = ({ navigation, learners, user, onLogout }) => {
  const [showAbout, setShowAbout] = useState(false);
  const currentYear = new Date().getFullYear();
  const totalLearners = learners.length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLogoCircle}>
            <Text style={styles.headerLogoText}>ALS</Text>
          </View>
          <View style={styles.headerTextGroup}>
            <Text style={styles.headerTitle}>ALS Mapping System</Text>
            <Text style={styles.headerSubtitle}>Community Mapping Tool</Text>
          </View>
          <IconButton
            icon="logout"
            iconColor={COLORS.white}
            size={22}
            onPress={onLogout}
            style={styles.logoutBtn}
          />
        </View>
        <View style={styles.adminRibbon}>
          <Text style={styles.adminText}>
            {DISTRICT}  |  {DIVISION}  |  CY {currentYear}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* ── Welcome ── */}
        <AnimatedFade delay={100}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeGreeting}>
              Hello, {user.name.split(' ')[0]}
            </Text>
            <Text style={styles.welcomeMessage}>
              {totalLearners > 0
                ? `You have ${totalLearners} mapped learner${totalLearners !== 1 ? 's' : ''} so far.`
                : 'Get started by mapping your first learner.'}
            </Text>
          </View>
        </AnimatedFade>

        {/* ── Quick Stats Banner ── */}
        <AnimatedZoom delay={200}>
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalLearners}</Text>
            <Text style={styles.statCaption}>Total Learners</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {learners.filter(l => l.sex === 'Male').length}
            </Text>
            <Text style={styles.statCaption}>Male</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {learners.filter(l => l.sex === 'Female').length}
            </Text>
            <Text style={styles.statCaption}>Female</Text>
          </View>
        </View>
        </AnimatedZoom>

        {/* ── Menu ── */}
        <AnimatedFade delay={300}>
          <Text style={styles.sectionHeading}>Menu</Text>
        </AnimatedFade>

        <AnimatedCard index={0} delay={350}>
          <MenuCard
            icon="account-plus"
            label="Add New Learner"
            description="Map a new ALS learner using Form 1"
            onPress={() => navigation.navigate('LearnerForm', {})}
            color={COLORS.success}
          />
        </AnimatedCard>

        <AnimatedCard index={1} delay={350}>
          <MenuCard
            icon="format-list-bulleted"
            label="View All Learners"
            description={`Browse & search ${totalLearners} mapped learners`}
            onPress={() => navigation.navigate('LearnerList')}
            color={COLORS.primary}
          />
        </AnimatedCard>

        <AnimatedCard index={2} delay={350}>
          <MenuCard
            icon="chart-bar"
            label="Analytics"
            description="View charts, breakdowns, and insights"
            onPress={() => navigation.navigate('Analytics')}
            color="#7B1FA2"
          />
        </AnimatedCard>

        {/* ── About ── */}
        <AnimatedCard index={3} delay={350}>
          <MenuCard
            icon="information-outline"
            label="About This App"
            description="App details, district info & coverage"
            onPress={() => setShowAbout(true)}
            color="#0288D1"
          />
        </AnimatedCard>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* ── About Modal ── */}
      <Modal
        visible={showAbout}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAbout(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setShowAbout(false)}>
          <Pressable style={styles.modalSheet} onPress={() => {}}>
            {/* Handle */}
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>About This App</Text>
              <IconButton
                icon="close"
                size={22}
                iconColor={COLORS.textSecondary}
                onPress={() => setShowAbout(false)}
                style={{ margin: 0 }}
              />
            </View>

            <Divider />

            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}>
              <Text style={styles.aboutText}>
                The{' '}
                <Text style={{ fontWeight: '700' }}>ALS Mapping System</Text>{' '}
                is a mobile-first tool designed for ALS facilitators to
                efficiently map out-of-school youth (OSY) and adults in their
                communities using the official ALS Form&nbsp;1 data fields.
              </Text>

              <Divider style={styles.aboutDivider} />

              <View style={styles.aboutRow}>
                <View style={styles.aboutItem}>
                  <Text style={styles.aboutItemLabel}>District</Text>
                  <Text style={styles.aboutItemValue}>{DISTRICT}</Text>
                </View>
                <View style={styles.aboutItem}>
                  <Text style={styles.aboutItemLabel}>Division</Text>
                  <Text style={styles.aboutItemValue}>{DIVISION}</Text>
                </View>
              </View>
              <View style={styles.aboutRow}>
                <View style={styles.aboutItem}>
                  <Text style={styles.aboutItemLabel}>Region</Text>
                  <Text style={styles.aboutItemValue}>{REGION}</Text>
                </View>
                <View style={styles.aboutItem}>
                  <Text style={styles.aboutItemLabel}>Calendar Year</Text>
                  <Text style={styles.aboutItemValue}>{currentYear}</Text>
                </View>
              </View>

              <Divider style={styles.aboutDivider} />

              <Text style={styles.aboutItemLabel}>Barangays Covered</Text>
              <Text style={styles.aboutFooter}>
                {BARANGAY_OPTIONS.join(', ')}
              </Text>

              <View style={{ height: 8 }} />
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                mode="contained"
                onPress={() => setShowAbout(false)}
                style={styles.modalCloseBtn}
                labelStyle={{ fontWeight: '700' }}>
                Close
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Header */
  header: {
    backgroundColor: COLORS.primary,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerLogoCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerLogoText: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 1,
  },
  logoutBtn: {
    margin: 0,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  adminRibbon: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  adminText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },

  scrollContent: {
    padding: 16,
  },

  /* Welcome */
  welcomeSection: {
    marginBottom: 16,
    marginTop: 4,
  },
  welcomeGreeting: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  welcomeMessage: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },

  /* Quick stats banner */
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statCaption: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },

  /* Section heading */
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 18,
    marginBottom: 10,
    letterSpacing: 0.2,
  },

  /* Menu cards */
  menuCard: {
    borderRadius: 14,
    backgroundColor: COLORS.white,
    elevation: 2,
    marginBottom: 10,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 14,
    paddingRight: 4,
  },
  menuIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  menuDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  /* About modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 20,
    maxHeight: '80%',
    elevation: 16,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  modalBody: {
    paddingTop: 16,
  },
  modalFooter: {
    paddingVertical: 16,
  },
  modalCloseBtn: {
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  aboutDivider: {
    marginVertical: 14,
  },
  aboutRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  aboutItem: {
    flex: 1,
  },
  aboutItemLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  aboutItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  aboutFooter: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default HomeScreen;
