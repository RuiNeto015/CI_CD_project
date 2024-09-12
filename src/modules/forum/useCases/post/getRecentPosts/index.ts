import { GetRecentPosts } from "./GetRecentPosts";
import { postRepo, postTagsRepo } from "../../../repos";
import { GetRecentPostsController } from "./GetRecentPostsController";

const getRecentPosts = new GetRecentPosts(postRepo);
const getRecentPostsController = new GetRecentPostsController(
  getRecentPosts,
  postRepo,
  postTagsRepo
);

export { getRecentPosts, getRecentPostsController };
