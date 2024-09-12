import React from 'react'
import {Layout} from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import {Post} from '../modules/forum/models/Post';
import {toast} from 'react-toastify';
import PostSummary from '../modules/forum/components/posts/post/components/PostSummary';
import PostComment from '../modules/forum/components/posts/post/components/PostComment';
import {Comment} from '../modules/forum/models/Comment';
import {BackNavigation} from '../shared/components/header';
import {CommentUtil} from '../modules/forum/utils/CommentUtil';
import {UsersState} from '../modules/users/redux/states';
//@ts-ignore
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import {User} from '../modules/users/models/user';
import {ProfileButton} from '../modules/users/components/profileButton';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import * as forumOperators from '../modules/forum/redux/operators'
import {ForumState} from '../modules/forum/redux/states';
import Editor from '../modules/forum/components/comments/components/Editor';
import {SubmitButton} from '../shared/components/button';
import {TextUtil} from '../shared/utils/TextUtil';
import {FullPageLoader} from '../shared/components/loader';
import withVoting from '../modules/forum/hocs/withVoting';
import {Points} from '../modules/forum/components/posts/points';
import TagRow from "../modules/forum/components/tags/components/TagRow";
import {TagModel} from "../modules/forum/models/TagModel";
import {OtherFilters} from "./index";

interface DiscussionPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
    users: UsersState;
    forum: ForumState;
    history: any;
}

interface DiscussionState {
    comments: Comment[];
    tagsChosen: TagModel[];
    tagsChosenToFilter: TagModel[];
    newCommentText: string;
    filter: CommentFilter;
    filterComments: Comment[];
    didSearch: boolean;
}

export type CommentFilter = 'ALL' | 'EXACT' | 'AT_LEAST';

class DiscussionPage extends React.Component<DiscussionPageProps, DiscussionState> {
    constructor(props: DiscussionPageProps) {
        super(props);

        this.state = {
            comments: [],
            tagsChosen: [],
            tagsChosenToFilter: [],
            filter: 'ALL',
            newCommentText: '',
            filterComments: [],
            didSearch: false
        }
    }

    getSlugFromWindow(): string {
        if (typeof window !== 'undefined') {
            var pathname = window.location.pathname;
            var slug = pathname.substring(pathname.lastIndexOf("/") + 1);
            return slug;
        } else {
            return "";
        }
    }

    getPost(): void {
        const slug = this.getSlugFromWindow();
        this.props.getPostBySlug(slug);
    }

    getComments(offset?: number): void {
        const slug = this.getSlugFromWindow();
        this.props.getComments(slug, offset);
    }

    getTags() {
        this.props.getTags();
    }

    getSearchedTags() {
        return this.props.forum.tags;
    }

    componentDidMount() {
        this.getPost();
        this.getComments();
        this.getTags();
    }

    updateValue(fieldName: string, newValue: any) {
        this.setState({
            ...this.state,
            [fieldName]: newValue
        })
    }

    isFormValid(): boolean {
        const {newCommentText} = this.state;

        if (!!newCommentText === false ||
            TextUtil.atLeast(newCommentText, CommentUtil.minCommentLength) ||
            TextUtil.atMost(newCommentText, CommentUtil.maxCommentLength)
        ) {
            toast.error(`Yeahhhhh, comments should be ${CommentUtil.minCommentLength} to ${CommentUtil.maxCommentLength} characters. Yours was ${newCommentText.length}. 🤠`, {
                autoClose: 3000
            })
            return false;
        }

        return true;
    }

    onSubmitComment() {
        if (this.isFormValid()) {
            const text = this.state.newCommentText;
            const slug = (this.props.forum.post as Post).slug;
            this.props.createReplyToPost(text, slug, this.state.tagsChosen);
        }
    }

