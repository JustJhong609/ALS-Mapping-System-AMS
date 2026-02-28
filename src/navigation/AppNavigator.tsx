import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Learner } from '../types';
import { COLORS } from '../utils/constants';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import LearnerListScreen from '../screens/LearnerListScreen';
import LearnerFormScreen from '../screens/LearnerFormScreen';
import LearnerDetailScreen from '../screens/LearnerDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {
  learners: Learner[];
  setLearners: React.Dispatch<React.SetStateAction<Learner[]>>;
}

const AppNavigator: React.FC<Props> = ({ learners, setLearners }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleAuth = (u: { name: string; email: string }) => {
    setUser(u);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Login'}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: COLORS.background },
      }}>
      {!user ? (
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}>
          {(props: any) => (
            <LoginScreen {...props} onAuth={handleAuth} />
          )}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}>
            {(props: any) => (
              <HomeScreen
                {...props}
                learners={learners}
                user={user}
                onLogout={handleLogout}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Analytics"
            options={{ headerShown: false }}>
            {(props: any) => (
              <AnalyticsScreen
                {...props}
                learners={learners}
              />
            )}
          </Stack.Screen>
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
            options={{
              title: 'Learner Details',
              headerTitleStyle: { fontWeight: '700', fontSize: 18 },
            }}
            component={LearnerDetailScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
