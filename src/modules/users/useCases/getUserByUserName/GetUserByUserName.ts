import {GetUserByUserNameDTO} from "./GetUserByUserNameDTO";
import {GetUserByUserNameErrors} from "./GetUserByUserNameErrors";
import {Either, left, Result, right} from "../../../../shared/core/Result";
import {UserName} from "../../domain/userName";
import {IUserRepo} from "../../repos/userRepo";
import {UseCase} from "../../../../shared/core/UseCase";
import {AppError} from "../../../../shared/core/AppError";
import {User} from "../../domain/user";
import {ICommentRepo} from "../../../forum/repos/commentRepo";
import {IMemberRepo} from "../../../forum/repos/memberRepo";
import {IPostRepo} from "../../../forum/repos/postRepo";

type Response = Either<
    AppError.UnexpectedError,
    Result<User>
>

export class GetUserByUserName implements UseCase<GetUserByUserNameDTO, Promise<Response>> {
    private userRepo: IUserRepo;
    private commentsRepo: ICommentRepo;
    private membersRepo: IMemberRepo;
    private postsRepo: IPostRepo;

    constructor(userRepo: IUserRepo, commentsRepo: ICommentRepo, membersRepo: IMemberRepo, postsRepo: IPostRepo) {
        this.userRepo = userRepo;
        this.commentsRepo = commentsRepo;
        this.membersRepo = membersRepo;
        this.postsRepo = postsRepo;
    }

    public async execute(request: GetUserByUserNameDTO): Promise<Response> {
        try {
            const userNameOrError = UserName.create({name: request.username});

            if (userNameOrError.isFailure) {
                return left(
                    Result.fail<any>(userNameOrError.getErrorValue().toString())
                ) as Response;
            }

            const userName: UserName = userNameOrError.getValue();

            const user = await this.userRepo.getUserByUserName(userName);
            const userFound = !!user === true;

            if (!userFound) {
                return left(
                    new GetUserByUserNameErrors.UserNotFoundError(userName.value)
                ) as Response
            }

            const memberId = await this.membersRepo.getMemberByUserName(userName.value);
            const userComments = await this.commentsRepo.getCommentsByMemberId(memberId)
            const numberOfUsersPosts = await this.postsRepo.getNumberOfPostsByMemberId(memberId)
            const userWithMostPosts = await this.userRepo.getUserWithMostPosts()
            user.setNumberOfComments(userComments.length);
            user.setNumberOfPosts(numberOfUsersPosts);
            user.setUserWithMostPosts(userWithMostPosts);

            return right(Result.ok<User>(user));
        } catch (err) {
            return left(new AppError.UnexpectedError(err))
        }
    }
}