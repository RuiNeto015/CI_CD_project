
import * as actionCreators from '../actionCreators'
import { commentService } from '../../services';
import {TagModel} from "../../models/TagModel";

function createReplyToPost (text: string, slug: string, tags : TagModel[]) {
  return async (dispatch: any) => {

    dispatch(actionCreators.creatingReplyToPost());

    const result = await commentService.createReplyToPost(text, slug, tags);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.creatingReplyToPostFailure(error))
    } else {
      dispatch(actionCreators.creatingReplyToPostSuccess());
    }
  };
}

export { createReplyToPost };
