import * as actionCreators from '../actionCreators'
import {commentService, postService, tagService} from '../../services';
import {Post} from '../../models/Post';

function associateTagToPost(tagName: string, postSlug: string) {
    return async (dispatch: any) => {

        dispatch(actionCreators.associateTagToPost());

        const result = await tagService.associateTagToPost(tagName, postSlug);

        if (result.isLeft()) {
            const error: string = result.value;
            dispatch(actionCreators.associateTagToPostFailure(error))
        } else {
            dispatch(actionCreators.associateTagToPostSuccess());
        }
    };
}

export {associateTagToPost};
