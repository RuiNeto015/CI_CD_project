/**
 * @openapi
 * components:
 *   schemas:
 *     UserCreateDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user.
 *       required:
 *         - username
 *         - email
 *         - password
 */
export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}