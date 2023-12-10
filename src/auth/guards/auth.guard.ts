import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Strategies } from "../strategies/strategies";

@Injectable()
export class JwtAuthGuard extends AuthGuard(Strategies.JWT) {}
