import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { CommentId } from "../../domain/commentId";
import { Tag } from "../../domain/tag";
import { TagId } from "../../domain/tagId";
import { TagName } from "../../domain/tagName";
import { ITagsRepo } from "../tagsRepo";

export class TagsRepo implements ITagsRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  async exists(nameOrId: TagName | string): Promise<boolean> {
    const Tag = this.models.Tag;
    const baseQuery = this.createBaseQuery();

    if (typeof nameOrId === "string") {
      baseQuery.where["tag_id"] = nameOrId;
    } else {
      baseQuery.where["name"] = nameOrId.value;
    }

    const tag = await Tag.findOne(baseQuery);
    return !!tag === true;
  }

  async getTagsByMemberId(memberId: string): Promise<Tag[]> {
    const TagModel = this.models.Tag;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["member_id"] = memberId;
    const tags = await TagModel.findAll(detailsQuery);

    return tags.map((t) =>
      Tag.create(
        {
          memberId: new UniqueEntityID(t.member_id),
          name: TagName.create({ value: t.name }).getValue(),
        },
        new UniqueEntityID(t.tag_id)
      ).getValue()
    );
  }

  async getAll(): Promise<Tag[]> {
    const TagModel = this.models.Tag;
    const tags = await TagModel.findAll();

    return tags.map((t) =>
      Tag.create(
        {
          memberId: new UniqueEntityID(t.member_id),
          name: TagName.create({ value: t.name }).getValue(),
        },
        new UniqueEntityID(t.tag_id)
      ).getValue()
    );
  }

  async save(tag: Tag): Promise<any> {
    const TagModel = this.models.Tag;

    const rawSequelizeTag = {
      id: tag.id,
      member_id: tag.memberId.toString(),
      name: tag.name.value,
    };

    try {
      await TagModel.create(rawSequelizeTag);
    } catch (err) {
      throw new Error(err.toString());
    }
  }

  async getTagNameById(id: string): Promise<string> {
    const TagModel = this.models.Tag;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["tag_id"] = id;
    const tag = await TagModel.findOne(detailsQuery);
    return tag.name;
  }

  async getTagIdByName(name: string): Promise<any> {
    const TagModel = this.models.Tag;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["name"] = name;
    const tag = await TagModel.findOne(detailsQuery);
    return tag.tag_id;
  }

  async getTagByName(name: string): Promise<any> {
    const TagModel = this.models.Tag;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where["name"] = name;
    const tag = await TagModel.findOne(detailsQuery);
    return tag;
  }

  async delete(tagId: string): Promise<any> {
    const TagModel = this.models.Tag;
    await TagModel.destroy({ where: { tag_id: tagId } });
  }
}
