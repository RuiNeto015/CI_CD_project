import { memberRepo, tagsRepo, postTagsRepo, commentTagsRepo } from "../../../repos";
import { GetMemberTags } from "./GetMemberTags";
import { GetMemberTagsController } from "./GetMemberTagsController";

const getMemberTags = new GetMemberTags(tagsRepo, memberRepo);

const getMemberTagsController = new GetMemberTagsController(
  getMemberTags,
  postTagsRepo,
  commentTagsRepo
);

export { getMemberTagsController };
