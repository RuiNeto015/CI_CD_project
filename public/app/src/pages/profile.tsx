import React from "react";
import {ProfileButton} from "../modules/users/components/profileButton";
import * as usersOperators from '../modules/users/redux/operators'
import Header from "../shared/components/header/components/Header";
import {Layout} from "../shared/layout";
import {UsersState} from "../modules/users/redux/states";
import {User} from "../modules/users/models/user";
import {connect} from "react-redux";
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import {bindActionCreators} from "redux";
import profile_icon from "../assets/img/profile/profile_icon.png";
import trophy_icon from "../assets/img/trophy/trophy_icon.png";

interface ProfileButtonProps extends usersOperators.IUserOperators {
    isLoggedIn: boolean;
    onLogout: () => void;
    users: UsersState;
}

class ProfilePage extends React.Component<ProfileButtonProps> {

    constructor(props: ProfileButtonProps) {
        super(props);
    }

    render() {

        return (
            <Layout>
                <div className="header-container flex flex-row flex-center flex-even">
                    <Header
                        title="Domain-Driven Designers"
                        subtitle="Where awesome Domain-Driven Designers are made"
                    />
                    <ProfileButton isLoggedIn={this.props.users.isAuthenticated} onLogout={() => this.props.logout()}
                                   onProfile={() => {
                                       window.location.href = "/profile"
                                   }}
                                   username={this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}/>
                </div>
                <br/>
                <br/>
                {this.props.users.isAuthenticated && (
                    <>
                        <div className="header-container flex flex-row flex-center" style={{fontSize: '30px'}}>
                            Your
                            Profile: {this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="flex flex-row flex-center flex-even">
                            <img style={{maxHeight: '150px'}} src={profile_icon} alt="Profile Icon"/>
                        </div>
                        <br/>
                        <div className="header-container flex flex-row flex-center flex-even">
                            {this.props.users.isAuthenticated ? (this.props.users.user as User).email : ''}
                        </div>
                        <br/>
                        <br/>
                        <div className="header-container flex flex-row flex-center flex-even">
                            You gooo!
                            You have made a total
                            of {this.props.users.isAuthenticated ? (this.props.users.user as User).numberOfPosts : ''} posts!
                            🤠
                        </div>
                        <br/>
                        <div className="header-container flex flex-row flex-center flex-even">
                            ... and a total
                            of {this.props.users.isAuthenticated ? (this.props.users.user as User).numberOfComments : ''} comments!
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="flex flex-row flex-center flex-even">
                            <img style={{maxHeight: '100px'}} src={trophy_icon} alt="Trophy Icon"/>
                        </div>
                        <br/>
                        <div className="header-container flex flex-row flex-center flex-even">
                            {this.props.users.isAuthenticated && (this.props.users.user as User).userWithMostPosts != null ? (
                                <div className="header-container flex flex-row flex-center flex-even">
                                    The top scored user ({(this.props.users.user as User).userWithMostPosts!.email})
                                    has {(this.props.users.user as User).userWithMostPosts!.numberOfPosts} posts.
                                    You
                                    have {(this.props.users.user as User).numberOfPosts! / (this.props.users.user as User).userWithMostPosts!.numberOfPosts * 100}%
                                    of
                                    it.
                                </div>
                            ) : (
                                <div>
                                    Top Scored User information not available.
                                </div>
                            )}
                        </div>
                    </>)}
            </Layout>
        )
    }
}

function mapStateToProps({users}: { users: UsersState }) {
    return {
        users
    };
}

function mapActionCreatorsToProps(dispatch: any) {
    return bindActionCreators(
        {
            ...usersOperators
        }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
    withLogoutHandling(ProfilePage)
);