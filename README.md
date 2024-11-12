# Vehicle Hub - NestJS & Angular

Sistema completo de cadastro e gerenciamento de veículos com backend em NestJS e frontend em Angular.

---

## Estrutura do Projeto

- **Backend**: Implementado em NestJS, localizado na raiz do projeto.
- **Frontend**: Implementado em Angular, localizado na pasta `frontend`.

## Requisitos
- **Docker** e **Docker Compose**: para simplificar a configuração e execução.
- **Node.js**: v18.19.1 ou superior.

### Ferramentas

### Backend - NestJS

- **NestJS**: v10.0.0 ou superior, para a estrutura do backend.
- **Prisma**: v5.22.0, como ORM para banco de dados.
- **Dependências para Testes Unitários**:
  - **Mocha**: v10.8.2
  - **Chai**: v4.1.2
  - **Sinon**: v19.0.2

### Frontend - Angular

- **Angular CLI**: v18.2.11 ou superior.
- **Node.js**: v18.19.1 ou superior (recomendado).
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

### Requisitos

Certifique-se de ter:

- **Node.js**: v18.19.1 ou superior
- **npm**: v10.2.4 ou superior

### Backend

1. Execute o comando `setup` para instalar as dependências, gerar o Prisma Client e aplicar as migrações:
    
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

## Executando Testes
Para rodar os testes unitários do backend:

```bash
npm test
```

## API Endpoints

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

---

### **GET** `/vehicles?page=1&limit=10`
Retorna uma lista paginada de veículos.

---

### **GET** `/vehicles/{id}`
Retorna os detalhes de um veículo específico.

---

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

---

### **DELETE** `/vehicles/{id}`
Deleta um veículo específico.

## Utilização da APIs

Para realizar testes manuais das APIs, você pode utilizar:

### Opção 1: Extensão **REST Client** no Visual Studio Code

1. Instale a extensão **REST Client** no VSCode:

   [Instalar REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

2. Com o backend rodando corretamente, abra o arquivo `client.http` na raiz do projeto.

3. No arquivo `client.http`, você encontrará requisições pré-configuradas para as APIs. Com a extensão **REST Client**, basta clicar em "Send Request" ao lado de cada requisição para testá-la.

Dessa forma, você poderá testar facilmente os endpoints da aplicação diretamente no editor, sem a necessidade de ferramentas externas.

### Opção 2: Postman

Você também pode utilizar o **Postman** para testar as APIs. Utilize a documentação da API no Postman para importar e executar as requisições:

- [Documentação da API no Postman](https://documenter.getpostman.com/view/14714590/2sAY545xq5)

Para importar, basta clicar no link acima e seguir as instruções na interface do Postman.

