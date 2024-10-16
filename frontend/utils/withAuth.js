import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/signin/');
      }
    }, [loading, user, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
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
