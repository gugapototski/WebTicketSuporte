import { PrismaService } from 'src/database/PrismaService';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ticketController } from './ticket.controller';

@Module({
  controllers: [ticketController],
  providers: [TicketService, PrismaService],
})
export class TicketModule {}
