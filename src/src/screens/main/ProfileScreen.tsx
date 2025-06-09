import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, TextInput, Avatar, Switch, List, Divider } from 'react-native-paper';
import { faker } from '@faker-js/faker/locale/pt_BR';
import * as ImagePicker from 'expo-image-picker';

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

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: Date;
  orders: number;
  reviews: number;
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    joinDate: faker.date.past(),
    orders: faker.number.int({ min: 5, max: 50 }),
    reviews: faker.number.int({ min: 1, max: 20 }),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChangeAvatar = async () => {
    try {
      // Solicitar permissão para acessar a câmera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera.');
        return;
      }

      // Abrir a câmera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Atualizar o avatar com a nova imagem
        setProfile(prev => ({
          ...prev,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error('Erro ao capturar imagem:', error);
      Alert.alert('Erro', 'Não foi possível capturar a imagem.');
    }
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{ uri: isEditing ? editedProfile.avatar : profile.avatar }}
          style={styles.avatar}
        />
        <Button
          mode="outlined"
          onPress={handleChangeAvatar}
          style={styles.changeAvatarButton}
          textColor={COLORS.primary}
        >
          Alterar Foto
        </Button>
        <Text variant="headlineSmall" style={styles.name}>
          {profile.name}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {profile.email}
        </Text>
        <Text variant="bodySmall" style={styles.joinDate}>
          Membro desde {profile.joinDate.toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <Card style={styles.statsCard}>
        <Card.Content style={styles.statsContent}>
          <View style={styles.statItem}>
            <Text variant="headlineMedium" style={styles.statNumber}>
              {profile.orders}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Pedidos
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text variant="headlineMedium" style={styles.statNumber}>
              {profile.reviews}
            </Text>
            <Text variant="bodyMedium" style={styles.statLabel}>
              Avaliações
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.settingsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Configurações
          </Text>
          
          <List.Item
            title="Notificações Push"
            description="Receber notificações no celular"
            left={props => <List.Icon {...props} icon="bell" color={COLORS.primary} />}
            right={props => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color={COLORS.primary}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Modo Escuro"
            description="Alternar tema escuro"
            left={props => <List.Icon {...props} icon="theme-light-dark" color={COLORS.primary} />}
            right={props => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                color={COLORS.primary}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Notificações por Email"
            description="Receber atualizações por email"
            left={props => <List.Icon {...props} icon="email" color={COLORS.primary} />}
            right={props => (
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                color={COLORS.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.actionsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Ações
          </Text>
          
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            textColor={COLORS.primary}
            icon="history"
          >
            Histórico de Pedidos
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            textColor={COLORS.primary}
            icon="star"
          >
            Minhas Avaliações
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            textColor={COLORS.primary}
            icon="heart"
          >
            Favoritos
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            textColor={COLORS.primary}
            icon="map-marker"
          >
            Endereços
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => {}}
            style={styles.actionButton}
            textColor={COLORS.primary}
            icon="credit-card"
          >
            Formas de Pagamento
          </Button>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor={COLORS.primary}
      >
        Sair
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  avatar: {
    marginBottom: 16,
  },
  changeAvatarButton: {
    marginBottom: 16,
    borderColor: COLORS.primary,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  email: {
    color: COLORS.textLight,
    marginTop: 4,
  },
  joinDate: {
    color: COLORS.textLight,
    marginTop: 4,
  },
  statsCard: {
    margin: 16,
    backgroundColor: COLORS.white,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    color: COLORS.textLight,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.textLight,
    opacity: 0.3,
  },
  settingsCard: {
    margin: 16,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: COLORS.text,
  },
  actionsCard: {
    margin: 16,
    backgroundColor: COLORS.white,
  },
  actionButton: {
    marginBottom: 8,
    borderColor: COLORS.primary,
  },
  logoutButton: {
    margin: 16,
    marginTop: 8,
  },
});

export default ProfileScreen; 