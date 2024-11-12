# readme final

<h1 align="center" style="font-family: 'Montserrat', sans-serif; font-size: 64px; color: #3498DB;">
  Vehicle Hub - NestJS & Angular
</h1>

<p align="center">
  <a href="#-visão-geral-do-projeto">Visão Geral do Projeto</a> •
  <a href="#-principais-funcionalidades">Principais Funcionalidades</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias Utilizadas</a> •
  <a href="#-estrutura-do-projeto">Estrutura do Projeto</a> •
  <a href="#-instalação-e-configuração">Instalação e Configuração</a> •
  <a href="#-uso">Uso</a> •
  <a href="#-testes">Testes</a> •
  <a href="#-documentação-da-api">Documentação da API</a>
</p>

## 📄 Visão Geral do Projeto

Este projeto é um sistema completo de **Cadastro e Gerenciamento de Veículos**, desenvolvido com **NestJS** no backend e **Angular** no frontend. A API utiliza uma estrutura SOLID com camadas de serviços e repositórios, garantindo organização e flexibilidade.

Este projeto demonstra habilidades intermediárias em desenvolvimento de APIs, incluindo uso de **Prisma** para gerenciamento de banco de dados, aplicação de **testes unitários** (usando Mocha, Chai e Sinon), e uma aplicação frontend em Angular para consumir e interagir com os dados da API. É uma solução moderna e modular, pronta para expansão.

## ✨ Principais Funcionalidades

- **Gerenciamento Completo de Veículos**: Criação, leitura, atualização e exclusão de registros de veículos.
- **Frontend Angular**: Interface de usuário moderna e interativa para consumir a API.
- **ORM com Prisma**: Uso de Prisma para interação e migração de banco de dados.
- **Estrutura SOLID**: Organização do código com serviços, repositórios e princípios SOLID.
- **Testes Unitários**: Testes abrangentes para garantir a qualidade do código e a estabilidade da aplicação.

## 🛠 Tecnologias Utilizadas

### Backend - NestJS

- **NestJS**: v10.0.0 para a estrutura do backend
- **Prisma**: v5.22.0, como ORM para banco de dados
- **Mocha**: v10.8.2 para testes
- **Chai**: v4.1.2 para asserções em testes
- **Sinon**: v19.0.2 para mocks e stubs em testes

### Frontend - Angular

- **Angular CLI**: v18.2.11 para construção e execução do frontend
- **Node.js**: v18.19.1 ou superior (recomendado)

---

## 📁 Estrutura do Projeto

- **Backend**: Implementado em NestJS, localizado na raiz do projeto.
- **Frontend**: Implementado em Angular, localizado na pasta `frontend`.
- **ORM (Prisma)**: `src/database/prisma/`, gerencia as migrações e o modelo `Vehicle`.

---

## ⚙️ Instalação e Configuração

### Pré-requisitos

- **Docker** e **Docker Compose**: para configuração simplificada.
- **Node.js**: v18.19.1 ou superior.

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

```

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

- **Nota**: Use `docker-compose up -d` para rodar em segundo plano.

### 5. Acessando a Aplicação

- **Frontend**: http://localhost:4200
- **Backend**: [http://localhost:3333](http://localhost:3333/)

---

## 🖥 Uso Sem Docker

### Backend

1. Instale dependências, gere o Prisma Client e aplique migrações com:
    
    ```bash
    
    npm run setup
    
    ```
    
2. Inicie o backend:
    
    ```bash
    
    npm run start:dev
    
    ```
    

### Frontend

1. Em uma nova janela de terminal, navegue até a pasta `frontend`:
    
    ```bash
    
    cd frontend
    
    ```
    
2. Instale as dependências do frontend:
    
    ```bash
    
    npm install
    
    ```
    
3. Execute o frontend:
    
    ```bash
    
    npm start
    
    ```
    

---

## 🧪 Testes

Para rodar os testes unitários do backend:

```bash

npm test

```

---

## 📖 Documentação da API

Base URL: `http://localhost:3333`

### **POST** `/vehicles`

Cria um novo veículo.

### Corpo da Requisição:

```json

{
  "placa": "BRA2E19",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678910",
  "modelo": "Civic",
  "marca": "Honda",
  "ano": 2022
}

```

### **GET** `/vehicles?page=1&limit=10`

Retorna uma lista paginada de veículos.

### **GET** `/vehicles/{id}`

Retorna os detalhes de um veículo específico.

### **PATCH** `/vehicles/{id}`

Atualiza os dados de um veículo específico.

### Corpo da Requisição:

```json

{
  "placa": "BRA2E19",
  "chassi": "9BWZZZ377VT004251",
  "renavam": "12345678910",
  "modelo": "Corola",
  "marca": "Toyota",
  "ano": 2023
}

```

### **DELETE** `/vehicles/{id}`

Deleta um veículo específico.

---

## 🧩 Utilização da APIs

Para realizar testes manuais das APIs, você pode utilizar:

### Opção 1: Extensão **REST Client** no Visual Studio Code

1. Instale a extensão **REST Client** no VSCode:
    
    [Instalar REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
    
2. Com o backend rodando corretamente, abra o arquivo `client.http` na raiz do projeto.
3. No arquivo `client.http`, você encontrará requisições pré-configuradas para as APIs. Com a extensão **REST Client**, basta clicar em "Send Request" ao lado de cada requisição para testá-la.

### Opção 2: Postman

Você também pode utilizar o **Postman** para testar as APIs. Utilize a documentação da API no Postman para importar e executar as requisições:

- [Documentação da API no Postman](https://documenter.getpostman.com/view/14714590/2sAY545xq5)

Para importar, basta clicar no link acima e seguir as instruções na interface do Postman.

---

<p align="center">Feito com 💙 por <a href="https://github.com/andrevks">André Geraldo</a></p>