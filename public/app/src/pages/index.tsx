import React from 'react';
import {Layout} from '../shared/layout';
import Header from '../shared/components/header/components/Header';
import PostFilters, {PostFilterType} from '../modules/forum/components/posts/filters/components/PostFilters';
import {Post} from '../modules/forum/models/Post';
import {PostRow} from '../modules/forum/components/posts/postRow';
import {ProfileButton} from '../modules/users/components/profileButton';
import {UsersState} from '../modules/users/redux/states';
//@ts-ignore
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as usersOperators from '../modules/users/redux/operators'
import * as forumOperators from '../modules/forum/redux/operators'
import {User} from '../modules/users/models/user';
import withLogoutHandling from '../modules/users/hocs/withLogoutHandling';
import {ForumState} from '../modules/forum/redux/states';
import withVoting from '../modules/forum/hocs/withVoting';
import TagRow from "../modules/forum/components/tags/components/TagRow";
import {TagModel} from "../modules/forum/models/TagModel";
import {SubmitButton} from "../shared/components/button";
import {toast} from "react-toastify";

interface IndexPageProps extends usersOperators.IUserOperators, forumOperators.IForumOperations {
    users: UsersState;
    forum: ForumState;
    location: any;
}

export type OtherFilters = 'ONE' | 'TWO';

interface IndexPageState {
    tagsChosen: TagModel[];
    activeFilter: PostFilterType;
    filterPosts: Post[],
    otherFilter: OtherFilters;
}

class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    constructor(props: IndexPageProps) {
        super(props);

