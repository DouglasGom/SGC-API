// controllers/statusController.js
const deviceService = require('../services/deviceService');
const config = require('../config/config');

exports.getStatus = async (req, res) => {
  const statusDispositivos = [];

  for (let i = 0; i < config.dispositivos.length; i++) {
    const link = deviceService.linkCatraca(i);
    const dispositivo = config.dispositivos[i];
    const session = await deviceService.obterSessao(link, i);

    if (!session) {
      statusDispositivos.push({ name: dispositivo.name, status: 'Erro ao obter sessão' });
      continue;
    }

    const sessaoValida = await deviceService.verificarSessao(session, link);
    if (sessaoValida) {
      statusDispositivos.push({ name: dispositivo.name, status: 'Conectado com sucesso' });
    } else {
      statusDispositivos.push({ name: dispositivo.name, status: 'Sessão inválida' });
    }
  }

  res.json(statusDispositivos);
};