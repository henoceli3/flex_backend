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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_entity_1 = require("./transactions.entity/transactions.entity");
let TransactionsController = class TransactionsController {
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    async findAll() {
        return await this.transactionsService.findAll();
    }
    async findOne(id) {
        return await this.transactionsService.findOne(id);
    }
    async create(transaction) {
        return await this.transactionsService.create(transaction);
    }
    async getTransactionsByUser(id) {
        return await this.transactionsService.getTransactionsByUser(id);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('transaction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactions_entity_1.TransactionsEntity]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('get-transactions-by-user'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "getTransactionsByUser", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map