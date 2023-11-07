import { Elysia } from "elysia";
import AuthController from "../controllers/auth-controller";

class AuthRoutes {
  private authRoutes: Elysia;
  private authController: AuthController;
  constructor() {
    this.authController = new AuthController();
    this.authRoutes = new Elysia({ prefix: "/auth" });
  }
  private defineRoutes() {
    this.authRoutes.post("/sign-in", this.authController.signin);
    this.authRoutes.put("/sign-up", this.authController.signup);
  }

  public getRoutes() {
    this.defineRoutes()
    return this.authRoutes;
  }
}

const authRoutes = new AuthRoutes().getRoutes();
export default authRoutes;
