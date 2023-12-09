import { Injectable } from "@nestjs/common";

export type User = {
  id: number;
  username: string;
  hashedPassword: string;
  street: string;
  phoneNumber: number;
};

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: "username",
      hashedPassword: "$argon2id$v=19$m=65536,t=3,p=4$/jincha/Lo08/x46KZlGCQ$+7jVC9gsOeI2/Wa7/LSQTzR2MOCNiSQSKgs+q9swNhY",
      street: "street",
      phoneNumber: 666666666,
    },
  ];

  findOneByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
}
