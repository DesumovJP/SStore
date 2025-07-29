import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navigation from './components/Navigation';
import Cart from './components/Cart';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import Product from './pages/Product';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </main>
          <Cart />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
