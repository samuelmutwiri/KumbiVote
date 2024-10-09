import { generateKeyPair, exportPKCS8, exportSPKI, sign } from 'crypto-browserify';

class SecureWebSocket {
  constructor(url="wss://localhost:5000") {
    this.url = url;
    this.socket = null;
    this.keyPair = null;
  }

  async connect() {
    // Generate a key pair
    this.keyPair = await generateKeyPair('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    // Connect to the WebSocket
    this.socket = new WebSocket(`wss://${this.url}`);

    this.socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'authentication_challenge') {
        // Sign the challenge
        const signature = await sign(
          'sha256',
          Buffer.from(data.challenge),
          {
            key: this.keyPair.privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          }
        );

        // Send the response
        this.socket.send(JSON.stringify({
          type: 'authentication_response',
          public_key: await exportSPKI(this.keyPair.publicKey),
          signature: signature.toString('hex')
        }));
      } else if (data.type === 'authentication_result') {
        if (data.result === 'success') {
          console.log('Authentication successful');
          // Now you can proceed with normal WebSocket communication
        } else {
          console.error('Authentication failed');
          this.socket.close();
        }
      } else {
        // Handle other types of messages
      }
    };
  }

  send(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  }
}

export default SecureWebSocket;
