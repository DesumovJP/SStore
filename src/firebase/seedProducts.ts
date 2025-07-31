import { addMultipleProducts, Product } from './productsService';

// Дані 30 кросівок для додавання в Firebase
export const sneakerProducts: Omit<Product, 'id'>[] = [
  {
    name: "Nike Air Max 270",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Класичні кросівки з повітряною подушкою для максимального комфорту та стилю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Nike",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Nike Air Jordan 1",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Легендарні кросівки з баскетбольною історією та унікальним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Nike",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Nike Air Force 1",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Культові кросівки з міцною підошвою та класичним силуетом",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Nike",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Nike Zoom Fly",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Бігові кросівки з технологією Zoom для швидкості та комфорту",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Nike",
    category: "Бігові",
    inStock: true
  },
  {
    name: "Nike React Vision",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Сучасні кросівки з React піною для повсякденного використання",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Nike",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Adidas Ultraboost 22",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Бігові кросівки з технологією Boost для відмінної амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    brand: "Adidas",
    category: "Бігові",
    inStock: true
  },
  {
    name: "Adidas Stan Smith",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Класичні тенісні кросівки з зеленим хвостиком та білим верхом",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Adidas",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Adidas Gazelle",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Ретро кросівки з шкіряним верхом та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Adidas",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Adidas Superstar",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Легендарні кросівки з характерною ракушкою на носі",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Adidas",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Adidas NMD R1",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Сучасні кросівки з технологією Boost та унікальним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Adidas",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Puma RS-X",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Ретро-стильні кросівки з яскравим дизайном та комфортною підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Puma",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Puma Suede Classic",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Класичні кросівки з замшевим верхом та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Puma",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Puma Future Rider",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Ретро кросівки з сучасним дизайном та комфортною підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Puma",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Puma Cali Sport",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Тенісні кросівки з класичним дизайном та м'якою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Puma",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Puma Smash",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Культові тенісні кросівки з простим та елегантним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Puma",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Reebok Classic",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Класичні кросівки з м'якою підошвою та стильним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Reebok",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Reebok Club C",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Тенісні кросівки з білим шкіряним верхом та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Reebok",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Reebok Workout Plus",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Класичні кросівки для тренувань з міцною конструкцією",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Reebok",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Reebok Instapump Fury",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Унікальні кросівки з технологією Instapump та яскравим дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Reebok",
    category: "Спортивні",
    inStock: true
  },
  {
    name: "Reebok Zig Kinetica",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Бігові кросівки з унікальною підошвою Zig для амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Reebok",
    category: "Бігові",
    inStock: true
  },
  {
    name: "Converse Chuck Taylor",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Легендарні кросівки, які залишаються популярними десятиліттями",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Converse",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Converse One Star",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Класичні кросівки з зіркою на бічній частині та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Converse",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Converse Jack Purcell",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Елегантні кросівки з характерною усмішкою на носі",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Converse",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "Vans Old Skool",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Скейтерські кросівки з характерною бічною смугою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Vans",
    category: "Скейтерські",
    inStock: true
  },
  {
    name: "Vans Authentic",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Класичні скейтерські кросівки з простим та міцним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Vans",
    category: "Скейтерські",
    inStock: true
  },
  {
    name: "Vans Sk8-Hi",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Високі скейтерські кросівки з додатковою підтримкою щиколотки",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    brand: "Vans",
    category: "Скейтерські",
    inStock: true
  },
  {
    name: "ASICS Gel-Kayano",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Професійні бігові кросівки з технологією Gel для амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    brand: "ASICS",
    category: "Бігові",
    inStock: true
  },
  {
    name: "ASICS Gel-Nimbus",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Бігові кросівки з максимальною амортизацією для довгих дистанцій",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    brand: "ASICS",
    category: "Бігові",
    inStock: true
  },
  {
    name: "New Balance 574",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Культові кросівки з класичним дизайном та високою якістю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    brand: "New Balance",
    category: "Повсякденні",
    inStock: true
  },
  {
    name: "New Balance 990",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Преміум кросівки з технологією ENCAP та Made in USA якістю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    brand: "New Balance",
    category: "Повсякденні",
    inStock: true
  }
];

// Функція для додавання всіх продуктів в Firebase
export const seedProductsToFirebase = async (): Promise<void> => {
  try {
    console.log('Починаємо додавання продуктів в Firebase...');
    const ids = await addMultipleProducts(sneakerProducts);
    console.log(`Успішно додано ${ids.length} продуктів в Firebase!`);
    console.log('ID доданих продуктів:', ids);
  } catch (error) {
    console.error('Помилка при додаванні продуктів в Firebase:', error);
    throw error;
  }
}; 