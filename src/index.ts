import { Elysia, t } from "elysia";
import { TasksDatabase } from "./db";
import BoardsRoutes from "./routes/boards-route";

class TasksServer {
  private app: Elysia;

  constructor() {
    this.app = new Elysia().decorate("db", new TasksDatabase());
    this.configureRoutes();
    this.startServer();
  }

  private configureRoutes() {
    this.app.group("/v1", (app) =>
      app
        .get("/", this.getHelloMessage)
        .group("/boards", (app) => BoardsRoutes)
    );
  }

  private getHelloMessage = () => {
    return { message: "hello tasks server" };
  };

  private startServer() {
    this.app.listen(4000);
    console.log(`Elysia server is running at ${this.app.server?.hostname}:${this.app.server?.port}`);
  }
}

new TasksServer();
