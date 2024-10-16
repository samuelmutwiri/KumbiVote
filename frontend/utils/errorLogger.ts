import axios from 'axios';

const ERROR_LOGGING_URL = `${process.env.NEXT_PUBLIC_API_URL}/log-error`;

export const logError = async (error: any) => {
  try {
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    await axios.post(ERROR_LOGGING_URL, errorData);
  } catch (loggingError) {
    console.error('Failed to log error:', loggingError);
  }
};
