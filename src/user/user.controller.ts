import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/auth.guard";
import { UserService } from "./user.service";
import { MeResponseDto } from "./dto/me-response.dto";
import { UserMapper } from "./mappers/user.mapper";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

//we can change the level of protection by putting the @Guard decorator at specific endpoint
@ApiTags("USER")
@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}
  @Get("me")
  @ApiOperation({ summary: "Fetching currently logged user data" })
  @ApiResponse({ status: 200, type: MeResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  getProfile(@Request() req): MeResponseDto {
    const user = this.userService.findOneByUsername(req.user.username);

    return {
      user: this.userMapper.fromUserToDto(user),
      lastLoginDate: new Date(req.user.lastLoginAt),
    };
  }
}
