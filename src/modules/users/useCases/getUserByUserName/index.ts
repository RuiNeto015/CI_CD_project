
import { GetUserByUserName } from "./GetUserByUserName";
import { GetUserByUserNameController } from "./GetUserByUserNameController";
import { userRepo } from "../../repos";
import {commentRepo, memberRepo, postRepo} from "../../../forum/repos";

const getUserByUserName = new GetUserByUserName(
  userRepo, commentRepo, memberRepo, postRepo
)

const getUserByUserNameController = new GetUserByUserNameController(
  getUserByUserName
)

export { 
  getUserByUserName,
  getUserByUserNameController
}