import { ApiProperty } from "@nestjs/swagger";
import { UserResponseDto } from "./user-response.dto";

export class MeResponseDto {
  @ApiProperty({ description: `user's data` })
  public user: UserResponseDto;

  @ApiProperty({ description: `user's last logging date` })
  public lastLoginDate: Date;
}
