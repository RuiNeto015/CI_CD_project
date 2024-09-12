import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace DeleteTagErrors {
  export class TagDoesNotExist extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Tag doesn't exist exists",
      } as UseCaseError);
    }
  }

  export class TagInUse extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "This tag is being used, you can't delete it",
      } as UseCaseError);
    }
  }

  export class Unauthorized extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "This tag is not yours",
      } as UseCaseError);
    }
  }
}
