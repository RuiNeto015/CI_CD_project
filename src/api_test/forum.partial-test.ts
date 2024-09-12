/**
 *
 * @remarks
 * This code is based on the project {@link https://github.com/jmfiola/jest-api-test-typescript-example}.
*/
import { Logger } from "tslog";
import ConfigHandler from "./config/configHandler";

import Posts from "./endpoints/Posts";
import Tags from "./endpoints/Tags";
import Users from "./endpoints/Users";

const config = ConfigHandler.getInstance();
const log = new Logger({
  minLevel: config.environmnetConfig.log_level,
  dateTimeTimezone:
    config.environmnetConfig.time_zone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone,
});

let users: Users;
let posts: Posts;
let tags: Tags;

let accessToken: string;

let postSlug: string;

describe("Posts endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    const response = await users.postLogin();
    expect(response.status).toBe(200);
    accessToken = response.data.accessToken;

    posts = new Posts();
    
    log.debug("1. Posts Base url: " + posts.getBaseUrl());
  });

  it("Create post", async (): Promise<void> => {
    const response = await posts.createPost(accessToken);
    expect(response.status).toBe(200);
    postSlug = response.data.postSlug;
    expect(response.data.postSlug).toBeDefined();
  });

  it("Get popular posts", async (): Promise<void> => {
    const response = await posts.getPopularPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });

  it("Get recent posts", async (): Promise<void> => {
    const response = await posts.getRecentPosts();
    expect(response.status).toBe(200);

    expect(response.data.posts).toBeDefined();
  });
});

describe("Tags endpoint", (): void => {
  beforeAll(async (): Promise<void> => {
    users = new Users();
    const response = await users.postLogin();
    expect(response.status).toBe(200);
    accessToken = response.data.accessToken;

    tags = new Tags();

    log.debug("1. Tags Base url: " + tags.getBaseUrl());
  });

  it("Create tag", async (): Promise<void> => {
    const response = await tags.createTag(accessToken);
    expect(response.status).toBe(200);
  });

  it("Create repeated tag", async (): Promise<void> => {
    const response = await tags.createTag(accessToken);
    expect(response.status).toBe(404);
  });

  it("Get all tags", async (): Promise<void> => {
    const response = await tags.getAllTags();
    expect(response.status).toBe(200);

    expect(response.data.tags).toBeDefined();
  });

  it("Add tag to post", async (): Promise<void> => {
    const response = await tags.addTagToPost(accessToken, postSlug);
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });

 it("Get number of user tags", async (): Promise<void> => {
    const response = await tags.getNumberOfUserTags(accessToken);
    expect(response.status).toBe(200);
    expect(response.data.tags.length).toBe(1);
  });

  it("Get number of post tags", async (): Promise<void> => {
    const response = await posts.getNumberOfPostTags(accessToken);
    expect(response.status).toBe(200);
    expect(response.data.posts[0].tags.length).toBe(1);
  });
});



export default {};
