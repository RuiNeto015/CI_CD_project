import * as actionCreators from '../actionCreators'
import {tagService} from '../../services';
import {TagModel} from "../../models/TagModel";

function getTags(offset: string) {
    return async (dispatch: any) => {

        dispatch(actionCreators.getTags());

        const result = await tagService.getTags(offset);
        console.log('inside getTags', result)
        if (result.isLeft()) {
            const error: string = result.value;
            dispatch(actionCreators.getTagsFailure(error))
        } else {
            const tags: TagModel[] = result.value.getValue();
            dispatch(actionCreators.getTagsSuccess(tags));
        }
    };
}

export {getTags};
