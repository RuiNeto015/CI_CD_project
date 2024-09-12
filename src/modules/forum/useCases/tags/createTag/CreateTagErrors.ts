import { UseCaseError } from "../../../../../shared/core/UseCaseError";
import { Result } from "../../../../../shared/core/Result";

export namespace CreateTagErrors {
  export class TagAlreadyExists extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: "Tag already exists",
      } as UseCaseError);
    }
  }
}
