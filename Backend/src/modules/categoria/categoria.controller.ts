import { Post, Body, Controller, Get, Param } from '@nestjs/common';
import { categoriaDTO } from './categoria.dto';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly CategoriaService: CategoriaService) {}
  @Post('cadastro')
  async create(@Body() data: categoriaDTO) {
    return this.CategoriaService.create(data);
  }
  @Get('allCateg')
  async findAll() {
    const categ = await this.CategoriaService.findAll();
    return categ;
  }
}
