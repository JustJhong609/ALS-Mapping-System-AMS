import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
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
} from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Learner, RootStackParamList } from '../types';
import { COLORS, DISTRICT } from '../utils/constants';

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
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No Learners Mapped Yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button below to start mapping ALS learners in your community.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ALS Form 1 Mapper</Text>
        <Text style={styles.headerSubtitle}>{DISTRICT}</Text>
        <Text style={styles.learnerCount}>
          {learners.length} learner{learners.length !== 1 ? 's' : ''} mapped
        </Text>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  learnerCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  searchbar: {
    margin: 12,
    borderRadius: 8,
    elevation: 2,
  },
  searchInput: {
    fontSize: 15,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  listEmptyContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  avatar: {
    backgroundColor: COLORS.primary,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    backgroundColor: COLORS.accent,
    borderRadius: 30,
  },
});

export default LearnerListScreen;
