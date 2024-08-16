"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_controller_1 = require("./transactions.controller");
const transactions_service_1 = require("./transactions.service");
const transactions_entity_1 = require("./transactions.entity/transactions.entity");
const helper_service_1 = require("src/helper/helper.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("src/users/users.entity/users.entity");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transactions_entity_1.TransactionsEntity, users_entity_1.UsersEntity])],
        controllers: [transactions_controller_1.TransactionsController],
        providers: [transactions_service_1.TransactionsService, helper_service_1.HelperService],
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map