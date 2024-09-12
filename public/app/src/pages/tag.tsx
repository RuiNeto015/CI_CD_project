import React from 'react'
import {Layout} from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import {ProfileButton} from '../modules/users/components/profileButton';
import {UsersState} from '../modules/users/redux/states';
import {toast} from 'react-toastify';
//@ts-ignore
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import * as forumOperators from '../modules/forum/redux/operators'
import {User} from '../modules/users/models/user';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import {TextUtil} from '../shared/utils/TextUtil';
import {PostUtil} from '../modules/forum/utils/PostUtil';
import {FullPageLoader} from '../shared/components/loader';
import {ForumState} from '../modules/forum/redux/states';
import TagSubmission from "../modules/forum/components/tags/components/TagSubmission";
import TagRow from "../modules/forum/components/tags/components/TagRow";
import {TagModel} from "../modules/forum/models/TagModel";
import {RouteComponentProps} from "react-router-dom";
import {ActualMember} from "../modules/users/models/actualMember";

interface MatchParams {
    username: string;
}

interface TagProps extends usersOperators.IUserOperators, forumOperators.IForumOperations, RouteComponentProps<MatchParams> {
    users: UsersState;
    forum: ForumState;
    history: any;
}

interface TagState {
    tagName: string;
}

class TagManagement extends React.Component<TagProps, TagState> {
    constructor(props: TagProps) {
        super(props);

        this.state = {
            tagName: '',
        }
    }

    getTags() {
        // this.props.getTags();
        this.props.getMineTags();
    }

    getSearchedTags() {
        // return this.props.forum.tags.filter(p => p.memberId === this.props.users.user.userId)
        // return this.props.forum.tags
        return this.props.forum.myTags
    }


    componentDidMount() {
        this.getTags()
    }

    updateFormField(fieldName: string, value: string) {
        console.log(fieldName)
        console.log(value)
        this.setState({
            ...this.state,
            [fieldName]: value
        })
    }

    isFormValid(): boolean {
        const {tagName} = this.state;
        console.log(tagName)

        const tagPresent = !!tagName === true;

        if (!tagPresent ||
            TextUtil.atLeast(tagName, PostUtil.minTitleLength) ||
            TextUtil.atMost(tagName, PostUtil.maxTitleLength)
        ) {
            toast.error(`Yeahhhhh, tag names should be ${PostUtil.minTitleLength} to ${PostUtil.maxTitleLength} characters. Yours was ${tagName.length}. 🤠`, {
                autoClose: 3000
            })
            return false;
        }
        return true;
    }

    onSubmit() {
        if (this.isFormValid()) {
            this.props.createTag(this.state.tagName);
        }
    }

    onDeleting(tag: TagModel) {
        if (tag.posts !== 0) {
            return toast.error(`The review is associated with posts!`, {
                autoClose: 3000
            })
        }
        this.props.deleteTag(tag.tag);
    }

    afterSuccessfulPost(prevProps: TagProps) {
        const currentProps: TagProps = this.props;
        if (currentProps.forum.isCreatingTagSuccess === !prevProps.forum.isCreatingTagSuccess) {
            toast.success(`Done-zo! 🤠`, {
                autoClose: 2000
            });
            setTimeout(() => {
                window.location.reload();
                window.location.href = "/tags"
            }, 2000)
        }
    }

    afterFailedPost(prevProps: TagProps) {
        const currentProps: TagProps = this.props;
        if (currentProps.forum.isCreatingTagFailure === !prevProps.forum.isCreatingTagFailure) {
            const error: string = currentProps.forum.error;
            return toast.error(`Yeahhhhh, ${error} 🤠`, {
                autoClose: 3000
            })
        }
    }

    afterSuccessfulDelete(prevProps: TagProps) {
        const currentProps: TagProps = this.props;
        if (currentProps.forum.isDeletingTagSuccess === !prevProps.forum.isDeletingTagSuccess) {
            toast.success(`Done-zo! 🤠`, {
                autoClose: 2000
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }
    }

    afterFailedDelete(prevProps: TagProps) {
        const currentProps: TagProps = this.props;
        if (currentProps.forum.isDeletingTagFailure === !prevProps.forum.isDeletingTagFailure) {
            const error: string = currentProps.users.error;
            return toast.error(`Yeahhhhh, ${error} 🤠`, {
                autoClose: 3000
            })
        }
    }

    componentDidUpdate(prevProps: TagProps) {
        this.afterSuccessfulPost(prevProps);
        this.afterFailedPost(prevProps);
        this.afterFailedDelete(prevProps);
        this.afterSuccessfulDelete(prevProps)
    }


    render() {
        return (
            <Layout>
                <div className="header-container flex flex-row flex-center flex-even">
                    <Header
                        title="New submission"
                        subtitle=""
                    />
                    <ProfileButton
                        isLoggedIn={this.props.users.isAuthenticated}
                        username={this.props.users.isAuthenticated ? (this.props.users.user as User).username : ''}
                        onLogout={() => this.props.logout()}
                        onProfile={() => {
                            window.location.href = "/profile"
                        }}
                    />
                </div>
                <br/>
                <br/>
                <TagSubmission
                    updateFormField={(f: string, val: string) => this.updateFormField(f, val)}
                    // tagName={this.state.tagName}
                    onSubmit={() => this.onSubmit()}
                />

                <hr style={{margin: '40px 0', border: 'none', borderBottom: '4px solid #ccc'}}/>
                <h2>My tags</h2>

                {this.props.forum.isGettingTags === null ?
                    <h5>without tags</h5>
                    :
                    <h5>(click to remove)</h5>
                }
                {this.props.forum.isGettingTags !== null &&
                    this.getSearchedTags().map((p, i) => (
                        <TagRow
                            key={p.tag}
                            selected={false}
                            text={`${p.tag} (Posts: ${p.posts}, Comments: ${p.comments})`}
                            onClick={() => this.onDeleting(p)}
                        />
                    ))}
                {this.props.forum.isGettingTags ? <FullPageLoader/> : ''}
            </Layout>
        )
    }
}

function mapStateToProps({users, forum}: {
    users: UsersState,
    forum: ForumState
}) {
    return {
        users,
        forum
    };
}

function mapActionCreatorsToProps(dispatch: any) {
    return bindActionCreators(
        {
            ...usersOperators,
            ...forumOperators
        }, dispatch);
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(
    withLogoutHandling(TagManagement)
);