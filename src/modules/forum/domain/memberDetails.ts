import {ValueObject} from "../../../shared/domain/ValueObject";
import {Result} from "../../../shared/core/Result";
import {Guard} from "../../../shared/core/Guard";
import {UserName} from "../../users/domain/userName";

interface MemberDetailsProps {
    username: UserName;
    reputation: number;
    isAdminUser?: boolean;
    isDeleted?: boolean;
    numberOfPosts?: number;
    numberOfComments?: number;
    email?: string;
}

/**
 * @desc Read model for member
 */

export class MemberDetails extends ValueObject<MemberDetailsProps> {

    get username(): UserName {
        return this.props.username;
    }

    get reputation(): number {
        return this.props.reputation;
    }

    get isAdminUser(): boolean {
        return this.props.isAdminUser;
    }

    get isDeleted(): boolean {
        return this.props.isDeleted;
    }

    get numberOfPosts(): number {
        return this.props.numberOfPosts;
    }

    get numberOfComments(): number {
        return this.props.numberOfComments;
    }

    get email(): string {
        return this.props.email;
    }

    private constructor(props: MemberDetailsProps) {
        super(props);
    }

    public setNumberOfPosts(numberOfPosts: number): void {
        this.props.numberOfPosts = numberOfPosts;
    }

    public setNumberOfComments(numberOfComments: number): void {
        this.props.numberOfComments = numberOfComments;
    }

    public setEmail(email: string): void {
        this.props.email = email;
    }

    public static create(props: MemberDetailsProps): Result<MemberDetails> {
        const guardResult = Guard.againstNullOrUndefinedBulk([
            {argument: props.username, argumentName: 'username'},
            {argument: props.reputation, argumentName: 'reputation'}
        ]);

        if (guardResult.isFailure) {
            return Result.fail<MemberDetails>(guardResult.getErrorValue());
        }

        return Result.ok<MemberDetails>(new MemberDetails({
            ...props,
            isAdminUser: props.isAdminUser ? props.isAdminUser : false,
            isDeleted: props.isDeleted ? props.isDeleted : false
        }));

    }
}