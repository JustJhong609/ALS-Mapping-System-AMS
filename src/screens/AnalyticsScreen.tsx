import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnimatedCard, AnimatedFade, AnimatedZoom, AnimatedBar } from '../utils/animations';
import { Learner, RootStackParamList } from '../types';
import { COLORS, BARANGAY_OPTIONS } from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Analytics'>;
  learners: Learner[];
};

// ── Stat card (no emoji) ───────────────────────────────
const StatCard: React.FC<{
  label: string;
  value: string | number;
  color: string;
  small?: boolean;
}> = ({ label, value, color, small }) => (
  <View style={[styles.statCard, small && styles.statCardSmall]}>
    <View style={[styles.statDot, { backgroundColor: color }]} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ── Horizontal bar row ─────────────────────────────────
const BarRow: React.FC<{
  label: string;
  count: number;
  total: number;
  color: string;
}> = ({ label, count, total, color }) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <View style={styles.barRowContainer}>
      <View style={styles.barRowHeader}>
        <Text style={styles.barRowLabel}>{label}</Text>
        <Text style={styles.barRowCount}>
          {count}{' '}
          <Text style={styles.barRowPct}>({pct.toFixed(0)}%)</Text>
        </Text>
      </View>
      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            { width: `${Math.max(pct, 2)}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const AnalyticsScreen: React.FC<Props> = ({ navigation, learners }) => {
  const stats = useMemo(() => {
    const total = learners.length;
    const male = learners.filter(l => l.sex === 'Male').length;
    const female = learners.filter(l => l.sex === 'Female').length;
    const fourPs = learners.filter(l => l.is4PsMember).length;
    const ip = learners.filter(l => l.isIP).length;
    const studying = learners.filter(l => l.currentlyStudying === 'Yes').length;
    const notStudying = total - studying;

    const byBarangay: Record<string, number> = {};
    BARANGAY_OPTIONS.forEach(b => (byBarangay[b] = 0));
    learners.forEach(l => {
      if (byBarangay[l.barangay] !== undefined) {
        byBarangay[l.barangay]++;
      }
    });

    const youth = learners.filter(l => l.age >= 6 && l.age <= 17).length;
    const adult = learners.filter(l => l.age >= 18 && l.age <= 59).length;
    const senior = learners.filter(l => l.age >= 60).length;

    // Mother tongue distribution (top 5)
    const tongueMap: Record<string, number> = {};
    learners.forEach(l => {
      if (l.motherTongue) {
        tongueMap[l.motherTongue] = (tongueMap[l.motherTongue] || 0) + 1;
      }
    });
    const topTongues = Object.entries(tongueMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Grade level distribution
    const gradeMap: Record<string, number> = {};
    learners.forEach(l => {
      if (l.lastGradeCompleted) {
        gradeMap[l.lastGradeCompleted] =
          (gradeMap[l.lastGradeCompleted] || 0) + 1;
      }
    });
    const gradeEntries = Object.entries(gradeMap).sort(
      (a, b) => b[1] - a[1]
    );

    return {
      total,
      male,
      female,
      fourPs,
      ip,
      studying,
      notStudying,
      byBarangay,
      youth,
      adult,
      senior,
      topTongues,
      gradeEntries,
    };
  }, [learners]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          iconColor={COLORS.white}
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* ── Summary ──────────────────── */}
        <AnimatedFade delay={100}>
          <Text style={styles.sectionHeading}>Overview</Text>
        </AnimatedFade>
        <AnimatedZoom delay={150}>
        <View style={styles.statRow}>
          <StatCard
            label="Total Learners"
            value={stats.total}
            color={COLORS.primary}
          />
          <StatCard
            label="Male"
            value={stats.male}
            color="#1E88E5"
          />
          <StatCard
            label="Female"
            value={stats.female}
            color="#E91E63"
          />
        </View>
        </AnimatedZoom>

        <AnimatedZoom delay={250}>
        <View style={styles.statRow}>
          <StatCard
            label="Studying"
            value={stats.studying}
            color={COLORS.success}
            small
          />
          <StatCard
            label="Not Studying"
            value={stats.notStudying}
            color={COLORS.error}
            small
          />
          <StatCard
            label="4P's Members"
            value={stats.fourPs}
            color={COLORS.accent}
            small
          />
          <StatCard
            label="IP Members"
            value={stats.ip}
            color="#4CAF50"
            small
          />
        </View>
        </AnimatedZoom>

        {/* ── Gender Ratio ─────────────── */}
        {stats.total > 0 && (
          <>
            <AnimatedFade delay={350}>
              <Text style={styles.sectionHeading}>Gender Ratio</Text>
            </AnimatedFade>
            <AnimatedCard delay={400}>
            <Card style={styles.chartCard}>
              <Card.Content>
                <View style={styles.ratioBar}>
                  <View
                    style={[
                      styles.ratioFillLeft,
                      {
                        flex: stats.male || 1,
                        backgroundColor: '#1E88E5',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.ratioFillRight,
                      {
                        flex: stats.female || 1,
                        backgroundColor: '#E91E63',
                      },
                    ]}
                  />
                </View>
                <View style={styles.ratioLegend}>
                  <View style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, { backgroundColor: '#1E88E5' }]}
                    />
                    <Text style={styles.legendText}>
                      Male{' '}
                      {stats.total > 0
                        ? `(${((stats.male / stats.total) * 100).toFixed(0)}%)`
                        : ''}
                    </Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, { backgroundColor: '#E91E63' }]}
                    />
                    <Text style={styles.legendText}>
                      Female{' '}
                      {stats.total > 0
                        ? `(${((stats.female / stats.total) * 100).toFixed(0)}%)`
                        : ''}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
            </AnimatedCard>
          </>
        )}

        {/* ── Age Breakdown ────────────── */}
        <AnimatedFade delay={450}>
          <Text style={styles.sectionHeading}>Age Breakdown</Text>
        </AnimatedFade>
        <AnimatedCard delay={500}>
        <Card style={styles.chartCard}>
          <Card.Content>
            <BarRow
              label="Youth (6 – 17)"
              count={stats.youth}
              total={stats.total}
              color="#42A5F5"
            />
            <BarRow
              label="Adult (18 – 59)"
              count={stats.adult}
              total={stats.total}
              color={COLORS.primary}
            />
            <BarRow
              label="Senior (60+)"
              count={stats.senior}
              total={stats.total}
              color={COLORS.accent}
            />
          </Card.Content>
        </Card>
        </AnimatedCard>

        {/* ── Barangay Breakdown ────────── */}
        <AnimatedFade delay={550}>
          <Text style={styles.sectionHeading}>Learners per Barangay</Text>
        </AnimatedFade>
        <AnimatedCard delay={600}>
        <Card style={styles.chartCard}>
          <Card.Content>
            {BARANGAY_OPTIONS.map(brgy => (
              <BarRow
                key={brgy}
                label={brgy}
                count={stats.byBarangay[brgy] ?? 0}
                total={stats.total}
                color={COLORS.primary}
              />
            ))}
          </Card.Content>
        </Card>
        </AnimatedCard>

        {/* ── Mother Tongue ────────────── */}
        {stats.topTongues.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Top Mother Tongues</Text>
            <Card style={styles.chartCard}>
              <Card.Content>
                {stats.topTongues.map(([tongue, count]) => (
                  <BarRow
                    key={tongue}
                    label={tongue}
                    count={count}
                    total={stats.total}
                    color="#7B1FA2"
                  />
                ))}
              </Card.Content>
            </Card>
          </>
        )}

        {/* ── Grade Level Distribution ─── */}
        {stats.gradeEntries.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>
              Last Grade Completed
            </Text>
            <Card style={styles.chartCard}>
              <Card.Content>
                {stats.gradeEntries.map(([grade, count]) => (
                  <BarRow
                    key={grade}
                    label={grade}
                    count={count}
                    total={stats.total}
                    color="#00897B"
                  />
                ))}
              </Card.Content>
            </Card>
          </>
        )}

        {/* ── Empty state ─────────────── */}
        {stats.total === 0 && (
          <Card style={[styles.chartCard, { marginTop: 8 }]}>
            <Card.Content style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Data Yet</Text>
              <Text style={styles.emptyText}>
                Start mapping learners to see analytics and insights here.
              </Text>
            </Card.Content>
          </Card>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingVertical: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  scrollContent: {
    padding: 16,
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

  /* Stat cards */
  statRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  statCardSmall: {
    paddingVertical: 12,
  },
  statDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    textAlign: 'center',
  },

  /* Chart cards */
  chartCard: {
    borderRadius: 14,
    backgroundColor: COLORS.white,
    elevation: 2,
    marginBottom: 4,
  },

  /* Gender ratio */
  ratioBar: {
    flexDirection: 'row',
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 12,
  },
  ratioFillLeft: {
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  ratioFillRight: {
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
  ratioLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },

  /* Bar chart */
  barRowContainer: {
    marginBottom: 12,
  },
  barRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barRowLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  barRowCount: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  barRowPct: {
    fontWeight: '400',
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  barTrack: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    borderRadius: 4,
  },

  /* Empty state */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default AnalyticsScreen;
