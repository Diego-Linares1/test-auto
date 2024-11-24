import { UserRepository } from "../../domain/repositories/UserRepository";
import { JwtService } from "../../../auth/infrastructure/drivens/adapters/services/JwtService";

export class AuthService {
    private userRepository: UserRepository;
    private jwtService: JwtService;

    constructor(userRepository: UserRepository, jwtService: JwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findByEmail(email, password);

        return this.jwtService.generateToken(user);
    }
}
