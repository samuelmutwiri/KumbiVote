import { Form, Input, Button, Avatar } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';

export function UserProfile({ user, onUpdate }) {
  return (
    <Form name="user_profile" initialValues={user} onFinish={onUpdate}>
      <Avatar size={64} icon={<UserOutlined />} />
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid Email!' }]}>
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      {/* Add more fields as needed */}
      <Form.Item>
        <Button type="primary" htmlType="submit">Update Profile</Button>
      </Form.Item>
    </Form>
  );
}

