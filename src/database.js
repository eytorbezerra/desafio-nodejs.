// src/database.js
import fs from 'node:fs/promises';
import { URL } from 'node:url';

// Define o caminho do arquivo físico onde os dados serão salvos
const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {}; // Propriedade privada (#) para proteger o acesso direto aos dados

  constructor() {
    // Ao iniciar, tenta ler o arquivo existente para carregar os dados em memória
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist(); // Se não existir, cria o arquivo vazio
      });
  }

  // Método auxiliar para salvar os dados da memória no arquivo físico (Persistência)
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    // Lógica de filtro genérica para qualquer tabela
    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist(); // Salva no arquivo sempre que insere um dado novo
    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if (rowIndex > -1) {
      const existingData = this.#database[table][rowIndex];
      this.#database[table][rowIndex] = { ...existingData, ...data };
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }
}