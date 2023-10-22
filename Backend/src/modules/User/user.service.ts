import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //criando usuário comum
  async create(userData: UserDTO) {
    const UserExist = await this.prisma.user.findFirst({
      where: {
        email_user: userData.email_user,
      },
    });
    if (UserExist) {
      throw new NotFoundException('Usuário já existe');
    }
    if (userData.senha_user === userData.confirmar_senha_user) {
      const newUser = await this.prisma.user.create({
        data: {
          nome_user: userData.nome_user,
          email_user: userData.email_user,
          senha_user: userData.senha_user,
          confirmar_senha_user: userData.confirmar_senha_user,
          tipo_user: userData.tipo_user,
        },
      });
      return newUser;
    } else {
      throw new NotFoundException('Senhas não correspondem');
    }
  }
  async MoveUp(id_adm: number, id_tecnico: number) {
    const admExist = await this.prisma.user.findUnique({
      where: {
        id_user: id_adm,
        tipo_user: 'Adm',
      },
    });
    if (!admExist) {
      throw new NotFoundException(
        'Você não possui permissão para realizar está ação!',
      );
    }

    const checkTecnico = await this.prisma.user.findUnique({
      where: {
        id_user: id_tecnico,
      },
    });

    if (!checkTecnico) {
      throw new NotFoundException('Tecnico inexistente!');
    }

    const setTecnico = await this.prisma.user.update({
      where: {
        id_user: id_tecnico,
      },
      data: {
        tipo_user: 'Tecnico',
      },
    });
    return setTecnico;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email_user: email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async findById(id_user: number) {
    return this.prisma.user.findUnique({
      where: { id_user },
    });
  }

  async findByTec() {
    return this.prisma.user.findMany({
      where: {
        tipo_user: 'Tecnico',
      },
    });
  }
}
