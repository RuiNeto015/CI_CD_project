import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { GetMemberTags } from "./GetMemberTags";
import { GetMemberTagsRequestDTO } from "./GetMemberTagsRequestDTO";
import { GetMemberTagsResponseDTO } from "./GetMemberTagsResponseDTO";
import { IPostTagsRepo } from "../../../repos/postTagsRepo";
import { ICommentTagsRepo } from "../../../repos/commentTagsRepo";

export class GetMemberTagsController extends BaseController {
  private useCase: GetMemberTags;
  private postTagsRepo: IPostTagsRepo;
  private commentTagsRepo: ICommentTagsRepo;

  constructor(
    useCase: GetMemberTags,
    postTagsRepo: IPostTagsRepo,
    commentTagsRepo: ICommentTagsRepo
  ) {
    super();
    this.useCase = useCase;
    this.postTagsRepo = postTagsRepo;
    this.commentTagsRepo = commentTagsRepo;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: GetMemberTagsRequestDTO = {
      userId: userId,
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
