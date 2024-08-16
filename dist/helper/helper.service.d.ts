export declare class HelperService {
    constructor();
    hashPassword(password: string): Promise<string>;
    checkPassword(password: string, hashedPassword: string): Promise<boolean>;
}
