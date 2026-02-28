import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnimatedFade, AnimatedCard } from '../utils/animations';
import { RootStackParamList } from '../types';
import { COLORS, REGION, DIVISION, DISTRICT } from '../utils/constants';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  onAuth: (user: { name: string; email: string }) => void;
};

// Simple in-memory account store
const accounts: { name: string; email: string; password: string }[] = [];

const LoginScreen: React.FC<Props> = ({ navigation, onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetFields();
  };

  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

  const handleSignUp = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      Alert.alert('Missing Field', 'Please enter your full name.');
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long.'
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    if (accounts.find(a => a.email === trimmedEmail)) {
      Alert.alert(
        'Account Exists',
        'An account with this email already exists. Please sign in.'
      );
      return;
    }

    setLoading(true);
    setTimeout(() => {
      accounts.push({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });
      setLoading(false);
      onAuth({ name: trimmedName, email: trimmedEmail });
    }, 600);
  };

  const handleLogin = () => {
    const trimmedEmail = email.trim().toLowerCase() || 'user@als.edu.ph';
    const displayName = name.trim() || trimmedEmail.split('@')[0] || 'User';

    // Check existing account first; if none found, log in as guest/demo
    const account = accounts.find(a => a.email === trimmedEmail);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuth({
        name: account ? account.name : displayName,
        email: trimmedEmail,
      });
    }, 400);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* ── Branding ── */}
          <AnimatedFade delay={100}>
            <View style={styles.brandSection}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>ALS</Text>
              </View>
              <Text style={styles.appName}>ALS Mapping System</Text>
              <Text style={styles.appTagline}>
                Community Mapping Tool
              </Text>
              <View style={styles.adminBadge}>
                <Text style={styles.adminBadgeText}>
                  {DISTRICT}
                </Text>
                <Text style={styles.adminBadgeTextSub}>
                  {DIVISION} | {REGION}
                </Text>
              </View>
            </View>
          </AnimatedFade>

          {/* ── Form Card ── */}
          <AnimatedCard delay={300}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </Text>
            <Text style={styles.formSubtitle}>
              {isSignUp
                ? 'Sign up to start mapping learners'
                : 'Sign in to continue'}
            </Text>

            {isSignUp && (
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
                outlineStyle={styles.inputOutline}
                left={<TextInput.Icon icon="account" />}
                autoCapitalize="words"
              />
            )}

            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              left={<TextInput.Icon icon="email" />}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={!showPassword}
            />

            {isSignUp && (
              <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                style={styles.input}
                outlineStyle={styles.inputOutline}
                left={<TextInput.Icon icon="lock-check" />}
                secureTextEntry={!showPassword}
              />
            )}

            <Button
              mode="contained"
              onPress={isSignUp ? handleSignUp : handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
              labelStyle={styles.submitButtonLabel}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {isSignUp
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </Text>
              <TouchableOpacity onPress={toggleMode}>
                <Text style={styles.switchLink}>
                  {isSignUp ? ' Sign In' : ' Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          </AnimatedCard>

          {/* ── Footer ── */}
          <AnimatedFade delay={500}>
            <Text style={styles.footer}>
              ALS Mapping System v1.0
            </Text>
          </AnimatedFade>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  /* Branding */
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 2,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  appTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  adminBadge: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  adminBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.3,
  },
  adminBadgeTextSub: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },

  /* Form Card */
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  input: {
    marginBottom: 14,
    backgroundColor: COLORS.white,
  },
  inputOutline: {
    borderRadius: 12,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
  },
  submitButtonContent: {
    height: 52,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  /* Switch row */
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  switchText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },

  /* Footer */
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 24,
  },
});

export default LoginScreen;
