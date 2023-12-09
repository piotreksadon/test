import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";

@ApiTags("AUTH")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiBearerAuth()
  @ApiOperation({ summary: "Login to the application" })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @Post("login")
  async login(@Body() { username, password }: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(username, password);
  }
}
