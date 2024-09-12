import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { ITagsRepo } from "../../../repos/tagsRepo";
import { Tag } from "../../../domain/tag";

type Response = Either<AppError.UnexpectedError, Result<Tag[]>>;

export class GetTags implements UseCase<void, Promise<Response>> {
  private tagsRepo: ITagsRepo;

  constructor(tagsRepo: ITagsRepo) {
    this.tagsRepo = tagsRepo;
  }

  public async execute(req: void): Promise<Response> {
    try {
      const tags = await this.tagsRepo.getAll();
      return right(Result.ok<Tag[]>(tags));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
