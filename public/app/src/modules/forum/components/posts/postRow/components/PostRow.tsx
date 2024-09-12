import React from 'react';
import "../styles/PostRow.sass"
import {Post} from '../../../../models/Post';
import {Points} from '../../points';
import PostMeta from '../../post/components/PostMeta';

interface PostRowProps extends Post {
    onUpvoteClicked: () => void;
    onDownvoteClicked: () => void;
    isLoggedIn: boolean;
}

const PostRow: React.FC<PostRowProps> = (props) => (
    <div className="post-submission">
        <Points
            onUpvoteClicked={() => props.onUpvoteClicked()}
            onDownvoteClicked={() => props.onDownvoteClicked()}
            points={props.points}
            isLoggedIn={props.isLoggedIn}
        />
        <PostMeta {...props} />
        <hr style={{margin: '20px 0', border: 'none', borderBottom: '2px solid #ccc'}}/>
    </div>
)

export default PostRow;