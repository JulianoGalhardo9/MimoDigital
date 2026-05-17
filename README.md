# 🎁 MimoDigital

> Crie presentes digitais inesquecíveis em forma de talões de cupons personalizados.

**MimoDigital** é um aplicativo web progressivo (PWA) onde o usuário cria um talão de cupons digital — como "Vale Jantar", "Vale Massagem" ou "Vale Cinema" — gera um link exclusivo e envia para a pessoa presenteada, que pode visualizar e resgatar os cupons em tempo real.

🔗 **Demo ao vivo:** [mimodigital-omega.vercel.app](https://mimodigital-omega.vercel.app)  
📦 **Repositório:** [github.com/JulianoGalhardo9/MimoDigital](https://github.com/JulianoGalhardo9/MimoDigital)

---

## 📸 Visão Geral

| Criação do Talão | Link para Presenteado |
|---|---|
| O usuário personaliza nome, cupons e mensagem | Um link único é gerado e enviado |

---

## 🚀 Tecnologias Utilizadas

### 💻 Frontend
| Tecnologia | Descrição |
|---|---|
| React + TypeScript | Interface reativa e tipada |
| Vite | Build tool de alta performance |
| Tailwind CSS | Estilização responsiva e utilitária |
| Axios | Cliente HTTP para comunicação com a API |
| Vite PWA Plugin | Service Worker e instalação como App nativo |

### ⚙️ Backend
| Tecnologia | Descrição |
|---|---|
| .NET 9 Web API + C# | API RESTful performática |
| Entity Framework Core | ORM para persistência de dados |
| MediatR | Padrão CQRS para separação de responsabilidades |
| Npgsql | Driver PostgreSQL para .NET |

### 🗄️ Banco de Dados & Infraestrutura
| Tecnologia | Descrição |
|---|---|
| PostgreSQL | Banco de dados relacional |
| Supabase | Hospedagem gerenciada do PostgreSQL |
| Docker & Docker Compose | Ambiente de desenvolvimento local padronizado |

---

## 📦 Estrutura do Projeto

```
MimoDigital/
├── backend/
│   ├── MimoDigital.API/            # Ponto de entrada da Web API e Controllers
│   ├── MimoDigital.Application/    # Casos de uso, Commands e Handlers (CQRS)
│   ├── MimoDigital.Domain/         # Entidades e regras de negócio
│   └── MimoDigital.Infrastructure/ # Persistência e configuração do EF Core
├── frontend/
│   └── src/
│       ├── api/                    # Configuração do Axios (apiClient.ts)
│       ├── components/             # Componentes reutilizáveis
│       └── pages/                  # Telas (Criação, Visualização, Resgate)
├── docker-compose.yml              # Orquestração do banco local
└── .gitignore
```

---

## 🔧 Como Rodar Localmente

### Pré-requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org)
- [Docker](https://www.docker.com/) instalado e rodando

### 1. Clonar o repositório

```bash
git clone https://github.com/JulianoGalhardo9/MimoDigital.git
cd MimoDigital
```

### 2. Subir o banco de dados local

```bash
docker compose up -d
```

### 3. Configurar e rodar o backend

```bash
cd backend/MimoDigital.API
dotnet ef database update
dotnet run
```

A API estará disponível em: `http://localhost:5280`  
Swagger disponível em: `http://localhost:5280/swagger`

### 4. Configurar e rodar o frontend

Em um novo terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

> **Variáveis de ambiente:** Crie um arquivo `.env.local` na pasta `frontend/` com o seguinte conteúdo:
> ```
> VITE_API_URL=http://localhost:5280
> ```

---

## 🌐 Arquitetura de Produção

```
┌─────────────────────┐         ┌─────────────────────┐         ┌─────────────────────┐
│      Vercel         │  HTTPS  │       Render         │   TLS   │      Supabase        │
│  (Frontend / PWA)   │────────▶│   (Backend / API)    │────────▶│  (PostgreSQL)        │
│  React + Vite       │         │   .NET 9 + Docker    │         │  Session Pooler IPv4 │
└─────────────────────┘         └─────────────────────┘         └─────────────────────┘
```

| Camada | Serviço | Detalhes |
|---|---|---|
| Frontend | [Vercel](https://vercel.com) | Deploy automático via Git, HTTPS nativo, variável `VITE_API_URL` injetada no build |
| Backend | [Render](https://render.com) | Container Docker, variável `ConnectionStrings__DefaultConnection` via environment |
| Banco | [Supabase](https://supabase.com) | PostgreSQL gerenciado, conexão via Session Pooler IPv4 na porta 5432 |

---

## 📋 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/coupon-books` | Cria um novo talão de cupons |
| `GET` | `/api/coupon-books/{id}` | Busca um talão pelo ID |

---

## 👤 Autor

**Juliano Galhardo**  
Desenvolvimento fullstack e infraestrutura

[![GitHub](https://img.shields.io/badge/GitHub-JulianoGalhardo9-181717?style=flat&logo=github)](https://github.com/JulianoGalhardo9)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
