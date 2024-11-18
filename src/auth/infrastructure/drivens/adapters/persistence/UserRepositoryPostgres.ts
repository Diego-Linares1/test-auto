import { User } from "src/auth/domain/entities/User";
import { UserRepository } from "src/auth/domain/repositories/UserRepository";
import { Email } from "src/auth/domain/value-objects/Emai";
import pool from "../../../../../shared/infrastructure/database";

export class UserRepositoryPostgres implements UserRepository {
    async findByEmail(email: string): Promise<{ email: string, password: string } | null> {
        console.log("consultando bd", email)
        const res = await pool.query("SELECT * FROM dev.users WHERE email = $1", [email]);
        return res.rows[0] || null;
    }

    async saveToken(email: string, token: string): Promise<void> {
        console.log("llego a infraestructura savetoken")
        await pool.query("INSERT INTO dev.tokens (user_id, token) VALUES ($1, $2)", [email, token]);
    }
}