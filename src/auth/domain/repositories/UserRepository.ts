import { User } from "../entities/User";

export interface UserRepository {
    findByEmail(email: string, password: string): Promise<{ email: string, password: string} | null>;
    saveToken(email: string, token: string): Promise<void>;
}