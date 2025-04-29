// src/db-utils.js
const db = require('../config/database'); // Ajuste o caminho se necessário

async function buscarDispositivosPorIds(ids) {
    try {
        const [dispositivos] = await db.query(
            'SELECT nome, endereco, porta, usuario, senha FROM dispositivos WHERE id IN (?)',
            [ids]
        );
        return dispositivos;
    } catch (error) {
        console.error('Erro ao buscar dispositivos:', error);
        throw error;
    }
}

async function buscarTodosDispositivos() {
    try {
        const [dispositivos] = await db.query(
            'SELECT id, nome, endereco, porta, usuario, senha FROM dispositivos'
        );
        console.log(dispositivos);
        return dispositivos;
    } catch (error) {
        console.error('Erro ao buscar todos os dispositivos:', error);
        throw error;
    }
}

module.exports = { buscarTodosDispositivos, buscarDispositivosPorIds };