import * as actionCreators from '../actionCreators'
import {postService, tagService} from '../../services';

function deleteTag(offset: string) {
    return async (dispatch: any) => {

        dispatch(actionCreators.deleteTag());

        const result = await tagService.deleteTag(offset);
        console.log('inside delelets', result)
        if (result.isLeft()) {
            const error: string = result.value;
            dispatch(actionCreators.deleteTagFailure(error))
        } else {
            dispatch(actionCreators.deleteTagSuccess());
        }
    };
}

export {deleteTag};
