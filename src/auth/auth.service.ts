import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialDto;
        const user = await this.userRepository.findOneBy({username});

        if(user && (await bcrypt.compare(password, user.password))) {
            // 유저 토큰 생성 (Secret + Payload)
            // 토큰을 통해 정보를 가져가기 쉽기 때문에, 중요한 정보는 넣으면 안된다.
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new UnauthorizedException('logIn fail')
        }
    }
}   
