const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configurações dos dispositivos
const dispositivos = [
  {
    name: "Catraca 01",
    ip: '192.168.0.126',
    port: '81',
    login: 'admin',
    senha: 'admin'
  },
  {
    name: "Catraca 02",
    ip: '192.168.0.127',
    port: '82',
    login: 'admin',
    senha: 'admin'
  }
]

function linkCatraca(i) {
  return dispositivos[i].ip + ':' + dispositivos[i].port;
}

// Função para obter o token de sessão
async function obterSessao(linkCatraca, i) {
  try {
	const response = await axios.post(`http://${linkCatraca}/login.fcgi`, {
  	login: dispositivos[i].login,
  	password: dispositivos[i].senha
	});
  console.log(response.data.session);
	return response.data.session;
  } catch (error) {
	console.error('Erro ao obter sessão:', error.message);
	return null;
  }
}

// Função para verificar se a sessão é válida
async function verificarSessao(session, linkCatraca) {
  try {
	const response = await axios.post(`http://${linkCatraca}/session_is_valid.fcgi?session=${session}`);
	return response.data.session_is_valid;
  } catch (error) {
	console.error('Erro ao verificar sessão:', error.message);
	return false;
  }
}

// Endpoint para verificar a conexão com as catracas
app.get('/status', async (req, res) => {
  const statusDispositivos = [];

  for (let i = 0; i < dispositivos.length; i++) {
    const link = linkCatraca(i);
    const dispositivo = dispositivos[i];
    const session = await obterSessao(link, i);

    if (!session) {
      statusDispositivos.push({ name: dispositivo.name, status: 'Erro ao obter sessão' });
      continue; // Vai para a próxima catraca
    }

    const sessaoValida = await verificarSessao(session, link);
    if (sessaoValida) {
      statusDispositivos.push({ name: dispositivo.name, status: 'Conectado com sucesso' });
    } else {
      statusDispositivos.push({ name: dispositivo.name, status: 'Sessão inválida' });
    }
  }

  // Envia a resposta com o status de todos os dispositivos
  res.json(statusDispositivos);
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
