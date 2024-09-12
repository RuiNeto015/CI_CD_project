import {APIResponse} from "../../../shared/infra/services/APIResponse";
import {BaseAPI} from "../../../shared/infra/services/BaseAPI";
import {IAuthService} from "../../users/services/authService";
import {Result} from "../../../shared/core/Result";
import {left, right} from "../../../shared/core/Either";
import {TagModel} from "../models/TagModel";

export interface ITagService {
    getTags(commentId: string): Promise<APIResponse<void>>;
}

export class TagService extends BaseAPI implements ITagService {

    constructor(authService: IAuthService) {
        super(authService);
    }

    async getTags(userId: string): Promise<APIResponse<any>> {
        try {
            const accessToken = this.authService.getToken('access-token');
            const isAuthenticated = !!accessToken === true;
            const auth = {
                authorization: accessToken
            };

            const response = await this.get(`/tags`, null,
                isAuthenticated ? auth : null
            );
            // const mock: TagModel[] = [{
            //     posts: 2,
            //     tag: "desporto",
            //     memberId: "aa769cda-8d60-4ccc-adf7-4ad814c09f28"
            // }, {
            //     posts: 1,
            //     tag: "funny",
            //     memberId: "aa769cda-8d60-4ccc-adf7-4ad814c09f28"
            // }];
            // const posts: TagModel[] = response.value.getValue().tags;
            console.log(response.data.tags)
            return right(Result.ok<TagModel[]>(response.data.tags));
            // return right(Result.ok<TagModel[]>(mock));
        } catch (err) {
            console.log(err)
            return left(err.response ? err.response.data.message : "Connection failed")
        }
    }


    async getMineTags(): Promise<APIResponse<any>> {
        try {
            const accessToken = this.authService.getToken('access-token');
            const isAuthenticated = !!accessToken === true;
            const auth = {
                authorization: accessToken
            };

            const response = await this.get(`/tags/mine`, null,
                isAuthenticated ? auth : null
            );
            console.log(response.data.tags)
            return right(Result.ok<TagModel[]>(response.data.tags));
        } catch (err) {
            console.log(err)
            return left(err.response ? err.response.data.message : "Connection failed")
        }
    }

    public async createTag(name: string): Promise<APIResponse<void>> {
        console.log('tag in create', name)
        try {
            const result = await this.post('/tags', {name: name}, null, {
                authorization: this.authService.getToken('access-token')
            });
            console.log('create tag result', result)
            return right(Result.ok<void>());
        } catch (err) {
            console.log('create tag err', err)
            return left(err.response ? err.response.data.message : "Connection failed")
        }
    }


    public async associateTagToPost(tagName: string, postSlug: string): Promise<APIResponse<void>> {
        try {
            // await this.post('/tags/post', {postSlug: postSlug, tag: tagName}, null, {
            //     authorization: this.authService.getToken('access-token')
            // });
            return right(Result.ok<void>());
        } catch (err) {
            return left(err.response ? err.response.data.message : "Connection failed")
        }
    }

    public async deleteTag(tagName: string): Promise<APIResponse<void>> {
        try {
            await this.post('/tags/delete', {tag: tagName}, null, {
                authorization: this.authService.getToken('access-token')
            });
            return right(Result.ok<void>());
        } catch (err) {
            return left(err.response ? err.response.data.message : "Connection failed")
        }
    }

}