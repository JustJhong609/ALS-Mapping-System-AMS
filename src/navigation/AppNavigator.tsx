import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Learner } from '../types';
import { COLORS } from '../utils/constants';

import LearnerListScreen from '../screens/LearnerListScreen';
import LearnerFormScreen from '../screens/LearnerFormScreen';
import LearnerDetailScreen from '../screens/LearnerDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  learners: Learner[];
  setLearners: React.Dispatch<React.SetStateAction<Learner[]>>;
}

const AppNavigator: React.FC<Props> = ({ learners, setLearners }) => {
  return (
    <Stack.Navigator
      initialRouteName="LearnerList"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: COLORS.background },
      }}>
      <Stack.Screen
        name="LearnerList"
        options={{ headerShown: false }}>
        {(props: any) => (
          <LearnerListScreen
            {...props}
            learners={learners}
            setLearners={setLearners}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LearnerForm"
        options={{ title: 'Learner Form', headerShown: false }}>
        {(props: any) => (
          <LearnerFormScreen
            {...props}
            learners={learners}
            setLearners={setLearners}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="LearnerDetail"
        options={{ title: 'Learner Details' }}
        component={LearnerDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
