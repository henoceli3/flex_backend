"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const role_module_1 = require("./role/role.module");
const transactions_module_1 = require("./transactions/transactions.module");
const type_transactions_module_1 = require("./type-transactions/type-transactions.module");
const dotenv = require("dotenv");
const logger_middleware_1 = require("./middleware/logger-middleware/logger-middleware");
const jwt_1 = require("@nestjs/jwt");
const authentification_module_1 = require("./authentification/authentification.module");
const helper_service_1 = require("./helper/helper.service");
dotenv.config();
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DATABASE,
                port: Number(process.env.DATABASE_PORT),
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true,
                ssl: true,
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '60s' },
            }),
            users_module_1.UsersModule,
            role_module_1.RoleModule,
            transactions_module_1.TransactionsModule,
            type_transactions_module_1.TypeTransactionsModule,
            authentification_module_1.AuthentificationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, helper_service_1.HelperService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map