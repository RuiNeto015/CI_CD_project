/*

import React from 'react'

export class MemberPage extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
  }

  getUserName () {
    return this.props.match.params.username;
  }

  render () {
    const username = this.getUserName();
    return (
      <div>
        <h1>Member</h1>
        <h2>{username}</h2>
        <p>Nothing here just yet :p</p>
      </div>
    )
  }
}

export default MemberPage;*/


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
import * as forumOperators from "../modules/forum/redux/operators";
import {ForumState} from "../modules/forum/redux/states";
import {ActualMember} from "../modules/users/models/actualMember";
import {withRouter, RouteComponentProps} from 'react-router-dom';

interface MatchParams {
    username: string;
}

interface ProfileButtonProps extends usersOperators.IUserOperators, forumOperators.IForumOperations, RouteComponentProps<MatchParams> {
    isLoggedIn: boolean;
    onLogout: () => void;
    users: UsersState;
    forum: ForumState;
}

class MemberPage extends React.Component<ProfileButtonProps> {

    constructor(props: ProfileButtonProps) {
        super(props);
        this.getMember = this.getMember.bind(this);
    }

    getMember() {
        const username = this.props.match.params.username;
        this.props.getMember(username);
    }

    componentDidMount() {
        this.getMember()
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

                <div className="header-container flex flex-row flex-center" style={{fontSize: '30px'}}>
                    Profile of user: {(this.props.users.actualMember as ActualMember).username}
                </div>
                <br/>
                <br/>
                <br/>
                <div className="flex flex-row flex-center flex-even">
                    <img style={{maxHeight: '150px'}} src={profile_icon} alt="Profile Icon"/>
                </div>
                <br/>
                <div className="header-container flex flex-row flex-center flex-even">
                    {this.props.users.isAuthenticated ? (this.props.users.actualMember as ActualMember).email : ''}
                </div>
                <br/>
                <br/>
                <div className="header-container flex flex-row flex-center flex-even">
                    This user goooes!
                    He/She has made a total
                    of {this.props.users.isAuthenticated ? (this.props.users.actualMember as ActualMember).numberOfPosts : ''} posts!
                    🤠
                </div>
                <br/>
                <div className="header-container flex flex-row flex-center flex-even">
                    ... and a total
                    of {this.props.users.isAuthenticated ? (this.props.users.actualMember as ActualMember).numberOfComments : ''} comments!
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
                            This user
                            has {(this.props.users.actualMember as ActualMember).numberOfPosts / (this.props.users.user as User).userWithMostPosts!.numberOfPosts * 100}%
                            of
                            it.
                        </div>
                    ) : (
                        <div>
                            Top Scored User information not available.
                        </div>
                    )}
                </div>
            </Layout>
        )
    }
}

function mapStateToProps({users}: { users: UsersState }) {
    return {
        users,
    };
}

function mapActionCreatorsToProps(dispatch: any) {
    return bindActionCreators(
        {
            ...usersOperators
        },
        dispatch
    );
}

export default withRouter(
    connect(mapStateToProps, mapActionCreatorsToProps)(
        withLogoutHandling(MemberPage)
    )
);
