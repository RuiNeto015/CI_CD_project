import { BaseController } from "../../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infra/http/models/decodedRequest";
import * as express from "express";
import { DeleteTagDTO } from "./DeleteTagDTO";
import { DeleteTag } from "./DeleteTag";
import { DeleteTagErrors } from "./DeleteTagErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";

export class DeleteTagController extends BaseController {
  private useCase: DeleteTag;

  constructor(useCase: DeleteTag) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: DeleteTagDTO = {
      userId: userId,
      tag: TextUtils.sanitize(req.body.tag),
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case DeleteTagErrors.TagDoesNotExist:
            return this.notFound(res, error.getErrorValue().message);
          case DeleteTagErrors.TagInUse:
            return this.notFound(res, error.getErrorValue().message);
          case DeleteTagErrors.Unauthorized:
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
