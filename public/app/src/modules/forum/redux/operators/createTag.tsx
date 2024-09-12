import * as actionCreators from '../actionCreators'
import {commentService, postService, tagService} from '../../services';
import {Post} from '../../models/Post';

function createTag(offset: string) {
    return async (dispatch: any) => {

        dispatch(actionCreators.createTag());

        const result = await tagService.createTag(offset);

        if (result.isLeft()) {
            const error: string = result.value;
            dispatch(actionCreators.createTagFailure(error))
        } else {
            dispatch(actionCreators.createTagSuccess());
        }
    };
}

export {createTag};
