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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity/users.entity");
const uuid_1 = require("uuid");
const helper_service_1 = require("src/helper/helper.service");
let UsersService = class UsersService {
    constructor(usersRepository, helperService) {
        this.usersRepository = usersRepository;
        this.helperService = helperService;
    }
    async findAll() {
        try {
            const users = await this.usersRepository.find({
                where: { is_active: true },
                select: [
                    'id',
                    'nom',
                    'prenoms',
                    'cni',
                    'photo',
                    'email',
                    'telephone',
                    'date_naissance',
                    'uuid',
                    'cni_recto',
                    'cni_verso',
                    'created_at',
                    'updated_at',
                    'deleted_at',
                    'role_id',
                    'solde',
                ],
            });
            return {
                resultat: users,
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
    async findOne(id) {
        try {
            if (!id) {
                throw new common_1.BadRequestException('Id not found');
            }
            const user = await this.usersRepository.findOne({
                where: { id: id, is_active: true },
                select: [
                    'id',
                    'nom',
                    'prenoms',
                    'cni',
                    'photo',
                    'email',
                    'telephone',
                    'date_naissance',
                    'uuid',
                    'cni_recto',
                    'cni_verso',
                    'created_at',
                    'updated_at',
                    'deleted_at',
                    'role_id',
                    'solde',
                ],
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.password = null;
            return {
                resultat: user,
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
    async getByNumber(number) {
        try {
            if (!number) {
                throw new common_1.BadRequestException('Number not found');
            }
            const user = await this.usersRepository.findOne({
                where: { telephone: number, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            user.password = null;
            return {
                resultat: user,
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
    async getSolde(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
                select: ['solde'],
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: user.solde,
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
    async create(user) {
        try {
            const userEmailExists = await this.usersRepository.findOne({
                where: {
                    email: user.email,
                    is_active: true,
                },
            });
            if (userEmailExists) {
                throw new common_1.NotAcceptableException('Email déjà utilisé');
            }
            const userTelephoneExists = await this.usersRepository.findOne({
                where: {
                    telephone: user.telephone,
                    is_active: true,
                },
            });
            if (userTelephoneExists) {
                throw new common_1.NotAcceptableException('Telephone déjà utilisé');
            }
            const createed_user = await this.usersRepository.save({
                ...user,
                password: await this.helperService.hashPassword(user.password),
                uuid: (0, uuid_1.v4)(),
                is_active: true,
                created_at: new Date(),
            });
            return {
                resultat: { user: createed_user },
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
    async update(id, user) {
        try {
            const userToUpdate = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!userToUpdate) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...userToUpdate,
                    ...user,
                    updated_at: new Date(),
                }),
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
    async remove(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    is_active: false,
                    deleted_at: new Date(),
                }),
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
    async restore(id) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: false },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    is_active: true,
                    deleted_at: null,
                }),
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
    async updatePassword(id, oldPassword, password) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const match = await this.helperService.checkPassword(oldPassword, user.password);
            if (!match) {
                throw new common_1.NotAcceptableException('Le mot de passe actuel est incorrect');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    password: await this.helperService.hashPassword(password),
                }),
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
    async restorePassword(id, password) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    password: await this.helperService.hashPassword(password),
                }),
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
    async updatePhoto(id, photo) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    photo,
                }),
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
    async updateCni(id, cni) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    cni,
                }),
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
    async updateCniImage(id, cni_recto, cni_verso) {
        try {
            const user = await this.usersRepository.findOne({
                where: { id, is_active: true },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return {
                resultat: await this.usersRepository.save({
                    ...user,
                    cni_recto,
                    cni_verso,
                }),
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
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        helper_service_1.HelperService])
], UsersService);
//# sourceMappingURL=users.service.js.map