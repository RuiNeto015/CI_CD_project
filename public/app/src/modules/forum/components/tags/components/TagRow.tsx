import React from 'react';
import TagButton from "../../../../../shared/components/button/components/TagButton";

interface PostRowProps {
    text: string,
    selected: boolean,
    onClick: () => void
}

const TagRow: React.FC<PostRowProps> = (props) => (
    <TagButton
        selected={props.selected}
        text={props.text}
        onClick={props.onClick}/>
)

export default TagRow;