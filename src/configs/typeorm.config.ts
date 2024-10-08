import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/entity/board.entity';
import { User } from '../auth/entity/user.entity';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [Board, User],
  synchronize: true,
};
