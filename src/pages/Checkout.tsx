import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, message, Divider, Row, Col, Image, Modal, Grid } from 'antd';
import { useNavigate } from 'react-router-dom';
import { submitOrder } from '../data/api';
import { useCart } from '../contexts/CartContext';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const postOffices = [
  { label: 'Нова Пошта', value: 'nova-poshta' },
  { label: 'Укрпошта', value: 'ukrposhta' },
  { label: 'Кур\'єрська доставка', value: 'courier' },
];

const Checkout: React.FC = () => {
  const screens = useBreakpoint();
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<string>('');
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const onFinish = async (values: any) => {
    if (state.items.length === 0) {
      message.warning('Кошик порожній!');
      return;
    }
    
    setLoading(true);
    try {
      await submitOrder({ ...values, items: state.items });
      setLoading(false);
      clearCart();
      setShowThankYouModal(true);
    } catch (error) {
      setLoading(false);
      message.error('Помилка при оформленні замовлення. Спробуйте ще раз.');
    }
  };

  const handleThankYouModalClose = () => {
    setShowThankYouModal(false);
    navigate('/');
  };

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: screens.xs ? '16px 16px' : '40px auto', 
      background: '#fff', 
      padding: screens.xs ? 16 : 40, 
      borderRadius: 16, 
      boxShadow: '0 2px 16px 0 rgba(158,121,103,0.10)' 
    }}>
      <Title level={screens.xs ? 3 : 2} style={{ 
        textAlign: 'center', 
        marginBottom: screens.xs ? 24 : 32, 
        fontWeight: 800, 
        color: 'var(--mocha-mousse-main)',
        fontSize: screens.xs ? 20 : 24
      }}>Оформлення замовлення</Title>
      
      {/* Блок з товарами */}
      <div style={{ 
        marginBottom: screens.xs ? 24 : 32, 
        padding: screens.xs ? 16 : 24, 
        background: '#fafafa', 
        borderRadius: 12, 
        border: '1px solid #e8e8e8' 
      }}>
        <Title level={screens.xs ? 5 : 4} style={{ 
          marginBottom: screens.xs ? 12 : 16, 
          fontWeight: 600,
          fontSize: screens.xs ? 16 : 18
        }}>Товари у замовленні</Title>
        {state.items.length === 0 ? (
          <Text style={{ color: '#999' }}>Кошик порожній</Text>
        ) : (
          <>
            {state.items.map((item, index) => (
              <Row key={`${item.id}-${item.size}`} gutter={screens.xs ? 8 : 16} style={{ 
                marginBottom: screens.xs ? 20 : 16, 
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <Col xs={6} sm={4}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={screens.xs ? 45 : 60}
                    height={screens.xs ? 45 : 60}
                    style={{ borderRadius: 8, objectFit: 'cover' }}
                  />
                </Col>
                <Col xs={18} sm={12}>
                  <div>
                    <Text strong style={{ 
                      fontSize: screens.xs ? 13 : 16,
                      display: 'block',
                      marginBottom: screens.xs ? 4 : 0
                    }}>{item.name}</Text>
                    <Text style={{ 
                      color: '#666',
                      fontSize: screens.xs ? 11 : 14,
                      display: 'block'
                    }}>Розмір: {item.size}</Text>
                  </div>
                </Col>
                <Col xs={6} sm={4} style={{ textAlign: screens.xs ? 'center' : 'center' }}>
                  <Text style={{ fontSize: screens.xs ? 13 : 16 }}>x{item.quantity}</Text>
                </Col>
                <Col xs={18} sm={4} style={{ textAlign: screens.xs ? 'right' : 'center' }}>
                  <Text strong style={{ 
                    fontSize: screens.xs ? 13 : 16, 
                    color: 'var(--mocha-mousse-main)' 
                  }}>
                    {item.price * item.quantity} грн
                  </Text>
                </Col>
              </Row>
            ))}
            <Divider style={{ margin: screens.xs ? '12px 0' : '16px 0' }} />
            <Row justify="space-between" style={{ 
              fontSize: screens.xs ? 16 : 18, 
              fontWeight: 700,
              flexWrap: 'wrap'
            }}>
              <Col xs={12} sm={12}>
                <Text style={{ fontSize: screens.xs ? 16 : 18 }}>Загальна сума:</Text>
              </Col>
              <Col xs={12} sm={12} style={{ textAlign: screens.xs ? 'right' : 'left' }}>
                <Text style={{ 
                  color: 'var(--mocha-mousse-main)', 
                  fontSize: screens.xs ? 18 : 20 
                }}>
                  {state.items.reduce((total, item) => total + (item.price * item.quantity), 0)} грн
                </Text>
              </Col>
            </Row>
          </>
        )}
      </div>

      <Form layout="vertical" onFinish={onFinish} style={{ fontSize: 16 }}>
        <Form.Item 
          label={<span style={{ fontWeight: 600, fontSize: 16 }}>ПІБ</span>} 
          name="name" 
          rules={[{ required: true, message: 'Вкажіть ПІБ' }]}
        > 
          <Input placeholder="Ваше ПІБ" style={{ height: 48, borderRadius: 8, fontSize: 16 }} /> 
        </Form.Item>
        <Form.Item 
          label={<span style={{ fontWeight: 600, fontSize: 16 }}>Телефон</span>} 
          name="phone" 
          rules={[{ required: true, message: 'Вкажіть номер телефону' }, { pattern: /^\+?3?8?(0\d{9})$/, message: 'Введіть коректний номер' }]}
        > 
          <Input placeholder="+380XXXXXXXXX" style={{ height: 48, borderRadius: 8, fontSize: 16 }} /> 
        </Form.Item>
        <Form.Item 
          label={<span style={{ fontWeight: 600, fontSize: 16 }}>Email</span>} 
          name="email" 
          rules={[{ required: true, message: 'Вкажіть email' }, { type: 'email', message: 'Введіть коректний email' }]}
        > 
          <Input placeholder="email@example.com" style={{ height: 48, borderRadius: 8, fontSize: 16 }} /> 
        </Form.Item>
        <Form.Item 
          label={<span style={{ fontWeight: 600, fontSize: 16 }}>Повідомлення до замовлення (необовʼязково)</span>} 
          name="message"
        > 
          <Input.TextArea 
            placeholder="Ваше повідомлення" 
            autoSize={{ minRows: 2, maxRows: 4 }} 
            style={{ borderRadius: 8, fontSize: 16 }}
          /> 
        </Form.Item>
        <Form.Item 
          label={<span style={{ fontWeight: 600, fontSize: 16 }}>Спосіб доставки</span>} 
          name="postOffice" 
          rules={[{ required: true, message: 'Оберіть спосіб доставки' }]}
        > 
          <Select 
            options={postOffices} 
            placeholder="Оберіть спосіб доставки" 
            style={{ height: 48, borderRadius: 8 }}
            onChange={(value) => setDeliveryMethod(value)}
          /> 
        </Form.Item>
        
        {deliveryMethod === 'courier' && (
          <Form.Item 
            label={<span style={{ fontWeight: 600, fontSize: 16 }}>Адреса доставки (кур'єр)</span>} 
            name="deliveryAddress" 
            rules={[
              { 
                required: deliveryMethod === 'courier', 
                message: 'Вкажіть адресу доставки' 
              }
            ]}
          > 
            <Input.TextArea 
              placeholder="Введіть повну адресу доставки (місто, вулиця, будинок, квартира)" 
              autoSize={{ minRows: 3, maxRows: 5 }} 
              style={{ borderRadius: 8, fontSize: 16 }}
            /> 
          </Form.Item>
        )}
        
        {(deliveryMethod === 'nova-poshta' || deliveryMethod === 'ukrposhta') && (
          <Form.Item 
            label={<span style={{ fontWeight: 600, fontSize: 16 }}>Номер відділення</span>} 
            name="postOfficeNumber" 
            rules={[
              { 
                required: deliveryMethod === 'nova-poshta' || deliveryMethod === 'ukrposhta', 
                message: 'Вкажіть номер відділення' 
              }
            ]}
          > 
            <Input 
              placeholder="Введіть номер відділення" 
              style={{ height: 48, borderRadius: 8, fontSize: 16 }}
            /> 
          </Form.Item>
        )}
        <Form.Item style={{ 
          display: 'flex', 
          flexDirection: screens.xs ? 'column' : 'row',
          justifyContent: 'flex-end', 
          marginBottom: 0, 
          marginTop: screens.xs ? 24 : 0,
          gap: screens.xs ? 48 : 40 
        }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            disabled={state.items.length === 0}
            style={{ 
              borderRadius: 8, 
              minWidth: screens.xs ? '100%' : 200,
              height: screens.xs ? 44 : 48,
              fontWeight: 700,
              fontSize: screens.xs ? 15 : 16,
              background: state.items.length === 0 ? '#ccc' : 'var(--mocha-mousse-main)',
              border: 'none'
            }}
          >
            Оформити замовлення
          </Button>
          <Button 
            onClick={() => navigate(-1)} 
            style={{ 
              borderRadius: 8, 
              minWidth: screens.xs ? '100%' : 140,
              height: screens.xs ? 44 : 48,
              fontWeight: 700,
              fontSize: screens.xs ? 15 : 16,
              border: '2px solid var(--mocha-mousse-main)',
              color: 'var(--mocha-mousse-main)',
              background: 'transparent'
            }}
          >
            Скасувати
          </Button>
        </Form.Item>
      </Form>
      
      {/* Модальне вікно з подякою */}
      <Modal
        title={
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: 'var(--mocha-mousse-main)' }}>
            Дякуємо за замовлення! 🎉
          </div>
        }
        open={showThankYouModal}
        onCancel={handleThankYouModalClose}
        footer={[
          <Button
            key="home"
            type="primary"
            onClick={handleThankYouModalClose}
            style={{
              background: 'var(--mocha-mousse-main)',
              border: 'none',
              borderRadius: 8,
              height: 48,
              fontSize: 16,
              fontWeight: 700,
              minWidth: 160
            }}
          >
            Повернутися на головну
          </Button>
        ]}
        centered
        width={500}
        style={{ borderRadius: 16 }}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 18, marginBottom: 16, color: '#333' }}>
            Ваше замовлення успішно оформлено!
          </div>
          <div style={{ fontSize: 16, color: '#666', marginBottom: 24 }}>
            Ми зв'яжемося з вами найближчим часом для підтвердження деталей доставки.
          </div>
          <div style={{ 
            background: '#f8f9fa', 
            padding: 16, 
            borderRadius: 8, 
            border: '1px solid #e9ecef',
            fontSize: 14,
            color: '#495057'
          }}>
            <strong>Номер замовлення:</strong> #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout; 