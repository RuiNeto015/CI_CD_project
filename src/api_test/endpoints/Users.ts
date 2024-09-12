import { AxiosResponse } from "axios";

/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { AEndpoint } from "./abstracts/AEndpoint";
 
export default class Users extends AEndpoint {
  constructor() {
    super("/users", "users");
  }

  /**
   * This method is used to login, using the REST API.
   * For the moment, the username and password are hardcoded. 
   * 
   * @returns the result of the post request. If sucessful, the response will contain an access token and refresh token.
   */
  public async postLogin(): Promise<AxiosResponse> {
    return this.restClient.sendPost({ route: "/login", data: { username: "atb", password: "atbatb" } });
  }

  public async getMe(accessToken: string): Promise<AxiosResponse> {
    return this.restClient.sendGet({ route: "/me", headers: { "Authorization": accessToken, "Accept": "application/json",
    "Content-Type": "application/json" } } );
  }  

  public async post(): Promise<AxiosResponse> {
    return this.restClient.sendPost({ route: "/", data: { username: "atb", email: "atb@isep.ipp.pt", password: "atbatb" } });
  }

}
