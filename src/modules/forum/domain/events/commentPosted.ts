import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Comment } from "../comment";
import { Post } from "../post";

/**
 * Represents an event that is emitted when a new comment is posted on a post.
 * @implements IDomainEvent
 * @public
 */
export class CommentPosted implements IDomainEvent {
  /**
   * The date and time when the comment was posted.
   * @public
   */
  public dateTimeOccurred: Date;

  /**
   * The post on which the comment was posted.
   * @public
   */
  public post: Post;

  /**
   * The comment that was posted.
   * @public
   */
  public comment: Comment;

  /**
   * Creates a new instance of the CommentPosted event.
   * @param post - The post on which the comment was posted.
   * @param comment - The comment that was posted.
   * @public
   */
  constructor(post: Post, comment: Comment) {
    this.dateTimeOccurred = new Date();
    this.post = post;
    this.comment = comment;
  }

  /**
   * Gets the aggregate ID associated with the event.
   * In this case, it returns the ID of the post.
   * @returns The unique entity ID of the post.
   * @public
   */
  getAggregateId(): UniqueEntityID {
    return this.post.id;
  }
}
