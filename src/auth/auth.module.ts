import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserService } from "../user/user.service";
import { Strategies } from "./strategies/strategies";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "../common/environment/env.type";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: Strategies.JWT }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_KEY"),
        signOptions: { expiresIn: configService.get<EnvironmentVariables["JWT_TTL_IN_MS"]>("JWT_TTL_IN_MS") },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
