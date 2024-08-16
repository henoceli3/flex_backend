"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeTransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const type_transactions_service_1 = require("./type-transactions.service");
const type_transactions_controller_1 = require("./type-transactions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const type_transactions_entity_1 = require("./type-transactions.entity/type-transactions.entity");
let TypeTransactionsModule = class TypeTransactionsModule {
};
exports.TypeTransactionsModule = TypeTransactionsModule;
exports.TypeTransactionsModule = TypeTransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_transactions_entity_1.TypeTransactionsEntity])],
        providers: [type_transactions_service_1.TypeTransactionsService],
        controllers: [type_transactions_controller_1.TypeTransactionsController],
    })
], TypeTransactionsModule);
//# sourceMappingURL=type-transactions.module.js.map