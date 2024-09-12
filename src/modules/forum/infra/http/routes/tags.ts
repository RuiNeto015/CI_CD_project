import express from "express";
import {middleware} from "../../../../../shared/infra/http";
import {createTagController} from "../../../useCases/tags/createTag";
import {getMemberTagsController} from "../../../useCases/tags/getMemberTags";
import {getTagsController} from "../../../useCases/tags/getTags";
import {addTagToPostController} from "../../../useCases/tags/addTagToPost";
import {addTagsToCommentController} from "../../../useCases/tags/addTagsToComment";
import {deleteTagController} from "../../../useCases/tags/delete";

const tagsRouter = express.Router();

/**
 * @openapi
 * /api/v1/tags:
 *   post:
 *     tags:
 *       - Tags
 *     summary: Create a new tag
 *     description: Endpoint to create a new tag.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '403':
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '409':
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 */
tagsRouter.post("/", middleware.ensureAuthenticated(), (req, res) =>
    createTagController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/tags/mine:
 *   get:
 *     tags:
 *       - Tags
 *     summary: My tags
 *     description: Endpoint to get the tags that 'I' created
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetTagsResponseDTO'
 *       '403':
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BasicMessageResponse'
 */
tagsRouter.get("/mine", middleware.ensureAuthenticated(), (req, res) =>
    getMemberTagsController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/tags:
 *   get:
 *     tags:
 *       - Tags
 *     summary: All tags
 *     description: Endpoint to get all the tags supported by the system
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetTagsResponseDTO'
 *       '403':
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BasicMessageResponse'
 */
tagsRouter.get("/", middleware.includeDecodedTokenIfExists(), (req, res) =>
    getTagsController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/tags/mine:
 *   post:
 *     tags:
 *       - Tags
 *     summary: Associate tag to a post
 *     description: Endpoint to associate a tag to a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTagsToPostDTO'
 *     responses:
 *       '200':
 *         description: Successful response.
 *       '403':
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 */
tagsRouter.post("/post", middleware.includeDecodedTokenIfExists(), (req, res) =>
    addTagToPostController.execute(req, res)
);

tagsRouter.post("/comment", middleware.includeDecodedTokenIfExists(), (req, res) =>
    addTagsToCommentController.execute(req, res)
);

tagsRouter.post("/delete", middleware.includeDecodedTokenIfExists(), (req, res) =>
    deleteTagController.execute(req, res)
);

export {tagsRouter};
