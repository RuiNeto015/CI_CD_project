import {UserEmail} from "./userEmail";
import {UserName} from "./userName";
import {AggregateRoot} from "../../../shared/domain/AggregateRoot";

interface UserProps {
    email: UserEmail;
    username: UserName;
    numberOfPosts: number;
}

export class MostPostsUser extends AggregateRoot<UserProps> {
    get username(): UserName {
        return this.props.username;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get numberOfPosts(): number {
        return this.props.numberOfPosts;
    }

    public setUsername(username: UserName): void {
        this.props.username = username;
    }

    public setUserEmail(email: UserEmail): void {
        this.props.email = email;
    }

    public setNumberOfPosts(numberOfPosts: number): void {
        this.props.numberOfPosts = numberOfPosts;
    }
}