const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={successStyle}>
      {message}
    </div>
  );
};

const successStyle = {
  color: 'green',
  background: '#dfd',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
};

export default SuccessMessage;

