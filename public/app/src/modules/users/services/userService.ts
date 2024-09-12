import {BaseAPI} from "../../../shared/infra/services/BaseAPI";
import {left, right} from "../../../shared/core/Either";
import {Result} from "../../../shared/core/Result";
import {APIResponse} from "../../../shared/infra/services/APIResponse";
import {LoginDTO} from "../dtos/loginDTO";
import {User} from "../models/user";
import {IAuthService} from "./authService";
import {ActualMember} from "../models/actualMember";

export interface IUsersService {
  getCurrentUserProfile (): Promise<User>;
  createUser (email: string, username: string, password: string): Promise<APIResponse<void>>;
  login (username: string, password: string): Promise<APIResponse<LoginDTO>>;
  logout (): Promise<APIResponse<void>>;
  getActualMember(username:string): Promise<ActualMember>;
}

export class UsersService extends BaseAPI implements IUsersService {

  constructor (authService: IAuthService) {
    super(authService);
  }

  async getCurrentUserProfile (): Promise<User> {
    const response = await this.get('/users/me', null, { 
      authorization: this.authService.getToken('access-token') 
    });
    return response.data.user as User;
  }

  public async logout (): Promise<APIResponse<void>> {
    try {
      await this.post('/users/logout', null, null, { 
        authorization: this.authService.getToken('access-token') 
      })
      this.authService.removeToken('access-token');
      this.authService.removeToken('refresh-token');
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async login (username: string, password: string): Promise<APIResponse<LoginDTO>> {
    try {
      const response = await this.post('/users/login', { username, password });
      const dto: LoginDTO = response.data as LoginDTO;
      this.authService.setToken('access-token', dto.accessToken);
      this.authService.setToken('refresh-token', dto.refreshToken);
      return right(Result.ok<LoginDTO>(dto));
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async createUser (email: string, username: string, password: string): Promise<APIResponse<void>> {
    try {
      await this.post('/users', { email, username, password });
      return right(Result.ok<void>());
    } catch (err) {
      return left(err.response ? err.response.data.message : "Connection failed")
    }
  }

  async getActualMember (username: string): Promise<ActualMember> {

    try {
      const response = await this.get(`/members/${username}`, null, {
        authorization: this.authService.getToken('access-token')
      });
      return {
        reputation: response.data.member.reputation,
        username: response.data.member.user.username,
        numberOfPosts: response.data.member.user.numberOfPosts,
        numberOfComments: response.data.member.user.numberOfComments,
        email: response.data.member.user.email
      } as ActualMember
    } catch (err) {
      return err
    }
  }
}



