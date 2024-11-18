import { Request, Response } from 'express';
import { Login } from '../../application/use-cases/Login';
import { UserRepositoryPostgres } from '../drivens/adapters/persistence/UserRepositoryPostgres';
import { JwtService } from '../drivens/adapters/services/JwtService';
import { AuthService } from '../../../auth/application/services/AuthServices';

export class AuthController {
    private loginUseCase: Login;

    constructor() {
        const userRepository = new UserRepositoryPostgres();
        const jwtService = new JwtService(process.env.JWT_SECRET || 'default-secret', '2h');
        const authService = new AuthService(userRepository, jwtService);

        this.loginUseCase = new Login(authService);
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            console.log(email)

            if (!email || !password) {
                res.status(400).json({ error: 'Email and password are required' });
                return;
            }

            const token = await this.loginUseCase.execute(email, password);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }
}