import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from '../boards/entity/board.entity';
import { User } from '../auth/entity/user.entity';
import * as config from 'config';
import { DbConfig } from '../../types/config.types';

const dbConfig: DbConfig = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: +process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DATABASE || dbConfig.database,
  entities: [Board, User],
  synchronize: dbConfig.synchronize,
};
