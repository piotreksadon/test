import { Test, TestingModule } from "@nestjs/testing";
import { UserMapper } from "./user.mapper";
import { User } from "../user.service";
import { UserResponseDto } from "../dto/user-response.dto";

describe("UserMapper", () => {
  let userMapper: UserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMapper],
    }).compile();

    userMapper = module.get<UserMapper>(UserMapper);
  });

  it("should be defined", () => {
    expect(userMapper).toBeDefined();
  });

  describe("fromUserToDto", () => {
    it("should map User to UserResponseDto", () => {
      const user = {
        id: 1,
        username: "testuser",
        street: "123 Street",
        phoneNumber: "123-456-7890",
        hashedPassword: "abc",
      };

      const result: UserResponseDto = userMapper.fromUserToDto(user as unknown as User);

      expect(result).toBeInstanceOf(UserResponseDto);
      expect(result.id).toEqual(user.id);
      expect(result.username).toEqual(user.username);
      expect(result.street).toEqual(user.street);
      expect(result.phoneNUmber).toEqual(user.phoneNumber);
    });
  });
});
