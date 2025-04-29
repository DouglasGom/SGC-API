const axios = require('axios');

function linkCatraca(dispositivo) {
    return `${dispositivo.endereco}:${dispositivo.porta}`;
}

async function obterSessao(linkCatraca, dispositivo) {
    try {
      const response = await axios.post(`http://${linkCatraca}/login.fcgi`, {
        login: dispositivo.usuario,
        password: dispositivo.senha
      });
      console.log(`Sessão obtida para ${dispositivo.nome}:`, response.data.session);
      return response.data.session;
    } catch (error) {
      console.error(`Erro ao obter sessão para ${dispositivo?.nome}:`, error.message);
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