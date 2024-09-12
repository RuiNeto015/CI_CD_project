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
import PostSubmission from '../modules/forum/components/comments/components/PostSubmission';
import {PostType} from '../modules/forum/models/Post';
import {TextUtil} from '../shared/utils/TextUtil';
import {PostUtil} from '../modules/forum/utils/PostUtil';
import {FullPageLoader} from '../shared/components/loader';
import {ForumState} from '../modules/forum/redux/states';
import TagRow from "../modules/forum/components/tags/components/TagRow";
import {TextInput} from "../shared/components/text-input";
import {TagModel} from "../modules/forum/models/TagModel";

interface SubmitPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
    users: UsersState;
    forum: ForumState;
    history: any;
}

interface SubmitPageState {
    title: string;
    text: string;
    link: string;
    postType: PostType;
    tagsChosen: TagModel[];
}

class SubmitPage extends React.Component<SubmitPageProps, SubmitPageState> {
    constructor(props: SubmitPageProps) {
        super(props);

        this.state = {
            title: '',
            text: '',
            link: '',
            tagsChosen: [],
            postType: 'text'
        }
    }

    getTags() {
        this.props.getTags();
    }

    getSearchedTags() {
        return this.props.forum.tags;
    }

    componentDidMount() {
        console.log('MOUNTED')
        this.getTags()
    }

    updateFormField(fieldName: string, value: string) {
        this.setState({
            ...this.state,
            [fieldName]: value
        })
    }

    onPostTypeChanged(t: PostType) {
        this.setState({
            ...this.state,
            postType: t
        })
    }

    isFormValid(): boolean {
        const {title, text, link, postType} = this.state;


        const titlePresent = !!title === true;
        const textPresent = !!text === true;
        const linkPresent = !!link === true;

        if (!titlePresent ||
            TextUtil.atLeast(title, PostUtil.minTitleLength) ||
            TextUtil.atMost(title, PostUtil.maxTitleLength)
        ) {
            toast.error(`Yeahhhhh, title should be ${PostUtil.minTitleLength} to ${PostUtil.maxTitleLength} characters. Yours was ${title.length}. 🤠`, {
                autoClose: 3000
            })
            return false;
        }

        // if (this.state.tagsChosen.length === 0) {
        //     toast.error(`Yeahhhhh, Tag is required. 🤠`, {
        //         autoClose: 3000
        //     })
        //     return false;
        // }

        if (postType === 'text') {
            if (!textPresent ||
                TextUtil.atLeast(text, PostUtil.minTextLength) ||
                TextUtil.atMost(text, PostUtil.maxTextLength)
            ) {
                toast.error(`Yeahhhhh, text posts should be ${PostUtil.minTextLength} to ${PostUtil.maxTextLength} characters. Yours was ${text.length}. 🤠`, {
                    autoClose: 3000
                })
                return false;
            }
        } else {
            if (!linkPresent ||
                TextUtil.atLeast(link, PostUtil.minLinkLength) ||
                TextUtil.atMost(link, PostUtil.maxLinkLength)
            ) {
                toast.error(`Yeahhhhh, link posts should be ${PostUtil.minLinkLength} to ${PostUtil.maxLinkLength} characters. Yours was ${text.length}. 🤠`, {
                    autoClose: 3000
                })
                return false;
            }
        }
        return true;
    }

    onSubmit() {
        if (this.isFormValid()) {
            const {title, postType, text, link, tagsChosen} = this.state;
            this.props.submitPost(title, postType, text, link, tagsChosen);
        }
    }

    addTag(tag: TagModel) {
        const isTagAlreadyChosen = this.state.tagsChosen.some((chosenTag) => chosenTag.tag === tag.tag);

        if (!isTagAlreadyChosen) {
            this.setState((prevState) => ({
                ...prevState,
                tagsChosen: [...prevState.tagsChosen, tag],
            }));
        }
    }

    removeTag(tag: TagModel) {
        this.setState((prevState) => ({
            ...prevState,
            tagsChosen: prevState.tagsChosen.filter((chosenTag) => chosenTag.tag !== tag.tag),
        }));
    }


    afterSuccessfulPost(prevProps: SubmitPageProps) {
        const currentProps: SubmitPageProps = this.props;
        if (currentProps.forum.isSubmittingPostSuccess === !prevProps.forum.isSubmittingPostSuccess) {
            toast.success(`Done-zo! 🤠`, {
                autoClose: 2000
            });
            setTimeout(() => {
                this.props.history.push('/?show=new')
            }, 2000)
            console.log('state', this.state)
        }
    }

    afterFailedPost(prevProps: SubmitPageProps) {
        const currentProps: SubmitPageProps = this.props;
        if (currentProps.forum.isSubmittingPostFailure === !prevProps.forum.isSubmittingPostFailure) {
            const error: string = currentProps.forum.error;
            return toast.error(`Yeahhhhh, ${error} 🤠`, {
                autoClose: 3000
            })
        }
    }

    componentDidUpdate(prevProps: SubmitPageProps) {
        this.afterSuccessfulPost(prevProps);
        this.afterFailedPost(prevProps);
    }

    isChosen(tag: TagModel): boolean {
        return this.state.tagsChosen.some((existingTag) => existingTag.tag === tag.tag);
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
                <PostSubmission
                    updateFormField={(f: string, val: string) => this.updateFormField(f, val)}
                    onPostTypeChanged={(type: PostType) => this.onPostTypeChanged(type)}
                    postType={this.state.postType}
                    textValue={this.state.text}
                    titleValue={this.state.title}
                    linkValue={this.state.link}
                    onSubmit={() => this.onSubmit()}
                />


                <h2>Tags to be associated to the post</h2>
                {!this.props.forum.isSubmittingPost && this.state.tagsChosen !== undefined && this.state.tagsChosen.length !== 0
                    ?
                    <>
                        {this.state.tagsChosen.map((p, i) => (
                            <TagRow
                                key={p.tag}
                                selected={true}
                                text={p.tag}
                                onClick={() => {
                                    this.removeTag(p)
                                }}/>
                        ))}
                    </>
                    :
                    <h5>Without tags</h5>
                }
                {!this.props.forum.isSubmittingPost && this.state.tagsChosen.length !== this.props.forum.tags.length &&
                    <>
                        <h2>List of possible tags</h2>
                        {this.getSearchedTags().map((p, i) => (
                            <>
                                {!this.isChosen(p) &&
                                    <TagRow
                                        key={p.tag}
                                        selected={false}
                                        text={p.tag}
                                        onClick={() => {
                                            this.addTag(p)
                                        }}/>
                                }
                            </>
                        ))}
                    </>}
                {this.props.forum.isSubmittingPost ? <FullPageLoader/> : ''}
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
    withLogoutHandling(SubmitPage)
);