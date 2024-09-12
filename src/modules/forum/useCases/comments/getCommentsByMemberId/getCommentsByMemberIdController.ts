import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { CommentDetailsMap } from "../../../mappers/commentDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { GetCommentsByMemberId } from "./getCommentsByMemberId";
import { GetCommentsByMemberIdRequestDTO } from "./GetCommentsByMemberIdRequestDTO";
import { GetCommentsByMemberIdResponseDTO } from "./getCommentsByMemberIdResponseDTO";
import { ICommentTagsRepo } from "../../../repos/commentTagsRepo";

export class GetCommentsByMemberIdController extends BaseController {
  private useCase: GetCommentsByMemberId;
  private commentTagsRepo: ICommentTagsRepo;

  constructor(useCase: GetCommentsByMemberId, commentTagsRepo: ICommentTagsRepo) {
    super();
    this.useCase = useCase;
    this.commentTagsRepo = commentTagsRepo;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: GetCommentsByMemberIdRequestDTO = {
      memberId: req.query.memberId,
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
        const commentDetails = result.value.getValue();
        return this.ok<any>(res, {
          posts: await Promise.all(
            commentDetails.map(async (c) => {
              try {
                const tags = await this.commentTagsRepo.getCommentTags(c.commentId.id.toString());

                return {
                  ...CommentDetailsMap.toDTO(c),
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
