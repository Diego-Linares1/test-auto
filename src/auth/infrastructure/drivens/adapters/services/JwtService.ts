import * as jwt from "jsonwebtoken";

export class JwtService {
    private secret: string;
    private expiresIn: string;

    constructor(secret: string, expiresIn: string) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(user: {email: string, password: string} | null): string | null {
        // Aquí puedes agregar más campos en el payload si es necesario
        if (user?.email) {
            const payload = { email: user.email};
            return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
        }
        return null;
    }

    verifyToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}
