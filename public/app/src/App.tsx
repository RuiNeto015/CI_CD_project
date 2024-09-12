
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.sass';
import IndexPage from './pages';
import DiscussionPage from './pages/discussion';
import CommentPage from './pages/comment';
import LoginPage from './pages/login';
import JoinPage from './pages/join';
import AuthenticatedRoute from './shared/infra/router/AuthenticatedRoute';
import SubmitPage from './pages/submit';
import MemberPage from './pages/member';
import TagManagement from "./pages/tag";
import ProfilePage from "./pages/profile";

const App: React.FC = () => {
    return (
        <Router>
            <Route path="/" exact component={IndexPage}/>
            <Route path="/discuss/:slug" component={DiscussionPage}/>
            <Route path="/comment/:commentId" component={CommentPage}/>
            <Route path="/member/:username" component={MemberPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <AuthenticatedRoute path="/submit" component={SubmitPage}/>
            <Route path="/join" component={JoinPage}/>
            <Route path="/login" component={LoginPage}/>
            <AuthenticatedRoute path="/tags" component={TagManagement}/>
        </Router>
    );
}

export default App;

