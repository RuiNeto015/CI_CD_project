/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import {AxiosResponse} from "axios";

import {AEndpoint} from "./abstracts/AEndpoint";

export default class Tags extends AEndpoint {
    constructor() {
        super("/tags", "tags");
    }

    public async getAllTags(): Promise<AxiosResponse> {
        return this.restClient.sendGet({route: "/"});
    }

    public async createTag(accessToken: string): Promise<AxiosResponse> {
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

    public async addTagToPost(accessToken: string, postSlug: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: "/post",
            data: {
                "postSlug": postSlug,
                "tags": ["carros"]
            },
            headers: {
                "Authorization": accessToken, "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }

    public async getNumberOfUserTags(accessToken: string): Promise<AxiosResponse> {
        return this.restClient.sendGet({
            route: "/mine",
            headers: {
                "Authorization": accessToken, "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }
}
