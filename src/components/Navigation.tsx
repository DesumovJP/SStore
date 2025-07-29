import React from 'react';
import { Menu, Layout, Badge, Button, Grid, Drawer } from 'antd';
import { ShoppingCartOutlined, MenuOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Navigation.css';

const { Header } = Layout;
const { useBreakpoint } = Grid;

const navItems = [
  { label: <Link to="/">Головна</Link>, key: '/' },
  { label: <Link to="/catalog">Каталог</Link>, key: '/catalog' },
  { label: <Link to="/about">Про нас</Link>, key: '/about' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCart();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const menu = (
    <Menu
      theme="light"
      mode={screens.xs ? 'vertical' : 'horizontal'}
      selectedKeys={[location.pathname]}
      items={navItems}
      style={{
        background: 'transparent',
        color: 'var(--mocha-mousse-main)',
        fontWeight: 600,
        fontSize: screens.xs ? 16 : 18,
        borderBottom: 'none',
        boxShadow: 'none',
        minWidth: screens.xs ? undefined : 350,
        width: screens.xs ? '100%' : undefined,
      }}
      onClick={() => screens.xs && setDrawerOpen(false)}
    />
  );

  return (
    <Header style={{
      background: '#fff',
      boxShadow: '0 2px 12px 0 rgba(158,121,103,0.10)',
      padding: 0,
      height: screens.xs ? 56 : 72,
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 1300,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: screens.xs ? 'space-between' : 'space-between',
        height: '100%',
        padding: screens.xs ? '0 10px' : '0 32px',
        position: 'relative',
      }}>
        {screens.xs ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {/* Menu button left */}
              <Button
                type="text"
                icon={<MenuOutlined style={{ fontSize: 26, color: 'var(--mocha-mousse-main)' }} />}
                onClick={() => setDrawerOpen(true)}
                style={{ borderRadius: 8, width: 40, height: 40, padding: 0 }}
                aria-label="Меню"
              />
              {/* Logo center */}
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', margin: '0 auto', height: 40 }}>
                <span style={{
                  fontWeight: 900,
                  fontSize: 15,
                  color: 'var(--mocha-mousse-main)',
                  letterSpacing: 1,
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  textShadow: '0 2px 8px rgba(158,121,103,0.10)',
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                  lineHeight: '40px',
                  padding: 0
                }}>
                  <span style={{ color: '#fff', background: 'var(--mocha-mousse-main)', borderRadius: 8, padding: '0 6px', marginRight: 5, fontWeight: 900, fontSize: 16, height: 28, display: 'flex', alignItems: 'center', lineHeight: '28px' }}>S</span>neakerStore
                </span>
              </Link>
              {/* Cart right */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge count={getTotalItems()} size="small" offset={[-2, 2]} style={{ background: '#ff4757' }}>
                  <Button
                    type="text"
                    icon={<ShoppingCartOutlined style={{ fontSize: 22, color: '#fff' }} />}
                    onClick={toggleCart}
                    style={{
                      borderRadius: 12,
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)',
                      padding: 0,
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                      background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                      border: 'none',
                    }}
                    aria-label="Відкрити корзину"
                  />
                </Badge>
              </div>
            </div>
            <Drawer
              placement="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
              width={220}
              headerStyle={{ display: 'none' }}
            >
              <div style={{ flex: 1 }}>
                {menu}
              </div>
              
              {/* Контактна інформація внизу мобільного меню */}
              <div style={{ 
                padding: '20px 16px', 
                borderTop: '1px solid #f0f0f0',
                background: '#fafafa'
              }}>
                <div style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: '#999', 
                  marginBottom: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5
                }}>
                  Контакти
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 12 
                }}>
                  {/* Телефон */}
                  <div
                    style={{
                      borderRadius: 8,
                      padding: '8px 12px',
                      height: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--mocha-mousse-main)',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    <PhoneOutlined style={{ marginRight: 8, fontSize: 16 }} />
                    +38 (068) 488-48-10
                  </div>
                  
                  {/* Instagram */}
                  <Button
                    type="text"
                    onClick={() => {
                      window.open('https://t.me/desumov', '_blank');
                      setDrawerOpen(false);
                    }}
                    style={{
                      borderRadius: 8,
                      padding: '8px 12px',
                      height: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--mocha-mousse-main)',
                      fontWeight: 600,
                      fontSize: 14,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f0f0f0';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <InstagramOutlined style={{ marginRight: 8, fontSize: 16 }} />
                    Instagram
                  </Button>
                </div>
              </div>
            </Drawer>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: 16 }}>
                <span style={{
                  fontWeight: 900,
                  fontSize: 28,
                  color: 'var(--mocha-mousse-main)',
                  letterSpacing: 1,
                  fontFamily: 'Montserrat, Arial, sans-serif',
                  textShadow: '0 2px 8px rgba(158,121,103,0.10)'
                }}>
                  <span style={{ color: '#fff', background: 'var(--mocha-mousse-main)', borderRadius: 8, padding: '2px 10px', marginRight: 8, fontWeight: 900 }}>S</span>neakerStore
                </span>
              </Link>
              {menu}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)',
                  padding: '0 12px',
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff',
                  border: '1px solid #eee',
                  color: 'var(--mocha-mousse-main)',
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                <PhoneOutlined style={{ marginRight: 6, fontSize: 16 }} />
                +38 (068) 488-48-10
              </div>
              <Button
                type="text"
                icon={<InstagramOutlined style={{ fontSize: 24, color: 'var(--mocha-mousse-main)', lineHeight: 'normal', verticalAlign: 'middle' }} />}
                onClick={() => window.open('https://t.me/desumov', '_blank')}
                style={{
                  borderRadius: 12,
                  boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)',
                  padding: 0,
                  width: 48,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  lineHeight: 'normal',
                }}
                aria-label="Instagram"
              />
              <Badge count={getTotalItems()} size="small" offset={[-2, 2]} style={{ background: '#ff4757' }}>
                <Button
                  type="text"
                  icon={<ShoppingCartOutlined style={{ fontSize: 28, color: '#fff' }} />}
                  onClick={toggleCart}
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.15)',
                    padding: 0,
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                    border: 'none',
                  }}
                  aria-label="Відкрити корзину"
                />
              </Badge>
            </div>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navigation; 