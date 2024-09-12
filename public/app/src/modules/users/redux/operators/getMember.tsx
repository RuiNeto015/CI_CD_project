import * as actionCreators from '../actionCreators'
import { usersService } from '../../services';

function getMember (username: string) {
    return async (dispatch: any) => {
        try {
            const member = await usersService.getActualMember(username);
            dispatch(actionCreators.gettingMemberSuccess(member));
        }
        catch (err) {
            let message = '';
            console.log(err);
        }
    };
}

export { getMember };