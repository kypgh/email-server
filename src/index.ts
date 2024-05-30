import express from "express";
import cors from "cors";
import { PORT } from "config/env";
import folderRouter from "utils/folderRouter";
import path from "path";
import defaultErrorHandler from "utils/defaultErrorHandler";
import { loggerConsole } from "config/logger";
import { render } from "@react-email/components";
import HelloEmail from "emails/PIX/test2";

async function main() {
  const server = express();

  server.use(loggerConsole);
  server.use(cors());
  server.use(express.json());
  server.use(express.static(path.resolve(__dirname, "./public")));

  await folderRouter(server, path.resolve(__dirname, "./routes"));

  server.use("*", (req, res) => {
    res.status(404).json({ message: "Not Found" });
  });

  server.use(defaultErrorHandler);

  server.listen(PORT, () => {
    console.info(`Server running on port http://localhost:${PORT}`);
  });
}

main();
