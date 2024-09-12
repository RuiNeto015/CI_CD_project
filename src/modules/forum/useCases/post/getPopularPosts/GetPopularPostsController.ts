import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { GetPopularPostsRequestDTO } from "./GetPopularPostsRequestDTO";
import { GetPopularPosts } from "./GetPopularPosts";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { IPostRepo } from "../../../repos/postRepo";
import { IPostTagsRepo } from "../../../repos/postTagsRepo";

export class GetPopularPostsController extends BaseController {
  private useCase: GetPopularPosts;
  private postsRepo: IPostRepo;
  private postTagsRepo: IPostTagsRepo;

  constructor(useCase: GetPopularPosts, postsRepo: IPostRepo, postTagsRepo: IPostTagsRepo) {
    super();
    this.useCase = useCase;
    this.postsRepo = postsRepo;
    this.postTagsRepo = postTagsRepo;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: GetPopularPostsRequestDTO = {
      offset: req.query.offset,
      userId: !!req.decoded === true ? req.decoded.userId : null,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const postDetails = result.value.getValue();
        return this.ok<any>(res, {
          posts: await Promise.all(
            postDetails.map(async (p) => {
              try {
                const postId = (await this.postsRepo.getPostBySlug(p.slug.value)).id.toString();
                const tags = await this.postTagsRepo.getPostTags(postId);

                return {
                  ...PostDetailsMap.toDTO(p),
                  tags: tags,
                };
              } catch (err) {
                return null;
              }
            })
          ),
        });
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
