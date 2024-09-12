import { commentTagsRepo, memberRepo, postTagsRepo, tagsRepo } from "../../../repos";
import { DeleteTag } from "./DeleteTag";
import { DeleteTagController } from "./DeleteTagController";

const deleteTag = new DeleteTag(tagsRepo, memberRepo, postTagsRepo, commentTagsRepo);

const deleteTagController = new DeleteTagController(deleteTag);

export { deleteTagController };
