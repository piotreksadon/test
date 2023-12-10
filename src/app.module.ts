import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ImageModule } from "./image/image.module";
import { ConfigModule } from "@nestjs/config";
import { envValidationSchema } from "./common/environment/env.schema";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
    }),
    UserModule,
    MulterModule.register({
      storage: memoryStorage(),
      dest: "./uploads",
    }),
    ImageModule,
  ],
})
export class AppModule {}
