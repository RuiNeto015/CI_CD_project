import {UseCase} from "../../../../../shared/core/UseCase";
import {IMemberRepo} from "../../../repos/memberRepo";
import {GetMemberByUserNameDTO} from "./GetMemberByUserNameDTO";
import {Either, Result, left, right} from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {GetMemberByUserNameErrors} from "./GetMemberByUserNameErrors";
import {MemberDetails} from "../../../domain/memberDetails";
import {IUserRepo} from "../../../../users/repos/userRepo";
import {User} from "../../../../users/domain/user";
import {IPostRepo} from "../../../repos/postRepo";
import {PostRepo} from "../../../repos/implementations/sequelizePostRepo";
import {ICommentRepo} from "../../../repos/commentRepo";

type Response = Either<
    GetMemberByUserNameErrors.MemberNotFoundError |
    AppError.UnexpectedError,
    Result<MemberDetails>
>

export class GetMemberByUserName implements UseCase<GetMemberByUserNameDTO, Promise<Response>> {
    private memberRepo: IMemberRepo;
    private userRepo: IUserRepo;
    private postRepo: IPostRepo;
    private commentRepo: ICommentRepo;

    constructor(memberRepo: IMemberRepo, userRepo: IUserRepo, postRepo: PostRepo, commentRepo: ICommentRepo) {
        this.memberRepo = memberRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
    }

    public async execute(request: GetMemberByUserNameDTO): Promise<Response> {
        let memberDetails: MemberDetails;
        let member: User;
        const {username} = request;

        try {

            try {
                memberDetails = await this.memberRepo.getMemberDetailsByUserName(username);

                member = await this.userRepo.getUserByUserName(username)
                memberDetails.setEmail(member.email.value)

                const memberId = await this.memberRepo.getMemberByUserName(username);

                const numOfPosts = await this.postRepo.getNumberOfPostsByMemberId(memberId)
                memberDetails.setNumberOfPosts(numOfPosts)

                const memberComments = await this.commentRepo.getCommentsByMemberId(memberId)
                memberDetails.setNumberOfComments(memberComments.length)

            } catch (err) {
                return left(new GetMemberByUserNameErrors.MemberNotFoundError(username));
            }

            return right(Result.ok<MemberDetails>(memberDetails))

        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        }
    }
}