import { Email } from "../value-objects/Emai";
import { Password } from "../value-objects/Password";

export class User {
    constructor(public email: string, public password: Password, public name: string) { }
    
    validatePassword(password: string): boolean {
        return this.password.isValid(password);
    }
}