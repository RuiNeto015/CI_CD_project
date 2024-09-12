
import { MemberDTO } from "./memberDTO";
import { PostType } from "../domain/postType";

/**
 * Represents a data transfer object for posts.
 *
 * @remarks
 * This interface provides a standardized structure for post data.
 *
 * @public
 */
export interface PostDTO {
  /**
   * The slug of the post, a unique identifier.
   */
  slug: string;

  /**
   * The title of the post.
   */
  title: string;

  /**
   * The timestamp when the post was created.
   */
  createdAt: string | Date;

  /**
   * Information about the member who posted the comment.
   */
  memberPostedBy: MemberDTO;

  /**
   * The number of comments the post has received.
   */
  numComments: number;

  /**
   * The number of points or upvotes the post has received.
   */
  points: number;

  /**
   * The text content of the post.
   */
  text: string;

  /**
   * The link associated with the post.
   */
  link: string;

  /**
   * The type of the post
   */
  type: PostType;

  /**
   * Indicates whether the post was upvoted by the current user.
   */
  wasUpvotedByMe: boolean;

  /**
   * Indicates whether the post was downvoted by the current user.
   */
  wasDownvotedByMe: boolean;
}
