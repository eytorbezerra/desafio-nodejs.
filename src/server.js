// src/server.js
import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

// Criação do servidor HTTP nativo do Node.js
// Usamos 'async/await' para garantir que o middleware de JSON seja processado completamente antes das rotas
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // Middleware: Intercepta a requisição para formatar o corpo (body) para JSON automaticamente
  await json(req, res);

  // Busca se a rota acessada existe no nosso arquivo de rotas
  const route = routes.find(route => {
    // Testa se o método (GET, POST...) e a URL batem com a Regex gerada
    return route.method === method && route.path.test(url);
  });

  if (route) {
    // Se a rota existe, extraímos os parâmetros da URL (ex: ID) e Query Params (ex: ?search=)
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? Object.fromEntries(new URLSearchParams(query)) : {};

    // Executa a função da rota encontrada
    return route.handler(req, res);
  }

  // Se nenhuma rota for encontrada, retorna 404
  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log('🔥 Server running on port 3333');
});