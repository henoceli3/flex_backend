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
exports.TypeTransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const type_transactions_entity_1 = require("./type-transactions.entity/type-transactions.entity");
const uuid_1 = require("uuid");
let TypeTransactionsService = class TypeTransactionsService {
    constructor(typeTransactionsRepository) {
        this.typeTransactionsRepository = typeTransactionsRepository;
    }
    async findAll() {
        try {
            return {
                resultat: await this.typeTransactionsRepository.find({
                    where: { is_active: true },
                }),
                message: 'Success',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                resultat: null,
                message: error.message,
            });
        }
    }
    async findOne(id) {
        try {
            return {
                resultat: await this.typeTransactionsRepository.findOneBy({ id }),
                message: 'Success',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                resultat: null,
                message: error.message,
            });
        }
    }
    async create(typeTransactions) {
        try {
            if (!typeTransactions.libelle) {
                throw new common_1.BadRequestException('le libelle est requis');
            }
            return {
                resultat: await this.typeTransactionsRepository.save({
                    uuid: (0, uuid_1.v4)(),
                    is_active: true,
                    created_at: new Date(),
                    libelle: typeTransactions.libelle,
                }),
                message: 'Success',
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                resultat: null,
                message: error.message,
            });
        }
    }
};
exports.TypeTransactionsService = TypeTransactionsService;
exports.TypeTransactionsService = TypeTransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(type_transactions_entity_1.TypeTransactionsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeTransactionsService);
//# sourceMappingURL=type-transactions.service.js.map