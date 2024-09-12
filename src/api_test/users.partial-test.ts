/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let users: Users;

let accessToken: string;
let refreshToken: string;

describe("Users endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    
    log.debug("1. Users Base url: " + users.getBaseUrl());
  });

  it("Create User", async (): Promise<void> => {
    const response = await users.post();

    expect(response.status).toBe(200);    
  });

  it("Login", async (): Promise<void> => {
    const response = await users.postLogin();
    expect(response.status).toBe(200);
    
    
    expect(response.data.accessToken).toBeDefined();
    expect(response.data.refreshToken).toBeDefined();

    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  });

  it("Get Me", async (): Promise<void> => {
    log.debug("Access token: " + accessToken);

    const response = await users.getMe(accessToken);
    expect(response.status).toBe(200);
    
    
    expect(response.data.user).toBeDefined();
    expect(response.data.user.username).toBeDefined();
    expect(response.data.user.username).toContain("atb");
  });  
});

export default {};