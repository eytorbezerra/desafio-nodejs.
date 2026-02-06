# Desafio de API Node.js - Gerenciamento de Tarefas

O projeto desenvolvido é um desafio que, trata-se de uma API RESTful desenvolvida do zero com Node.js (sem frameworks) para o gerenciamento de tarefas (To-Do List), incluindo funcionalidades avançadas como importação de CSV via Streams.

## 🚀 Tecnologias Utilizadas
- **Node.js** (Módulos Nativos: HTTP, Crypto, File System)
- **Streams** (Para leitura e processamento eficiente de grandes arquivos)
- **Banco de Dados em Memória** (Persistência em arquivo JSON local)

## ⚙️ Como rodar o projeto

1. Clone este repositório:
   
   git clone [https://github.com/eytorbezerra/desafio-nodejs..git](https://github.com/eytorbezerra/desafio-nodejs..git)


2. Entre na pasta:

cd desafio-nodejs


3. Instale as dependências:

npm install
 

4. Inicie o servidor:

node src/server.js


5. A API estará rodando em: `http://localhost:3333`

## 🧪 Rotas da API

| Método | Rota | Descrição |
| ---    | ---  |    ---    |
| POST | `/tasks` | Cria uma nova tarefa |
| GET | `/tasks` | Lista todas as tarefas |
| PUT | `/tasks/:id` | Atualiza uma tarefa existente |
| DELETE | `/tasks/:id` | Remove uma tarefa |
| PATCH | `/tasks/:id/complete` | Marca/Desmarca tarefa como concluída |



## 📖 Guia de Uso (Exemplos de Requisição)

Para testar a API, você pode usar ferramentas como **Insomnia**, **Postman** ou o terminal. Abaixo estão os exemplos de como enviar os dados.

# 1. Criar uma Tarefa (POST)

**URL:** `http://localhost:3333/tasks`
**Corpo (JSON):**

{
  "title": "Estudar Node.js",
  "description": "Aprofundar conhecimentos em Streams e HTTP module."
}


# 2. Listar Tarefas (GET)

**URL:** `http://localhost:3333/tasks`

**Opção com Filtro de Busca:**
**URL:** `http://localhost:3333/tasks?search=Node`
*(Retorna tarefas que contenham "Node" no título ou descrição)*

# 3. Atualizar uma Tarefa (PUT)

Substitua `:id` pelo ID da tarefa (ex: `f8d9...`).
**URL:** `http://localhost:3333/tasks/:id`
**Corpo (JSON):**

{
  "title": "Estudar Node.js Avançado",
  "description": "Focar em performance e Streams."
}


# 4. Marcar como Completa (PATCH)

Esta rota alterna o status da tarefa (Aberta <-> Concluída).
**URL:** `http://localhost:3333/tasks/:id/complete`
*(Não é necessário enviar corpo)*

# 5. Deletar uma Tarefa (DELETE)

**URL:** `http://localhost:3333/tasks/:id`
*(Não é necessário enviar corpo)*


# 📂 Funcionalidade Extra: Importação de CSV

O projeto suporta a importação em massa de tarefas através de um arquivo CSV, utilizando Node.js Streams para garantir que a aplicação não trave mesmo com arquivos gigantes.



Desenvolvido por **Eytor Bezerra** 🚀