import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from './transactions.entity/transactions.entity';
import { Repository } from 'typeorm';
import { HelperService } from 'src/helper/helper.service';
import { v4 } from 'uuid';
import { UsersEntity } from 'src/users/users.entity/users.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
    @InjectRepository(UsersEntity)
    private readonly userResposistery: Repository<UsersEntity>,
    private readonly helperService: HelperService,
  ) {}

  async findAll() {
    try {
      const transactions = await this.transactionsRepository.find();
      const users = await this.userResposistery.find({
        where: { is_active: true },
        select: ['id', 'nom', 'prenoms', 'telephone', 'email'],
      });
      const res_data = transactions.map((transaction) => {
        const beneficiaire = users.find(
          (user) => user.id === transaction.beneficiaire_id,
        );
        const expediteur = users.find(
          (user) => user.id === transaction.expediteur_id,
        );
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
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { id },
      });
      const users = await this.userResposistery.find({
        where: { is_active: true },
        select: ['id', 'nom', 'prenoms', 'telephone', 'email'],
      });
      const beneficiaire = users.find(
        (user) => user.id === transaction.beneficiaire_id,
      );
      const expediteur = users.find(
        (user) => user.id === transaction.expediteur_id,
      );
      const res_data = {
        ...transaction,
        beneficiaire,
        expediteur,
      };
      return {
        resultat: res_data,
        message: 'Success',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async getTransactionsByUser(id: number) {
    try {
      if (!id) {
        throw new InternalServerErrorException({
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
          const beneficiaire = users.find(
            (user) => user.id === transaction.beneficiaire_id,
          );
          const expediteur = users.find(
            (user) => user.id === transaction.expediteur_id,
          );
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
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }

  async create(transaction: TransactionsEntity) {
    try {
      if (!transaction) {
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Transaction not found',
        });
      }

      if (!transaction.beneficiaire_id) {
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Beneficiaire not found',
        });
      } else if (!transaction.expediteur_id) {
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Expediteur not found',
        });
      } else if (!transaction.montant) {
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Montant not found',
        });
      } else if (!transaction.type_transaction_id) {
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Type transaction not found',
        });
      }

      //   debut de la transaction
      transaction.etat_transaction = 0;
      // on cherche l'expediteur en bd pour lui retirer la somme du depot
      const expediteur = await this.userResposistery.findOne({
        where: { id: transaction.expediteur_id, is_active: true },
      });

      // on cherche le beneficiaire en bd pour lui ajouter la somme du depot
      const beneficiaire = await this.userResposistery.findOne({
        where: { id: transaction.beneficiaire_id, is_active: true },
      });

      if (!expediteur) {
        transaction.etat_transaction = 500;
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Expediteur not found',
        });
      } else if (Number(expediteur.solde) < Number(transaction.montant)) {
        transaction.etat_transaction = 404;
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Solde insuffisant',
        });
      } else if (
        expediteur &&
        Number(expediteur.solde) >= Number(transaction.montant) &&
        beneficiaire
      ) {
        expediteur.solde =
          Number(expediteur.solde) - Number(transaction.montant);
        await this.userResposistery.save(expediteur);
        transaction.etat_transaction = 1;
        beneficiaire.solde =
          Number(beneficiaire.solde) + Number(transaction.montant);
        await this.userResposistery.save(beneficiaire);
        transaction.etat_transaction = 2;
      } else if (!beneficiaire) {
        transaction.etat_transaction = 600;
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Beneficiaire not found',
        });
      } else {
        throw new InternalServerErrorException({
          resultat: null,
          message: 'Error',
        });
      }
      const transact = await this.transactionsRepository.save({
        ...transaction,
        uuid: v4(),
        numero_transaction: v4(),
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
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException({
        resultat: null,
        message: error.message,
      });
    }
  }
}
