/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import {AxiosResponse} from "axios";

import {AEndpoint} from "./abstracts/AEndpoint";

export default class Comments extends AEndpoint {
    constructor() {
        super("/comments", "comments");
    }

    public async createComment(accessToken: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: "/",
            data: {
                "name": "carros"
            },
            headers: {
                "Authorization": accessToken, "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }
}
