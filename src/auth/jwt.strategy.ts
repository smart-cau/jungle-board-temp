import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential-dto.dto';
import { User } from './entity/user.entity';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthCredentialDto): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOneBy({ username });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
