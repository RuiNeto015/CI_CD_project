import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace AddTagsToPostErrors {
  export class NonExistingTag extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Tag doesn't exist",
      } as UseCaseError);
    }
  }

  export class NonExistingPost extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Post doesn't exist",
      } as UseCaseError);
    }
  }

  export class Unauthorized extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "User donesn't have permissions",
      } as UseCaseError);
    }
  }
}
