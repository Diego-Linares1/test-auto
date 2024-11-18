export class Email {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValidEmail(value)) {
            throw new Error('Invalid email format');
        }
        this.value = value;
    }

    private isValidEmail(email: string): boolean {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return regex.test(email);
    }

    getValue(): string {
        return this.value;
    }
}