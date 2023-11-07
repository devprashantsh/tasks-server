import { Elysia, t } from "elysia";
import { TasksDatabase } from "./db";
import boardsRoutes from "./routes/boards-route";
import jwt from "@elysiajs/jwt";
import cookie from "@elysiajs/cookie";
import authRoutes from "./routes/auth-route";

class TasksServer {
  private app: Elysia;

  constructor() {
    this.app = new Elysia()
      .use(
        jwt({
          name: "jwt",
          secret: process.env.JWT_SECRET,
        })
      )
      .use(cookie())
      // .derive(({ request: { headers }, store }) => {
      //   return {
      //     authorization: headers.get("Authorization"),
      //   };
      // });

    // .decorate("db", new TasksDatabase());
    this.configureRoutes();
    this.startServer();
  }

  private configureRoutes() {
    this.app.group("/v1", (app) =>
      app.get("/", this.getHelloMessage).use(boardsRoutes).use(authRoutes)
    );
  }

  private getHelloMessage = () => {
    return { message: "hello tasks server" };
  };

  private startServer() {
    this.app.listen(4000);
    console.log(
      `Elysia server is running at ${this.app.server?.hostname}:${this.app.server?.port}`
    );
  }
}

new TasksServer();
