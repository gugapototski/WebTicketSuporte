import { Body, Controller, Post, Get, Param, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ticketDTO } from './ticket.dto';

@Controller('ticket')
export class ticketController {
  constructor(private readonly TicketService: TicketService) {}
  @Post('newTicket')
  async create(@Body() data: ticketDTO) {
    return this.TicketService.create(data);
  }
  @Get('allTicket')
  async findAll() {
    const categ = await this.TicketService.findAll();
    return categ;
  }
  @Get('teste/findById/:id_user_comum')
  async getticketbyid(@Param('id_user_comum') id_user_comum: string) {
    return this.TicketService.findTicketsByUserComum(parseInt(id_user_comum));
  }
  @Get('teste/findByIdTec/:id_user_tec')
  async getticketbyidTec(@Param('id_user_tec') id_user_tec: string) {
    return this.TicketService.findTicketsByUserTec(parseInt(id_user_tec));
  }
  @Get('TicketLivre')
  async TicketSemTec() {
    return this.TicketService.TicketSemTecnico();
  }
  @Put('AddTec/:id_ticket/:id_user_tec')
  async AddTecnico(
    @Param('id_ticket') id_ticket: string,
    @Param('id_user_tec') id_user_tec: string,
  ) {
    try {
      await this.TicketService.AddTecnico(
        parseInt(id_ticket),
        parseInt(id_user_tec),
      );
      return { message: 'Técnico atribuído com sucesso.' };
    } catch (error) {
      return { message: 'Erro ao atribuir técnico.' };
    }
  }
  @Put('Concluir/:id_ticket')
  async Concluir(@Param('id_ticket') id_ticket: string) {
    try {
      await this.TicketService.FinalizarTicekt(parseInt(id_ticket));
      return { message: 'Ticket Concluido.' };
    } catch (error) {
      return { message: 'Erro ao Finalizar ticket.' };
    }
  }
  @Get('Andamento')
  async TicketEmandamento() {
    return this.TicketService.TicketemAndamento();
  }
  @Get('ConcluidofindById/:id_user_tec')
  async FindByConcluidoIdTec(@Param('id_user_tec') id_user_tec: string) {
    return this.TicketService.TicketconcluidoByIdTecnico(parseInt(id_user_tec));
  }
}
