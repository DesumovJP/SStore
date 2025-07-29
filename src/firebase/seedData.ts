import { addProduct } from './productsService';

const initialProducts = [
  {
    name: "Nike Air Max 270",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Класичні кросівки з повітряною подушкою для максимального комфорту",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    category: "Спортивні",
    brand: "Nike",
    inStock: true
  },
  {
    name: "Adidas Ultraboost 22",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Бігові кросівки з технологією Boost для відмінної амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    category: "Бігові",
    brand: "Adidas",
    inStock: true
  },
  {
    name: "Puma RS-X",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Ретро-стильні кросівки з яскравим дизайном та комфортною підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    category: "Повсякденні",
    brand: "Puma",
    inStock: true
  },
  {
    name: "New Balance 574",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Культові кросівки з класичним дизайном та високою якістю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    category: "Повсякденні",
    brand: "New Balance",
    inStock: true
  },
  {
    name: "Converse Chuck Taylor",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Легендарні кросівки, які залишаються популярними десятиліттями",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    category: "Повсякденні",
    brand: "Converse",
    inStock: true
  },
  {
    name: "Vans Old Skool",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Скейтерські кросівки з характерною бічною смугою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    category: "Скейтерські",
    brand: "Vans",
    inStock: true
  },
  {
    name: "Reebok Classic",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Класичні кросівки з м'якою підошвою та стильним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    category: "Повсякденні",
    brand: "Reebok",
    inStock: true
  },
  {
    name: "ASICS Gel-Kayano",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Професійні бігові кросівки з технологією Gel для амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    category: "Бігові",
    brand: "ASICS",
    inStock: true
  }
];

export const seedProducts = async () => {
  try {
    console.log('Початок заповнення бази даних продуктами...');
    
    for (const product of initialProducts) {
      const productId = await addProduct(product);
      console.log(`Додано продукт: ${product.name} з ID: ${productId}`);
    }
    
    console.log('База даних успішно заповнена!');
  } catch (error) {
    console.error('Помилка при заповненні бази даних:', error);
    throw error;
  }
}; 