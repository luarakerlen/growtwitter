import "dotenv/config";

import App from "./app";
import { envs } from "./envs";
import { HealthRoutes, UsersRoutes } from "./routes";

if (envs.PORT === undefined || envs.PORT == null) {
  console.log("Algo errado");

}
const app = new App(
  [
    HealthRoutes.bind(),
    UsersRoutes.bind()
  ],
  envs.PORT,
);

app.listen();
