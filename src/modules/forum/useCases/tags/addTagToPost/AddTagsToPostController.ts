import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import { AddTagsToPostDTO } from "./AddTagsToPostDTO";
import { AddTagsToPostErrors } from "./AddTagsToPostErrors";
import { AddTagsToPost } from "./AddTagsToPost";

export class AddTagsToPostController extends BaseController {
  private useCase: AddTagsToPost;

  constructor(useCase: AddTagsToPost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: AddTagsToPostDTO = {
      userId: userId,
      postSlug: TextUtils.sanitize(req.body.postSlug),
      tags: req.body.tags,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case AddTagsToPostErrors.NonExistingPost:
            return this.conflict(res, error.getErrorValue().message);
          case AddTagsToPostErrors.NonExistingTag:
            return this.notFound(res, error.getErrorValue().message);
          case AddTagsToPostErrors.Unauthorized:
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
