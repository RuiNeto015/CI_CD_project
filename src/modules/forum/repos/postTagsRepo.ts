export interface IPostTagsRepo {
  tagPost(tags: string[], postId: string): Promise<any>;
  getPostTags(postId: string): Promise<{ tags: string[] }[]>;
  getNumberOfUsages(tagId: string): Promise<number>;
}
