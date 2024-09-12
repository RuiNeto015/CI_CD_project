import * as actions from "./actions";
import {Post} from "../models/Post";
import {Comment} from "../models/Comment";
import {TagModel} from "../models/TagModel";


export type ForumAction = {
    [key: string]: actions.ForumActionType | any
};

function submittingPost(): ForumAction {
    return {
        type: actions.SUBMITTING_POST
    };
}

function submittingPostSuccess(): ForumAction {
    return {
        type: actions.SUBMITTING_POST_SUCCESS
    };
}

function submittingPostFailure(error: string): ForumAction & {
    error: string
} {
    return {
        type: actions.SUBMITTING_POST_FAILURE,
        error
    };
}

////////////////////////////////////////// TAGS

function createTag(): ForumAction {
    return {
        type: actions.CREATING_TAG
    };
}

function createTagSuccess(): ForumAction {
    return {
        type: actions.CREATING_TAG_SUCCESS,
    };
}

function createTagFailure(error: string): ForumAction {
    return {
        type: actions.CREATING_TAG_FAILURE,
        error
    };
}

function associateTagToPost(): ForumAction {
    return {
        type: actions.GETTING_TAGS
    };
}

function associateTagToPostSuccess(): ForumAction {
    return {
        type: actions.GETTING_TAGS_SUCCESS,
    };
}

function associateTagToPostFailure(error: string): ForumAction {
    return {
        type: actions.GETTING_TAGS_FAILURE,
        error
    };
}

function getTags(): ForumAction {
    return {
        type: actions.GETTING_TAGS
    };
}

function getTagsSuccess(tags: TagModel[]): ForumAction {
    return {
        type: actions.GETTING_TAGS_SUCCESS,
        tags
    };
}

function getTagsFailure(error: string): ForumAction {
    return {
        type: actions.GETTING_TAGS_FAILURE,
        error
    };
}

function getMineTags(): ForumAction {
    return {
        type: actions.GETTING_MINE_TAGS
    };
}

function getMineTagsSuccess(tags: TagModel[]): ForumAction {
    return {
        type: actions.GETTING_MINE_TAGS_SUCCESS,
        tags
    };
}

function getMineTagsFailure(error: string): ForumAction {
    return {
        type: actions.GETTING_MINE_TAGS_FAILURE,
        error
    };
}

function deleteTag(): ForumAction {
    return {
        type: actions.DELETING_TAG
    };
}

function deleteTagSuccess(): ForumAction {
    return {
        type: actions.DELETING_TAG_SUCCESS,
    };
}

function deleteTagFailure(error: string): ForumAction {
    return {
        type: actions.DELETING_TAG_SUCCESS,
        error
    };
}

////////////////////////////////////////// TAGS

function getRecentPosts(): ForumAction {
    return {
        type: actions.GETTING_RECENT_POSTS
    };
}

function getRecentPostsSuccess(posts: Post[]): ForumAction {
    return {
        type: actions.GETTING_RECENT_POSTS_SUCCESS,
        posts
    };
}

function getRecentPostsFailure(error: string): ForumAction & {
    error: string
} {
    return {
        type: actions.GETTING_RECENT_POSTS_FAILURE,
        error
    };
}

function gettingPostBySlug(): ForumAction {
    return {
        type: actions.GETTING_POST_BY_SLUG
    }
}

function gettingPostBySlugSuccess(post: Post): ForumAction & {
    post: Post
} {
    return {
        type: actions.GETTING_POST_BY_SLUG_SUCCESS,
        post
    }
}

function gettingPostBySlugFailure(error: string): ForumAction & {
    error: string
} {
    return {
        type: actions.GETTING_POST_BY_SLUG_FAILURE,
        error
    }
}

function creatingReplyToPost(): ForumAction {
    return {
        type: actions.CREATING_REPLY_TO_POST
    }
}

function creatingReplyToPostSuccess(): ForumAction {
    return {
        type: actions.CREATING_REPLY_TO_POST_SUCCESS
    }
}

function creatingReplyToPostFailure(error: string): ForumAction {
    return {
        type: actions.CREATING_REPLY_TO_POST_FAILURE,
        error
    }
}

function gettingComments(): ForumAction {
    return {
        type: actions.GETTING_COMMENTS
    }
}

function gettingCommentsSuccess(comments: Comment[]): ForumAction {
    return {
        type: actions.GETTING_COMMENTS_SUCCESS,
        comments
    }
}

function gettingCommentsFailure(error: string): ForumAction {
    return {
        type: actions.GETTING_COMMENTS_FAILURE,
        error
    }
}

function getPopularPosts(): ForumAction {
    return {
        type: actions.GETTING_POPULAR_POSTS
    };
}

