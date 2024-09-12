/**
 * @openapi
 * components:
 *   schemas:
 *     AddTagsToPostDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user adding tags to the post.
 *         postSlug:
 *           type: string
 *           description: The slug of the post to which tags are being added.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of tag names to be added to the post.
 *       required:
 *         - userId
 *         - postSlug
 *         - tags
 */
export interface AddTagsToPostDTO {
    userId: string;
    postSlug: string;
    tags: string[];
}
