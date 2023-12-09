import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as argon2 from "argon2";
import { LoginResponseDto } from "./dto/login-response.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByUsername(username);

    const isPasswordVerified = await argon2.verify(user.hashedPassword, password, { secret: Buffer.from(this.configService.get<string>("JWT_SECRET_KEY")) });

    if (!user || !isPasswordVerified) {
      throw new UnauthorizedException();
    }
    const now = new Date();

    return {
      access_token: this.jwtService.sign({ username: user.username, sub: user.id, iat: now.getTime() }),
    };
  }
}
