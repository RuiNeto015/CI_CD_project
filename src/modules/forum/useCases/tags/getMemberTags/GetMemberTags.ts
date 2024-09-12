import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { ITagsRepo } from "../../../repos/tagsRepo";
import { TagName } from "../../../domain/tagName";
import { Tag } from "../../../domain/tag";
import { IMemberRepo } from "../../../repos/memberRepo";
import { GetMemberTagsRequestDTO } from "./GetMemberTagsRequestDTO";

type Response = Either<AppError.UnexpectedError, Result<Tag[]>>;

export class GetMemberTags implements UseCase<GetMemberTagsRequestDTO, Promise<Response>> {
  private tagsRepo: ITagsRepo;
  private memberRepo: IMemberRepo;

  constructor(tagsRepo: ITagsRepo, memberRepo: IMemberRepo) {
    this.tagsRepo = tagsRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: GetMemberTagsRequestDTO): Promise<Response> {
    const { userId } = req;
    try {
      const member = await this.memberRepo.getMemberByUserId(userId);
      const tags = await this.tagsRepo.getTagsByMemberId(member.id.toString());

      return right(Result.ok<Tag[]>(tags));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
