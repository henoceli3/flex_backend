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
exports.TypeTransactionsController = void 0;
const common_1 = require("@nestjs/common");
const type_transactions_service_1 = require("./type-transactions.service");
const type_transactions_entity_1 = require("./type-transactions.entity/type-transactions.entity");
let TypeTransactionsController = class TypeTransactionsController {
    constructor(typeTransactionsService) {
        this.typeTransactionsService = typeTransactionsService;
    }
    async findAll() {
        return await this.typeTransactionsService.findAll();
    }
    async findOne(id) {
        return await this.typeTransactionsService.findOne(id);
    }
    async create(typeTransactions) {
        return await this.typeTransactionsService.create(typeTransactions);
    }
};
exports.TypeTransactionsController = TypeTransactionsController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TypeTransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TypeTransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('typeTransactions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_transactions_entity_1.TypeTransactionsEntity]),
    __metadata("design:returntype", Promise)
], TypeTransactionsController.prototype, "create", null);
exports.TypeTransactionsController = TypeTransactionsController = __decorate([
    (0, common_1.Controller)('type-transactions'),
    __metadata("design:paramtypes", [type_transactions_service_1.TypeTransactionsService])
], TypeTransactionsController);
//# sourceMappingURL=type-transactions.controller.js.map