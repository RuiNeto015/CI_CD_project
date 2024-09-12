import { commentRepo, commentTagsRepo, memberRepo, tagsRepo } from "../../../repos";
import { AddTagsToComment } from "./AddTagsToComment";
import { AddTagsToCommentController } from "./AddTagsToCommentController";

const addTagsToComment = new AddTagsToComment(tagsRepo, commentTagsRepo, commentRepo, memberRepo);

const addTagsToCommentController = new AddTagsToCommentController(addTagsToComment);

export { addTagsToCommentController };
