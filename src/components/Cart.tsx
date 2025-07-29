import React from 'react';
import { Drawer, List, Button, Typography, Empty, Grid } from 'antd';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Cart: React.FC = () => {
  const { state, toggleCart, removeItem, clearCart, getTotalPrice } = useCart();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ShoppingCartOutlined style={{ fontSize: screens.xs ? 22 : 28, color: 'var(--mocha-mousse-main)' }} />
          <Title level={4} style={{ margin: 0, color: 'var(--mocha-mousse-main)', fontWeight: 700, fontSize: screens.xs ? 18 : 22 }}>Корзина</Title>
        </div>
      }
      placement="right"
      onClose={toggleCart}
      open={state.isOpen}
      width={screens.xs ? '100vw' : '35vw'}
      bodyStyle={{ background: '#fff', padding: 0 }}
      style={{
        borderRadius: screens.xs ? 0 : '24px 0 0 24px',
        overflow: 'hidden',
      }}
      footer={
        <div style={{ 
          display: 'flex', 
          flexDirection: screens.xs ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: screens.xs ? 'stretch' : 'center', 
          padding: screens.xs ? 14 : 24, 
          background: 'var(--mocha-mousse-light1)', 
          borderTop: '1px solid #eee', 
          borderRadius: screens.xs ? 0 : '0 0 0 24px',
          gap: screens.xs ? 12 : 0
        }}>
          <Text strong style={{ 
            fontSize: screens.xs ? 16 : 20, 
            color: 'var(--mocha-mousse-main)',
            textAlign: screens.xs ? 'center' : 'left'
          }}>
            Сума: {Math.round(getTotalPrice())} грн
          </Text>
          <div style={{ display: 'flex', gap: 12, justifyContent: screens.xs ? 'center' : 'flex-end' }}>
            <Button 
              type="primary" 
              onClick={() => { toggleCart(); navigate('/checkout'); }} 
              disabled={state.items.length === 0} 
              size={screens.xs ? 'middle' : 'large'} 
              style={{ 
                borderRadius: 10, 
                fontWeight: 600,
                background: '#000',
                borderColor: '#000',
                color: '#fff',
                transition: 'background 0.2s, border-color 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#333';
                e.currentTarget.style.borderColor = '#333';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#000';
                e.currentTarget.style.borderColor = '#000';
              }}
            >
              Оформити замовлення
            </Button>
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={clearCart} 
              disabled={state.items.length === 0} 
              size={screens.xs ? 'middle' : 'large'} 
              style={{ 
                borderRadius: 10, 
                fontWeight: 600,
                background: '#ff4757',
                borderColor: '#ff4757',
                color: '#fff',
                transition: 'background 0.2s, border-color 0.2s',
                minWidth: screens.xs ? 40 : 'auto',
                padding: screens.xs ? '0 12px' : undefined
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#e63946';
                e.currentTarget.style.borderColor = '#e63946';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#ff4757';
                e.currentTarget.style.borderColor = '#ff4757';
              }}
            >
              {screens.xs ? '' : 'Очистити'}
            </Button>
          </div>
        </div>
      }
    >
      <div style={{ 
        padding: screens.xs ? 10 : 24, 
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: state.items.length === 0 ? 'center' : 'flex-start',
        height: '100%'
      }}>
        {state.items.length === 0 ? (
          <Empty description="Корзина порожня" image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: screens.xs ? '24px 0' : '48px 0' }} />
        ) : (
          <List
            dataSource={state.items}
            renderItem={item => (
              <List.Item
                style={{
                  padding: screens.xs ? '10px 0' : '18px 0',
                  borderBottom: '1px solid #f0f0f0',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
                actions={[
                  <Button type="link" danger icon={<DeleteOutlined />} onClick={() => removeItem(item.id, item.size)} style={{ fontWeight: 600, fontSize: screens.xs ? 14 : 16 }}>
                    Видалити
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<img src={item.image} alt={item.name} style={{ width: screens.xs ? 38 : 56, height: screens.xs ? 38 : 56, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)' }} />}
                  title={<Text style={{ fontWeight: 600, color: 'var(--mocha-mousse-main)', fontSize: screens.xs ? 15 : 18 }}>{item.name} <span style={{ color: 'var(--mocha-mousse-dark4)', fontWeight: 400 }}>(розмір {item.size})</span></Text>}
                  description={<Text style={{ color: 'var(--mocha-mousse-dark5)', fontWeight: 500, fontSize: screens.xs ? 14 : 16 }}>{item.price} грн × {item.quantity}</Text>}
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </Drawer>
  );
};

export default Cart; 