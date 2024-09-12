import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { GetTags } from "./GetTags";
import { IPostTagsRepo } from "../../../repos/postTagsRepo";
import { ICommentTagsRepo } from "../../../repos/commentTagsRepo";

export class GetTagsController extends BaseController {
  private useCase: GetTags;
  private postTagsRepo: IPostTagsRepo;
  private commentTagsRepo: ICommentTagsRepo;

  constructor(useCase: GetTags, postTagsRepo: IPostTagsRepo, commentTagsRepo: ICommentTagsRepo) {
    super();
    this.useCase = useCase;
    this.postTagsRepo = postTagsRepo;
    this.commentTagsRepo = commentTagsRepo;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    try {
      const result = await this.useCase.execute();
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        const tags = result.value.getValue();

        return this.ok<any>(res, {
          tags: await Promise.all(
            tags.map(async (t) => {
              try {
                return {
                  comments: await this.commentTagsRepo.getNumberOfUsages(t.id.toString()),
                  posts: await this.postTagsRepo.getNumberOfUsages(t.id.toString()),
                  tag: t.name.value,
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
