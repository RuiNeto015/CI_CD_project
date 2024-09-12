import { ICommentTagsRepo } from "../commentTagsRepo";
import { ITagsRepo } from "../tagsRepo";

export class CommentTagsRepo implements ICommentTagsRepo {
  private models: any;
  private tagsRepo: ITagsRepo;

  constructor(models: any, tagsRepo: ITagsRepo) {
    this.models = models;
    this.tagsRepo = tagsRepo;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  async tagComment(tags: string[], commentId: string): Promise<any> {
    const TagCommentModel = this.models.TagComment;
    await TagCommentModel.destroy({ where: { comment_id: commentId } });

    for (let i = 0; i < tags.length; i++) {
      try {
        await TagCommentModel.create({ tag_id: tags[i], comment_id: commentId });
      } catch (err) {
        throw new Error(err.toString());
      }
    }
  }

  async getCommentTags(commentId: string): Promise<{ tags: string[] }[]> {
    const TagCommentModel = this.models.TagComment;
    const result = [];

    const baseQuery = this.createBaseQuery();
    baseQuery.where["comment_id"] = commentId;
    const tags = await TagCommentModel.findAll(baseQuery);

    for (let i = 0; i < tags.length; i++) {
      result.push(await this.tagsRepo.getTagNameById(tags[i].tag_id));
    }

    return result;
  }

  async getNumberOfUsages(tagId: string): Promise<number> {
    const baseQuery = this.createBaseQuery();
    const TagCommentModel = this.models.TagComment;
    baseQuery.where["tag_id"] = tagId;
    const tags = await TagCommentModel.findAll(baseQuery);
    return tags ? tags.length : 0;
  }
}
