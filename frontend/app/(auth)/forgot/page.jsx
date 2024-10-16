//import MainLayout from '../components/Layout/MainLayout';
//import { LoginForm } from '../components/Auth/LoginForm';
import { message } from 'antd';
import { useRouter } from 'next/router';
import authService from '../services/authService';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (values) => {
    try {
      await authService.login(values.username, values.password);
      message.success('Login successful');
      router.push('/dashboard');
    } catch (error) {
      message.error('Login failed');
    }
  };

  return (
    <MainLayout>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} />
    </MainLayout>
  );
}

// pages/register.js
import MainLayout from '../components/Layout/MainLayout';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { message } from 'antd';
import { useRouter } from 'next/router';
import authService from '../services/authService';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (values) => {
    try {
      await authService.register(values);
      message.success('Registration successful');
      router.push('/login');
    } catch (error) {
      message.error('Registration failed');
    }
  };

  return (
    <MainLayout>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleRegister} />
    </MainLayout>
  );
}

// pages/forgot-password.js
import MainLayout from '../components/Layout/MainLayout';
import { ForgotPasswordForm } from '../components/Auth/ForgotPasswordForm';
import { message } from 'antd';
import authService from '../services/authService';

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (values) => {
    try {
      await authService.forgotPassword(values.email);
      message.success('Password reset email sent');
    } catch (error) {
      message.error('Failed to send password reset email');
    }
  };

  return (
    <MainLayout>
      <h1>Forgot Password</h1>
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </MainLayout>
  );
}

// pages/profile.js
import MainLayout from '../components/Layout/MainLayout';
import { UserProfile } from '../components/User/UserProfile';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import authService from '../services/authService';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        message.error('Failed to fetch user data');
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (values) => {    try {
      await authService.updateProfile(values);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  return (
    <MainLayout>
      <h1>User Profile</h1>
      {user && <UserProfile user={user} onUpdate={handleUpdateProfile} />}
    </MainLayout>
  );
}
