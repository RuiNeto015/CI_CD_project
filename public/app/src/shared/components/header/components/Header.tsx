import React from 'react'
import {Logo} from '..';
import "../styles/Header.sass"
import {Link} from 'react-router-dom';
import {Points} from '../../../../modules/forum/components/posts/points';

interface HeaderProps {
    title: string;
    subtitle?: string;
    isUpvotable?: boolean;
    onUpvoteClicked?: Function;
    onDownvoteClicked?: Function;
    points?: number;
    isLoggedIn?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => (
    <div className="header">
        <Link to="/"><Logo/></Link>

        {props.isUpvotable && <Points
            onUpvoteClicked={() => props.onUpvoteClicked ? props.onUpvoteClicked() : ''}
            onDownvoteClicked={() => props.onDownvoteClicked ? props.onDownvoteClicked() : ''}
            points={props.points as number}
            isLoggedIn={props.isLoggedIn || false}
        />}
        <div className="content-container">
            <h1>{props.title}</h1>
            <p><b>{props.subtitle}</b></p>
            <div className="header-links">
                <Link to="/submit">Submit Post</Link>
                <div style={{marginTop: '10px'}}></div>
                <br/>
                <Link to="/tags">Manage my tags</Link>
            </div>
        </div>
    </div>
)

export default Header;