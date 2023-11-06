import { Elysia, ElysiaConfig, t } from "elysia";
import { IBoard } from "../db";
import { generateUniqueId } from "../utils";

class BoardsRoutes {
  private boardsRoutes: Elysia;
  private boards: IBoard[] = [];

  constructor() {
    this.boardsRoutes = new Elysia({ prefix: '/boards' });

    this.boardsRoutes.get("/", this.getBoards);
    this.boardsRoutes.post("/", this.addBoard);
    this.boardsRoutes.put("/:id", this.updateBoard);
    this.boardsRoutes.delete("/:id", this.deleteBoard);
  }

  private getBoards = () => {
    return this.boards;
  };

  private addBoard = ({ body }: { body: IBoard }) => {
    console.log("got called add board");
    const id = generateUniqueId(10);
    this.boards.push({
      id,
      name: body.name,
      description: body.description,
    });
    return { success: true, id };
  };

  private updateBoard = ({ params, body }: { params: { id: string }; body: IBoard }) => {
    const boardId = params.id;
    const index = this.boards.findIndex((board) => board.id === boardId);

    if (index !== -1) {
      this.boards[index] = {
        id: boardId,
        name: body.name,
        description: body.description,
      };
      return { success: true };
    } else {
      return { success: false, error: "Board not found" };
    }
  };

  private deleteBoard = ({ params }: { params: { id: string } }) => {
    const boardId = params.id;
    const index = this.boards.findIndex((board) => board.id === boardId);

    if (index !== -1) {
      this.boards.splice(index, 1);
      return { success: true };
    } else {
      return { success: false, error: "Board not found" };
    }
  };

  public getRoutes() {
    return this.boardsRoutes;
  }
}

const boardsRoutes = new BoardsRoutes().getRoutes();
export default boardsRoutes;
