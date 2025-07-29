import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from './config';

export interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  availableSizes: number[];
  category?: string;
  brand?: string;
  inStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const COLLECTION_NAME = 'products';

// Отримати всі продукти
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, COLLECTION_NAME);
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Помилка при отриманні продуктів:', error);
    throw error;
  }
};

// Отримати продукт за ID
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Product;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Помилка при отриманні продукту:', error);
    throw error;
  }
};

// Додати новий продукт
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  try {
    const productData = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
    return docRef.id;
  } catch (error) {
    console.error('Помилка при додаванні продукту:', error);
    throw error;
  }
};

// Оновити продукт
export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const updateData = {
      ...product,
      updatedAt: new Date()
    };
    
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Помилка при оновленні продукту:', error);
    throw error;
  }
};

// Видалити продукт
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Помилка при видаленні продукту:', error);
    throw error;
  }
};

// Отримати продукти за категорією
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, COLLECTION_NAME);
    const q = query(
      productsRef, 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Помилка при отриманні продуктів за категорією:', error);
    throw error;
  }
};

// Отримати продукти за брендом
export const getProductsByBrand = async (brand: string): Promise<Product[]> => {
  try {
    const productsRef = collection(db, COLLECTION_NAME);
    const q = query(
      productsRef, 
      where('brand', '==', brand),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      } as Product);
    });
    
    return products;
  } catch (error) {
    console.error('Помилка при отриманні продуктів за брендом:', error);
    throw error;
  }
}; 