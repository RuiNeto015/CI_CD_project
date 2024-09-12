import * as actionCreators from '../actionCreators'
import {postService, tagService} from '../../services';
import {Post} from '../../models/Post';
import {TagModel} from "../../models/TagModel";

function getMineTags() {
    return async (dispatch: any) => {

        dispatch(actionCreators.getMineTags());

        const result = await tagService.getMineTags();
        console.log('inside getMineTags', result)
        if (result.isLeft()) {
            const error: string = result.value;
            dispatch(actionCreators.getMineTagsFailure(error))
        } else {
            const tags: TagModel[] = result.value.getValue();
            dispatch(actionCreators.getMineTagsSuccess(tags));
        }
    };
}

export {getMineTags};
