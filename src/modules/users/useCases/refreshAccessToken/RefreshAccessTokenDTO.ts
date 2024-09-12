
import { RefreshToken } from "../../domain/jwt";

/**
 * @openapi
 * components:
 *   schemas:
 *     RefreshAccessTokenDTO:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: The refresh token used to obtain a new access token.
 *       required:
 *         - refreshToken
 */
export interface RefreshAccessTokenDTO {
  refreshToken: RefreshToken;
}