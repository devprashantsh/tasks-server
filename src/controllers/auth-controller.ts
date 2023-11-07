import { generateUniqueId } from "../utils";
interface IUser {
    name: string,
    email: string,
    password: string,
}
class AuthController {
  private users: IUser[] = [];

  public getUsers = () => {
    return this.users;
  };
  public  signin = async ({ jwt, cookie, setCookie, body }: any) => {
    const userFound = this.users.find(user => (user.email === body.email && user.password === body.password) )
    if (!userFound) {
        return {success:false, message: "User not found"}
    }
    setCookie("auth", await jwt.sign(userFound), {
      httpOnly: true,
      maxAge: 7 * 86400,
    });
    return {success: true, user: userFound};
  }
  public  signup = async ({ jwt, cookie, setCookie, body }: any) => {
    const user = {
        name: body.name,
        email: body.email,
        password: body.password,
    }
    this.users.push(user)
    setCookie("auth", await jwt.sign(user), {
      httpOnly: true,
      maxAge: 7 * 86400,
    });
    return {success: true};
  }

}

export default AuthController;
