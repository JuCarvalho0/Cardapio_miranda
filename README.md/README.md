 **Desenvolvedora: Julia Cravalho**juliacarvalhosilva2006@gmail.com
 
# Espetinho do Miranda - Cardápio Digital

Este é o sistema de cardápio digital completo para o **Espetinho do Miranda**. O projeto consiste em uma interface moderna para os clientes visualizarem os produtos e um painel administrativo para gerenciar o cardápio em tempo real.

## Tecnologias Utilizadas

**Frontend:**
* HTML5, CSS3 e JavaScript (Vanilla)
* Design Responsivo (Mobile-first)
* Font Awesome (Ícones)
* Google Fonts (Oswald e Playfair Display)

**Backend & Banco de Dados:**
* Node.js & Express
* MongoDB & Mongoose (Banco de dados na nuvem - MongoDB Atlas)
* JSON Web Token (JWT) para autenticação
* Bcryptjs (Criptografia de senhas)
* Cloudinary (Armazenamento de imagens dos produtos)

**Hospedagem:**
* Frontend: Vercel
* Backend: Render
* Banco de Dados: MongoDB Atlas

---

## ⚙️ Como rodar o projeto localmente

### 1. Pré-requisitos
Você vai precisar ter instalado na sua máquina:
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [Git](https://git-scm.com/)
* Uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas/database) (para o banco de dados)

### 2. Clonando o repositório
```bash
git clone https://github.com/seu-usuario/espetinho-miranda.git
cd espetinho-


# Conexão com o MongoDB Atlas
MONGO_URI=mongodb://espetinhodomiranda1_db_user:arrozcomovo@ac-x2o4nzw-shard-00-00.t6flyhk.mongodb.net:27017,ac-x2o4nzw-shard-00-01.t6flyhk.mongodb.net:27017,ac-x2o4nzw-shard-00-02.t6flyhk.mongodb.net:27017/?ssl=true&replicaSet=atlas-c1dbs2-shard-0&authSource=admin

# Chave secreta para geração de Tokens de Login
JWT_SECRET=uma_chave_gigante_aleatoria_123456789

# Credenciais do Cloudinary (para upload de imagens)
CLOUDINARY_CLOUD_NAME=bpkvaquy
CLOUDINARY_API_KEY=623476912522625
CLOUDINARY_API_SECRET=DbII9x-MzwVabMHXYr43H-Ng4ZE

# Configurações do Administrador Inicial
ADMIN_EMAIL=espetinhodomiranda@yahoo.com
ADMIN_PASSWORD=JahTFK56

# URL do Frontend (para CORS)
FRONTEND_URL=*

# Porta do Servidor
PORT=4000