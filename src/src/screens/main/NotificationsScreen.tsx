import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { faker } from '@faker-js/faker/locale/pt_BR';

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

type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
};

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const sendTestNotification = () => {
    setLoading(true);
    
    // Simulando um delay de envio
    setTimeout(() => {
      const newNotification: Notification = {
        id: faker.string.uuid(),
        title: faker.helpers.arrayElement([
          'Nova Promoção!',
          'Produto em Estoque',
          'Pedido Confirmado',
          'Atualização do Sistema',
          'Oferta Especial'
        ]),
        message: faker.lorem.paragraph(),
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev]);
      setLoading(false);
    }, 500);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card 
      style={[
        styles.card,
        item.read && styles.readCard
      ]}
    >
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {item.title}
          </Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => deleteNotification(item.id)}
            iconColor={COLORS.textLight}
          />
        </View>
        <Text variant="bodyMedium" style={styles.message}>
          {item.message}
        </Text>
        <Text variant="bodySmall" style={styles.timestamp}>
          {item.timestamp.toLocaleString('pt-BR')}
        </Text>
      </Card.Content>
      {!item.read && (
        <Card.Actions>
          <Button
            mode="text"
            onPress={() => markAsRead(item.id)}
            textColor={COLORS.primary}
          >
            Marcar como lida
          </Button>
        </Card.Actions>
      )}
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.headerTitle}>
          Notificações
        </Text>
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge" style={styles.emptyText}>
            Nenhuma notificação
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            Clique no botão abaixo para enviar uma notificação de teste
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={sendTestNotification}
          loading={loading}
          disabled={loading}
          style={styles.testButton}
          buttonColor={COLORS.primary}
        >
          Enviar Notificação Teste
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  list: {
    padding: 16,
    paddingBottom: 80, // Espaço para o botão
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    backgroundColor: COLORS.white,
  },
  readCard: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  message: {
    marginTop: 8,
    color: COLORS.textLight,
  },
  timestamp: {
    marginTop: 8,
    color: COLORS.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    marginBottom: 8,
    color: COLORS.text,
  },
  emptySubtext: {
    color: COLORS.textLight,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 8,
  },
  testButton: {
    width: '100%',
  },
});

export default NotificationsScreen; 