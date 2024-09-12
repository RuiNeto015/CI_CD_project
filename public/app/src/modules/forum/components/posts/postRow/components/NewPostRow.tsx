import React from 'react';
import "../styles/PostRow.sass"
import { Post } from '../../../../models/Post';
import { Points } from '../../points';
import PostMeta from '../../post/components/PostMeta';

interface NewPostRowProps extends Post {
    onUpvoteClicked: () => void;
    onDownvoteClicked: () => void;
    isLoggedIn: boolean;
    createdAt: string | Date
}

function wasCreatedToday(date: string | Date) {
    const dateString = date.toString().substring(0, date.toString().indexOf('T'))
    const dateStringParts = dateString.split('-')
    const createdAt
        = new Date(Number(dateStringParts[0]), Number(dateStringParts[1]) - 1, Number(dateStringParts[2]));
    const today = new Date();

    if (createdAt.getDate() === today.getDate() &&
        createdAt.getMonth() === today.getMonth() &&
        createdAt.getFullYear() === today.getFullYear()) {
        return true
    }
    return false
}


const NewPostRow: React.FC<NewPostRowProps> = (props) => (
    <div className={`post-row ${wasCreatedToday(props.createdAt) ? 'bg-red' : ''}`}>
        <Points
            onUpvoteClicked={() => props.onUpvoteClicked()}
            onDownvoteClicked={() => props.onDownvoteClicked()}
            points={props.points}
            isLoggedIn={props.isLoggedIn}
        />
        <PostMeta {...props} />
    </div>
)

export default NewPostRow;