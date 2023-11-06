import { Elysia, t } from "elysia";
import {  TasksDatabase } from "./db";
import boardsRoutes from "./routes/boards-route";

const app = new Elysia()
.decorate('db', new TasksDatabase())
.get("/", () => {
  return {message: "hello tasks server"}
})


app.use(boardsRoutes)


app.listen(4000);
console.log(
  `Elysia server is running at ${app.server?.hostname}:${app.server?.port}`
);
