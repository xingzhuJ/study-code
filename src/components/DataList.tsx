import React, { useEffect, useState } from 'react';
import { DataItem, dataAPI } from '../services/api';
import { Table, Button, message, Modal, Form, Input } from 'antd';

const { TextArea } = Input;

const DataList: React.FC = () => {
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [form] = Form.useForm();

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await dataAPI.getAll();
      setDataItems(data);
    } catch (error) {
      message.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditItem = (item: DataItem) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setModalVisible(true);
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await dataAPI.delete(id);
      message.success('Item deleted successfully');
      fetchData();
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingItem) {
        await dataAPI.update(editingItem.id, values);
        message.success('Item updated successfully');
      } else {
        await dataAPI.create(values);
        message.success('Item created successfully');
      }
      
      setModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('Form validation failed');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string) => text ? new Date(text).toLocaleString() : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: DataItem) => (
        <>
          <Button type="link" onClick={() => handleEditItem(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteItem(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>
      
      <Table
        loading={loading}
        dataSource={dataItems}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title={editingItem ? 'Edit Item' : 'Add Item'}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter content' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataList;
