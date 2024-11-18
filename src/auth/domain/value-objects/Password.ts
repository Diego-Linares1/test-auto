export class Password {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValidPassword(value)) {
            throw new Error('Password must be at least 6 characters');
        }
        this.value = value;
    }

    private isValidPassword(password: string): boolean {
        return password.length >= 6;
    }

    isValid(password: string): boolean {
        return this.value === password;
    }

    getValue(): string {
        return this.value;
    }
}
