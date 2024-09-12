
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import {ActualMember} from "../../users/models/actualMember";
import {TagModel} from "../models/TagModel";

export interface ForumState {
    isSubmittingPost: boolean;
    isSubmittingPostSuccess: boolean;
    isSubmittingPostFailure: boolean;

    isGettingRecentPosts: boolean;
    isGettingRecentPostsSuccess: boolean;
    isGettingRecentPostsFailure: boolean;
//Tags
    isGettingTags: boolean;
    isGettingTagsSuccess: boolean;
    isGettingTagsFailure: boolean;

    isDeletingTag: boolean;
    isDeletingTagSuccess: boolean;
    isDeletingTagFailure: boolean;

    isCreatingTag: boolean;
    isCreatingTagSuccess: boolean;
    isCreatingTagFailure: boolean;
//Tags
    isGettingPostBySlug: boolean;
    isGettingPostBySlugSuccess: boolean;
    isGettingPostBySlugFailure: boolean;

    isCreatingReplyToPost: boolean;
    isCreatingReplyToPostSuccess: boolean;
    isCreatingReplyToPostFailure: boolean;

    isGettingComments: boolean;
    isGettingCommentsSuccess: boolean;
    isGettingCommentsFailure: boolean;

    isGettingPopularPosts: boolean;
    isGettingPopularPostsSuccess: boolean;
    isGettingPopularPostsFailure: boolean;

    isGettingCommentByCommentId: boolean;
    isGettingCommentByCommentIdSuccess: boolean;
    isGettingCommentByCommentIdFailure: boolean;

    isCreatingReplyToComment: boolean;
    isCreatingReplyToCommentSuccess: boolean;
    isCreatingReplyToCommentFailure: boolean;

    isUpvotingComment: boolean;
    isUpvotingCommentSuccess: boolean;
    isUpvotingCommentFailure: boolean;

    isDownvotingComment: boolean;
    isDownvotingCommentSuccess: boolean;
    isDownvotingCommentFailure: boolean;

    isUpvotingPost: boolean;
    isUpvotingPostSuccess: boolean;
    isUpvotingPostFailure: boolean;

    isDownvotingPost: boolean;
    isDownvotingPostSuccess: boolean;
    isDownvotingPostFailure: boolean;

    recentPosts: Post[];
    popularPosts: Post[];

    tags: TagModel[];

    myTags: TagModel[];

    post: Post | {};

    comments: Comment[];

    comment: Comment | {};

    error: string;
}

const initialForumState: ForumState = {
    isSubmittingPost: false,
    isSubmittingPostSuccess: false,
    isSubmittingPostFailure: false,

    isGettingRecentPosts: false,
    isGettingRecentPostsSuccess: false,
    isGettingRecentPostsFailure: false,
//Tags
    isGettingTags: false,
    isGettingTagsSuccess: false,
    isGettingTagsFailure: false,

    isCreatingTag: false,
    isCreatingTagSuccess: false,
    isCreatingTagFailure: false,

    isDeletingTag: false,
    isDeletingTagSuccess: false,
    isDeletingTagFailure: false,
//Tags
    isGettingPostBySlug: false,
    isGettingPostBySlugSuccess: false,
    isGettingPostBySlugFailure: false,

    isCreatingReplyToPost: false,
    isCreatingReplyToPostSuccess: false,
    isCreatingReplyToPostFailure: false,

    isGettingComments: false,
    isGettingCommentsSuccess: false,
    isGettingCommentsFailure: false,

    isGettingPopularPosts: false,
    isGettingPopularPostsSuccess: false,
    isGettingPopularPostsFailure: false,

    isGettingCommentByCommentId: false,
    isGettingCommentByCommentIdSuccess: false,
    isGettingCommentByCommentIdFailure: false,

    isCreatingReplyToComment: false,
    isCreatingReplyToCommentSuccess: false,
    isCreatingReplyToCommentFailure: false,

    isUpvotingComment: false,
    isUpvotingCommentSuccess: false,
    isUpvotingCommentFailure: false,

    isDownvotingComment: false,
    isDownvotingCommentSuccess: false,
    isDownvotingCommentFailure: false,

    isUpvotingPost: false,
    isUpvotingPostSuccess: false,
    isUpvotingPostFailure: false,

    isDownvotingPost: false,
    isDownvotingPostSuccess: false,
    isDownvotingPostFailure: false,

    comments: [],

  recentPosts: [],

  popularPosts: [],

    tags: [],
    myTags: [],

    post: {},

    comment: {},

    error: ''
}

export default initialForumState;
