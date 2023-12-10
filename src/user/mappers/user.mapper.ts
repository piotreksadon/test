import { User } from "../user.service";
import { Injectable } from "@nestjs/common";
import { UserResponseDto } from "../dto/user-response.dto";

@Injectable()
export class UserMapper {
  fromUserToDto(user: User): UserResponseDto {
    const mappedUser = new UserResponseDto();
    mappedUser.id = user.id;
    mappedUser.username = user.username;
    mappedUser.street = user.street;
    mappedUser.phoneNUmber = user.phoneNumber;

    return mappedUser;
  }
}
