import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { CreateTagDTO } from "./CreateTagDTO";
import { CreateTag } from "./CreateTag";
import { CreateTagErrors } from "./CreateTagErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";

export class CreateTagController extends BaseController {
  private useCase: CreateTag;

  constructor(useCase: CreateTag) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: CreateTagDTO = {
      userId: userId,
      name: TextUtils.sanitize(req.body.name),
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateTagErrors.TagAlreadyExists:
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
