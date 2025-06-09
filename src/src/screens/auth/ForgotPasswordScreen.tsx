import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

// Cores do tema
const COLORS = {
  primary: '#2E7D32', // Verde principal
  secondary: '#4CAF50', // Verde secundário
  accent: '#81C784', // Verde claro para acentos
  background: '#F1F8E9', // Fundo claro
  text: '#1B5E20', // Texto escuro
  textLight: '#666666', // Texto claro
  white: '#FFFFFF',
};

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOTP = async () => {
    if (!email) {
      return;
    }

    setLoading(true);
    try {
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando envio de OTP
      setOtpSent(true);
    } catch (error) {
      console.error('Erro ao enviar OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      return;
    }

    setLoading(true);
    try {
      // Simulando delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando verificação de OTP
      navigation.navigate('ResetPassword');
    } catch (error) {
      console.error('Erro ao verificar OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.logo}>
            EcoShop
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            Recuperar Senha
          </Text>
        </View>

        {!otpSent ? (
          <>
            <Text variant="bodyLarge" style={styles.message}>
              Digite seu email para receber um código de verificação
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              activeOutlineColor={COLORS.primary}
            />

            <Button
              mode="contained"
              onPress={handleSendOTP}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor={COLORS.primary}
            >
              Enviar Código
            </Button>
          </>
        ) : (
          <>
            <Text variant="bodyLarge" style={styles.message}>
              Digite o código de verificação enviado para seu email
            </Text>

            <TextInput
              label="Código de verificação"
              value={otp}
              onChangeText={setOtp}
              mode="outlined"
              keyboardType="number-pad"
              style={styles.input}
              activeOutlineColor={COLORS.primary}
            />

            <Button
              mode="contained"
              onPress={handleVerifyOTP}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor={COLORS.primary}
            >
              Verificar Código
            </Button>
          </>
        )}

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
          textColor={COLORS.primary}
        >
          Voltar para o login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitle: {
    color: COLORS.textLight,
    marginTop: 4,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.text,
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  button: {
    marginTop: 8,
  },
  linkButton: {
    marginTop: 16,
  },
});

export default ForgotPasswordScreen; 