    afterSuccessfulCommentPost(prevProps: DiscussionPageProps) {
        const currentProps: DiscussionPageProps = this.props;
        if (currentProps.forum.isCreatingReplyToPostSuccess === !prevProps.forum.isCreatingReplyToPostSuccess) {
            toast.success(`Done-zo! 🤠`, {
                autoClose: 2000
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }
    }

    afterFailedCommentPost(prevProps: DiscussionPageProps) {
        const currentProps: DiscussionPageProps = this.props;
        if (currentProps.forum.isCreatingReplyToPostFailure === !prevProps.forum.isCreatingReplyToPostFailure) {
            const error: string = currentProps.forum.error;
            return toast.error(`Yeahhhhh, ${error} 🤠`, {
                autoClose: 3000
            })
        }
    }

    commentsHaveExactSameTags(array1: string[], array2: string[]): boolean {
        console.log(array1)
        console.log(array2)
        if (array1.length !== array2.length) {
            return false;
        }
        let count = 0
        array1.forEach(elem => {
            if (array2.includes(elem)) {
                count++;
            }
        });
        return count === array2.length
    }

    atLeastOneMatchByName(array1: string[], array2: string[]): boolean {
        let count = 0
        array1.forEach(elem => {
            if (array2.includes(elem)) {
                count++;
            }
        });
        return count > 0
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

    addTagToFilter(tag: TagModel) {
        const isTagAlreadyChosen = this.state.tagsChosenToFilter.some((chosenTag) => chosenTag.tag === tag.tag);

        if (!isTagAlreadyChosen) {
            this.setState((prevState) => ({
                ...prevState,
                tagsChosenToFilter: [...prevState.tagsChosenToFilter, tag],
            }));
        }
    }

    doFilter() {
        if (this.state.tagsChosenToFilter.length === 0 && this.state.filter !== 'ALL') {
            return toast.error(`Choose at least one tag! 🤠`, {
                autoClose: 3000
            })
        }

        this.setState({
            ...this.state,
            ['didSearch']: true
        })

        let tmp: Comment[] = []

        const tagsStr: string[] = this.state.tagsChosenToFilter.map(tag => tag.tag)

        if (this.state.filter === 'EXACT') {
            this.props.forum.comments.forEach(comment => {
                if (this.commentsHaveExactSameTags(comment.tags, tagsStr)) {
                    tmp.push(comment)
                }
            })
            this.setState({
                ...this.state,
                ['filterComments']: tmp
            })
        } else if (this.state.filter === 'AT_LEAST') {
            this.props.forum.comments.forEach(comment => {
                if (this.atLeastOneMatchByName(comment.tags, tagsStr)) {
                    tmp.push(comment)
                }
            })
            this.setState({
                ...this.state,
                ['filterComments']: tmp
            })
        } else {
            this.setState({
                ...this.state,
                ['filterComments']: this.props.forum.comments
            })
        }
    }

    handleCheckboxChange(type: CommentFilter) {
        this.setState({
            ...this.state,
            ['filter']: type
        })
    }

    removeTag(tag: TagModel) {
        this.setState((prevState) => ({
            ...prevState,
            tagsChosen: prevState.tagsChosen.filter((chosenTag) => chosenTag.tag !== tag.tag),
        }));
    }

    removeTagOfFilter(tag: TagModel) {
        this.setState((prevState) => ({
            ...prevState,
            tagsChosenToFilter: prevState.tagsChosenToFilter.filter((chosenTag) => chosenTag.tag !== tag.tag),
        }));
    }

    componentDidUpdate(prevProps: DiscussionPageProps) {
        this.afterSuccessfulCommentPost(prevProps);
        this.afterFailedCommentPost(prevProps);
    }

    isChosen(tag: TagModel): boolean {
        return this.state.tagsChosen.some((existingTag) => existingTag.tag === tag.tag);
    }

    isChosenOfFilter(tag: TagModel): boolean {
        return this.state.tagsChosenToFilter.some((existingTag) => existingTag.tag === tag.tag);
    }

    render() {
        const post = this.props.forum.post as Post;
        const comments = this.props.forum.comments;

        return (
            <Layout>
                <div className="header-container flex flex-row flex-center flex-between">
                    <BackNavigation
                        text="Back to all discussions"
                        to="/"
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
                {this.props.forum.isGettingPostBySlug ? (
                    ''
                ) : (
                    <>
                        <Header
                            title={`"${post.title}"`}
                            isUpvotable={true}
                            onUpvoteClicked={() => this.props.upvotePost(post.slug)}
                            onDownvoteClicked={() => this.props.downvotePost(post.slug)}
                            points={post.points}
                            isLoggedIn={this.props.users.isAuthenticated}
                        />

                        <br/>
                        <br/>
                        <PostSummary
                            {...post as Post}
                        />

                        <hr style={{margin: '20px 0', border: 'none', borderBottom: '4px solid #ccc'}}/>
                        <h2>Leave a comment</h2>

                        <SubmitButton
                            text="Post comment"
                            onClick={() => this.onSubmitComment()}
                        />
                        <br/>
                        <br/>
                        <Editor
                            text={this.state.newCommentText}
                            maxLength={CommentUtil.maxCommentLength}
                            placeholder="Post your reply"
                            handleChange={(v: any) => this.updateValue('newCommentText', v)}
                        />

                        <h3>Tags to be associated with the comment</h3>
                        {this.state.tagsChosen.length !== 0
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
                            <>
                                {this.state.tagsChosen.length === 0 ?
                                    <h6>Empty</h6>
                                    :
                                    <h6>(Click to disassociate)</h6>}
                            </>
                        }
                        {this.state.tagsChosen.length !== this.props.forum.tags.length &&
                            <>
                                <h3>List of possible tags</h3>
                                <h6>(click to associate)</h6>
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

                    </>
                )}
                <br/>

                <hr style={{margin: '20px 0', border: 'none', borderBottom: '4px solid #ccc'}}/>
                <h2>Discussion Section</h2>
                <SubmitButton
                    text="Search"
                    onClick={() => this.doFilter()}
                />
                <br/>
                <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.filter === 'ALL'}
                            onChange={() => this.handleCheckboxChange('ALL')}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.filter === 'EXACT'}
                            onChange={() => this.handleCheckboxChange('EXACT')}
                        />
                        Exaclty combination/One specific tag
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={this.state.filter === 'AT_LEAST'}
                            onChange={() => this.handleCheckboxChange('AT_LEAST')}
                        />
                        At least one tag match
                    </label>
                </div>

                <h3>Tags being filter in the comments</h3>
                {this.state.tagsChosenToFilter.length === 0 ?
                    <h6>Empty</h6>
                    :
                    <>
                        <h6>(Click to remove)</h6>
                        {
                            this.state.tagsChosenToFilter.map((p, i) => (
                                <TagRow
                                    key={p.tag}
                                    selected={true}
                                    text={p.tag}
                                    onClick={() => {
                                        this.removeTagOfFilter(p)
                                    }}/>
                            ))
                        }</>
                }

                <h3>Total tags</h3>
                {this.state.tagsChosenToFilter.length === this.props.forum.tags.length ?
                    <h4>Empty</h4>
                    :
                    <>
                        <h6>(Click to add to the filter section)</h6>
                        {this.getSearchedTags().map((p, i) => (
                            <>
                                {!this.isChosenOfFilter(p) &&
                                    <TagRow
                                        key={p.tag}
                                        selected={false}
                                        text={p.tag}
                                        onClick={() => {
                                            this.addTagToFilter(p)
                                        }}/>
                                }
                            </>
                        ))}
                    </>

                }

                {/*{comments.map((c, i) => (*/}
                {/*    <PostComment*/}
                {/*        key={i}*/}
                {/*        onDownvoteClicked={() => this.props.downvoteComment(c.commentId)}*/}
                {/*        onUpvoteClicked={() => this.props.upvoteComment(c.commentId)}*/}
                {/*        isLoggedIn={this.props.users.isAuthenticated}*/}
                {/*        {...c}*/}
                {/*    />*/}
                {/*))}*/}


                <h3>Results ({this.state.filterComments.length})</h3>
                {!this.state.didSearch &&
                    <h4>Please search first</h4>
                }
                {this.state.filterComments.map((c, i) => (
                    <>
                        <PostComment
                            key={i}
                            onDownvoteClicked={() => this.props.downvoteComment(c.commentId)}
                            onUpvoteClicked={() => this.props.upvoteComment(c.commentId)}
                            isLoggedIn={this.props.users.isAuthenticated}
                            {...c}
                        />
                    </>
                ))}

                {this.props.forum.isCreatingReplyToPost ? <FullPageLoader/> : ''}
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
    withLogoutHandling(
        withVoting(DiscussionPage)
    )
);
