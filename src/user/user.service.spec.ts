import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe("findOneByUsername", () => {
    it("should return a user when the username exists", () => {
      const username = "username";
      const result = userService.findOneByUsername(username);

      expect(result).toBeDefined();
      expect(result?.username).toEqual(username);
    });

    it("should return undefined when the username does not exist", () => {
      const username = "nonexistent_username";
      const result = userService.findOneByUsername(username);

      expect(result).toBeUndefined();
    });
  });
});
