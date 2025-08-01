export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  availableSizes: number[];
}

export const baseProducts: Product[] = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Класичні кросівки з повітряною подушкою для максимального комфорту та стилю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 2,
    name: "Nike Air Jordan 1",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Легендарні кросівки з баскетбольною історією та унікальним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 3,
    name: "Nike Air Force 1",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Культові кросівки з міцною підошвою та класичним силуетом",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 4,
    name: "Nike Zoom Fly",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Бігові кросівки з технологією Zoom для швидкості та комфорту",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 5,
    name: "Nike React Vision",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Сучасні кросівки з React піною для повсякденного використання",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 6,
    name: "Adidas Ultraboost 22",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Бігові кросівки з технологією Boost для відмінної амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44]
  },
  {
    id: 7,
    name: "Adidas Stan Smith",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Класичні тенісні кросівки з зеленим хвостиком та білим верхом",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 8,
    name: "Adidas Gazelle",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Ретро кросівки з шкіряним верхом та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 9,
    name: "Adidas Superstar",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Легендарні кросівки з характерною ракушкою на носі",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 10,
    name: "Adidas NMD R1",
    price: 139.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Сучасні кросівки з технологією Boost та унікальним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 11,
    name: "Puma RS-X",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Ретро-стильні кросівки з яскравим дизайном та комфортною підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 12,
    name: "Puma Suede Classic",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Класичні кросівки з замшевим верхом та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 13,
    name: "Puma Future Rider",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Ретро кросівки з сучасним дизайном та комфортною підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 14,
    name: "Puma Cali Sport",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Тенісні кросівки з класичним дизайном та м'якою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 15,
    name: "Puma Smash",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Культові тенісні кросівки з простим та елегантним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 16,
    name: "Reebok Classic",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Класичні кросівки з м'якою підошвою та стильним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 17,
    name: "Reebok Club C",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Тенісні кросівки з білим шкіряним верхом та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 18,
    name: "Reebok Workout Plus",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Класичні кросівки для тренувань з міцною конструкцією",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 19,
    name: "Reebok Instapump Fury",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Унікальні кросівки з технологією Instapump та яскравим дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 20,
    name: "Reebok Zig Kinetica",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Бігові кросівки з унікальною підошвою Zig для амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 21,
    name: "Converse Chuck Taylor",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Легендарні кросівки, які залишаються популярними десятиліттями",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 22,
    name: "Converse One Star",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Класичні кросівки з зіркою на бічній частині та гумовою підошвою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 23,
    name: "Converse Jack Purcell",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Елегантні кросівки з характерною усмішкою на носі",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 24,
    name: "Vans Old Skool",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Скейтерські кросівки з характерною бічною смугою",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 25,
    name: "Vans Authentic",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
    description: "Класичні скейтерські кросівки з простим та міцним дизайном",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 26,
    name: "Vans Sk8-Hi",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop",
    description: "Високі скейтерські кросівки з додатковою підтримкою щиколотки",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  },
  {
    id: 27,
    name: "ASICS Gel-Kayano",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
    description: "Професійні бігові кросівки з технологією Gel для амортизації",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: 28,
    name: "ASICS Gel-Nimbus",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Бігові кросівки з максимальною амортизацією для довгих дистанцій",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: 29,
    name: "New Balance 574",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop",
    description: "Культові кросівки з класичним дизайном та високою якістю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
  },
  {
    id: 30,
    name: "New Balance 990",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    description: "Преміум кросівки з технологією ENCAP та Made in USA якістю",
    availableSizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46]
  }
];

export const products: Product[] = [
  ...baseProducts,
  ...baseProducts.map((p, i) => ({ ...p, id: p.id + 100, name: p.name + ' (Limited)', price: p.price + 200 })),
  ...baseProducts.map((p, i) => ({ ...p, id: p.id + 200, name: p.name + ' (Special Edition)', price: p.price + 400 })),
];

export const sliderData = [
  {
    image: require('../img/Slider/shyam-mishra-rdMzDrU7vNg-unsplash (1).jpg'),
    title: "Нові колекції 2025",
    text: "Оригінальні кросівки для твого стилю. Встигни купити першим!",
    position: "left"
  },
  {
    image: require('../img/Slider/pexels-melvin-buezo-1253763-2529159.jpg'),
    title: "Знижки до -40%",
    text: "Акції на топові моделі лише до кінця місяця!",
    position: "right"
  },
  {
    image: require('../img/Slider/pexels-hamza01nsr-12725051.jpg'),
    title: "Доставка по всій Україні",
    text: "Швидко, зручно, надійно. Оформлюй замовлення онлайн!",
    position: "left"
  },
  {
    image: require('../img/Slider/pexels-fsoerensen-2404959.jpg'),
    title: "Тільки оригінальні бренди",
    text: "Гарантуємо якість та стиль кожної пари кросівок!",
    position: "right"
  }
];

export const storeImages = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
]; 