import { Database } from 'bun:sqlite';

export interface ITask {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface IList {
  id?: number;
  name: string;
  tasks: ITask[];
}

export interface IBoard {
  id?: string;
  name: string;
  description: string;
}

export class TasksDatabase {
  private db: Database;

  constructor() {
    this.db = new Database('kanban.db');
    // Initialize the database
    this.init()
      .then(() => console.log('Kanban database initialized'))
      .catch(console.error);
  }

  // Get all boards
  async getBoards() {
    // return ["asdfasf"]
    return this.db.query('SELECT * FROM boards').all();
  }

  // Add a board
  async addBoard(board: IBoard) {
    return this.db.query(`INSERT INTO boards (name) VALUES (?) RETURNING id`).get(board.name) as IBoard;
  }

  // Update a board
  async updateBoard(id: number, board: IBoard) {
    return this.db.run(`UPDATE boards SET name = '${board.name}' WHERE id = ${id}`);
  }

  // Delete a board
  async deleteBoard(id: number) {
    return this.db.run(`DELETE FROM boards WHERE id = ${id}`);
  }

  // Initialize the database
  async init() {
    // Create tables for boards and lists
    await this.db.run('CREATE TABLE IF NOT EXISTS boards (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    await this.db.run('CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, board_id INTEGER)');
    // Create a foreign key constraint between lists and boards
    await this.db.run('PRAGMA foreign_keys=ON');
    await this.db.run('CREATE TRIGGER IF NOT EXISTS lists_fk_board_id ' +
      'BEFORE INSERT ON lists ' +
      'FOR EACH ROW ' +
      'BEGIN ' +
      '  SELECT CASE WHEN ((SELECT id FROM boards WHERE id = NEW.board_id) IS NULL) ' +
      '    THEN RAISE(ABORT, "Foreign key constraint failed") END; ' +
      'END;');
  }
}
