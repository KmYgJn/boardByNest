import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

// 다른 곳에서도 해당 class를 사용할 수 있도록
@Injectable()
// Strategy는 jwt strategy를 사용하기 위해 넣어주는 것
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234', // 토큰을 생성할 때 사용한 key를 유효한지 확인하기 위해 같은 key 값을 넣어 준다.
            // Bearer Token의 type으로 넘어오는 값을 추출한다는 의미
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
        })
    }

    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepository.findOneBy({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}