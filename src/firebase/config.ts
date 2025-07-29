import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmkgvmWtC6vyqLdbUuH-3msicYRt885dU",
  authDomain: "test-task-project-ec1d3.firebaseapp.com",
  projectId: "test-task-project-ec1d3",
  storageBucket: "test-task-project-ec1d3.firebasestorage.app",
  messagingSenderId: "645851997520",
  appId: "1:645851997520:web:f0f5c0fb7ccde2d5023855",
  measurementId: "G-LEW3D0F4JP"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Отримання екземпляру Firestore
export const db = getFirestore(app);

export default app; 