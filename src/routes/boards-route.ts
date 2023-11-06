import { Elysia, ElysiaConfig, t } from "elysia";
import BoardsController from "../controllers/boards-controller";

class BoardsRoutes {
  private boardsRoutes: Elysia;
  private boardsController: BoardsController;
  constructor() {
    this.boardsController = new BoardsController();
    this.boardsRoutes = new Elysia({ prefix: "/boards" });
  }
  private defineRoutes() {
    // Bind controller methods to the class instance
    this.boardsRoutes.get("/", this.boardsController.getBoards.bind(this));
    this.boardsRoutes.post("/", this.boardsController.addBoard);
    this.boardsRoutes.put("/:id", this.boardsController.updateBoard);
    this.boardsRoutes.get("/:id", this.boardsController.getBoard);
    this.boardsRoutes.delete("/:id", this.boardsController.deleteBoard);
  }

  public getRoutes() {
    this.defineRoutes()
    return this.boardsRoutes;
  }
}

const boardsRoutes = new BoardsRoutes().getRoutes();
export default boardsRoutes;
