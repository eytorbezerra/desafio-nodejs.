// src/routes.js
import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      // Validação simples para garantir integridade dos dados
      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'Title and description are required' })
        );
      }

      const task = {
        id: randomUUID(), // Gera um ID único universal
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert('tasks', task);

      return res.writeHead(201).end(JSON.stringify(task));
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      // Busca tarefas, aplicando filtro de busca se o parâmetro 'search' existir
      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null);

      return res.end(JSON.stringify(tasks));
    }
  },
  {
    method: 'PUT', // Rota para atualização completa de uma tarefa
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'Title or description are required to update' })
        );
      }

      // Verifica se a tarefa existe antes de tentar atualizar
      const [task] = database.select('tasks', null).filter(t => t.id === id);

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task not found' }));
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date()
      });

      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      
      const [task] = database.select('tasks', null).filter(t => t.id === id);

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task not found' }));
      }

      database.delete('tasks', id);

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH', // PATCH é usado para atualizações parciais (neste caso, apenas o status)
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', null).filter(t => t.id === id);

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task not found' }));
      }

      // Lógica de toggle: se está completada, remove a data; se não, adiciona a data atual
      const isCompleted = !!task.completed_at;
      const completed_at = isCompleted ? null : new Date();

      database.update('tasks', id, { completed_at, updated_at: new Date() });

      return res.writeHead(204).end();
    }
  }
];