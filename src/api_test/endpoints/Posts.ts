/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
 */
import {AxiosResponse} from "axios";

import {AEndpoint} from "./abstracts/AEndpoint";
import {TextUtils} from "../../shared/utils/TextUtils";
import {DecodedExpressRequest} from "../../modules/users/infra/http/models/decodedRequest";

export default class Posts extends AEndpoint {
    constructor() {
        super("/posts", "posts");
    }

    public async getPopularPosts(): Promise<AxiosResponse> {
        return this.restClient.sendGet({route: "/popular"});
    }

    public async getRecentPosts(): Promise<AxiosResponse> {
        return this.restClient.sendGet({route: "/recent"});
    }

    public async createPost(accessToken: string): Promise<AxiosResponse> {
        return this.restClient.sendPost({
            route: "/",
            data: {
                "title": "THIS THE TITLE OF THE TEST POST",
                "text": "THIS IS THE BODY OF THE TEST POST",
                "postType": "text",
                "link": null,
            },
            headers: {
                "Authorization": accessToken, "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }

    public async getNumberOfPostTags(accessToken: string): Promise<AxiosResponse> {
        return this.restClient.sendGet({
            route: "/popular",
            headers: {
                "Authorization": accessToken, "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });
    }
}
