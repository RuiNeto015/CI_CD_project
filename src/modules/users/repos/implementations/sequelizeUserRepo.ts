import {IUserRepo} from "../userRepo";
import {UserName} from "../../domain/userName";
import {User} from "../../domain/user";
import {UserMap} from "../../mappers/userMap";
import {UserEmail} from "../../domain/userEmail";
import models from "../../../../shared/infra/database/sequelize/models";
import {Error, Promise} from "sequelize";
import baseUser from "../../../../shared/infra/database/sequelize/models/BaseUser";
import {exists} from "fs";
import {MostPostsUser} from "../../domain/mostPostsUser";
import {MemberId} from "../../../forum/domain/memberId";
import {PostDetails} from "../../../forum/domain/postDetails";

export class SequelizeUserRepo implements IUserRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    async exists(userEmail: UserEmail): Promise<boolean> {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            where: {
                user_email: userEmail.value
            }
        });
        return !!baseUser === true;
    }

    async getUserByUserName(userName: UserName | string): Promise<User> {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            where: {
                username: userName instanceof UserName
                    ? (<UserName>userName).value
                    : userName
            }
        });
        if (!!baseUser === false) throw new Error("User not found.")
        return UserMap.toDomain(baseUser);
    }

    async getUserWithMostPosts(): Promise<MostPostsUser | null> {
        const result = await this.models.sequelize.query(
            `SELECT u.user_email AS email, u.username, COUNT(*) AS numberOfPosts
             FROM post p
                      INNER JOIN member m ON p.member_id = m.member_id
                      INNER JOIN base_user u ON m.member_base_id = u.base_user_id
             GROUP BY u.base_user_id
             ORDER BY numberOfPosts DESC LIMIT 1;
            `,
            {
                type: this.models.sequelize.QueryTypes.SELECT
            }
        );
        if (result && result.length > 0) {
            const mostPostsUser = result[0];
            return {
                email: mostPostsUser.email,
                username: mostPostsUser.username,
                numberOfPosts: mostPostsUser.numberOfPosts
            };
        } else {
            return null;
        }
    }


    async getUserByUserId(userId: string): Promise<User> {
        const BaseUserModel = this.models.BaseUser;
        const baseUser = await BaseUserModel.findOne({
            where: {
                base_user_id: userId
            }
        });
        if (!!baseUser === false) throw new Error("User not found.")
        return UserMap.toDomain(baseUser);
    }

    async save(user: User): Promise<void> {
        const UserModel = this.models.BaseUser;
        const exists = await this.exists(user.email);

        if (!exists) {
            const rawSequelizeUser = await UserMap.toPersistence(user);
            await UserModel.create(rawSequelizeUser);
        }

        return;
    }
}