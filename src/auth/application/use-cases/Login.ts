import { AuthService } from '../services/AuthServices';

export class Login {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
     }
    
    async execute(email: string, password: string): Promise<string | null> {
        console.log(email)
        return await this.authService.login(email, password);
    }
}