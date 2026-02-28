import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Searchbar,
  FAB,
  Card,
  Avatar,
  IconButton,
  Text,
  Portal,
  Dialog,
  Button,
  Paragraph,
  Badge,
} from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Learner, RootStackParamList } from '../types';
import { COLORS, DISTRICT } from '../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LearnerList'>;
  learners: Learner[];
  setLearners: React.Dispatch<React.SetStateAction<Learner[]>>;
};

const LearnerListScreen: React.FC<Props> = ({
  navigation,
  learners,
  setLearners,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Learner | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Filter learners by search query
  const filteredLearners = learners.filter(l => {
    const fullName =
      `${l.lastName} ${l.firstName} ${l.middleName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleDelete = () => {
    if (deleteTarget) {
      setLearners(prev => prev.filter(l => l.id !== deleteTarget.id));
      setShowDeleteDialog(false);
      setDeleteTarget(null);
    }
  };

  const confirmDelete = (learner: Learner) => {
    setDeleteTarget(learner);
    setShowDeleteDialog(true);
  };

  const renderItem = ({ item }: { item: Learner }) => {
    const initials = `${item.firstName.charAt(0)}${item.lastName.charAt(0)}`.toUpperCase();
    const fullName = `${item.lastName}, ${item.firstName} ${item.middleName}`;
    const description = `Age: ${item.age} | ${item.sex}\n${item.completeAddress}`;

    return (
      <Card
        style={styles.card}
        onPress={() => navigation.navigate('LearnerDetail', { learner: item })}>
        <Card.Title
          title={fullName}
          titleStyle={styles.cardTitle}
          subtitle={description}
          subtitleNumberOfLines={2}
          subtitleStyle={styles.cardSubtitle}
          left={props => (
            <Avatar.Text
              {...props}
              size={44}
              label={initials}
              style={styles.avatar}
            />
          )}
          right={props => (
            <View style={styles.cardActions}>
              <IconButton
                {...props}
                icon="pencil"
                iconColor={COLORS.primary}
                size={22}
                onPress={() =>
                  navigation.navigate('LearnerForm', { learner: item })
                }
              />
              <IconButton
                {...props}
                icon="delete"
                iconColor={COLORS.error}
                size={22}
                onPress={() => confirmDelete(item)}
              />
            </View>
          )}
        />
      </Card>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Text style={styles.emptyIcon}>👋</Text>
      </View>
      <Text style={styles.emptyTitle}>Welcome to ALS Mapper!</Text>
      <Text style={styles.emptySubtitle}>
        Start mapping learners in your community by tapping the button below.
      </Text>
      <View style={styles.emptySteps}>
        <View style={styles.emptyStep}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>1</Text>
          </View>
          <Text style={styles.stepText}>Tap the{' '}
            <Text style={{ fontWeight: '700', color: COLORS.accent }}>+ button</Text>
          </Text>
        </View>
        <View style={styles.emptyStep}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>2</Text>
          </View>
          <Text style={styles.stepText}>Fill in 5 easy sections</Text>
        </View>
        <View style={styles.emptyStep}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>3</Text>
          </View>
          <Text style={styles.stepText}>Save & track your learners</Text>
        </View>
      </View>
      <Button
        mode="contained"
        icon="plus"
        buttonColor={COLORS.accent}
        textColor={COLORS.white}
        style={styles.emptyButton}
        contentStyle={styles.emptyButtonContent}
        labelStyle={styles.emptyButtonLabel}
        onPress={() => navigation.navigate('LearnerForm', {})}>
        Add Your First Learner
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.headerTextGroup}>
            <Text style={styles.headerTitle}>ALS Mapper</Text>
            <Text style={styles.headerSubtitle}>{DISTRICT}</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeNumber}>{learners.length}</Text>
            <Text style={styles.headerBadgeLabel}>
              {learners.length === 1 ? 'Learner' : 'Learners'}
            </Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <Searchbar
        placeholder="Search learners by name..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput}
      />

      {/* List */}
      <FlatList
        data={filteredLearners}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          filteredLearners.length === 0
            ? styles.listEmptyContent
            : styles.listContent
        }
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <FAB
        icon="plus"
        label={learners.length === 0 ? 'Add Learner' : undefined}
        style={styles.fab}
        color={COLORS.white}
        onPress={() => navigation.navigate('LearnerForm', {})}
      />

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={showDeleteDialog}
          onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Confirm Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Are you sure you want to delete{' '}
              <Text style={{ fontWeight: '700' }}>
                {deleteTarget
                  ? `${deleteTarget.firstName} ${deleteTarget.lastName}`
                  : ''}
              </Text>
              ? This action cannot be undone.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onPress={handleDelete} textColor={COLORS.error}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
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
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 56,
  },
  headerBadgeNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerBadgeLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchbar: {
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    height: 48,
  },
  searchInput: {
    fontSize: 15,
    minHeight: 48,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
    paddingTop: 4,
  },
  listEmptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  avatar: {
    backgroundColor: COLORS.primary,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Empty / Welcome state
  emptyContainer: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 44,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 24,
  },
  emptySteps: {
    alignSelf: 'stretch',
    marginBottom: 28,
    gap: 14,
  },
  emptyStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 1,
  },
  stepBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  stepBadgeText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  stepText: {
    fontSize: 15,
    color: COLORS.text,
    flex: 1,
  },
  emptyButton: {
    borderRadius: 14,
    elevation: 3,
  },
  emptyButtonContent: {
    height: 52,
    paddingHorizontal: 8,
  },
  emptyButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    elevation: 4,
  },
});

export default LearnerListScreen;
