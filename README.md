# WebTicketSuporte

![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![HTML](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-orange)

Sistema de tickets de suporte com backend em NestJS e frontend web estatico separado por perfis de usuario.

## Perfis

- Usuario comum: cria e acompanha tickets.
- Tecnico: visualiza atendimentos e tickets concluidos.
- Administrador: gerencia categorias, tecnicos e filas.

## Estrutura

```text
Backend/     API NestJS, Prisma e regras de negocio
Frontend/    telas HTML separadas por perfil
```

## Como rodar o backend

```bash
cd Backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run start:dev
```

## Como abrir o frontend

Abra `Frontend/login.html` no navegador.

## Ambiente

Use `Backend/.env.example` como base para criar `Backend/.env`. O `.env` real fica fora do Git.
