import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { ITagsRepo } from "../../../repos/tagsRepo";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostTagsRepo } from "../../../repos/postTagsRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { Post } from "../../../domain/post";
import { AddTagsToPostErrors } from "./AddTagsToPostErrors";
import { AddTagsToPostDTO } from "./AddTagsToPostDTO";

type Response = Either<
  | AddTagsToPostErrors.NonExistingPost
  | AddTagsToPostErrors.NonExistingTag
  | AddTagsToPostErrors.Unauthorized
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class AddTagsToPost implements UseCase<AddTagsToPostDTO, Promise<Response>> {
  private tagsRepo: ITagsRepo;
  private postTagsRepo: IPostTagsRepo;
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor(
    tagsRepo: ITagsRepo,
    postTagsRepo: IPostTagsRepo,
    postRepo: IPostRepo,
    memberRepo: IMemberRepo
  ) {
    this.tagsRepo = tagsRepo;
    this.postTagsRepo = postTagsRepo;
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }

  public async execute(req: AddTagsToPostDTO): Promise<Response> {
    const { userId, postSlug, tags } = req;
    let post: Post;
    let tagIds: string[] = [];

    try {
      for (let i = 0; i < tags.length; i++) {
        try {
          const tagId = await this.tagsRepo.getTagIdByName(tags[i]);
          tagIds.push(tagId);
        } catch (err) {
          return left(new AddTagsToPostErrors.NonExistingTag());
        }
      }

      try {
        post = await this.postRepo.getPostBySlug(postSlug);
      } catch (err) {
        return left(new AddTagsToPostErrors.NonExistingPost());
      }

      const member = await this.memberRepo.getMemberByUserId(userId);

      if (member.id.toString() !== post.memberId.id.toString()) {
        return left(new AddTagsToPostErrors.Unauthorized());
      }

      await this.postTagsRepo.tagPost(tagIds, post.id.toString());
      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
