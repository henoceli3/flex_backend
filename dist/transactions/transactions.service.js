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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactions_entity_1 = require("./transactions.entity/transactions.entity");
const typeorm_2 = require("typeorm");
const helper_service_1 = require("src/helper/helper.service");
const uuid_1 = require("uuid");
const users_entity_1 = require("src/users/users.entity/users.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionsRepository, userResposistery, helperService) {
        this.transactionsRepository = transactionsRepository;
        this.userResposistery = userResposistery;
        this.helperService = helperService;
    }
    async findAll() {
        try {
            const transactions = await this.transactionsRepository.find();
            const users = await this.userResposistery.find({
                where: { is_active: true },
                select: ['id', 'nom', 'prenoms', 'telephone', 'email'],
            });
            const res_data = transactions.map((transaction) => {
                const beneficiaire = users.find((user) => user.id === transaction.beneficiaire_id);
                const expediteur = users.find((user) => user.id === transaction.expediteur_id);
                return {
                    ...transaction,
                    beneficiaire,
                    expediteur,
                };
            });
            return {
                resultat: res_data,
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
            const transaction = await this.transactionsRepository.findOne({
                where: { id },
            });
            const users = await this.userResposistery.find({
                where: { is_active: true },
                select: ['id', 'nom', 'prenoms', 'telephone', 'email'],
            });
            const beneficiaire = users.find((user) => user.id === transaction.beneficiaire_id);
            const expediteur = users.find((user) => user.id === transaction.expediteur_id);
            const res_data = {
                ...transaction,
                beneficiaire,
                expediteur,
            };
            return {
                resultat: res_data,
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
    async getTransactionsByUser(id) {
        try {
            if (!id) {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'User not found',
                });
            }
            const users = await this.userResposistery.find({
                where: { is_active: true },
                select: ['id', 'nom', 'prenoms', 'telephone', 'email'],
            });
            const transactions_benef = await this.transactionsRepository.find({
                where: { beneficiaire_id: id },
            });
            const transactions_exped = await this.transactionsRepository.find({
                where: { expediteur_id: id },
            });
            const transactions = transactions_benef.concat(transactions_exped);
            const res_data = transactions
                .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
                .map((transaction) => {
                const beneficiaire = users.find((user) => user.id === transaction.beneficiaire_id);
                const expediteur = users.find((user) => user.id === transaction.expediteur_id);
                return {
                    ...transaction,
                    beneficiaire,
                    expediteur,
                };
            });
            return {
                resultat: res_data,
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
    async create(transaction) {
        try {
            if (!transaction) {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Transaction not found',
                });
            }
            if (!transaction.beneficiaire_id) {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Beneficiaire not found',
                });
            }
            else if (!transaction.expediteur_id) {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Expediteur not found',
                });
            }
            else if (!transaction.montant) {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Montant not found',
                });
            }
            else if (!transaction.type_transaction_id) {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Type transaction not found',
                });
            }
            transaction.etat_transaction = 0;
            const expediteur = await this.userResposistery.findOne({
                where: { id: transaction.expediteur_id, is_active: true },
            });
            const beneficiaire = await this.userResposistery.findOne({
                where: { id: transaction.beneficiaire_id, is_active: true },
            });
            if (!expediteur) {
                transaction.etat_transaction = 500;
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Expediteur not found',
                });
            }
            else if (Number(expediteur.solde) < Number(transaction.montant)) {
                transaction.etat_transaction = 404;
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Solde insuffisant',
                });
            }
            else if (expediteur &&
                Number(expediteur.solde) >= Number(transaction.montant) &&
                beneficiaire) {
                expediteur.solde =
                    Number(expediteur.solde) - Number(transaction.montant);
                await this.userResposistery.save(expediteur);
                transaction.etat_transaction = 1;
                beneficiaire.solde =
                    Number(beneficiaire.solde) + Number(transaction.montant);
                await this.userResposistery.save(beneficiaire);
                transaction.etat_transaction = 2;
            }
            else if (!beneficiaire) {
                transaction.etat_transaction = 600;
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Beneficiaire not found',
                });
            }
            else {
                throw new common_1.InternalServerErrorException({
                    resultat: null,
                    message: 'Error',
                });
            }
            const renderLibelleTransaction = () => {
                switch (transaction.type_transaction_id) {
                    case 1:
                        return `Depot`;
                    case 2:
                        return `Retrait`;
                    case 3:
                        return `à ${beneficiaire.nom} ${beneficiaire.prenoms} ${beneficiaire.telephone}`;
                    case 4:
                        return `Paiement ${beneficiaire.nom} ${beneficiaire.prenoms}`;
                    default:
                        return `Transaction`;
                }
            };
            const transact = await this.transactionsRepository.save({
                ...transaction,
                uuid: (0, uuid_1.v4)(),
                libelle: renderLibelleTransaction(),
                numero_transaction: (0, uuid_1.v4)(),
                etat_transaction: 2,
                created_at: new Date(),
            });
            return {
                resultat: {
                    ...transact,
                    nom_expediteur: expediteur.nom,
                    prenom_expediteur: expediteur.prenoms,
                    nom_beneficiaire: beneficiaire.nom,
                    prenom_beneficiaire: beneficiaire.prenoms,
                },
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
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactions_entity_1.TransactionsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        helper_service_1.HelperService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map