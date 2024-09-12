import {MostPostsUser} from "../domain/mostPostsUser";

/**
 * @openapi
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         isEmailVerified:
 *           type: boolean
 *           description: Indicates whether the user's email is verified.
 *         isAdminUser:
 *           type: boolean
 *           description: Indicates whether the user is an admin user.
 *         isDeleted:
 *           type: boolean
 *           description: Indicates whether the user is deleted.
 */
export interface UserDTO {
  username: string;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  isDeleted?: boolean;
  numberOfComments?: number;
  numberOfPosts?: number;
  email?: string;
  userWithMostPosts?: MostPostsUser
}
