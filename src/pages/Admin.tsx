import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Button, Row, Col, message, Form, Input, InputNumber, Select, Switch, Space, Table, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { getAllProducts, addProduct, updateProduct, deleteProduct, Product } from '../firebase/productsService';
import './Admin.css';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

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

  // Колонки таблиці
  const columns = [
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
              >
                Видалити
              </Button>
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  return (
    <Layout style={{ background: 'var(--mocha-mousse-light1)', minHeight: '100vh' }}>
      <Content style={{ padding: '48px 0' }}>
        <div className="container" style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ color: 'var(--mocha-mousse-main)', marginBottom: 32, textAlign: 'center' }}>
            Панель адміністратора
          </Title>

          {/* Форма додавання */}
          <Card title="Додати новий продукт" style={{ marginBottom: 32 }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAdd}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Назва продукту"
                    rules={[{ required: true, message: 'Введіть назву продукту!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="Ціна (грн)"
                    rules={[{ required: true, message: 'Введіть ціну!' }]}
                  >
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="brand"
                    label="Бренд"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
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

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="image"
                    label="URL зображення"
                    rules={[{ required: true, message: 'Введіть URL зображення!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="availableSizes"
                    label="Доступні розміри"
                    rules={[{ required: true, message: 'Введіть розміри!' }]}
                  >
                    <Input placeholder="36, 37, 38, 39, 40" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label="Опис"
                rules={[{ required: true, message: 'Введіть опис!' }]}
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item
                name="inStock"
                label="В наявності"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                  Додати продукт
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Таблиця продуктів */}
          <Card title="Список продуктів">
            <Table
              columns={columns}
              dataSource={products}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Admin; 