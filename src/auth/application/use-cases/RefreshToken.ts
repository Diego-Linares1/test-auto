import { AuthService } from "../services/AuthServices";

export class RefreshToken {
    constructor(private readonly authService: AuthService) { }
    
    async execute(refreshToken: string) {
        const isValid = await this.authService.validRefreshtoken(refreshToken);
        if (!isValid) {
            throw new Error('Invalid refresh token');
        }

        const userEmail = this.authService.decodeToken(refreshToken);
        return this.authService.generateToken({ email: userEmail })
    }
}