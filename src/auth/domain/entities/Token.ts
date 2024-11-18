export class Token {
    constructor(public token: string, public expirationDate: Date) { }
    
    isExpired(): boolean {
        return this.expirationDate < new Date();
    }
}