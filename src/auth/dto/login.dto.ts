import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ description: `user's username` })
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  public username: string;

  @ApiProperty({ description: `user's password` })
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  public password: string;
}
