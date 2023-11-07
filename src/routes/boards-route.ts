import { Elysia } from "elysia";
import BoardsController from "../controllers/boards-controller";
import authorize from "../middlewares/authorise";

class BoardsRoutes {
  private boardsRoutes: Elysia;
  private boardsController: BoardsController;
  constructor() {
    this.boardsController = new BoardsController();
    this.boardsRoutes = new Elysia({ prefix: "/boards" });
  }
  private defineRoutes() {
    this.boardsRoutes.get("/", this.boardsController.getBoards, {
      beforeHandle: [authorize],
    });
    this.boardsRoutes.post("/", this.boardsController.addBoard, {
      beforeHandle: [authorize],
    });
    this.boardsRoutes.put("/:id", this.boardsController.updateBoard, {
      beforeHandle: [authorize],
    });
    this.boardsRoutes.get("/:id", this.boardsController.getBoard, {
      beforeHandle: [authorize],
    });
    this.boardsRoutes.delete("/:id", this.boardsController.deleteBoard, {
      beforeHandle: [authorize],
    });
  }

  public getRoutes() {
    this.defineRoutes();
    return this.boardsRoutes;
  }
}

const boardsRoutes = new BoardsRoutes().getRoutes();
export default boardsRoutes;
