
import { GetMemberByUserName } from "./GetMemberByUserName";
import {commentRepo, memberRepo, postRepo} from "../../../repos";
import { GetMemberByUserNameController } from "./GetMemberByUserNameController";
import {userRepo} from "../../../../users/repos";

const getMemberByUserName = new GetMemberByUserName(
  memberRepo, userRepo, postRepo, commentRepo
)

const getMemberByUserNameController = new GetMemberByUserNameController(
  getMemberByUserName
)

export { 
  getMemberByUserName,
  getMemberByUserNameController
}
