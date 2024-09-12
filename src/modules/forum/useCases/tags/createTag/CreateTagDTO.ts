/**
 * @openapi
 * components:
 *   schemas:
 *     CreateTagDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user creating the tag.
 *         name:
 *           type: string
 *           description: The name of the tag.
 *       required:
 *         - userId
 *         - name
 */
export interface CreateTagDTO {
    userId: string;
    name: string;
}
