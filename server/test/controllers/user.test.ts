import request from "supertest";
import connect, { MongoHelper } from "../db-helper";
import bcrypt from "bcrypt";

import app from "../../app";
import UserRepo from "../../models/UserModel";
import { authenticateUser } from "../auth/authenticateUser";

describe("User controller", () => {
  let mongoHelper: MongoHelper;
  let accessToken: { accessToken: string };

  beforeEach(async () => {
    accessToken = await authenticateUser();
  });

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  const user = {
    name: "test",
    email: "test@mail.com",
    password: "123456",
  };

  it("Should create a new user", async () => {
    const response = await request(app)
      .post("/users/signup")
      .set("Authorization", `Bearer ${accessToken.accessToken}`)
      .send(user);
    // Check if the password was hashed correctly
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      response.body.user.password
    );
    expect(isPasswordMatch).toBe(true);

    // Check the properties of the user object
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user).toHaveProperty("avatar");
    expect(response.body.user).toHaveProperty("logInWithGoogle");
    expect(response.body).toMatchObject({ user: { ...user, password: response.body.user.password } });

    // Check the values of the user object
    expect(response.body.user).toEqual({
      _id: expect.any(String),
      avatar: expect.any(String),
      email: user.email,
      logInWithGoogle: expect.any(Boolean),
      name: user.name,
      password: response.body.user.password,
      roleId: expect.any(String),
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created");
  });

  it("Should return a list of users", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${accessToken.accessToken}`);
      
    expect(response.body.length).toBe(2);
    expect(response.body[1]).toMatchObject(user);
    expect(response.status).toBe(200);
  });

  it("Should return one user by id", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .get(`/users/profile/${newUser._id}`)
      .set("Authorization", `Bearer ${accessToken.accessToken}`);
    expect(response.body.user).toMatchObject({
      avatar: expect.any(String),
      email: user.email,
      name: user.name,
    });
    expect(response.status).toBe(200);
  });

  it("Should update a user", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .put(`/users/${newUser._id}`)
      .send({ name: "updated", email: "updated@mail.com" })
      .set("Authorization", `Bearer ${accessToken.accessToken}`);
    expect(response.body.user.name).toBe("updated");
    expect(response.body.user.email).toBe("updated@mail.com");
    expect(response.status).toBe(200);
  });

  it("Should delete a user", async () => {
    const newUser = new UserRepo(user);
    await newUser.save();
    const response = await request(app)
      .delete(`/users/${newUser._id}`)
      .set("Authorization", `Bearer ${accessToken.accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted");
  });
});
