import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Button, Row, Col, message, Form, Input, InputNumber, Select, Switch, Space, Table, Popconfirm, Drawer } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { getAllProducts, addProduct, updateProduct, deleteProduct, Product } from '../firebase/productsService';
import './Admin.css';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Перевіряємо одразу при завантаженні
    checkMobile();
    
    // Додаємо затримку для уникнення проблем з SSR
    const timeoutId = setTimeout(checkMobile, 100);
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Завантаження продуктів
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      message.error('Помилка завантаження продуктів');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Додавання нового продукту
  const handleAdd = async (values: any) => {
    try {
      const sizes = values.availableSizes.split(',').map((size: string) => parseInt(size.trim()));
      const productData = {
        ...values,
        availableSizes: sizes,
        price: parseFloat(values.price),
        inStock: values.inStock || true
      };
      
      await addProduct(productData);
      message.success('Продукт успішно додано!');
      form.resetFields();
      loadProducts();
      if (currentIsMobile) {
        setDrawerVisible(false);
      }
    } catch (error) {
      message.error('Помилка додавання продукту');
      console.error(error);
    }
  };

  // Початок редагування
  const handleEdit = (product: Product) => {
    setEditingId(product.id!);
    form.setFieldsValue({
      ...product,
      availableSizes: product.availableSizes.join(', ')
    });
  };

  // Збереження змін
  const handleSave = async (id: string) => {
    try {
      const values = await form.validateFields();
      const sizes = values.availableSizes.split(',').map((size: string) => parseInt(size.trim()));
      const productData = {
        ...values,
        availableSizes: sizes,
        price: parseFloat(values.price)
      };
      
      await updateProduct(id, productData);
      message.success('Продукт успішно оновлено!');
      setEditingId(null);
      form.resetFields();
      loadProducts();
    } catch (error) {
      message.error('Помилка оновлення продукту');
      console.error(error);
    }
  };

  // Скасування редагування
  const handleCancel = () => {
    setEditingId(null);
    form.resetFields();
  };

  // Видалення продукту
  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('Продукт успішно видалено!');
      loadProducts();
    } catch (error) {
      message.error('Помилка видалення продукту');
      console.error(error);
    }
  };

  // Мобільні колонки таблиці
  const mobileColumns = [
    {
      title: 'Продукт',
      key: 'product',
      render: (record: Product) => (
        <div className="mobile-product-card">
          <img 
            src={record.image} 
            alt={record.name} 
            className="mobile-product-image" 
          />
          <div className="mobile-product-info">
            <div className="mobile-product-name">{record.name}</div>
            <div className="mobile-product-price">{record.price} грн</div>
            <div className="mobile-product-brand">{record.brand || '-'}</div>
            <div className="mobile-product-category">{record.category || '-'}</div>
            <div className="mobile-product-sizes">Розміри: {record.availableSizes.join(', ')}</div>
            <div className="mobile-product-stock">
              В наявності: {record.inStock ? 'Так' : 'Ні'}
            </div>
          </div>
          <div className="mobile-product-actions">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
              size="small"
              className="mobile-edit-btn"
            >
              Редагувати
            </Button>
            <Popconfirm
              title="Видалити цей продукт?"
              onConfirm={() => handleDelete(record.id!)}
              okText="Так"
              cancelText="Ні"
            >
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                size="small"
                className="mobile-delete-btn"
                style={{ minWidth: 'auto', padding: '4px 8px' }}
              />
            </Popconfirm>
          </div>
        </div>
      )
    }
  ];

  // Десктопні колонки таблиці
  const desktopColumns = [
    {
      title: 'Зображення',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (image: string) => (
        <img 
          src={image} 
          alt="Product" 
          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} 
        />
      )
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => {
        if (editingId === record.id) {
          return (
            <Form.Item name="name" rules={[{ required: true, message: 'Введіть назву!' }]}>
              <Input />
            </Form.Item>
          );
        }
        return text;
      }
    },
    {
      title: 'Ціна',
      dataIndex: 'price',
      key: 'price',
      render: (price: number, record: Product) => {
        if (editingId === record.id) {
          return (
            <Form.Item name="price" rules={[{ required: true, message: 'Введіть ціну!' }]}>
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          );
        }
        return `${price} грн`;
      }
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand: string, record: Product) => {
        if (editingId === record.id) {
          return (
            <Form.Item name="brand">
              <Input />
            </Form.Item>
          );
        }
        return brand || '-';
      }
    },
    {
      title: 'Категорія',
      dataIndex: 'category',
      key: 'category',
      render: (category: string, record: Product) => {
        if (editingId === record.id) {
          return (
            <Form.Item name="category">
              <Select placeholder="Оберіть категорію">
                <Option value="Спортивні">Спортивні</Option>
                <Option value="Бігові">Бігові</Option>
                <Option value="Повсякденні">Повсякденні</Option>
                <Option value="Скейтерські">Скейтерські</Option>
              </Select>
            </Form.Item>
          );
        }
        return category || '-';
      }
    },
    {
      title: 'Розміри',
      dataIndex: 'availableSizes',
      key: 'availableSizes',
      render: (sizes: number[], record: Product) => {
        if (editingId === record.id) {
          return (
            <Form.Item name="availableSizes" rules={[{ required: true, message: 'Введіть розміри!' }]}>
              <Input placeholder="36, 37, 38, 39, 40" />
            </Form.Item>
          );
        }
        return sizes.join(', ');
      }
    },
    {
      title: 'В наявності',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock: boolean, record: Product) => {
        if (editingId === record.id) {
          return (
            <Form.Item name="inStock" valuePropName="checked">
              <Switch />
            </Form.Item>
          );
        }
        return inStock ? 'Так' : 'Ні';
      }
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_: any, record: Product) => {
        if (editingId === record.id) {
          return (
            <Space>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={() => handleSave(record.id!)}
                size="small"
              >
                Зберегти
              </Button>
              <Button 
                icon={<CloseOutlined />} 
                onClick={handleCancel}
                size="small"
              >
                Скасувати
              </Button>
            </Space>
          );
        }
        return (
          <Space>
            <Button 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
              size="small"
            >
              Редагувати
            </Button>
            <Popconfirm
              title="Видалити цей продукт?"
              onConfirm={() => handleDelete(record.id!)}
              okText="Так"
              cancelText="Ні"
            >
              <Button 
                danger 
                icon={<DeleteOutlined />} 
                size="small"
                style={{ minWidth: 'auto', padding: '4px 8px' }}
              />
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  // Форма додавання продукту
  const AddProductForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleAdd}
      className="admin-form"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="name"
            label="Назва продукту"
            rules={[{ required: true, message: 'Введіть назву продукту!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="price"
            label="Ціна (грн)"
            rules={[{ required: true, message: 'Введіть ціну!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="brand"
            label="Бренд"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="category"
            label="Категорія"
          >
            <Select placeholder="Оберіть категорію">
              <Option value="Спортивні">Спортивні</Option>
              <Option value="Бігові">Бігові</Option>
              <Option value="Повсякденні">Повсякденні</Option>
              <Option value="Скейтерські">Скейтерські</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="image"
            label="URL зображення"
            rules={[{ required: true, message: 'Введіть URL зображення!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="availableSizes"
            label="Доступні розміри"
            rules={[{ required: true, message: 'Введіть розміри!' }]}
          >
            <Input placeholder="36, 37, 38, 39, 40" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24}>
          <Form.Item
            name="description"
            label="Опис"
            rules={[{ required: true, message: 'Введіть опис!' }]}
          >
            <TextArea rows={3} className="admin-textarea" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="inStock"
        label="В наявності"
        valuePropName="checked"
      >
        <Switch defaultChecked />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="admin-submit-btn">
          Додати продукт
        </Button>
      </Form.Item>
    </Form>
  );

  // Додаткова перевірка для уникнення проблем з початковим рендером
  const currentIsMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : isMobile;

  return (
    <Layout style={{ background: 'var(--mocha-mousse-light1)', minHeight: '100vh' }}>
      <Content style={{ padding: currentIsMobile ? '16px 0' : '48px 0' }}>
        <div className="admin-container" style={{ maxWidth: 1400, margin: '0 auto', padding: currentIsMobile ? '0 16px' : '0 24px' }}>
          <div className="admin-header">
            <Title level={2} className="admin-title">
              Панель адміністратора
            </Title>
            {currentIsMobile && (
              <Button 
                type="primary" 
                icon={<MenuOutlined />} 
                onClick={() => setDrawerVisible(true)}
                className="mobile-menu-btn"
              >
                Додати продукт
              </Button>
            )}
          </div>

          {/* Форма додавання - десктоп */}
          {!currentIsMobile && (
            <Card title="Додати новий продукт" className="admin-card">
              <AddProductForm />
            </Card>
          )}

          {/* Таблиця продуктів */}
          <Card title="Список продуктів" className="admin-card">
            <Table
              columns={currentIsMobile ? mobileColumns : desktopColumns}
              dataSource={products}
              rowKey="id"
              loading={loading}
              pagination={{ 
                pageSize: currentIsMobile ? 5 : 10,
                showSizeChanger: !currentIsMobile,
                showQuickJumper: !currentIsMobile,
                size: currentIsMobile ? 'small' : 'default'
              }}
              className="admin-table"
              scroll={currentIsMobile ? { x: 300 } : undefined}
            />
          </Card>
        </div>

        {/* Мобільний drawer для форми */}
        <Drawer
          title="Додати новий продукт"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={currentIsMobile ? '100%' : 400}
          className="mobile-drawer"
        >
          <AddProductForm />
        </Drawer>
      </Content>
    </Layout>
  );
};

export default Admin; 