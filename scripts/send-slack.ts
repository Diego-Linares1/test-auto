import { WebClient } from '@slack/web-api';
import * as fs from 'fs';

const token = process.env.SLACK_BOT_TOKEN;
if (!token) {
    throw new Error("SLACK_BOT_TOKEN no está definido en las variables de entorno.");
}

const slackClient = new WebClient(token);

// Función para leer resultados de Jest
const getJestResults = () => {
    const jestResultsPath = './test-results/test-results.json'; // Ruta del archivo de resultados
    if (!fs.existsSync(jestResultsPath)) {
        throw new Error(`No se encontró el archivo ${jestResultsPath}`);
    }

    return JSON.parse(fs.readFileSync(jestResultsPath, 'utf-8'));
};

// Obtener resultados de Jest
const jestResults = getJestResults();
const jestFailed = jestResults.numFailedTests;
const jestPassed = jestResults.numPassedTests;
const jestTotal = jestResults.numTotalTests;
const jestMessage = `Jest Results: ${jestPassed} / ${jestTotal} tests passed, ${jestFailed} failed.`;

// Construir el mensaje final para Slack
const message = `
  *Jest Test Results*:
  ${jestMessage}
`;

(async () => {
    try {
        await slackClient.chat.postMessage({
            channel: '#diego-ci', // Cambia esto al canal deseado
            text: message,
        });
        console.log('Resultado Jest enviado a Slack correctamente.');
    } catch (err) {
        console.error('Error al enviar notificación a Slack:', err);
    }
})();
