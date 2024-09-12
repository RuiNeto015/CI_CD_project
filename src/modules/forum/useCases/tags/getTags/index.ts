import { commentTagsRepo, postTagsRepo, tagsRepo } from "../../../repos";
import { GetTags } from "./GetTags";
import { GetTagsController } from "./GetTagsController";

const getTags = new GetTags(tagsRepo);

const getTagsController = new GetTagsController(getTags, postTagsRepo, commentTagsRepo);

export { getTagsController };