        this.state = {
            activeFilter: 'POPULAR',
            tagsChosen: [],
            filterPosts: [],
            otherFilter: 'ONE'
        }
    }

    setActiveFilter(filter: PostFilterType) {
        this.setState({
            ...this.state,
            activeFilter: filter
        })
    }

    getTags() {
        this.props.getTags();
    }

    getSearchedTags() {
        return this.props.forum.tags;
    }


    getPosts() {
        const activeFilter = this.state.activeFilter;
        if (activeFilter === 'NEW') {
            this.props.getRecentPosts();
        } else if (activeFilter === 'POPULAR') {
            this.props.getPopularPosts();
        } else {
            this.props.getRecentPosts();
        }
    }

    onFilterChanged(prevState: IndexPageState) {
        const currentState: IndexPageState = this.state;
        if (prevState.activeFilter !== currentState.activeFilter) {
            this.getPosts();
        }
    }

    setActiveFilterOnLoad() {
        const showNewFilter = (this.props.location.search as string).includes('show=new');
        const showPopularFilter = (this.props.location.search as string).includes('show=popular');

        let activeFilter = this.state.activeFilter;

        if (showNewFilter) {
            activeFilter = 'NEW';
        }

        this.setState({
            ...this.state,
            activeFilter
        })
    }

    getPostsFromActiveFilterGroup(): Post[] {
        if (this.state.activeFilter === 'NEW') {
            return this.props.forum.recentPosts;
        } else {
            return this.props.forum.popularPosts.slice(0, 5);
        }
    }

    postsHaveExactSameTags(array1: string[], array2: string[]): boolean {
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

    mergeAndFilterDuplicates(array1: Post[], array2: Post[]) {
        const mergedArray = [...array1, ...array2];

        const seenTags: any = {};

        const uniqueArray: Post[] = mergedArray.reduce((result: Post[], post) => {
            if (!seenTags[post.slug]) {
                seenTags[post.slug] = true;
                result.push(post);
            }
            return result;
        }, []);

        return uniqueArray;
    };

    doFilter() {
        if (this.state.tagsChosen.length === 0) {
            return toast.error(`Choose at least one tag! 🤠`, {
                autoClose: 3000
            })
        }
        let total = this.mergeAndFilterDuplicates(this.props.forum.popularPosts, this.props.forum.recentPosts);
        let tmp: Post[] = []

        const tagsStr = this.state.tagsChosen.map(t => t.tag);
        console.log(tagsStr)
        if (this.state.otherFilter === 'ONE') {
            total.forEach(post => {
                if (this.postsHaveExactSameTags(post.tags, tagsStr)) {
                    tmp.push(post)
                }
            })
        } else {
            total.forEach(post => {
                if (this.atLeastOneMatchByName(post.tags, tagsStr)) {
                    tmp.push(post)
                }
            })
        }
        this.setState({
            ...this.state,
            ['filterPosts']: tmp
        })
    }

    isChosen(tag: TagModel): boolean {
        return this.state.tagsChosen.some((existingTag) => existingTag.tag === tag.tag);
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

    componentDidUpdate(prevProps: IndexPageProps, prevState: IndexPageState) {
        this.onFilterChanged(prevState)

    }

    componentDidMount() {
        this.setActiveFilterOnLoad();
        this.getPosts();
        this.getTags()
    }

    handleCheckboxChange(type: OtherFilters) {
        this.setState({
            ...this.state,
            ['otherFilter']: type
        })
    }

    render() {
        console.log(this.props)
        const {activeFilter} = this.state;

        return (
            <Layout>
                <div className="header-container flex flex-row flex-center flex-even">
                    <Header
                        title="Domain-Driven Designers"
                        subtitle="Where awesome Domain-Driven Designers are made"
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

                <PostFilters
                    activeFilter={activeFilter}
                    onClick={(filter) => this.setActiveFilter(filter)}
                />

                {/*OTHER FILTERS*/}
                {this.state.activeFilter === "OTHER" &&
                    <>
                        <br/>
                        <SubmitButton
                            text="Search"
                            onClick={() => this.doFilter()}
                        />
                        <br/>
                        <h3>Choose the type of filter</h3>
                        <br/>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={this.state.otherFilter === 'ONE'}
                                    onChange={() => this.handleCheckboxChange('ONE')}
                                />
                                Exaclty combination/One specific tag
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={this.state.otherFilter === 'TWO'}
                                    onChange={() => this.handleCheckboxChange('TWO')}
                                />
                                At least one tag match
                            </label>
                        </div>

                        <br/>
                        <h3>Tags being search</h3>
                        {this.state.tagsChosen.length === 0 ?
                            <h6>Empty </h6>
                            :
                            <>
                                {
                                    this.state.tagsChosen.map((p, i) => (
                                        <TagRow
                                            key={p.tag}
                                            selected={true}
                                            text={p.tag}
                                            onClick={() => {
                                                this.removeTag(p)
                                            }}/>
                                    ))
                                }</>
                        }

                        <h3>Total tags</h3>
                        {this.state.tagsChosen.length === this.props.forum.tags.length ?
                            <h4>Empty</h4>
                            :
                            <>
                                <h6>Click to remove</h6>
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
                            </>

                        }
                    </>

                }
                {this.state.activeFilter !== "OTHER" &&
                    <>
                        {this.getPostsFromActiveFilterGroup().map((p, i) => (
                            <PostRow
                                key={i}
                                onUpvoteClicked={() => this.props.upvotePost(p.slug)}
                                onDownvoteClicked={() => this.props.downvotePost(p.slug)}
                                isLoggedIn={this.props.users.isAuthenticated}
                                {...p}
                            />
                        ))}
                        <br/>
                        <br/>
                    </>
                }

                {this.state.activeFilter === "OTHER" &&
                    <>
                        <hr style={{margin: '20px 0', border: 'none', borderBottom: '4px solid #ccc'}}/>
                        <h2>Results ({this.state.filterPosts.length})</h2>
                        {this.state.filterPosts.length === 0 &&
                            <h5>Without results</h5>
                        }
                        {this.state.filterPosts.length !== 0 && this.state.filterPosts.map((p, i) => (
                            <PostRow
                                key={i}
                                onUpvoteClicked={() => this.props.upvotePost(p.slug)}
                                onDownvoteClicked={() => this.props.downvotePost(p.slug)}
                                isLoggedIn={this.props.users.isAuthenticated}
                                {...p}
                            />
                        ))}
                    </>
                }
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
        withVoting(IndexPage)
    )
);