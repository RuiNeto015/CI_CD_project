
import { GetPopularPosts } from "./GetPopularPosts";
import { postRepo, postTagsRepo } from "../../../repos";
import { GetPopularPostsController } from "./GetPopularPostsController";

const getPopularPosts = new GetPopularPosts(postRepo);

const getPopularPostsController = new GetPopularPostsController(
  getPopularPosts,
  postRepo,
  postTagsRepo
)

export {
  getPopularPosts,
  getPopularPostsController
}

