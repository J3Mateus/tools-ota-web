import axios from 'axios';

const BackendClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Substitua pela URL da sua API
    timeout: 10000, // Tempo limite de 10 segundos
});

// Interceptador de requisição
BackendClient.interceptors.request.use(
    (config) => {
        // Adicione aqui qualquer configuração antes da requisição ser enviada
        return config;
    },
    (error) => {
        // Tratamento de erro na requisição
        return Promise.reject(error);
    }
);

// Interceptador de resposta
BackendClient.interceptors.response.use(
    (response) => {
        // Qualquer código de resposta que não esteja na faixa de 2xx
        // será tratado aqui
        return response;
    },
    (error) => {
        // Tratamento de erro na resposta
        return Promise.reject(error);
    }
);

export default BackendClient;