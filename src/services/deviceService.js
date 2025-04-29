// services/deviceService.js
const axios = require('axios');
const config = require('../config/config');

function linkCatraca(i) {
  return config.dispositivos[i].ip + ':' + config.dispositivos[i].port;
}

async function obterSessao(linkCatraca, i) {
  try {
    const dispositivo = config.dispositivos[i];
    const response = await axios.post(`http://${linkCatraca}/login.fcgi`, {
      login: dispositivo.login,
      password: dispositivo.senha
    });
    console.log(`Sessão obtida para ${dispositivo.name}:`, response.data.session);
    return response.data.session;
  } catch (error) {
    console.error(`Erro ao obter sessão para ${config.dispositivos[i]?.name}:`, error.message);
    return null;
  }
}

async function verificarSessao(session, linkCatraca) {
  try {
    const response = await axios.post(`http://${linkCatraca}/session_is_valid.fcgi?session=${session}`);
    return response.data.session_is_valid;
  } catch (error) {
    console.error('Erro ao verificar sessão:', error.message);
    return false;
  }
}

module.exports = {
  linkCatraca,
  obterSessao,
  verificarSessao
};