-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "nome_user" TEXT,
    "email_user" TEXT NOT NULL,
    "senha_user" TEXT NOT NULL,
    "confirmar_senha_user" TEXT NOT NULL,
    "tipo_user" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id_ticket" SERIAL NOT NULL,
    "id_user_comum" INTEGER NOT NULL,
    "id_user_tec" INTEGER NOT NULL,
    "titulo_ticket" TEXT NOT NULL,
    "descricao_ticket" TEXT NOT NULL,
    "situacao_ticket" TEXT NOT NULL,
    "categ_ticket" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id_ticket")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id_categ" SERIAL NOT NULL,
    "id_user_adm" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categ")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_user_key" ON "users"("email_user");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_id_user_comum_fkey" FOREIGN KEY ("id_user_comum") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_categ_ticket_fkey" FOREIGN KEY ("categ_ticket") REFERENCES "categoria"("id_categ") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria" ADD CONSTRAINT "categoria_id_user_adm_fkey" FOREIGN KEY ("id_user_adm") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
