import { IBoard } from "../db";
import { generateUniqueId } from "../utils";

class BoardsController {
  private boards: IBoard[] = [];

  public getBoards = () => {
    return this.boards;
  };

  public addBoard = ({ body }: { body: IBoard }) => {
    console.log("got called add board");
    const id = generateUniqueId(10);
    this.boards.push({
      id,
      name: body.name,
      description: body.description,
    });
    return { success: true, id };
  };

  public updateBoard = ({
    params,
    body,
  }: {
    params: { id: string };
    body: IBoard;
  }) => {
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
  public getBoard = ({ params }: { params: { id: string } }) => {
    const boardId = params.id;
    const index = this.boards.findIndex((board) => board.id === boardId);

    if (index !== -1) {
      return this.boards[index];
    } else {
      return { success: false, error: "Board not found" };
    }
  };

  public deleteBoard = ({ params }: { params: { id: string } }) => {
    const boardId = params.id;
    const index = this.boards.findIndex((board) => board.id === boardId);

    if (index !== -1) {
      this.boards.splice(index, 1);
      return { success: true };
    } else {
      return { success: false, error: "Board not found" };
    }
  };
}

export default BoardsController;
