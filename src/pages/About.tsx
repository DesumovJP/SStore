import React from 'react';
import { Layout, Typography, Card, Grid, Breadcrumb, Form, Input, Button, message, Row, Col, Upload, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './About.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const About: React.FC = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const handleSubmit = (values: any) => {
    message.success("Дякуємо за звернення! Ми зв'яжемося з вами найближчим часом.");
    form.resetFields();
  };
  return (
    <Layout style={{ background: 'var(--mocha-mousse-light1)' }} className="about-page">
      <Content style={{ padding: screens.xs ? '16px 0' : '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: screens.xs ? 0 : 500 }}>
        <div className="container" style={{ maxWidth: 1900, margin: '0 auto', padding: screens.xs ? '0 16px' : '0 24px' }}>
          {/* Breadcrumb тільки для ПК */}
          {!screens.xs && (
            <Breadcrumb style={{ marginBottom: 18, fontSize: 15, textAlign: 'left', marginLeft: 0 }}>
              <Breadcrumb.Item>Головна</Breadcrumb.Item>
              <Breadcrumb.Item>Про нас</Breadcrumb.Item>
            </Breadcrumb>
          )}
                    <Row gutter={[32, 32]} justify="center" align="stretch" style={{marginTop: screens.xs ? 0 : 24}}>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card
                style={{
                  maxWidth: 700,
                  width: '100%',
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)',
                  padding: screens.xs ? 18 : 40,
                  transition: 'box-shadow 0.3s',
                  margin: screens.xs ? '0' : '0',
                  height: 'auto',
                  minHeight: screens.xs ? 'auto' : 420,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <Title level={2} style={{ color: 'var(--mocha-mousse-main)', fontWeight: 700, marginBottom: screens.xs ? 16 : 24, textAlign: 'center', fontSize: screens.xs ? 22 : 28 }}>Про нас</Title>
                <Paragraph style={{ color: 'var(--mocha-mousse-dark4)', fontSize: screens.xs ? 15 : 18, marginBottom: screens.xs ? 10 : 16, textAlign: 'center' }}>
                  Ласкаво просимо до нашого магазину кросівок! Ми пропонуємо широкий вибір якісного взуття для будь-якого стилю та смаку. Наша команда прагне забезпечити найкращий сервіс та допомогти вам знайти ідеальну пару.
                </Paragraph>
                <Paragraph style={{ color: 'var(--mocha-mousse-dark4)', fontSize: screens.xs ? 15 : 18, textAlign: 'center' }}>
                  Дякуємо, що обираєте нас!
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card
                style={{
                  maxWidth: 700,
                  width: '100%',
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)',
                  padding: screens.xs ? 8 : 24,
                  transition: 'box-shadow 0.3s',
                  margin: screens.xs ? '0' : '0',
                  height: 'auto',
                  minHeight: screens.xs ? 'auto' : 420,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: screens.xs ? 300 : '100%', 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px 0 rgba(158,121,103,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(158,121,103,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(158,121,103,0.15)';
                }}>
                  <Image
                    src={require('../img/alexandr-choi-CRvUeE2V0TA-unsplash.jpg')}
                    alt="Кросівки"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    preview={false}
                  />
                </div>
              </Card>
            </Col>
          </Row>

          {/* Блок "Де нас знайти" під блоком "Про нас" */}
          <Row gutter={[32, 32]} justify="center" align="stretch" style={{marginTop: 40}}>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card
                style={{
                  maxWidth: 700,
                  width: '100%',
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)',
                  padding: screens.xs ? 8 : 24,
                  transition: 'box-shadow 0.3s',
                  margin: screens.xs ? '0' : '0',
                  height: 'auto',
                  minHeight: screens.xs ? 'auto' : 420,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: screens.xs ? 300 : '100%', 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px 0 rgba(158,121,103,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(158,121,103,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(158,121,103,0.15)';
                }}>
                  <Image
                    src={require('../img/aryan-r-Y_wyAQElkR4-unsplash.jpg')}
                    alt="Кросівки"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    preview={false}
                  />
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card style={{ maxWidth: 700, width: '100%', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)', background: '#fff', padding: screens.xs ? 8 : 24, height: 'auto', minHeight: screens.xs ? 'auto' : 420, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                <Title level={4} style={{ color: 'var(--mocha-mousse-main)', marginBottom: 16, fontWeight: 700, textAlign: 'center' }}>Де нас знайти</Title>
                <div style={{ width: '100%', height: 340, borderRadius: 16, overflow: 'hidden' }}>
                  <iframe
                    title="Магазин SneakerStore на карті"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.9999999999995!2d30.5234!3d50.4501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce5c7a0e6b0b%3A0x0!2z0JrQvtC80L7QvdCw0Y8g0JzQvtGB0LrQstCw0YAg0JrQvtC80L7QvdCw0Y8!5e0!3m2!1suk!2sua!4v1680000000000!5m2!1suk!2sua"
                    width="100%"
                    height="340"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Блок "Контакти магазину" з картинкою */}
          <Row gutter={[32, 32]} justify="center" align="stretch" style={{marginTop: 40}}>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card style={{ maxWidth: 700, width: '100%', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)', background: '#fff', padding: screens.xs ? 12 : 32, height: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Title level={4} style={{ color: 'var(--mocha-mousse-main)', marginBottom: 16, fontWeight: 700, textAlign: 'left' }}>Контакти магазину</Title>
                <Paragraph style={{ marginBottom: 8, color: '#555', fontSize: 16 }}>
                  <b>Instagram:</b> <a href="https://t.me/desumov" target="_blank" rel="noopener noreferrer">@desumov</a>
                </Paragraph>
                <Paragraph style={{ marginBottom: 8, color: '#555', fontSize: 16 }}>
                  <b>Телефони:</b> <br />
                  <a href="tel:+380684884810">+38 (068) 488-48-10</a><br />
                  <a href="tel:+380684884810">+38 (068) 488-48-10</a>
                </Paragraph>
                <Paragraph style={{ marginBottom: 8, color: '#555', fontSize: 16 }}>
                  <b>Email:</b> <a href="mailto:info@fakesneakerstore.com">info@fakesneakerstore.com</a>
                </Paragraph>
                <Paragraph style={{ marginBottom: 8, color: '#555', fontSize: 16 }}>
                  <b>Графік роботи:</b> <br />
                  Пн-Пт: 09:00 - 20:00<br />
                  Сб-Нд: 10:00 - 18:00
                </Paragraph>
                <Paragraph style={{ marginBottom: 0, color: '#555', fontSize: 16 }}>
                  <b>Місце реєстрації:</b> <br />
                  м. Київ, вул. Вигадана, 123
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card
                style={{
                  maxWidth: 700,
                  width: '100%',
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)',
                  padding: screens.xs ? 8 : 24,
                  transition: 'box-shadow 0.3s',
                  margin: screens.xs ? '0' : '0',
                  height: 'auto',
                  minHeight: screens.xs ? 'auto' : 420,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: screens.xs ? 300 : '100%', 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px 0 rgba(158,121,103,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(158,121,103,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(158,121,103,0.15)';
                }}>
                  <Image
                    src={require('../img/shyam-mishra-rdMzDrU7vNg-unsplash.jpg')}
                    alt="Кросівки"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    preview={false}
                  />
                </div>
              </Card>
            </Col>
          </Row>



          <Row gutter={[32, 32]} justify="center" align="stretch" style={{marginTop: 40}}>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card
                style={{
                  maxWidth: 700,
                  width: '100%',
                  background: '#fff',
                  borderRadius: 24,
                  boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)',
                  padding: screens.xs ? 8 : 24,
                  transition: 'box-shadow 0.3s',
                  margin: screens.xs ? '0' : '0',
                  height: 'auto',
                  minHeight: screens.xs ? 'auto' : 420,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: screens.xs ? 350 : '100%', 
                  borderRadius: 16, 
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px 0 rgba(158,121,103,0.15)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px 0 rgba(158,121,103,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px 0 rgba(158,121,103,0.15)';
                }}>
                  <Image
                    src={require('../img/yiquan-zhang-Nx9ghtb0IpE-unsplash.jpg')}
                    alt="Кросівки"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      objectPosition: screens.xs ? 'center 30%' : 'center center'
                    }}
                    preview={false}
                  />
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card className="contact-form-card" style={{ maxWidth: 700, width: '100%', margin: '0 auto', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)', background: '#fff', padding: screens.xs ? 12 : 32, height: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Title level={3} style={{ color: 'var(--mocha-mousse-main)', marginBottom: 16, fontWeight: 700, textAlign: 'center' }}>Зв'яжіться з нами</Title>
                <Paragraph style={{ marginBottom: 24, color: 'var(--mocha-mousse-dark4)', fontSize: screens.xs ? 15 : 18, textAlign: 'center' }}>Маєте питання? Заповніть форму, і ми відповімо найближчим часом.</Paragraph>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  style={{ marginTop: 8 }}
                >
                  <Form.Item name="fullName" label="ПІБ" rules={[{ required: true, message: 'Введіть ПІБ' }]}> <Input size={screens.xs ? 'middle' : 'large'} /> </Form.Item>
                  <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введіть телефон' }]}> <Input size={screens.xs ? 'middle' : 'large'} /> </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Некоректний email' }]}> <Input size={screens.xs ? 'middle' : 'large'} /> </Form.Item>
                  <Form.Item name="message" label="Повідомлення"> <Input.TextArea rows={3} size={screens.xs ? 'middle' : 'large'} /> </Form.Item>
                  <Form.Item name="file" label="Прикріпити файл" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList} style={{ marginBottom: 16 }}>
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    >
                      <Button
                        icon={<UploadOutlined />}
                        style={{
                          background: 'var(--mocha-mousse-main)',
                          borderColor: 'var(--mocha-mousse-main)',
                          borderRadius: 12,
                          fontWeight: 600,
                          fontSize: screens.xs ? 16 : 18,
                          boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)',
                          transition: 'background 0.2s ease',
                          color: '#fff',
                          height: screens.xs ? 40 : 48,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#8B7355';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--mocha-mousse-main)';
                        }}
                      >
                        Виберіть файл
                      </Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      size={screens.xs ? 'middle' : 'large'} 
                      style={{ 
                        background: 'var(--mocha-mousse-main)', 
                        borderColor: 'var(--mocha-mousse-main)', 
                        borderRadius: 12, 
                        fontWeight: 600, 
                        fontSize: screens.xs ? 16 : 18, 
                        boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)', 
                        transition: 'background 0.2s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#8B7355';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'var(--mocha-mousse-main)';
                      }}
                    >
                      Відправити
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default About; 