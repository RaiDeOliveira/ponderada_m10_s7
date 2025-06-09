import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Card, Button, Searchbar, ActivityIndicator } from 'react-native-paper';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
};

type RootStackParamList = {
  Home: undefined;
  ProductDetails: { productId: string };
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const generateProducts = useCallback(() => {
    return Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.urlLoremFlickr({ category: 'product' }),
      category: faker.commerce.department(),
      rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      reviews: faker.number.int({ min: 10, max: 1000 }),
    }));
  }, []);

  const loadProducts = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(generateProducts());
      setLoading(false);
    }, 1000);
  }, [generateProducts]);

  React.useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProducts();
    setRefreshing(false);
  }, [loadProducts]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text variant="titleLarge" style={styles.price}>
            R$ {item.price.toFixed(2)}
          </Text>
          <Text variant="bodySmall" style={styles.rating}>
            {item.rating.toFixed(1)} ★ ({item.reviews})
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
          style={styles.button}
          buttonColor={COLORS.primary}
        >
          Ver Detalhes
        </Button>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar produtos..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        iconColor={COLORS.primary}
        inputStyle={{ color: COLORS.text }}
      />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  searchBar: {
    margin: 16,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  productName: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    color: COLORS.textLight,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  rating: {
    color: COLORS.textLight,
  },
  button: {
    borderRadius: 8,
  },
});

export default HomeScreen; 