function getPopularPostsSuccess(posts: Post[]): ForumAction {
    return {
        type: actions.GETTING_POPULAR_POSTS_SUCCESS,
        posts
    };
}

function getPopularPostsFailure(error: string): ForumAction & {
    error: string
} {
    return {
        type: actions.GETTING_POPULAR_POSTS_FAILURE,
        error
    };
}

function gettingCommentByCommentId(): ForumAction {
    return {
        type: actions.GETTING_COMMENT_BY_COMMENT_ID
    };
}

function gettingCommentByCommentIdSuccess(comment: Comment): ForumAction {
    return {
        type: actions.GETTING_COMMENT_BY_COMMENT_ID_SUCCESS,
        comment
    };
}

function gettingCommentByCommentIdFailure(error: string): ForumAction {
    return {
        type: actions.GETTING_COMMENT_BY_COMMENT_ID_FAILURE,
        error
    };
}

function creatingReplyToComment(): ForumAction {
    return {
        type: actions.CREATING_REPLY_TO_COMMENT
    }
}

function creatingReplyToCommentSuccess(): ForumAction {
    return {
        type: actions.CREATING_REPLY_TO_COMMENT_SUCCESS
    }
}

function creatingReplyToCommentFailure(error: string): ForumAction {
    return {
        type: actions.CREATING_REPLY_TO_COMMENT_FAILURE,
        error
    }
}

function upvotingPost(): ForumAction {
    return {
        type: actions.UPVOTING_POST
    }
}

function upvotingPostSuccess(postSlug: string): ForumAction {
    return {
        type: actions.UPVOTING_POST_SUCCESS,
        postSlug
    }
}

function upvotingPostFailure(error: string): ForumAction {
    return {
        type: actions.UPVOTING_POST_FAILURE,
        error
    }
}

function downvotingPost(): ForumAction {
    return {
        type: actions.DOWNVOTING_POST
    }
}

function downvotingPostSuccess(postSlug: string): ForumAction {
    return {
        type: actions.DOWNVOTING_POST_SUCCESS,
        postSlug
    }
}

function downvotingPostFailure(error: string): ForumAction {
    return {
        type: actions.DOWNVOTING_POST_FAILURE,
        error
    }
}

function upvotingComment(): ForumAction {
    return {
        type: actions.UPVOTING_COMMENT
    }
}

function upvotingCommentSuccess(commentId: string): ForumAction {
    return {
        type: actions.UPVOTING_COMMENT_SUCCESS,
        commentId
    }
}

function upvotingCommentFailure(error: string): ForumAction {
    return {
        type: actions.UPVOTING_COMMENT_FAILURE,
        error
    }
}

function downvotingComment(): ForumAction {
    return {
        type: actions.DOWNVOTING_COMMENT
    }
}

function downvotingCommentSuccess(commentId: string): ForumAction {
    return {
        type: actions.DOWNVOTING_COMMENT_SUCCESS,
        commentId
    }
}

function downvotingCommentFailure(error: string): ForumAction {
    return {
        type: actions.DOWNVOTING_COMMENT_FAILURE,
        error
    }
}

export {
    submittingPost,
    submittingPostSuccess,
    submittingPostFailure,

    //TAGS

    createTag,
    createTagSuccess,
    createTagFailure,

    getTags,
    getTagsSuccess,
    getTagsFailure,

    getMineTags,
    getMineTagsSuccess,
    getMineTagsFailure,

    deleteTag,
    deleteTagSuccess,
    deleteTagFailure,

    associateTagToPost,
    associateTagToPostSuccess,
    associateTagToPostFailure,

    /////

    getRecentPosts,
    getRecentPostsSuccess,
    getRecentPostsFailure,

    gettingPostBySlug,
    gettingPostBySlugSuccess,
    gettingPostBySlugFailure,

    creatingReplyToPost,
    creatingReplyToPostSuccess,
    creatingReplyToPostFailure,

    gettingComments,
    gettingCommentsSuccess,
    gettingCommentsFailure,

    getPopularPosts,
    getPopularPostsSuccess,
    getPopularPostsFailure,

    gettingCommentByCommentId,
    gettingCommentByCommentIdSuccess,
    gettingCommentByCommentIdFailure,

    creatingReplyToComment,
    creatingReplyToCommentSuccess,
    creatingReplyToCommentFailure,

    upvotingPost,
    upvotingPostSuccess,
    upvotingPostFailure,

    downvotingPost,
    downvotingPostSuccess,
    downvotingPostFailure,

    upvotingComment,
    upvotingCommentSuccess,
    upvotingCommentFailure,

    downvotingComment,
    downvotingCommentSuccess,
    downvotingCommentFailure
}