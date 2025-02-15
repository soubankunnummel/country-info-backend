import app from "./app";
import { config } from "./config/config";

// TODO//add configer

const start = () => {
  try {
    app.listen(config.port, () => {
      console.log(`server is running on port ${config.port}`);
    });
  } catch (error) {
    console.log("Erro in Start server", error);
    process.exit(1);
  }
};  

start();
 