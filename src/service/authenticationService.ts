import jwt from 'jsonwebtoken';
import { Role } from '../type.js'

const secretKey = 'mySecretKey';


interface DecodedToken {
  role: Role;
}

class AuthenticationService{
    generateToken(user): string {
      const token = jwt.sign({ role: user.role }, secretKey, { expiresIn: '1h' });
      return token;
    }

    verifyToken(authHeader: string): DecodedToken {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretKey) as DecodedToken;
        return decoded;
    }
}

export const authenticationService = new AuthenticationService();
