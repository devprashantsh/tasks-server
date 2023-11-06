import { Elysia, t } from "elysia";
import { IBoard } from "../db";
import { generateUniqueId } from "../utils";

class BoardsRoutes {
  private boardsRoutes: Elysia;
  private boards: IBoard[] = [];
  constructor() {
    this.boardsRoutes = new Elysia()
      .state("boardsRoutes", 1)
      // .decorate("db", new TasksDatabase());

    this.boardsRoutes.get("/boards", this.getBoards);
    this.boardsRoutes.post("/boards", this.addBoard);
  }

  private getBoards = () => {
    return this.boards;
  };

  private addBoard = ({ body }: { body: IBoard }) => {
    const id = generateUniqueId(10);
    this.boards.push({
      id,
      name: body.name,
      description: body.description,
    });
    return { success: true, id };
  };

  public getRoutes() {
    return this.boardsRoutes;
  }
}

const boardsRoutes = new BoardsRoutes().getRoutes();
export default boardsRoutes;
