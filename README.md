# Vehicle Hub - NestJS & Angular

Sistema completo de cadastro e gerenciamento de veículos com backend em NestJS e frontend em Angular.

---

## Requisitos

- **Docker** e **Docker Compose**
- **Opcional**: Node.js v18.19 e npm (para rodar localmente sem Docker)

---

## Configuração e Execução

### 1. Clone o Repositório

```bash
git clone https://github.com/andrevks/vehicle-hub-nestjs.git
cd vehicle-hub-nestjs
```

### 2. Configuração do .env

Copie o arquivo de exemplo `.env.example` e crie o arquivo `.env`:

```bash
cp .env.example .env
```

No arquivo `.env`, configure a variável DATABASE_URL para o SQLite:

```plain
  DATABASE_URL="file:./dev.db"
```

### 3. Instale Dependências

```bash
npm install

```

### 4. Execute com Docker
Para rodar o projeto com Docker:

```bash
docker-compose up
```
- Nota: Use `docker-compose up -d` para rodar em segundo plano.

### 5. Acessando a Aplicação
Frontend: [http://localhost:4200](http://localhost:4200)
Backend: [http://localhost:3333](http://localhost:3333)

## Executando Sem Docker
## Backend

```bash
npm install
npm run start:dev
```

## Frontend
Em uma nova janela de terminal:

```bash
cd frontend
npm install
npm start
```

## Executando Testes
Para rodar os testes unitários do backend:

```bash
npm test
```
