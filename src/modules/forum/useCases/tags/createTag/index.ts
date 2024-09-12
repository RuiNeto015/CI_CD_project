import { memberRepo, tagsRepo } from "../../../repos";
import { CreateTag } from "./CreateTag";
import { CreateTagController } from "./CreateTagController";

const createTag = new CreateTag(tagsRepo, memberRepo);

const createTagController = new CreateTagController(createTag);

export { createTagController };
