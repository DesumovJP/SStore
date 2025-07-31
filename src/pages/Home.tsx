import React from 'react';
import { Carousel, Layout, Typography, Form, Input, Button, Row, Col, message, Card, Grid } from 'antd';
import { sliderData } from '../data/products';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const categories = [
  {
    title: 'Чоловіче взуття',
    img: require('../img/Category/Man.jpg'),
    link: '/catalog?category=men',
  },
  {
    title: 'Жіноче взуття',
    img: require('../img/Category/Woman.avif'),
    link: '/catalog?category=women',
  },
  {
    title: 'Дитяче взуття',
    img: require('../img/Category/kids.jpg'),
    link: '/catalog?category=kids',
  },
  {
    title: 'Акції',
    img: require('../img/Category/discount.webp'),
    link: '/catalog?category=sale',
  },
];

const brands = [
  { name: 'Nike', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'New Balance', img: 'https://upload.wikimedia.org/wikipedia/commons/2/29/New_Balance_logo.svg' },
  { name: 'Adidas', img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'Puma', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg' },
  { name: 'Reebok', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Reebok_2019_logo.svg' },
];

const Home: React.FC = () => {
  const [form] = Form.useForm();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    message.success("Дякуємо за звернення! Ми зв'яжемося з вами найближчим часом.");
    form.resetFields();
  };

  const handleBrandClick = (brandName: string) => {
    navigate(`/catalog?brand=${brandName}`);
  };

  return (
    <Layout style={{ background: 'var(--mocha-mousse-light1)' }}>
      <Content style={{ padding: screens.xs ? '0' : '0 0 48px 0' }}>
        <div style={{ padding: screens.xs ? '0 12px' : 0, background: '#fff' }}>
          {/* Галерея категорій */}
          <div style={{ maxWidth: 1900, margin: '0 auto', padding: screens.xs ? 0 : '0 24px', background: '#fff', marginBottom: 48, overflow: 'hidden' }}>
            <Carousel
              autoplay
              autoplaySpeed={3000}
              effect="fade"
              dots={false}
              arrows={false}
              style={{ width: '100%', height: '70vh', marginTop: 32, marginBottom: 48 }}
            >
              {sliderData.map((slide, idx) => (
                <div key={idx} style={{ width: '100%', height: '70vh', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{ width: '100%', height: '70vh', objectFit: 'cover', display: 'block' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: slide.position === 'left' ? 0 : 'unset',
                      right: slide.position === 'right' ? 0 : 'unset',
                      transform: 'translateY(-50%)',
                      width: screens.xs ? '100%' : '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: screens.xs ? 'center' : (slide.position === 'left' ? 'flex-start' : 'flex-end'),
                      justifyContent: 'center',
                      padding: screens.xs ? '0 12px' : '0 5vw',
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        position: screens.xs ? 'relative' : 'absolute',
                        top: screens.xs ? 'unset' : '50%',
                        left: screens.xs ? 'unset' : '50%',
                        transform: screens.xs ? 'none' : 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: screens.xs ? '100%' : '95vw',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        margin: screens.xs ? '0' : '0 auto',
                      }}
                    >
                      <div style={{
                        background: 'rgba(255,255,255,0.85)',
                        borderRadius: 16,
                        padding: screens.xs ? '32px 12px' : '32px 40px',
                        width: '100%',
                        maxWidth: screens.xs ? '100%' : 480,
                        boxShadow: '0 2px 16px 0 rgba(158,121,103,0.10)',
                        textAlign: 'center',
                        margin: '0 auto',
                      }}>
                        <div style={{ fontSize: screens.xs ? 22 : 40, fontWeight: 800, marginBottom: screens.xs ? 8 : 16, color: 'var(--mocha-mousse-main)', textAlign: 'center' }}>{slide.title}</div>
                        <div style={{ fontSize: screens.xs ? 15 : 22, color: 'var(--mocha-mousse-dark4)', fontWeight: 500, textAlign: 'center' }}>{slide.text}</div>
                        <a
                          href="/catalog"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: screens.xs ? 12 : 24,
                            fontWeight: 700,
                            fontSize: screens.xs ? 15 : 18,
                            color: 'var(--mocha-mousse-main)',
                            textDecoration: 'none',
                            background: 'rgba(158,121,103,0.10)',
                            padding: screens.xs ? '7px 12px' : '10px 22px',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px 0 rgba(158,121,103,0.08)',
                            transition: 'background 0.2s',
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          Подивитись!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
            <div style={{ maxWidth: 1900, margin: '0 auto', padding: screens.xs ? 0 : '0 24px' }}>
              <Row gutter={[screens.xs ? 8 : 32, 0]} justify="start" align="middle" style={{ width: '100%', marginBottom: 48 }}>
                {categories.map((cat, idx) => (
                  <Col xs={24} sm={12} md={6} lg={6} xl={6} key={cat.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: screens.xs ? 16 : 0 }}>
                    <div style={{ width: '100%', aspectRatio: '1/1', background: '#f7f7f7', borderRadius: 16, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <Button
                        type="primary"
                        size="large"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(158,121,103,0.9)',
                          fontWeight: 600,
                          fontSize: 24,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          fontStretch: 'expanded',
                          padding: '36px 32px',
                          height: 100,
                          border: 'none',
                          boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)',
                          opacity: 0.9,
                          transition: 'opacity 0.2s',
                          borderRadius: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                        }}
                        href={cat.link}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.98')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0.9')}
                      >
                        {idx === 0 && 'Чоловіче взуття'}
                        {idx === 1 && 'Жіноче взуття'}
                        {idx === 2 && 'Дитяче взуття'}
                        {idx === 3 && 'Акції та Знижки'}
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <div style={{ maxWidth: 900, margin: '0 auto 48px 0', paddingLeft: screens.xs ? 8 : 0, background: '#fff', marginBottom: 48 }}>
              <h1 style={{ fontSize: screens.xs ? 32 : 56, fontWeight: 800, margin: 0, textAlign: 'left', lineHeight: 1.1 }}>
                Відкрий для себе оригінальні бренди
              </h1>
              <p style={{ fontSize: screens.xs ? 16 : 22, margin: '32px 0 0 0', color: 'var(--mocha-mousse-dark4)', maxWidth: 700, textAlign: 'left', lineHeight: 1.6 }}>
                В нашому магазині ти знайдеш тільки справжнє взуття та одяг від світових виробників.<br/>
                Ми гарантуємо якість, стиль і комфорт кожної пари.<br/>
                Оновлюй гардероб разом з нами — обирай перевірені бренди.<br/>
                Доставка по всій Україні та зручна оплата.<br/>
                Приєднуйся до спільноти справжніх цінителів оригіналу!
              </p>
            </div>
          </div>
          {/* Оригінальні бренди */}
          <div style={{ width: '100%', background: 'var(--mocha-mousse-light1)', padding: screens.xs ? '24px 0' : '48px 0' }}>
            <div style={{ maxWidth: 1900, margin: '0 auto', padding: screens.xs ? 0 : '0 24px' }}>
              <Title level={3} style={{ margin: '0 0 24px', fontWeight: 700, textAlign: 'center' }}>Тільки оригінальні бренди</Title>
              <Carousel
                slidesToShow={screens.xs ? 2 : 5}
                dots={false}
                arrows={true}
                autoplay={true}
                autoplaySpeed={screens.xs ? 2000 : 4000}
                speed={screens.xs ? 1200 : 800}
                style={{ marginBottom: 62 }}
              >
                {brands.map(brand => (
                  <div key={brand.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <Card 
                      hoverable 
                      style={{ 
                        width: screens.xs ? 160 : 220, 
                        height: screens.xs ? 120 : 160, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: 16, 
                        boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onClick={() => handleBrandClick(brand.name)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(158,121,103,0.20)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(158,121,103,0.10)';
                      }}
                    >
                      <img
                        src={brand.img}
                        alt={brand.name}
                        style={{ maxWidth: screens.xs ? 120 : 180, maxHeight: screens.xs ? 60 : 100, objectFit: 'contain', display: 'block', margin: '0 auto', background: 'transparent' }}
                        onError={e => { e.currentTarget.style.display = 'none'; }}
                      />
                      <div style={{ marginTop: 12, fontWeight: 600, fontSize: 16, textAlign: 'center', width: '100%' }}>
                        {!(brand.name === 'Nike' || brand.name === 'Adidas') && brand.name}
                      </div>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: screens.xs ? 'column' : 'row', justifyContent: 'space-between', margin: '0 0 62px 0', gap: 32, background: 'var(--mocha-mousse-light1)', padding: screens.xs ? '24px 0' : '48px 0' }}>
            <div style={{ flex: '1 1 0', background: '#fff', padding: screens.xs ? '32px 12px' : '32px 32px', textAlign: 'left', boxShadow: '0 2px 16px 0 rgba(158,121,103,0.08)', borderRadius: 16, marginLeft: screens.xs ? 0 : 24, marginBottom: screens.xs ? 32 : 0 }}>
              <h2 style={{ fontSize: screens.xs ? 24 : 36, fontWeight: 800, margin: 0, marginBottom: 24, textAlign: 'left' }}>Відгуки клієнтів</h2>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 18, fontStyle: 'italic', margin: 0 }}>&quot;Дуже задоволена якістю! Швидка доставка і оригінальні кросівки.&quot;</p>
                <div style={{ fontWeight: 600, marginTop: 8 }}>— Олена, Київ</div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 18, fontStyle: 'italic', margin: 0 }}>&quot;Замовляю вже вдруге, все супер!&quot;</p>
                <div style={{ fontWeight: 600, marginTop: 8 }}>— Андрій, Львів</div>
              </div>
              <div>
                <p style={{ fontSize: 18, fontStyle: 'italic', margin: 0 }}>&quot;Оперативна підтримка і якісний товар. Рекомендую!&quot;</p>
                <div style={{ fontWeight: 600, marginTop: 8 }}>— Марина, Дніпро</div>
              </div>
            </div>
            <div style={{ flex: 1, maxWidth: 900, background: '#fff', padding: screens.xs ? '32px 12px' : '32px 48px', textAlign: 'right', boxShadow: '0 2px 16px 0 rgba(158,121,103,0.08)', borderRadius: 16, marginRight: screens.xs ? 0 : 24 }}>
              <h1 style={{ fontSize: screens.xs ? 32 : 56, fontWeight: 800, margin: 0, textAlign: 'right', lineHeight: 1.1 }}>
                Тільки оригінальні бренди
              </h1>
              <p style={{ fontSize: screens.xs ? 16 : 22, margin: '32px 0 0 0', color: 'var(--mocha-mousse-dark4)', maxWidth: 700, textAlign: 'right', lineHeight: 1.6, background: '#fff' }}>
                В нашому магазині ти знайдеш тільки справжнє взуття та одяг від світових виробників.<br/>
                Ми гарантуємо якість, стиль і комфорт кожної пари.<br/>
                Оновлюй гардероб разом з нами — обирай перевірені бренди.<br/>
                Доставка по всій Україні та зручна оплата.<br/>
                Приєднуйся до спільноти справжніх цінителів оригіналу!
              </p>
            </div>
          </div>
          {/* ... решта сторінки ... */}
          {/* Remove or comment out the next container/Row if not needed */}
          {/* <div className="container" style={{ maxWidth: 1700, margin: '0 auto', padding: screens.xs ? '0 8px' : '0 24px' }}>
            <Row justify="center" align="middle" gutter={[screens.xs ? 24 : 48, screens.xs ? 24 : 48]} style={{ minHeight: screens.xs ? 0 : 500 }}>
              {/* Форма видалена, залишено лише інші блоки */}
            {/* </Row>
          </div> */}
        </div>
      </Content>
    </Layout>
  );
};

export default Home; 