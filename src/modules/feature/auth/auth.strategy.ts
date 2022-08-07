import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {

    constructor(public service: ConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: service.get<string>('JWT_SECRET_KEY'),
        })
    }

    async validate(payload: any) {
        return await this.userService.findBy({id: payload.id});
    }
}
