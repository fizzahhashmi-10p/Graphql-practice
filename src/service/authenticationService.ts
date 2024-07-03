import jwt from 'jsonwebtoken';

const secretKey = 'mySecretKey';


interface DecodedToken {
  id: string;
}

class AuthenticationService{
    generateToken(user): string {
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      return token;
    }

    verifyToken(token: string): DecodedToken {
      try {
        const decoded = jwt.verify(token, secretKey) as DecodedToken;
        return decoded;
      } catch (err) {
        throw new Error('Invalid token');
      }
    }
}

export const authenticationService = new AuthenticationService();
