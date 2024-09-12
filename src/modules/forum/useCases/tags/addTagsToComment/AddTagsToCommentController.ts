import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import { AddTagsToCommentDTO } from "./AddTagsToCommentDTO";
import { AddTagsToComment } from "./AddTagsToComment";
import { AddTagsToCommentErrors } from "./AddTagsToCommentErrors";

export class AddTagsToCommentController extends BaseController {
  private useCase: AddTagsToComment;

  constructor(useCase: AddTagsToComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: AddTagsToCommentDTO = {
      userId: userId,
      commentId: TextUtils.sanitize(req.body.commentId),
      tags: req.body.tags,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AddTagsToCommentErrors.NonExistingComment:
            return this.conflict(res, error.getErrorValue().message);
          case AddTagsToCommentErrors.NonExistingTag:
            return this.notFound(res, error.getErrorValue().message);
          case AddTagsToCommentErrors.Unauthorized:
            return this.notFound(res, error.getErrorValue().message);
          default:
            return this.fail(res, error.getErrorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
