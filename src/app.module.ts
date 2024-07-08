import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeTransactionsModule } from './type-transactions/type-transactions.module';
import * as dotenv from 'dotenv';
import { LoggerMiddleware } from './middleware/logger-middleware/logger-middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthentificationModule } from './authentification/authentification.module';
import { HelperService } from './helper/helper.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    RoleModule,
    TransactionsModule,
    TypeTransactionsModule,
    AuthentificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, HelperService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
