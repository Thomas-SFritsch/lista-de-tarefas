# Lista de Tarefas (To-Do List)

Aplicativo completo de lista de tarefas com backend em Python (FastAPI) e frontend em React (Vite).

## Pré-requisitos

- Python 3.11+
- Node.js 18+
- npm

## Estrutura do Projeto

```
todo-app/
├── backend/
│   ├── main.py          # Rotas da API FastAPI
│   ├── models.py        # Modelo SQLAlchemy (Task)
│   ├── database.py      # Configuração do banco SQLite
│   ├── schemas.py       # Schemas Pydantic (validação)
│   └── requirements.txt
└── frontend/
    └── src/
        ├── api.js               # Chamadas HTTP com Axios
        ├── components/
        │   ├── TaskForm.jsx     # Formulário para criar tarefa
        │   ├── TaskList.jsx     # Lista de tarefas
        │   └── TaskItem.jsx     # Item individual (checkbox, editar, excluir)
        ├── App.jsx
        └── App.css
```

## Como Rodar

### Backend

```bash
cd backend

# Criar ambiente virtual (já criado)
python3 -m venv venv
source venv/bin/activate

# Instalar dependências (já instalado)
pip install -r requirements.txt

# Rodar o servidor
uvicorn main:app --reload
```

O backend estará disponível em `http://localhost:8000`.
Documentação Swagger: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend

# Instalar dependências (já instalado)
npm install

# Rodar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

## Funcionalidades

- Criar tarefas (título obrigatório)
- Listar todas as tarefas
- Marcar/desmarcar tarefa como concluída
- Editar título de tarefa existente
- Excluir tarefas
- Filtro: Todas / Pendentes / Concluídas
- Feedback visual (texto riscado para concluídas)
- Mensagem quando a lista está vazia
- Tratamento de erros na API

## API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/tasks` | Lista tarefas (filtro opcional: `?completed=true/false`) |
| POST | `/tasks` | Cria nova tarefa |
| PUT | `/tasks/{id}` | Atualiza tarefa |
| DELETE | `/tasks/{id}` | Remove tarefa |
