import { memberRepo, postRepo, postTagsRepo, tagsRepo } from "../../../repos";
import { AddTagsToPost } from "./AddTagsToPost";
import { AddTagsToPostController } from "./AddTagsToPostController";

const addTagsToPost = new AddTagsToPost(tagsRepo, postTagsRepo, postRepo, memberRepo);

const addTagToPostController = new AddTagsToPostController(addTagsToPost);

export { addTagToPostController };
