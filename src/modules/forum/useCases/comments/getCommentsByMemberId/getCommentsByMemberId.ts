import {UseCase} from "../../../../../shared/core/UseCase";
import {Either, Result, left, right} from "../../../../../shared/core/Result";
import {AppError} from "../../../../../shared/core/AppError";
import {CommentDetails} from "../../../domain/commentDetails";
import {ICommentRepo} from "../../../repos/commentRepo";
import {IMemberRepo} from "../../../repos/memberRepo";
import {GetCommentsByMemberIdRequestDTO} from "./GetCommentsByMemberIdRequestDTO";

type Response = Either<
    AppError.UnexpectedError,
    Result<CommentDetails[]>
>

export class GetCommentsByMemberId implements UseCase<any, Promise<Response>> {
    private commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
        this.commentRepo = commentRepo;
    }

    public async execute(req: GetCommentsByMemberIdRequestDTO): Promise<Response> {
        let comments: CommentDetails[];
        const {memberId} = req;

        try {

            try {
                comments = await this.commentRepo.getCommentsByMemberId(memberId);
            } catch (err) {
                return left(new AppError.UnexpectedError(err));
            }

            return right(Result.ok<CommentDetails[]>(comments));

        } catch (err) {
            return left(new AppError.UnexpectedError(err));
        }
    }

}