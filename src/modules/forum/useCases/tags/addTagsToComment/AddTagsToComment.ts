import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { ITagsRepo } from "../../../repos/tagsRepo";
import { AddTagsToCommentDTO } from "./AddTagsToCommentDTO";
import { AddTagsToCommentErrors } from "./AddTagsToCommentErrors";
import { ICommentTagsRepo } from "../../../repos/commentTagsRepo";
import { ICommentRepo } from "../../../repos/commentRepo";
import { Comment } from "../../../domain/comment";
import { IMemberRepo } from "../../../repos/memberRepo";

type Response = Either<
  | AddTagsToCommentErrors.NonExistingComment
  | AddTagsToCommentErrors.NonExistingTag
  | AddTagsToCommentErrors.Unauthorized
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class AddTagsToComment implements UseCase<AddTagsToCommentDTO, Promise<Response>> {
  private tagsRepo: ITagsRepo;
  private commentTagsRepo: ICommentTagsRepo;
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor(
    tagsRepo: ITagsRepo,
    commentTagsRepo: ICommentTagsRepo,
    commentRepo: ICommentRepo,
    memberRepo: IMemberRepo
  ) {
    this.tagsRepo = tagsRepo;
    this.commentTagsRepo = commentTagsRepo;
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: AddTagsToCommentDTO): Promise<Response> {
    const { userId, commentId, tags } = req;
    let comment: Comment;
    let tagIds: string[] = [];

    try {
      for (let i = 0; i < tags.length; i++) {
        try {
          const tagId = await this.tagsRepo.getTagIdByName(tags[i]);
          tagIds.push(tagId);
        } catch (err) {
          return left(new AddTagsToCommentErrors.NonExistingTag());
        }
      }

      try {
        comment = await this.commentRepo.getCommentByCommentId(commentId);
      } catch (err) {
        return left(new AddTagsToCommentErrors.NonExistingComment());
      }

      const member = await this.memberRepo.getMemberByUserId(userId);

      if (member.id.toString() !== comment.memberId.id.toString()) {
        return left(new AddTagsToCommentErrors.Unauthorized());
      }

      await this.commentTagsRepo.tagComment(tagIds, comment.commentId.id.toString());
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
