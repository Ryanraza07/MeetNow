let IS_PROD = true;

const server = IS_PROD ?

    "https://meetnowbackend-dyha.onrender.com":
    "https://localhost:8000"
    

export default server;