import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post('cadastro')
  async create(@Body() data: UserDTO) {
    return this.UserService.create(data);
  }
  @Post('move-up/:id_adm/:id_tecnico')
  async moveUp(
    @Param('id_adm') id_adm: string,
    @Param('id_tecnico') id_tecnico: string,
  ) {
    return this.UserService.MoveUp(parseInt(id_adm), parseInt(id_tecnico));
  }

  @Get('allUsers')
  async findAll() {
    const users = await this.UserService.findAll();
    return users;
  }

  @Post('login')
  async login(@Body() credentials: { email: string; senha: string }) {
    const user = await this.UserService.findByEmail(credentials.email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Verificar se a senha corresponde
    if (user.senha_user !== credentials.senha) {
      throw new NotFoundException('Senha incorreta');
    }

    // Autenticação bem-sucedida, gerar um token JWT
    const token = jwt.sign({ userId: user.id_user }, 'secretpassword', {
      expiresIn: '1h', // Tempo de expiração do token (1 hora, por exemplo)
    });

    return {
      token,
      id_user: user.id_user,
      nome_user: user.nome_user,
      tipo_user: user.tipo_user,
    };
  }

  @Get('findById/:id_user')
  async UserById(@Param('id_user') id_user: string) {
    return this.UserService.findById(parseInt(id_user));
  }

  @Get('findByTec')
  async Tecnicos() {
    return this.UserService.findByTec();
  }
}
