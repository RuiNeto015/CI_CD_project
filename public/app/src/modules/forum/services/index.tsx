
import { PostService } from "./postService";
import { authService } from "../../users/services";
import { CommentService } from "./commentService";
import {TagService} from "./tagService";

const commentService = new CommentService(
  authService
)

const postService = new PostService(
  authService
)

const tagService = new TagService(
    authService
)

export { postService, commentService, tagService };