import { TagId } from "../domain/tagId";
import { TagName } from "../domain/tagName";
import { Tag } from "../domain/tag";

export interface ITagsRepo {
  exists(nameOrId: TagName | string): Promise<boolean>;
  getTagsByMemberId(memberId: string): Promise<Tag[]>;
  getAll(): Promise<Tag[]>;
  save(tag: Tag): Promise<any>;
  delete(tagId: string): Promise<any>;
  getTagNameById(id: string): Promise<string>;
  getTagIdByName(name: string): Promise<any>;
  getTagByName(name: string): Promise<any>;
}
