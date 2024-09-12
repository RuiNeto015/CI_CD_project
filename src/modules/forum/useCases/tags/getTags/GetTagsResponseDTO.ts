/**
 * @openapi
 * components:
 *   schemas:
 *     GetTagsResponseDTO:
 *       type: object
 *       properties:
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               tag:
 *                 type: string
 *                 description: The tag name.
 *               id:
 *                 type: string
 *                 description: The ID of the tag.
 *       required:
 *         - tags
 */
export interface GetTagsResponseDTO {
    tags: { tag: string; id: string }[];
}
