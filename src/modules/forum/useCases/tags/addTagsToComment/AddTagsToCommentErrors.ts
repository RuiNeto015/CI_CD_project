import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace AddTagsToCommentErrors {
  export class NonExistingTag extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Tag doesn't exist",
      } as UseCaseError);
    }
  }

  export class NonExistingComment extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Comment doesn't exist",
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
