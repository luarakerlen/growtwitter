import "dotenv/config";

import App from "./app";
import { envs } from "./envs";
import { AuthRoutes, FollowsRoutes, HealthRoutes, LikesRoutes, TweetsRoutes, UsersRoutes } from "./routes";

if (envs.PORT === undefined || envs.PORT == null) {
  console.log("Algo errado");

}
const app = new App(
  [
    HealthRoutes.bind(),
    UsersRoutes.bind(),
    AuthRoutes.bind(),
    FollowsRoutes.bind(),
    TweetsRoutes.bind(),
    LikesRoutes.bind(),
  ],
  envs.PORT,
);

app.listen();
