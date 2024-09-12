import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { DeleteTagErrors } from "./DeleteTagErrors";
import { ITagsRepo } from "../../../repos/tagsRepo";
import { TagName } from "../../../domain/tagName";
import { IMemberRepo } from "../../../repos/memberRepo";
import { DeleteTagDTO } from "./DeleteTagDTO";
import { IPostTagsRepo } from "../../../repos/postTagsRepo";
import { ICommentTagsRepo } from "../../../repos/commentTagsRepo";

type Response = Either<
  | DeleteTagErrors.TagDoesNotExist
  | DeleteTagErrors.TagInUse
  | DeleteTagErrors.Unauthorized
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class DeleteTag implements UseCase<DeleteTagDTO, Promise<Response>> {
  private tagsRepo: ITagsRepo;
  private memberRepo: IMemberRepo;
  private postTagsRepo: IPostTagsRepo;
  private commentTagsRepo: ICommentTagsRepo;

  constructor(
    tagsRepo: ITagsRepo,
    memberRepo: IMemberRepo,
    postTagsRepo: IPostTagsRepo,
    commentTagsRepo: ICommentTagsRepo
  ) {
    this.tagsRepo = tagsRepo;
    this.memberRepo = memberRepo;
    this.postTagsRepo = postTagsRepo;
    this.commentTagsRepo = commentTagsRepo;
  }

  public async execute(req: DeleteTagDTO): Promise<Response> {
    const { userId } = req;
    try {
      const tagNameOrError = TagName.create({ value: req.tag });

      if (tagNameOrError.isFailure) {
        return left(tagNameOrError);
      }

      if (!(await this.tagsRepo.exists(tagNameOrError.getValue()))) {
        return left(new DeleteTagErrors.TagDoesNotExist());
      }

      const member = await this.memberRepo.getMemberByUserId(userId);
      const tag = await this.tagsRepo.getTagByName(req.tag);

      if (tag.member_id !== member.id.toString()) {
        return left(new DeleteTagErrors.Unauthorized());
      }

      if ((await this.postTagsRepo.getNumberOfUsages(tag.tag_id)) > 0) {
        return left(new DeleteTagErrors.TagInUse());
      }

      if ((await this.commentTagsRepo.getNumberOfUsages(tag.tag_id)) > 0) {
        return left(new DeleteTagErrors.TagInUse());
      }

      await this.tagsRepo.delete(tag.tag_id);
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
