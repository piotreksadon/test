import { Test, TestingModule } from "@nestjs/testing";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { JwtAuthGuard } from "../auth/guards/auth.guard";

describe("ImageController", () => {
  let imageController: ImageController;
  const imageServiceMock: Partial<ImageService> = {
    resize: jest.fn(),
    async saveTemporary(file: Buffer): Promise<string> {
      return jest.fn(() => "asd.jpg") as any;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideProvider(ImageService)
      .useValue(imageServiceMock)
      .compile();

    imageController = module.get<ImageController>(ImageController);
  });

  describe("uploadAndResizeImage", () => {
    it("should return the result of uploadAndResize method from ImageService", async () => {
      const mockedFile = {
        buffer: Buffer.from("mockedImageBuffer"),
        originalname: "mockedImage.jpg",
        encoding: "utf-8",
        mimetype: "image/jpeg",
        size: 12345,
        fieldname: "image",
      };

      const mockedResult = Buffer.from("mockedResizedImageBuffer");
      (imageServiceMock.resize as any).mockResolvedValue(mockedResult);

      const responseMock = {
        sendFile: () => jest.fn(),
      };
      await imageController.uploadAndResizeImage(mockedFile as Express.Multer.File, responseMock);

      expect(imageServiceMock.resize).toHaveBeenCalledWith(mockedFile);
    });
  });
});
