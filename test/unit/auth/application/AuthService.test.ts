import { AuthService } from '../../../../src/auth/application/services/AuthServices' 
import { UserRepository } from '../../../../src/auth/domain/repositories/UserRepository';
import { JwtService } from '../../../../src/auth/infrastructure/drivens/adapters/services/JwtService';
import { User } from '../../../../src/auth/domain/entities/User';
import { Password } from 'src/auth/domain/value-objects/Password';

describe('AuthService', () => {
    let authService: AuthService;
    let userRepositoryMock: jest.Mocked<UserRepository>;
    let jwtServiceMock: jest.Mocked<JwtService>;

    beforeEach(() => {
        // Crear mocks
        userRepositoryMock = {
            findByEmail: jest.fn(),
        } as unknown as jest.Mocked<UserRepository>;

        jwtServiceMock = {
            generateToken: jest.fn(),
        } as unknown as jest.Mocked<JwtService>;

        authService = new AuthService(userRepositoryMock, jwtServiceMock);
    });

    it('debería generar un token si las credenciales son válidas', async () => {
        // Datos de prueba
        const email = 'test@example.com';
        const password = 'admin13';
        const user = { email, password };

        // Configurar mocks
        userRepositoryMock.findByEmail.mockResolvedValue(user);
        jwtServiceMock.generateToken.mockReturnValue('fake-token');

        // Ejecutar el método
        const token = await authService.login(email, password);

        // Verificar resultados
        expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
        expect(jwtServiceMock.generateToken).toHaveBeenCalledWith(user);
        expect(token).toBe('fake-token');
    });

    it('debería lanzar un error si las credenciales son inválidas', async () => {
        const email = 'invalid@example.com';
        const password = 'wrongpassword';

        userRepositoryMock.findByEmail.mockResolvedValue(null);

        await expect(authService.login(email, password)).rejects.toThrow(
            'Invalid credentials'
        );
    });
});
