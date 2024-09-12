/**
 * @openapi
 * components:
 *   schemas:
 *     LogoutDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user to log out.
 *       required:
 *         - userId
 */
export interface LogoutDTO {
  userId: string;
}