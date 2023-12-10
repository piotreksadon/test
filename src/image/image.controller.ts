import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageService } from "./image.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("IMAGE")
@UseGuards(JwtAuthGuard)
@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  //I don't like to use verbs like 'upload_and_resize' in url, but I cannot figure out more proper path
  @ApiOperation({ summary: "Uploading and resizing picture" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async uploadAndResizeImage(@UploadedFile() file: Express.Multer.File, @Res() response: Express.Response & any): Promise<any> {
    const sharpFile = await this.imageService.resize(file);
    const tempFileDir = await this.imageService.saveTemporary(sharpFile);

    return response.sendFile(tempFileDir);
  }
}
