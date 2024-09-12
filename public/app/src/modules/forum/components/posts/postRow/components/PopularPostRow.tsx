
import React from 'react';
import "../styles/PostRow.sass"
import { Post } from '../../../../models/Post';
import { Points } from '../../points';
import PostMeta from '../../post/components/PostMeta';

interface PopularPostRowProps extends Post {
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

const PopularPostRow: React.FC<PopularPostRowProps> = (props) => (
  <div className="post-row">
    <Points
      onUpvoteClicked={() => props.onUpvoteClicked()}
      onDownvoteClicked={() => props.onDownvoteClicked()}
      points={props.points}
      isLoggedIn={props.isLoggedIn}
    />
    <PostMeta {...props} />
  </div>
)

export default PopularPostRow;