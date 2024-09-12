
import { JWTToken, RefreshToken } from "../../domain/jwt";

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - username
 *         - password
 *
 *     LoginDTOResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The JWT access token.
 *         refreshToken:
 *           type: string
 *           description: The JWT refresh token.
 */


export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginDTOResponse {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
}
