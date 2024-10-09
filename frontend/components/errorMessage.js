const ErrorMessage = ({ message }) => {
  if (!message) return null; // Don't render anything if there's no message

  return (
    <div style={errorStyle}>
      {message}
    </div>
  );
};

const errorStyle = {
  color: 'red',
  background: '#fdd',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
};

export default ErrorMessage;
