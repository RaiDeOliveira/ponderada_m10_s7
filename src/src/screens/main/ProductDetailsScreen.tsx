import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Card, IconButton, ActivityIndicator } from 'react-native-paper';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';

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
  stock: number;
};

type ProductDetailsScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'ProductDetails'>;
  route: RouteProp<HomeStackParamList, 'ProductDetails'>;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  React.useEffect(() => {
    // Simular carregamento do produto
    setTimeout(() => {
      setProduct({
        id: route.params?.id || faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.urlLoremFlickr({ category: 'product' }),
        category: faker.commerce.department(),
        rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        reviews: faker.number.int({ min: 10, max: 1000 }),
        stock: faker.number.int({ min: 0, max: 100 }),
      });
      setLoading(false);
    }, 1000);
  }, [route.params?.id]);

  const handleAddToCart = () => {
    // Implementar lógica de adicionar ao carrinho
    console.log('Adicionar ao carrinho:', { product, quantity });
  };

  const handleBuyNow = () => {
    // Implementar lógica de compra imediata
    console.log('Comprar agora:', { product, quantity });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.favoriteButton}
          iconColor={isFavorite ? COLORS.primary : COLORS.textLight}
        />
      </View>

      <Card style={styles.detailsCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.productName}>
            {product.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text variant="headlineMedium" style={styles.price}>
              R$ {product.price.toFixed(2)}
            </Text>
            <Text variant="bodyMedium" style={styles.stock}>
              {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text variant="bodyMedium" style={styles.rating}>
              {product.rating.toFixed(1)} ★
            </Text>
            <Text variant="bodySmall" style={styles.reviews}>
              ({product.reviews} avaliações)
            </Text>
          </View>

          <Text variant="bodyMedium" style={styles.description}>
            {product.description}
          </Text>

          <View style={styles.quantityContainer}>
            <Text variant="bodyMedium" style={styles.quantityLabel}>
              Quantidade:
            </Text>
            <View style={styles.quantityControls}>
              <IconButton
                icon="minus"
                size={20}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              />
              <Text variant="bodyLarge" style={styles.quantity}>
                {quantity}
              </Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              />
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actionsContainer}>
        <Button
          mode="outlined"
          onPress={handleAddToCart}
          style={[styles.actionButton, styles.addToCartButton]}
          textColor={COLORS.primary}
          icon="cart"
          disabled={product.stock === 0}
        >
          Adicionar ao Carrinho
        </Button>
        
        <Button
          mode="contained"
          onPress={handleBuyNow}
          style={[styles.actionButton, styles.buyNowButton]}
          buttonColor={COLORS.primary}
          icon="shopping"
          disabled={product.stock === 0}
        >
          Comprar Agora
        </Button>
      </View>
    </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: COLORS.white,
  },
  detailsCard: {
    margin: 16,
    backgroundColor: COLORS.white,
  },
  productName: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: COLORS.text,
  },
  stock: {
    color: COLORS.textLight,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    color: COLORS.text,
    marginRight: 4,
  },
  reviews: {
    color: COLORS.textLight,
  },
  description: {
    color: COLORS.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityLabel: {
    color: COLORS.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 16,
    color: COLORS.text,
  },
  actionsContainer: {
    padding: 16,
    gap: 8,
  },
  actionButton: {
    borderRadius: 8,
  },
  addToCartButton: {
    borderColor: COLORS.primary,
  },
  buyNowButton: {
    marginTop: 8,
  },
});

export default ProductDetailsScreen; 