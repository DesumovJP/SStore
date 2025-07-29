// Скрипт для заповнення бази даних початковими даними
// Запустіть цей файл один раз після налаштування Firebase

import { seedProducts } from './firebase/seedData';

console.log('Початок заповнення бази даних...');

seedProducts()
  .then(() => {
    console.log('✅ База даних успішно заповнена!');
    console.log('Тепер можете перейти до каталогу та побачити продукти.');
  })
  .catch((error) => {
    console.error('❌ Помилка при заповненні бази даних:', error);
    console.log('Перевірте:');
    console.log('1. Чи правильно налаштована конфігурація Firebase');
    console.log('2. Чи створена база даних Firestore');
    console.log('3. Чи налаштовані правила безпеки');
  }); 