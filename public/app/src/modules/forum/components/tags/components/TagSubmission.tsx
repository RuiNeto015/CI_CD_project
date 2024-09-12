import React from 'react'
import {TextInput} from '../../../../../shared/components/text-input'
import {PostType} from '../../../models/Post'
import "../styles/PostSubmission.sass"
import {SubmitButton} from '../../../../../shared/components/button'

interface IPostSubmissionProps {
    updateFormField: (fieldName: string, val: string) => void;
    // onPostTypeChanged: (type: PostType) => void;
    // postType: PostType;
    // tagValue: string;
    // titleValue: string;
    // linkValue: string;
    onSubmit: () => void;
}

const TagSubmission: React.FC<IPostSubmissionProps> = (props) => (
    <div className="post-submission">
        <h2>Tag name</h2>
        <TextInput
            type="text"
            onChange={(val: string) => props.updateFormField('tagName', val)}
            placeholder="Enter the name of the tag"
        />

        <br/>

        <SubmitButton
            onClick={() => props.onSubmit()}
            text="Create tag"
        />

    </div>
)

export default TagSubmission;