import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateTagDTO } from "./CreateTagDTO";
import { CreateTagErrors } from "./CreateTagErrors";
import { ITagsRepo } from "../../../repos/tagsRepo";
import { TagName } from "../../../domain/tagName";
import { Tag } from "../../../domain/tag";
import { IMemberRepo } from "../../../repos/memberRepo";
import {extractExtensionDefinitions} from "apollo-server-express";

type Response = Either<
  CreateTagErrors.TagAlreadyExists | AppError.UnexpectedError | Result<any>,
  Result<void>
>;

export class CreateTag implements UseCase<CreateTagDTO, Promise<Response>> {
  private tagsRepo: ITagsRepo;
  private memberRepo: IMemberRepo;

  constructor(tagsRepo: ITagsRepo, memberRepo: IMemberRepo) {
    this.tagsRepo = tagsRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: CreateTagDTO): Promise<Response> {
    const { userId } = req;
    try {
      const tagNameOrError = TagName.create({ value: req.name });

      if (tagNameOrError.isFailure) {
        return left(tagNameOrError);
      }

      if (await this.tagsRepo.exists(tagNameOrError.getValue())) {
        return left(new CreateTagErrors.TagAlreadyExists());
      }

      const member = await this.memberRepo.getMemberByUserId(userId);

      const tagOrError = Tag.create({ memberId: member.id, name: tagNameOrError.getValue() });

      await this.tagsRepo.save(tagOrError.getValue());
      return right(Result.ok<void>());
    } catch (err) {
      console.log('error create tag backend' , err)
      return left(new AppError.UnexpectedError(err));
    }
  }
}
