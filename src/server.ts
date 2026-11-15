
import { app } from "./app";
import { initializeDatabase } from "./database/init";

const PORT = 3000;

async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    process.exit(1);
  }
}

startServer();
