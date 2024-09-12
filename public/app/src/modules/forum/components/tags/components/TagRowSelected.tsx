import React from 'react';
import TagButton from "../../../../../shared/components/button/components/TagButton";

interface PostRowProps {
    text: string
    onClick: () => void
}

const TagRow: React.FC<PostRowProps> = (props) => (
    <div className="tag-button-selected">
        <TagButton
            selected={false}
            text={props.text}
            onClick={props.onClick}/>
    </div>
)

export default TagRow;