# Налаштування Firebase для SneakersStore

## Крок 1: Створення проекту Firebase

1. Перейдіть на [Firebase Console](https://console.firebase.google.com/)
2. Натисніть "Створити проект"
3. Введіть назву проекту (наприклад, "sneakers-store")
4. Виберіть, чи потрібна Google Analytics (рекомендується)
5. Натисніть "Створити проект"

## Крок 2: Налаштування Firestore Database

1. У Firebase Console перейдіть до "Firestore Database"
2. Натисніть "Створити базу даних"
3. Виберіть "Почати в тестовому режимі" (для розробки)
4. Виберіть регіон (рекомендується: europe-west3)
5. Натисніть "Готово"

## Крок 3: Налаштування правил безпеки Firestore

У Firestore Database перейдіть до вкладки "Правила" та замініть правила на:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Дозволяємо читати всі документи
    match /{document=**} {
      allow read: if true;
    }
    
    // Дозволяємо записувати тільки авторизованим користувачам
    // Для тестування дозволяємо всім
    match /{document=**} {
      allow write: if true;
    }
  }
}
```

**Увага:** Ці правила дозволяють всім читати та записувати дані. Для продакшену потрібно налаштувати авторизацію.

## Крок 4: Отримання конфігурації Firebase

1. У Firebase Console перейдіть до "Налаштування проекту" (іконка шестерні)
2. Перейдіть до вкладки "Загальні"
3. Прокрутіть до розділу "Ваші додатки"
4. Натисніть іконку веб-додатку (</>) або "Додати додаток" → "Веб"
5. Введіть назву додатку (наприклад, "SneakersStore Web")
6. Скопіюйте конфігурацію Firebase

## Крок 5: Оновлення конфігурації в коді

Відкрийте файл `src/firebase/config.ts` та замініть `firebaseConfig` на ваші дані:

```typescript
const firebaseConfig = {
  apiKey: "ваш-api-key",
  authDomain: "ваш-project-id.firebaseapp.com",
  projectId: "ваш-project-id",
  storageBucket: "ваш-project-id.appspot.com",
  messagingSenderId: "ваш-messaging-sender-id",
  appId: "ваш-app-id"
};
```

## Крок 6: Заповнення бази даних початковими даними

1. Запустіть додаток: `npm start`
2. Перейдіть до адмін панелі: `http://localhost:3000/admin`
3. Використовуйте форму для додавання продуктів або запустіть скрипт заповнення

### Альтернативно: Програмне заповнення

Створіть тимчасовий файл `src/seedDatabase.ts`:

```typescript
import { seedProducts } from './firebase/seedData';

// Запустіть цю функцію один раз для заповнення бази даних
seedProducts().then(() => {
  console.log('База даних заповнена!');
}).catch(error => {
  console.error('Помилка:', error);
});
```

## Крок 7: Перевірка роботи

1. Перейдіть до каталогу: `http://localhost:3000/catalog`
2. Переконайтеся, що продукти завантажуються з Firebase
3. Перевірте адмін панель для управління продуктами

## Структура бази даних

### Колекція: `products`

Кожен документ містить:

```typescript
{
  id: string;              // Автоматично генерується Firebase
  name: string;            // Назва продукту
  price: number;           // Ціна в гривнях
  image: string;           // URL зображення
  description: string;     // Опис продукту
  availableSizes: number[]; // Доступні розміри
  category?: string;       // Категорія (Спортивні, Бігові, тощо)
  brand?: string;          // Бренд (Nike, Adidas, тощо)
  inStock?: boolean;       // Чи в наявності
  createdAt?: Date;        // Дата створення
  updatedAt?: Date;        // Дата оновлення
}
```

## Безпека для продакшену

Для продакшену налаштуйте правила безпеки:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Дозволяємо читати всім
    match /products/{productId} {
      allow read: if true;
      // Дозволяємо записувати тільки авторизованим адміністраторам
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Вирішення проблем

### Помилка "Firebase App named '[DEFAULT]' already exists"
- Переконайтеся, що Firebase ініціалізується тільки один раз
- Перевірте, чи немає дублікатів імпортів

### Помилка "Missing or insufficient permissions"
- Перевірте правила безпеки Firestore
- Для тестування встановіть правила на `allow read, write: if true;`

### Продукти не завантажуються
- Перевірте конфігурацію Firebase
- Переконайтеся, що база даних не порожня
- Перевірте консоль браузера на помилки

## Корисні посилання

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/get-started) 