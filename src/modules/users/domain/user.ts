
import { UserEmail } from "./userEmail";
import { UserName } from "./userName";
import { UserId } from "./userId";
import { UserCreated } from "./events/userCreated";
import { UserPassword } from "./userPassword";
import { JWTToken, RefreshToken } from "./jwt";
import { UserLoggedIn } from "./events/userLoggedIn";
import { UserDeleted } from "./events/userDeleted";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import {MostPostsUser} from "./mostPostsUser";

interface UserProps {
  email: UserEmail;
  username: UserName;
  password: UserPassword;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
  numberOfComments?: number;
  numberOfPosts?: number;
  userWithMostPosts?: MostPostsUser;
}

export class User extends AggregateRoot<UserProps> {

  get userId (): UserId {
    return UserId.create(this._id)
      .getValue();
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get username (): UserName {
    return this.props.username;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get accessToken (): string {
    return this.props.accessToken;
  }

  get isDeleted (): boolean {
    return this.props.isDeleted;
  }

  get isEmailVerified (): boolean {
    return this.props.isEmailVerified;
  }

  get isAdminUser (): boolean {
    return this.props.isAdminUser;
  }

  get lastLogin (): Date {
    return this.props.lastLogin;
  }

  get refreshToken (): RefreshToken {
    return this.props.refreshToken
  }

  get numberOfComments (): number {
    return this.props.numberOfComments
  }

  get numberOfPosts (): number {
    return this.props.numberOfPosts
  }

  get userWithMostPosts (): MostPostsUser {
    return this.props.userWithMostPosts
  }

  public isLoggedIn (): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken
  }

  public setAccessToken (token: JWTToken, refreshToken: RefreshToken): void {
    this.addDomainEvent(new UserLoggedIn(this));
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  public delete (): void {
    if (!this.props.isDeleted) {
      this.addDomainEvent(new UserDeleted(this));
      this.props.isDeleted = true;
    }
  }

  public setNumberOfComments (numberOfComments: number): void {
      this.props.numberOfComments = numberOfComments;
  }

  public setNumberOfPosts (numberOfPosts: number): void {
    this.props.numberOfPosts = numberOfPosts;
  }

  public setUserWithMostPosts (userWithMostPosts: MostPostsUser): void {
    this.props.userWithMostPosts = userWithMostPosts;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id)
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'username' },
      { argument: props.email, argumentName: 'email' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue())
    }

    const isNewUser = !!id === false;
    const user = new User({
      ...props,
      isDeleted: props.isDeleted ? props.isDeleted : false,
      isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
      isAdminUser: props.isAdminUser ? props.isAdminUser : false
    }, id);

    if (isNewUser) {
      user.addDomainEvent(new UserCreated(user));
    }

    return Result.ok<User>(user);
  }
}