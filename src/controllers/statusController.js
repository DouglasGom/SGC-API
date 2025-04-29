// controllers/statusController.js
const deviceService = require('../services/deviceService');
const { buscarTodosDispositivos } = require('../config/db-utils');

exports.getStatus = async (req, res) => {
    const statusDispositivos = [];
    const dispositivos = await buscarTodosDispositivos();

    if (!dispositivos) {
      return res.status(500).json({ message: 'Erro ao buscar dispositivos do banco de dados' });
    }

    for (const dispositivo of dispositivos) {
      const link = deviceService.linkCatraca(dispositivo);
      const session = await deviceService.obterSessao(link, dispositivo);

      if (!session) {
        statusDispositivos.push({ id: dispositivo.id, nome: dispositivo.nome, status: 'Erro ao obter sessão' });
        continue;
      }

      const sessaoValida = await deviceService.verificarSessao(session, link);
      if (sessaoValida) {
        statusDispositivos.push({ id: dispositivo.id, nome: dispositivo.nome, status: 'Conectado com sucesso' });
      } else {
        statusDispositivos.push({ id: dispositivo.id, nome: dispositivo.nome, status: 'Sessão inválida' });
      }
    }

    res.json(statusDispositivos);
};