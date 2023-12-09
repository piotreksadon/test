import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ description: `user's id` })
  public id: number;

  @ApiProperty({ description: `user's username` })
  public username: string;

  @ApiProperty({ description: `user's street` })
  public street: string;

  @ApiProperty({ description: `user's phone number` })
  public phoneNUmber: number;
}
