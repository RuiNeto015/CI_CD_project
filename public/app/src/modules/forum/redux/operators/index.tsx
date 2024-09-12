import {submitPost} from "./submitPost";
import {PostType} from "../../models/Post";
import {getRecentPosts} from "./getRecentPosts";
import {getPostBySlug} from "./getPostBySlug";
import {createReplyToPost} from "./createReplyToPost";
import {getComments} from "./getComments";
import {getPopularPosts} from "./getPopularPosts";
import {getCommentByCommentId} from "./getCommentByCommentId";
import {creatingReplyToComment} from "../actionCreators";
import {getCommentReplies} from "./getCommentReplies";
import {createReplyToComment} from "./createReplyToComment"
import {downvotePost} from "./downvotePost";
import {upvotePost} from "./upvotePost";
import {upvoteComment} from "./upvoteComment";
import {downvoteComment} from "./downvoteComment";
import {getTags} from "./getTags";
import {createTag} from "./createTag";
import {deleteTag} from "./deleteTag";
import {associateTagToPost} from "./associateTagToPost";
import {getMineTags} from "./getMineTags";
import {TagModel} from "../../models/TagModel";

export interface IForumOperations {
    submitPost: (title: string, type: PostType, text?: string, link?: string, tags?: TagModel[]) => void;
    getTags: (offset?: string) => void;
    getMineTags: (offset?: string) => void;
    associateTagToPost: (tagName?: string, postSlug?: string) => void;
    createTag: (offset?: string) => void;
    deleteTag: (offset?: string) => void;
    getRecentPosts: (offset?: number) => void;

    getPostBySlug(slug: string): void;

    createReplyToPost(text: string, slug: string, tags: TagModel[]): void;

    getComments(slug: string, offset?: number): void;

    getPopularPosts(offset?: number): void;

    getCommentByCommentId(commentId: string): void;

    createReplyToComment(comment: string, parentCommentId: string, slug: string): void;

    getCommentReplies(slug: string, commentId: string, offset?: number): void;

    downvotePost(postSlug: string): void;

    upvotePost(postSlug: string): void;

    upvoteComment(commentId: string): void;

    downvoteComment(commentId: string): void;
}

export {
    submitPost,
    getRecentPosts,
    associateTagToPost,
    getMineTags,
    getTags,
    deleteTag,
    createTag,
    getPostBySlug,
    createReplyToPost,
    getComments,
    getPopularPosts,
    getCommentByCommentId,
    creatingReplyToComment,
    getCommentReplies,
    createReplyToComment,
    downvotePost,
    upvotePost,
    upvoteComment,
    downvoteComment
}