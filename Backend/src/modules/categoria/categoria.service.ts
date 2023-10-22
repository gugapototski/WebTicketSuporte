import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { categoriaDTO } from './categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async create(categoriaData: categoriaDTO) {
    const admExist = await this.prisma.user.findFirst({
      where: {
        id_user: categoriaData.id_user_adm,
        tipo_user: 'Adm',
      },
    });
    if (!admExist) {
      throw new NotFoundException(
        'Você não possui permissão para realizar está ação!',
      );
    }
    const newCateg = await this.prisma.categoria.create({
      data: {
        id_user_adm: categoriaData.id_user_adm,
        categoria: categoriaData.categoria,
      },
    });
    return newCateg;
  }
  async findAll() {
    return this.prisma.categoria.findMany();
  }
  async findById(id_categ: number) {
    return this.prisma.categoria.findUnique({
      where: { id_categ },
    });
  }
}
