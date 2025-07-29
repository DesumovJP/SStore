# 🚀 Швидкий старт з Firebase

## Що було зроблено

✅ Встановлено Firebase  
✅ Створено конфігурацію Firebase  
✅ Налаштовано сервіси для роботи з продуктами  
✅ Оновлено компонент Catalog для завантаження з Firebase  
✅ Створено адмін панель для управління продуктами  
✅ Оновлено CartContext для роботи з string ID  

## Наступні кроки

### 1. Налаштування Firebase
1. Перейдіть на [Firebase Console](https://console.firebase.google.com/)
2. Створіть новий проект
3. Увімкніть Firestore Database
4. Скопіюйте конфігурацію з налаштувань проекту

### 2. Оновлення конфігурації
Відкрийте `src/firebase/config.ts` та замініть `firebaseConfig` на ваші дані:

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

### 3. Налаштування правил Firestore
У Firebase Console → Firestore Database → Правила встановіть:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4. Запуск додатку
```bash
npm start
```

### 5. Заповнення бази даних
Варіант 1: Через адмін панель
- Перейдіть на `http://localhost:3000/admin`
- Використовуйте форму для додавання продуктів

Варіант 2: Програмне заповнення
- Відкрийте консоль браузера на `http://localhost:3000`
- Виконайте: `import('./seedDatabase.ts')`

### 6. Перевірка роботи
- Перейдіть на `http://localhost:3000/catalog`
- Продукти повинні завантажуватися з Firebase

## Структура файлів

```
src/firebase/
├── config.ts          # Конфігурація Firebase
├── productsService.ts # Сервіси для роботи з продуктами
└── seedData.ts        # Початкові дані

src/pages/
├── Admin.tsx          # Адмін панель
└── Admin.css          # Стилі адмін панелі

FIREBASE_SETUP.md      # Детальна інструкція
```

## Можливості

- ✅ Завантаження продуктів з Firebase
- ✅ Додавання нових продуктів через адмін панель
- ✅ Редагування існуючих продуктів
- ✅ Видалення продуктів
- ✅ Фільтрація та сортування
- ✅ Пошук по назві
- ✅ Додавання в кошик

## Підтримувані поля продукту

- `name` - назва продукту
- `price` - ціна в гривнях
- `image` - URL зображення
- `description` - опис
- `availableSizes` - доступні розміри
- `category` - категорія
- `brand` - бренд
- `inStock` - чи в наявності

## Вирішення проблем

**Помилка "Firebase App named '[DEFAULT]' already exists"**
- Перевірте, чи немає дублікатів імпортів Firebase

**Продукти не завантажуються**
- Перевірте конфігурацію Firebase
- Переконайтеся, що база даних не порожня
- Перевірте правила безпеки Firestore

**Помилка "Missing or insufficient permissions"**
- Встановіть правила Firestore на `allow read, write: if true;`

## Корисні посилання

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Детальна інструкція](FIREBASE_SETUP.md) 