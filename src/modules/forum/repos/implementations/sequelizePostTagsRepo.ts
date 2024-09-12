import { IPostTagsRepo } from "../postTagsRepo";
import { ITagsRepo } from "../tagsRepo";

export class PostTagsRepo implements IPostTagsRepo {
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

  async tagPost(tags: string[], postId: string): Promise<any> {
    const TagPostModel = this.models.TagPost;
    await TagPostModel.destroy({ where: { post_id: postId } });

    for (let i = 0; i < tags.length; i++) {
      try {
        await TagPostModel.create({ tag_id: tags[i], post_id: postId });
      } catch (err) {
        throw new Error(err.toString());
      }
    }
  }

  async getPostTags(postId: string): Promise<{ tags: string[] }[]> {
    const TagPostModel = this.models.TagPost;
    const result = [];

    const baseQuery = this.createBaseQuery();
    baseQuery.where["post_id"] = postId;
    const tags = await TagPostModel.findAll(baseQuery);

    for (let i = 0; i < tags.length; i++) {
      result.push(await this.tagsRepo.getTagNameById(tags[i].tag_id));
    }

    return result;
  }

  async getNumberOfUsages(tagId: string): Promise<number> {
    const baseQuery = this.createBaseQuery();
    const TagCommentModel = this.models.TagPost;
    baseQuery.where["tag_id"] = tagId;
    const tags = await TagCommentModel.findAll(baseQuery);
    return tags ? tags.length : 0;
  }
}
