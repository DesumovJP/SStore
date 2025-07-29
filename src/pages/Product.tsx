import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Layout, Typography, Button, Row, Col, Select, InputNumber, message, Divider, Breadcrumb, Grid } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getProductById } from '../firebase/productsService';
import type { Product } from '../firebase/productsService';

const { useBreakpoint } = Grid;
const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const ProductPage: React.FC = () => {
  const { addItemWithQuantity, toggleCart, state } = useCart();
  const screens = useBreakpoint();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Завантаження продукту з Firebase
  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Помилка завантаження продукту:', error);
        message.error('Помилка завантаження продукту');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Перевіряємо, чи є товар з вибраним розміром в кошику
  const isSizeInCart = (size: number) => {
    return state.items.some(item => item.id === id && item.size === size);
  };

  // Отримуємо кількість товару в кошику для конкретного розміру
  const getQuantityInCart = (size: number) => {
    const item = state.items.find(item => item.id === id && item.size === size);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <Layout style={{ background: '#fff' }}>
        <Content style={{ maxWidth: 1300, margin: '0 auto', padding: screens.xs ? '16px 16px' : '32px 0' }}>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: 18, color: 'var(--mocha-mousse-dark4)' }}>Завантаження продукту...</div>
          </div>
        </Content>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout style={{ background: '#fff' }}>
        <Content style={{ maxWidth: 1300, margin: '0 auto', padding: screens.xs ? '16px 16px' : '32px 0' }}>
          <Breadcrumb style={{ marginBottom: screens.xs ? 16 : 24, fontSize: screens.xs ? 13 : 14 }}>
            <Breadcrumb.Item><Link to="/">Головна</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/catalog">Каталог</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Товар не знайдено</Breadcrumb.Item>
          </Breadcrumb>
          <Title level={screens.xs ? 3 : 2} style={{ fontSize: screens.xs ? 20 : 24 }}>Товар не знайдено</Title>
          <Button onClick={() => navigate(-1)} style={{ fontSize: screens.xs ? 14 : 16 }}>Назад</Button>
        </Content>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      message.warning('Оберіть розмір!');
      return;
    }
    addItemWithQuantity({
      id: product.id!,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    }, quantity);
    message.success('Товар додано у кошик!');
    toggleCart();
  };

  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{ maxWidth: 1300, margin: '0 auto', padding: screens.xs ? '16px 16px' : '32px 0' }}>
        <Breadcrumb style={{ marginBottom: screens.xs ? 16 : 24, fontSize: screens.xs ? 13 : 14 }}>
          <Breadcrumb.Item><Link to="/">Головна</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/catalog">Каталог</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[screens.xs ? 16 : 32, screens.xs ? 16 : 32]}>
          <Col xs={24} md={10}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: screens.xs ? 280 : 400, objectFit: 'cover', borderRadius: 16, background: '#fafafa', boxShadow: '0 2px 16px 0 rgba(158,121,103,0.10)' }} />
          </Col>
          <Col xs={24} md={14}>
            <Title level={screens.xs ? 3 : 2} style={{ fontWeight: 800, marginBottom: screens.xs ? 6 : 8, fontSize: screens.xs ? 20 : 24 }}>{product.name}</Title>
            <Text style={{ fontSize: screens.xs ? 20 : 24, fontWeight: 700, color: 'var(--mocha-mousse-main)' }}>{product.price} грн</Text>
            <div style={{ margin: screens.xs ? '16px 0 12px 0' : '24px 0 16px 0', display: 'flex', flexDirection: screens.xs ? 'column' : 'row', gap: screens.xs ? 8 : 16, alignItems: screens.xs ? 'flex-start' : 'center' }}>
              <span style={{ fontWeight: 600, fontSize: screens.xs ? 14 : 16 }}>Оберіть розмір:</span>
              <Select
                placeholder="Розмір"
                style={{ width: screens.xs ? '100%' : 120, marginLeft: screens.xs ? 0 : 16 }}
                value={selectedSize}
                onChange={setSelectedSize}
              >
                {product.availableSizes.map((size: number) => {
                  const quantityInCart = getQuantityInCart(size);
                  return (
                    <Select.Option 
                      key={size} 
                      value={size}
                      style={{ 
                        backgroundColor: isSizeInCart(size) ? '#000' : 'transparent',
                        color: isSizeInCart(size) ? '#fff' : 'inherit'
                      }}
                    >
                      {size}{quantityInCart > 0 && ` (${quantityInCart})`}
                    </Select.Option>
                  );
                })}
              </Select>
            </div>
            <div style={{ marginBottom: screens.xs ? 16 : 24, display: 'flex', flexDirection: screens.xs ? 'column' : 'row', alignItems: screens.xs ? 'flex-start' : 'center', gap: screens.xs ? 8 : 16 }}>
              <span style={{ fontWeight: 600, fontSize: screens.xs ? 14 : 16 }}>Кількість:</span>
              <InputNumber min={1} max={10} value={quantity} onChange={val => setQuantity(Number(val))} style={{ width: screens.xs ? '100%' : 'auto' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: screens.xs ? 'column' : 'row', gap: screens.xs ? 12 : 16, marginBottom: screens.xs ? 20 : 0 }}>
              <Button
                type="primary"
                size="large"
                style={{ 
                  background: 'var(--mocha-mousse-main)', 
                  borderRadius: 8, 
                  fontWeight: 700, 
                  fontSize: screens.xs ? 16 : 18, 
                  height: screens.xs ? 44 : 48, 
                  minWidth: screens.xs ? '100%' : 220,
                  marginLeft: screens.xs ? 0 : 0
                }}
                onClick={handleAddToCart}
              >
                {selectedSize && isSizeInCart(selectedSize) ? 'Додати ще' : 'Додати у кошик'}
              </Button>
              <Button
                type="default"
                size="large"
                style={{ 
                  borderRadius: 8, 
                  fontWeight: 700, 
                  fontSize: screens.xs ? 16 : 18, 
                  height: screens.xs ? 44 : 48, 
                  minWidth: screens.xs ? '100%' : 120 
                }}
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>
            </div>
            <Divider style={{ margin: screens.xs ? '20px 0' : '32px 0' }} />
            <Title level={screens.xs ? 5 : 4} style={{ marginBottom: screens.xs ? 8 : 12, fontSize: screens.xs ? 16 : 18 }}>Опис</Title>
            <Paragraph style={{ fontSize: screens.xs ? 14 : 16, color: 'var(--mocha-mousse-dark4)', whiteSpace: 'pre-line' }}>{product.description}</Paragraph>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductPage; 