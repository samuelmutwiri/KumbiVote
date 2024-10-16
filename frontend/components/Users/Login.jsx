import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export function LoginForm({ onSubmit }) {
  return (
    <Form name="login" onFinish={onSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="/forgot-password">Forgot password</a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Log in</Button>
      </Form.Item>
    </Form>
  );
}

