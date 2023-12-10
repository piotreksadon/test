import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "../../common/environment/env.type";

interface JwtPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

interface ValidatedUser {
  userId: string;
  username: string;
  lastLoginAt: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<EnvironmentVariables["JWT_SECRET_KEY"]>("JWT_SECRET_KEY"),
    });
  }

  async validate(payload: JwtPayload): Promise<ValidatedUser> {
    // passport jwt strategy has unresolved bug related to the token expiration https://stackoverflow.com/questions/40187770/passport-jwt-token-expiration
    // to obey that issue I decided to check exp date by myself

    if (payload.exp < Date.now()) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, username: payload.username, lastLoginAt: payload.iat };
  }
}
