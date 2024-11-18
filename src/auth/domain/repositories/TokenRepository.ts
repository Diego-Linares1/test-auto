import { Token } from "../entities/Token";

export interface TokenRepository {
    findByUserId(userId: string): Promise<Token | null>;
    save(token: Token): Promise<void>;
}