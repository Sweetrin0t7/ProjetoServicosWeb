# API Usuários e Serviços

API RESTful para gerenciamento de usuários e serviços, com autenticação via JWT, validação com Zod e persistência em SQLite via Prisma.

---

## Tecnologias

- Node.js + TypeScript  
- Express  
- Prisma ORM (SQLite)  
- JSON Web Tokens (JWT)  
- Zod para validação de dados  
- bcrypt para hash de senha  

---

## Funcionalidades

- Cadastro de usuários comuns (auto registro)  
- Login e geração de token JWT  
- CRUD completo para serviços, vinculados ao usuário autenticado  
- Usuários comuns só podem acessar/editar/excluir seus próprios serviços  
- Rotas de usuário (listagem, busca, exclusão) restritas a admins  
- Proteção de rotas via middleware de autenticação e autorização  

---

## Requisitos

- Node.js 18+  
- npm  

---

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/api-usuarios-servicos.git
cd api-usuarios-servicos
```

2. Instale
```
npm install
```

3. Configure as variáveis de ambiente criando o arquivo .env com conteúdo:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="seusecretotoken"
```

4. Gere o cliente Prisma e crie o banco de dados:
```
npx prisma generate
npx prisma migrate dev --name init
```
5. Inicie a API em modo desenvolvimento: (geração do admin ja ta dentro desse run)
```
npm run dev
```
