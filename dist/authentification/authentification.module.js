"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationModule = void 0;
const common_1 = require("@nestjs/common");
const authentification_controller_1 = require("./authentification.controller");
const authentification_service_1 = require("./authentification.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("src/users/users.entity/users.entity");
const helper_service_1 = require("src/helper/helper.service");
let AuthentificationModule = class AuthentificationModule {
};
exports.AuthentificationModule = AuthentificationModule;
exports.AuthentificationModule = AuthentificationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([users_entity_1.UsersEntity])],
        controllers: [authentification_controller_1.AuthentificationController],
        providers: [authentification_service_1.AuthentificationService, helper_service_1.HelperService],
    })
], AuthentificationModule);
//# sourceMappingURL=authentification.module.js.map