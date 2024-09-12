import express from 'express';
import {createUserController} from '../../../useCases/createUser';
import {deleteUserController} from '../../../useCases/deleteUser';
import {getUserByUserNameController} from '../../../useCases/getUserByUserName';
import {loginController} from '../../../useCases/login';
import {middleware} from '../../../../../shared/infra/http';
import {getCurrentUserController} from '../../../useCases/getCurrentUser';
import {refreshAccessTokenController} from '../../../useCases/refreshAccessToken';
import {logoutController} from '../../../useCases/logout';

const userRouter = express.Router();

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateDTO'
 *     responses:
 *       200:
 *         description: Successful response.
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/BasicMessageResponse'
 */
userRouter.post('/',
    (req, res) => createUserController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get the current user
 *     description: Endpoint to get information about the current user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The user information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
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
userRouter.get('/me',
    middleware.ensureAuthenticated(),
    (req, res) => getCurrentUserController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     description: Endpoint for user login.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *     responses:
 *       '200':
 *         description: The user authentication information.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginDTOResponse'
 *       '404':
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '400':
 *         description: Bad request.
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
userRouter.post('/login',
    (req, res) => loginController.execute(req, res)
);


/**
 * @openapi
 * /api/v1/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: User logout
 *     description: Endpoint for user logout.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Confirmation of success.
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
userRouter.post('/logout',
    middleware.ensureAuthenticated(),
    (req, res) => logoutController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/token/refresh:
 *   post:
 *     tags:
 *       - Users
 *     summary: Refresh access token
 *     description: Endpoint to refresh the user's access token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTOResponse'
 *     responses:
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *       '404':
 *         description: Not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 */
userRouter.post('/token/refresh',
    (req, res) => refreshAccessTokenController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/{userId}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Endpoint to delete a user by ID.
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      '200':
 *         description: User deleted.
 *      '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 *      '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
 */
userRouter.delete('/:userId',
    middleware.ensureAuthenticated(),
    (req, res) => deleteUserController.execute(req, res)
);

/**
 * @openapi
 * /api/v1/users/{username}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by username
 *     description: Endpoint to get user information by username.
 *     parameters:
 *       - name: username
 *         in: path
 *         description: Username of the user to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response, returns information about the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDTO'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicMessageResponse'
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
userRouter.get('/:username',
    middleware.ensureAuthenticated(),
    (req, res) => getUserByUserNameController.execute(req, res)
);

export {userRouter};
