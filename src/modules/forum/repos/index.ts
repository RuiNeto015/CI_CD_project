import { MemberRepo } from "./implementations/sequelizeMemberRepo";
import models from "../../../shared/infra/database/sequelize/models";
import { PostRepo } from "./implementations/sequelizePostRepo";
import { CommentRepo } from "./implementations/commentRepo";
import { PostVotesRepo } from "./implementations/sequelizePostVotesRepo";
import { CommentVotesRepo } from "./implementations/sequelizeCommentVotesRepo";
import { TagsRepo } from "./implementations/sequelizeTagsRepo";
import { PostTagsRepo } from "./implementations/sequelizePostTagsRepo";
import { CommentTagsRepo } from "./implementations/sequelizeCommentTagsRepo";

const commentVotesRepo = new CommentVotesRepo(models);
const postVotesRepo = new PostVotesRepo(models);
const memberRepo = new MemberRepo(models);
const commentRepo = new CommentRepo(models, commentVotesRepo);
const postRepo = new PostRepo(models, commentRepo, postVotesRepo);
const tagsRepo = new TagsRepo(models);
const postTagsRepo = new PostTagsRepo(models, tagsRepo);
const commentTagsRepo = new CommentTagsRepo(models, tagsRepo);

export {
  memberRepo,
  postRepo,
  commentRepo,
  postVotesRepo,
  commentVotesRepo,
  tagsRepo,
  postTagsRepo,
  commentTagsRepo,
};
