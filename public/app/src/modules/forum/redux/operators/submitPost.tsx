
import * as actionCreators from '../actionCreators'
import { postService } from '../../services';
import { PostType } from '../../models/Post';
import {TagModel} from "../../models/TagModel";

function submitPost (title: string, type: PostType, text?: string, link?: string, tags?: TagModel[]) {
  return async (dispatch: any) => {

    dispatch(actionCreators.submittingPost());

    const result = await postService.createPost(title, type, text, link, tags);



    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.submittingPostFailure(error))
    } else {
      dispatch(actionCreators.submittingPostSuccess());
    }
  };
}

export { submitPost };
