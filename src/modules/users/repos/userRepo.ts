
import { User } from "../domain/user";
import { UserEmail } from "../domain/userEmail";
import { UserName } from "../domain/userName";
import {MostPostsUser} from "../domain/mostPostsUser";

export interface IUserRepo {
  exists (userEmail: UserEmail): Promise<boolean>;
  getUserByUserId (userId: string): Promise<User>;
  getUserByUserName (userName: UserName | string): Promise<User>;
  save (user: User): Promise<void>;
  getUserWithMostPosts (): Promise<MostPostsUser>;
}
