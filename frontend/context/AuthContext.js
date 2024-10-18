import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('access-token');
        if (!token) {
          router.replace('/signin');
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Copy getInitialProps so it will run as well
  if (WrappedComponent.getInitialProps) {
    AuthenticatedComponent.getInitialProps = WrappedComponent.getInitialProps;
  }

  return AuthenticatedComponent;
};

export default withAuth;
