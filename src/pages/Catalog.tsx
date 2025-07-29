import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { getAllProducts, Product } from '../firebase/productsService';
import { Layout, Typography, Card, Button, Row, Col, message, Grid, Space, Drawer, Dropdown, Menu, Breadcrumb, Checkbox, Divider, Select, Input } from 'antd';
import { FilterOutlined, DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './Catalog.css';

const { Content, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const sortOptions = [
  { key: 'price-asc', label: 'За ціною (зростання)' },
  { key: 'price-desc', label: 'За ціною (спадання)' },
];

const colorOptions = ['Чорний', 'Білий', 'Сірий', 'Синій', 'Бежевий'];
const sizeOptions = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
const genderOptions = ['Чоловіче', 'Жіноче'];
const brandOptions = ['New Balance', 'Nike', 'Adidas', 'Puma', 'Reebok', 'Converse', 'Vans', 'ASICS'];

const Catalog: React.FC = () => {
  const { addItem } = useCart();
  const screens = useBreakpoint();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortKey, setSortKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [onlySale, setOnlySale] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [addedToCart, setAddedToCart] = useState<{ [id: string]: boolean }>({});
  const [selectedSizesMap, setSelectedSizesMap] = useState<{ [productId: string]: number | null }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  // Handle URL parameters for brand filtering
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brandParam = searchParams.get('brand');
    if (brandParam && brandOptions.includes(brandParam)) {
      setSelectedBrands([brandParam]);
    }
  }, [location.search]);

  // Завантаження продуктів з Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getAllProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Помилка завантаження продуктів:', err);
        setError('Помилка завантаження продуктів');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    // Скидаємо вибраний розмір, якщо товар більше не в корзині
    Object.keys(addedToCart).forEach(id => {
      if (!addedToCart[id]) {
        setSelectedSizesMap(prev => ({ ...prev, [id]: null }));
      }
    });
  }, [addedToCart]);

  const handleSizeSelect = (productId: string, size: number) => {
    setSelectedSizesMap(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const selectedSize = selectedSizesMap[product.id!];
    if (!selectedSize) {
      message.warning('Оберіть розмір!');
      return;
    }
    addItem({
      id: product.id!,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize
    });
    setAddedToCart(prev => ({ ...prev, [product.id!]: true }));
    message.success(`${product.name} додано до кошика!`);
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [product.id!]: false })), 2000);
  };

  const handleSort = ({ key }: { key: string }) => {
    setSortKey(key);
    // Тут можна додати реальне сортування
  };

  // Сортування товарів
  let sortedProducts = [...products];
  if (sortKey === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortKey === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Фільтрація за назвою
  let filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Фільтрація за брендом
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      let brand = product.name.split(' ')[0];
      if (brand === 'New') {
        brand = product.name.split(' ').slice(0, 2).join(' ');
      } else if (brand === 'ASICS') {
        brand = 'ASICS';
      }
      return selectedBrands.includes(brand);
    });
  }

  // Фільтри (Sidebar/Drawer)
  const filterContent = (
    <div>
      <Title level={5} style={{ marginBottom: 12 }}>Бренд</Title>
      <Checkbox.Group
        options={brandOptions}
        value={selectedBrands}
        onChange={vals => setSelectedBrands(vals as string[])}
        style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}
      />
      <Divider style={{ margin: '16px 0' }} />
      <Title level={5} style={{ marginBottom: 12 }}>Колір</Title>
      <Checkbox.Group
        options={colorOptions.map(opt => ({ label: opt, value: opt, disabled: true }))}
        value={selectedColors}
        onChange={vals => setSelectedColors(vals as string[])}
        style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}
      />
      <Divider style={{ margin: '16px 0' }} />
      <Title level={5} style={{ marginBottom: 12 }}>Розмір</Title>
      <Select
        mode="multiple"
        allowClear
        placeholder="Оберіть розмір"
        value={selectedSizes}
        onChange={vals => setSelectedSizes(vals as number[])}
        style={{ width: '100%', marginBottom: 18 }}
      >
        {sizeOptions.map(size => <Select.Option key={size} value={size}>{size}</Select.Option>)}
      </Select>
      <Divider style={{ margin: '16px 0' }} />
      <Title level={5} style={{ marginBottom: 12 }}>Стать</Title>
      <Checkbox.Group
        options={genderOptions.map(opt => ({ label: opt, value: opt, disabled: true }))}
        value={selectedGender}
        onChange={vals => setSelectedGender(vals as string[])}
        style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}
      />
      <Divider style={{ margin: '16px 0' }} />
      <Checkbox checked={onlySale} onChange={e => setOnlySale(e.target.checked)} disabled>
        Тільки акції
      </Checkbox>
    </div>
  );

  return (
    <Layout style={{ background: 'var(--mocha-mousse-light1)' }}>
      <Content style={{ padding: screens.xs ? '16px 0' : '48px 0' }}>
        <div className="container" style={{ maxWidth: 1900, margin: '0 auto', padding: screens.xs ? '0 8px' : '0 24px' }}>
          {/* Breadcrumb тільки для ПК */}
          {!screens.xs && (
            <Breadcrumb style={{ marginBottom: 18, fontSize: 15 }}>
              <Breadcrumb.Item>
                <Link to="/">Головна</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/catalog">Каталог</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
          <Title level={2} style={{ color: 'var(--mocha-mousse-main)', marginBottom: screens.xs ? 16 : 24, textAlign: 'center', fontWeight: 700, letterSpacing: 1, fontSize: screens.xs ? 24 : 32 }}>Каталог кросівок</Title>
          <Paragraph style={{ textAlign: 'center', marginBottom: screens.xs ? 24 : 40, color: 'var(--mocha-mousse-dark4)', fontSize: screens.xs ? 15 : 18 }}>Знайдіть ідеальну пару для себе</Paragraph>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: screens.xs ? 16 : 32 }}>
            {screens.xs ? (
              <Button icon={<FilterOutlined />} size={screens.xs ? 'middle' : 'large'} style={{ borderRadius: 10, fontWeight: 600, marginRight: 8 }} onClick={() => setFilterOpen(true)}>
                Фільтри
              </Button>
            ) : null}
            <Input
              placeholder="Пошук за назвою"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ maxWidth: 260, marginRight: 12, borderRadius: 10 }}
              allowClear
            />
            <div style={{ flex: 1 }} />
            <Dropdown
              overlay={<Menu onClick={handleSort} items={sortOptions} />}
              trigger={['click']}
            >
              <Button size={screens.xs ? 'middle' : 'large'} style={{ borderRadius: 10, fontWeight: 600, minWidth: 120, justifyContent: 'center' }}>
                Сортувати <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <Layout style={{ background: 'transparent' }}>
            {/* Sidebar фільтр для ПК */}
            {!screens.xs && (
              <Sider width={260} style={{ background: 'transparent', paddingRight: 32, paddingTop: 0 }}>
                <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(158,121,103,0.08)', padding: 24, minHeight: 400 }}>
                  {filterContent}
                </div>
              </Sider>
            )}
            <Content>
              {/* Drawer фільтр для мобільних */}
              <Drawer
                title="Фільтри"
                placement="left"
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                width={screens.xs ? '100vw' : 320}
                bodyStyle={{ padding: 24 }}
              >
                {filterContent}
              </Drawer>
              
              {/* Індикатор завантаження */}
              {loading && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 18, color: 'var(--mocha-mousse-dark4)' }}>Завантаження продуктів...</div>
                </div>
              )}
              
              {/* Помилка */}
              {error && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 18, color: '#ff4d4f' }}>{error}</div>
                </div>
              )}
              
              {/* Продукти */}
              {!loading && !error && (
                <Row gutter={[
                  screens.xxl ? 28 : screens.xl ? 20 : screens.xs ? 6 : 16,
                  screens.xxl ? 28 : screens.xl ? 20 : screens.xs ? 10 : 16
                ]} justify="center">
                {filteredProducts.map(product => (
                  <Col
                    xs={12}
                    sm={12}
                    md={8}
                    lg={6}
                    xl={6}
                    xxl={6}
                    key={product.id}
                    style={{ display: 'flex', justifyContent: 'center', marginBottom: screens.xs ? 6 : 0, minWidth: 160, height: '100%' }}
                  >
                    <Card
                      hoverable
                      cover={<img src={product.image} alt={product.name} style={{ height: screens.xs ? 140 : 280, objectFit: 'cover', borderRadius: 16, transition: 'transform 0.3s', boxShadow: '0 4px 24px 0 rgba(158,121,103,0.10)' }} />}
                      style={{
                        borderRadius: 24,
                        background: '#fff',
                        boxShadow: '0 8px 32px 0 rgba(158,121,103,0.13)',
                        padding: 0,
                        width: '100%',
                        maxWidth: 440,
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'box-shadow 0.3s, transform 0.3s',
                      }}
                      bodyStyle={{ padding: screens.xs ? 12 : 24, display: 'flex', flexDirection: 'column' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Title level={4} style={{ color: 'var(--mocha-mousse-main)', marginBottom: 4, fontWeight: 600, fontSize: screens.xs ? 14 : 20 }}>{product.name}</Title>
                        <Paragraph className="product-description" style={{ color: 'var(--mocha-mousse-dark4)', marginBottom: 6, fontSize: screens.xs ? 11 : 14, display: '-webkit-box', WebkitLineClamp: screens.xs ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</Paragraph>
                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 18 }}>
                          <span style={{ fontSize: 12, color: '#888', marginRight: 6 }}>Розмір:</span>
                          {product.availableSizes.map(size => {
                            const selected = selectedSizesMap[product.id!] === size;
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => handleSizeSelect(product.id!, size)}
                                style={{
                                  display: 'inline-block',
                                  border: selected ? '1.5px solid #111' : '1px solid #ddd',
                                  borderRadius: 4,
                                  padding: '2px 7px',
                                  fontSize: 12,
                                  color: selected ? '#fff' : '#555',
                                  background: selected ? '#111' : '#fafafa',
                                  marginRight: 2,
                                  marginBottom: 2,
                                  cursor: 'pointer',
                                  fontWeight: 500,
                                  transition: 'background 0.2s, color 0.2s, border 0.2s',
                                }}
                                onMouseOver={e => {
                                  if (!selected) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#a97c50';
                                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                                  }
                                }}
                                onMouseOut={e => {
                                  if (!selected) {
                                    (e.currentTarget as HTMLButtonElement).style.background = '#fafafa';
                                    (e.currentTarget as HTMLButtonElement).style.color = '#555';
                                  }
                                }}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <Text strong style={{ fontSize: screens.xs ? 15 : 20, color: 'var(--mocha-mousse-dark5)', marginBottom: 8 }}>{product.price} грн</Text>
                      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
                        <button
                          onClick={() => window.location.href = `/product/${product.id}`}
                          style={{
                            flex: 3,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--mocha-mousse-main)',
                            color: '#fff',
                            borderRadius: 8,
                            fontWeight: 600,
                            fontSize: screens.xs ? 13 : 16,
                            padding: screens.xs ? '6px 0' : '10px 0',
                            textDecoration: 'none',
                            height: 36,
                            transition: 'background 0.2s',
                            boxShadow: '0 2px 8px 0 rgba(158,121,103,0.10)',
                            textAlign: 'center',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#8b6b4a';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'var(--mocha-mousse-main)';
                          }}
                          onMouseDown={e => {
                            e.currentTarget.style.background = '#6d5239';
                          }}
                          onMouseUp={e => {
                            e.currentTarget.style.background = '#8b6b4a';
                          }}
                        >
                          Дивитись
                        </button>
                        <Button
                          type="default"
                          style={{
                            flex: 1,
                            background: screens.xs ? '#fff' : '#fff',
                            border: screens.xs ? '1px solid #000' : '1px solid #000',
                            boxShadow: screens.xs ? '0 2px 8px 0 rgba(0,0,0,0.15)' : '0 2px 8px 0 rgba(158,121,103,0.10)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 36,
                            width: screens.xs ? 36 : 48,
                            minWidth: screens.xs ? 36 : 48,
                            minHeight: 36,
                            padding: 0,
                            margin: 0,
                            borderRadius: screens.xs ? '50%' : '8px',
                            cursor: addedToCart[product.id!] ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                          }}
                          onClick={() => handleAddToCart(product)}
                          disabled={!!addedToCart[product.id!]}
                          onMouseEnter={e => {
                            if (!addedToCart[product.id!]) {
                              if (screens.xs) {
                                e.currentTarget.style.background = '#f0f0f0';
                                e.currentTarget.style.borderColor = '#000';
                                e.currentTarget.style.transform = 'scale(1.05)';
                              } else {
                                e.currentTarget.style.background = '#f0f0f0';
                                e.currentTarget.style.borderColor = '#000';
                                e.currentTarget.style.transform = 'scale(1.05)';
                              }
                            }
                                                      }}
                            onMouseLeave={e => {
                              if (!addedToCart[product.id!]) {
                                if (screens.xs) {
                                  e.currentTarget.style.background = '#fff';
                                  e.currentTarget.style.borderColor = '#000';
                                  e.currentTarget.style.transform = 'scale(1)';
                                } else {
                                  e.currentTarget.style.background = '#fff';
                                  e.currentTarget.style.borderColor = '#000';
                                  e.currentTarget.style.transform = 'scale(1)';
                                }
                              }
                            }}
                            onMouseDown={e => {
                              if (!addedToCart[product.id!]) {
                                if (screens.xs) {
                                  e.currentTarget.style.background = '#e0e0e0';
                                  e.currentTarget.style.borderColor = '#000';
                                  e.currentTarget.style.transform = 'scale(0.95)';
                                } else {
                                  e.currentTarget.style.background = '#e0e0e0';
                                  e.currentTarget.style.borderColor = '#000';
                                  e.currentTarget.style.transform = 'scale(0.95)';
                                }
                              }
                            }}
                            onMouseUp={e => {
                              if (!addedToCart[product.id!]) {
                                if (screens.xs) {
                                  e.currentTarget.style.background = '#f0f0f0';
                                  e.currentTarget.style.borderColor = '#000';
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                } else {
                                  e.currentTarget.style.background = '#f0f0f0';
                                  e.currentTarget.style.borderColor = '#000';
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                }
                              }
                            }}
                        >
                          <ShoppingCartOutlined 
                            style={{ 
                              fontSize: 18, 
                              color: addedToCart[product.id!] ? '#999' : (screens.xs ? '#000' : '#111'),
                              transition: 'color 0.2s'
                            }} 
                          />
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              )}
            </Content>
          </Layout>
        </div>
      </Content>
    </Layout>
  );
};

export default Catalog; 