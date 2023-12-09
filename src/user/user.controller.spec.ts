import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserMapper } from "./mappers/user.mapper";
import { MeResponseDto } from "./dto/me-response.dto";

describe("UserController", () => {
  let userController: UserController;
  const userServiceMock = {
    findOneByUsername: jest.fn(),
  };
  const userMapperMock = {
    fromUserToDto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserMapper],
    })
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .overrideProvider(UserMapper)
      .useValue(userMapperMock)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  describe("getProfile", () => {
    it("should return MeResponseDto with user and lastLoginDate", () => {
      const mockedUser = {
        id: 1,
        username: "testuser",
        hashedPassword: "$argon2id$v=19$m=65536,t=3,p=4$/jincha/Lo08/x46KZlGCQ$+7jVC9gsOeI2/Wa7/LSQTzR2MOCNiSQSKgs+q9swNhY",
        street: "street",
        phoneNumber: 666666666,
      };
      const mockedUserDto = { id: 1, username: "testuser", street: "street", phoneNumber: 666666666 };
      const mockedLastLoginDate = new Date();

      userServiceMock.findOneByUsername.mockReturnValueOnce(mockedUser);
      userMapperMock.fromUserToDto.mockReturnValueOnce(mockedUserDto);

      const result: MeResponseDto = userController.getProfile({ user: { username: "testuser", lastLoginAt: mockedLastLoginDate } });

      expect(result).toBeDefined();
      expect(result.user).toEqual(mockedUserDto);
      expect(result.lastLoginDate).toEqual(mockedLastLoginDate);
      expect(userServiceMock.findOneByUsername).toHaveBeenCalledWith("testuser");
      expect(userMapperMock.fromUserToDto).toHaveBeenCalledWith(mockedUser);
    });
  });
});
