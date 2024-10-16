import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

export function ForgotPasswordForm({ onSubmit }) {
  return (
    <Form name="forgot_password" onFinish={onSubmit}>
      <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid Email!' }]}>
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Reset Password</Button>
      </Form.Item>
    </Form>
  );
}
