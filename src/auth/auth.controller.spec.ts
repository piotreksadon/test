import { Test, TestingModule } from "@nestjs/testing";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let authController: AuthController;

  const authServiceMock = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    authController = app.get<AuthController>(AuthController);
  });

  afterEach(() => {
    authServiceMock.login.mockClear();
  });

  describe("Login", () => {
    it("should correctly resolve login method", async () => {
      const loginResult = { access_token: "123" };

      authServiceMock.login.mockReturnValue(loginResult);

      const result = await authController.login({ username: "yourUsername", password: "yourPassword" });

      expect(result).toBe(loginResult);
      expect(authServiceMock.login).toBeCalledWith("yourUsername", "yourPassword");
    });
  });
});
