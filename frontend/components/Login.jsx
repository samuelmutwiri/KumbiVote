import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { login } from '../services/auth';
import axios from 'axios'; // To send log messages to the backend

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter();

  // Handle login with auth service
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setSuccessMessage('');
    setIsLoading(true);  // Show loading state

    try {
      const response = await login(username, password, rememberMe);

      // Send log event to backend
      await axios.post('/api/log', { message: `User ${username} logged in successfully.` });

      setSuccessMessage('Login successful!');
      setIsLoading(false);

      // Redirect to profile page after successful login
      setTimeout(() => router.push('/profile'), 1500);  // Delay to allow success message animation
    } catch (error) {
      setErrorMessage('Invalid credentials. Please try again.');
      setIsShaking(true); // Trigger shake animation
      setIsLoading(false);

      // Log error to backend
      await axios.post('/api/log', { message: `Login failed for user ${username}: ${error.message}` });

      setTimeout(() => setIsShaking(false), 500); // Stop shaking after 500ms
    }
  };

  return (
    <div className="login-container">
      <motion.form
        className={`login-form ${isShaking ? 'shaking' : ''}`}
        onSubmit={handleLogin}
      >
        <h2>Login</h2>

        <div className={`input-group ${errorMessage ? 'error' : ''}`}>
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={`input-group ${errorMessage ? 'error' : ''}`}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </motion.button>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="error-message"
          >
            {errorMessage}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="success-message"
          >
            {successMessage}
          </motion.div>
        )}
      </motion.form>

      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .input-group {
          margin-bottom: 15px;
        }
        .error {
          border: 2px solid red;
        }
        .error-message {
          color: red;
        }
        .success-message {
          color: green;
        }
        .shaking {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          20%, 60% {
            transform: translateX(-10px);
          }
          40%, 80% {
            transform: translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;

