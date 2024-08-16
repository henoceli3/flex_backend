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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_entity_1 = require("./users.entity/users.entity");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOne(id) {
        return await this.usersService.findOne(id);
    }
    async getByNumber(number) {
        return await this.usersService.getByNumber(number);
    }
    async getSolde(id) {
        return await this.usersService.getSolde(id);
    }
    async create(user) {
        return await this.usersService.create(user);
    }
    async update(id, user) {
        return await this.usersService.update(id, user);
    }
    async delete(id) {
        return await this.usersService.remove(id);
    }
    async restore(id) {
        return await this.usersService.restore(id);
    }
    async updatePassword(id, oldPassword, password) {
        return await this.usersService.updatePassword(id, oldPassword, password);
    }
    async restorePassword(id, password) {
        return await this.usersService.restorePassword(id, password);
    }
    async updatePhoto(id, photo) {
        return await this.usersService.updatePhoto(id, photo.filename);
    }
    async updateCni(id, cni) {
        return await this.usersService.updateCni(id, cni.filename);
    }
    async updateCniImage(id, cni_recto, cni_verso) {
        return await this.usersService.updateCniImage(id, cni_recto.filename, cni_verso.filename);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('All'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-id'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('by-number'),
    __param(0, (0, common_1.Query)('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getByNumber", null);
__decorate([
    (0, common_1.Get)('get-solde'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSolde", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_entity_1.UsersEntity]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('restore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "restore", null);
__decorate([
    (0, common_1.Post)('updatePassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('oldPassword')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)('restorePassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "restorePassword", null);
__decorate([
    (0, common_1.Post)('updatePhoto/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePhoto", null);
__decorate([
    (0, common_1.Post)('updateCni/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('cni')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCni", null);
__decorate([
    (0, common_1.Post)('updateCniImage/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('cni_recto', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const filename = `${(0, uuid_1.v4)()}${path.extname(file.originalname)}`;
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCniImage", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map