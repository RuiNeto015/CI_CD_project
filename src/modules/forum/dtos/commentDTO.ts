import {MemberDTO} from "./memberDTO";

/**
 * Represents a data transfer object for comments.
 *
 * @remarks
 * This interface provides a standardized structure for comment data.
 * @public
 */
export interface CommentDTO {
    /**
     * The slug of the post to which the comment belongs.
     */
    postSlug: string;

    /**
     * The title of the post to which the comment belongs.
     */
    postTitle: string;

    /**
     * The unique identifier of the comment.
     */
    commentId: string;

    /**
     * The optional parent comment identifier.
     */
    parentCommentId?: string;

    /**
     * The text content of the comment.
     */
    text: string;

    /**
     * Information about the member who created the comment.
     */
    member: MemberDTO;

    /**
     * The timestamp when the comment was created.
     */
    createdAt: string | Date;

    /**
     * An array of child comments associated with this comment.
     */
    childComments: CommentDTO[];

    /**
     * The number of points or upvotes the comment has received.
     */
    points: number;

    /**
     * Indicates whether the comment was upvoted by the current user.
     */
    wasUpvotedByMe: boolean;

    /**
     * Indicates whether the comment was downvoted by the current user.
     */
    wasDownvotedByMe: boolean;
}
