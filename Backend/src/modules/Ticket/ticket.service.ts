import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ticketDTO } from './ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  async create(ticketData: ticketDTO) {
    const newTicket = await this.prisma.ticket.create({
      data: {
        id_user_comum: ticketData.id_user_comum,
        titulo_ticket: ticketData.titulo_ticket,
        descricao_ticket: ticketData.descricao_ticket,
        situacao_ticket: ticketData.situacao_ticket,
        categ_ticket: ticketData.categ_ticket,
      },
    });
    return newTicket;
  }
  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findTicketsByUserComum(id_user_comumm: number) {
    return this.prisma.ticket.findMany({
      where: {
        id_user_comum: id_user_comumm,
      },
    });
  }

  // Para buscar tickets associados a um usuário técnico
  async findTicketsByUserTec(id_user_tecnico: number) {
    return this.prisma.ticket.findMany({
      where: {
        id_user_tec: id_user_tecnico,
        situacao_ticket: 'Em atendimento',
      },
    });
  }
  async findTicketsAbertos() {
    return this.prisma.ticket.findMany({
      where: {
        situacao_ticket: 'Aberto',
      },
    });
  }
  async TicketSemTecnico() {
    return this.prisma.ticket.findMany({
      where: {
        id_user_tec: null,
      },
    });
  }
  async AddTecnico(id_ticket: number, id_user_tec: number) {
    return this.prisma.ticket.update({
      where: {
        id_ticket: id_ticket,
      },
      data: {
        id_user_tec: id_user_tec,
        situacao_ticket: 'Em atendimento',
      },
    });
  }
  async FinalizarTicekt(id_ticket: number) {
    return this.prisma.ticket.update({
      where: {
        id_ticket: id_ticket,
      },
      data: {
        situacao_ticket: 'Concluido',
      },
    });
  }
  async TicketemAndamento() {
    return this.prisma.ticket.findMany({
      where: {
        situacao_ticket: 'Em atendimento',
      },
    });
  }
  async TicketconcluidoByIdTecnico(id_user_tecnico: number) {
    return this.prisma.ticket.findMany({
      where: {
        id_user_tec: id_user_tecnico,
        situacao_ticket: 'Concluido',
      },
    });
  }
}
