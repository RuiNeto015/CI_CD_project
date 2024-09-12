import React from 'react'
import "../styles/TagButton.sass"
import "../styles/TagButtonSelected.sass"

interface ButtonProps {
    text: any;
    selected: boolean;
    onClick: () => void;
    // intent?: 'negative';
}

const TagButton: React.FC<ButtonProps> = (props) => (
    <button
        // className={`tag-button ${props.intent}`}
        className={`${props.selected ? 'tag-button-selected' : 'tag-button'}`}
        onClick={props.onClick}>
        {props.text}
    </button>
)

export default TagButton;