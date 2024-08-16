"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const helper_service_1 = require("src/helper/helper.service");
const users_entity_1 = require("src/users/users.entity/users.entity");
const typeorm_2 = require("typeorm");
let AuthentificationService = class AuthentificationService {
    constructor(usersRepository, helperService, jwtService) {
        this.usersRepository = usersRepository;
        this.helperService = helperService;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        try {
            const user = await this.usersRepository.findOne({
                where: { email, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const match = await this.helperService.checkPassword(password, user.password);
            if (!match) {
                throw new common_1.NotAcceptableException('Password incorrect');
            }
            const payload = { user: user, telephone: user.telephone };
            return {
                resultat: {
                    user,
                    code: user.code,
                    token: this.jwtService.sign(payload),
                },
                message: 'Success',
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException({
                resultat: null,
                message: error.message,
            });
        }
    }
};
exports.AuthentificationService = AuthentificationService;
exports.AuthentificationService = AuthentificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        helper_service_1.HelperService,
        jwt_1.JwtService])
], AuthentificationService);
//# sourceMappingURL=authentification.service.js.map