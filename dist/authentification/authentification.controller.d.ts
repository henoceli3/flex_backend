import { AuthentificationService } from './authentification.service';
export declare class AuthentificationController {
    private readonly authentificationService;
    constructor(authentificationService: AuthentificationService);
    login(email: string, password: string): Promise<import("../utils/Interface").IResponse>;
}
