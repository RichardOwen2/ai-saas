import ClientError from './ClientError';

class ServerError extends ClientError {
  constructor(message: string) {
    super(message, 500);
    this.name = 'AiError';
  }
}

export default ServerError;
