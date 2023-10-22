import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './modules/User/user.module';
import { AuthMiddleware } from './modules/User/auth.middleware';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { TicketModule } from './modules/Ticket/ticket.module';

@Module({
  imports: [UserModule, CategoriaModule, TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('login'); // Substitua 'rotas-protegidas' pelas suas rotas que exigem autenticação
  }
}
