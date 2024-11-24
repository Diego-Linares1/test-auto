import { WebClient } from '@slack/web-api';
import * as fs from 'fs';

const token = process.env.SLACK_BOT_TOKEN;
if (!token) {
    throw new Error("SLACK_BOT_TOKEN no está definido en las variables de entorno.");
}

const slackClient = new WebClient(token);

// Función para leer resultados de SonarCloud
const getSonarResults = () => {
    const sonarResultsPath = 'sonar-results.json'; // Ruta del archivo de resultados
    if (!fs.existsSync(sonarResultsPath)) {
        throw new Error(`No se encontró el archivo ${sonarResultsPath}`);
    }

    return JSON.parse(fs.readFileSync(sonarResultsPath, 'utf-8'));
};

// Función para leer resultados de Jest
const getJestResults = () => {
    const jestResultsPath = './test-results/test-results.json'; // Ruta del archivo de resultados
    if (!fs.existsSync(jestResultsPath)) {
        throw new Error(`No se encontró el archivo ${jestResultsPath}`);
    }

    return JSON.parse(fs.readFileSync(jestResultsPath, 'utf-8'));
};

// Obtener resultados de SonarCloud
let sonarResults;
let sonarStatus = 'No disponible';
let sonarConditions = '';

try {
    sonarResults = getSonarResults();
    sonarStatus = sonarResults.projectStatus.status;
    sonarConditions = sonarResults.projectStatus.conditions.map((cond: any) => {
        return `*${cond.metricKey}*: ${cond.status}`;
    }).join('\n');
} catch (error) {
    console.error('Error al obtener resultados de SonarCloud:', error);
}

// Obtener resultados de Jest
let jestMessage = 'No disponible';
try {
    const jestResults = getJestResults();
    const jestFailed = jestResults.numFailedTests;
    const jestPassed = jestResults.numPassedTests;
    const jestTotal = jestResults.numTotalTests;
    jestMessage = `Jest Results: ${jestPassed} / ${jestTotal} tests passed, ${jestFailed} failed.`;
} catch (error) {
    console.error('Error al obtener resultados de Jest:', error);
}

// Construir el mensaje final
const message = `
  *SonarCloud Analysis*:
  Status: ${sonarStatus}
  ${sonarConditions ? sonarConditions : 'No se pudieron obtener condiciones de SonarCloud.'}

  *Jest Test Results*:
  ${jestMessage}
`;

(async () => {
    try {
        // Enviar notificación a Slack
        await slackClient.chat.postMessage({
            channel: '#general', // Cambia esto al canal deseado
            text: message,
        });
        console.log('Resultados de SonarCloud y Jest enviados a Slack correctamente.');
    } catch (err) {
        console.error('Error al enviar notificación a Slack:', err);
    }
})();
