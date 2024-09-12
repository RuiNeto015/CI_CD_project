export interface ICommentTagsRepo {
  tagComment(tags: string[], commentId: string): Promise<any>;
  getCommentTags(commentId: string): Promise<{ tags: string[] }[]>;
  getNumberOfUsages(commentId: string): Promise<number>;
}
