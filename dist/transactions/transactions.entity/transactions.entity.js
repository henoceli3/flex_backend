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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsEntity = void 0;
const typeorm_1 = require("typeorm");
let TransactionsEntity = class TransactionsEntity {
};
exports.TransactionsEntity = TransactionsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TransactionsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], TransactionsEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], TransactionsEntity.prototype, "numero_transaction", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionsEntity.prototype, "libelle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TransactionsEntity.prototype, "montant", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TransactionsEntity.prototype, "type_transaction_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TransactionsEntity.prototype, "beneficiaire_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TransactionsEntity.prototype, "expediteur_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], TransactionsEntity.prototype, "etat_transaction", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TransactionsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TransactionsEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], TransactionsEntity.prototype, "deleted_at", void 0);
exports.TransactionsEntity = TransactionsEntity = __decorate([
    (0, typeorm_1.Entity)('transactions')
], TransactionsEntity);
//# sourceMappingURL=transactions.entity.js.map