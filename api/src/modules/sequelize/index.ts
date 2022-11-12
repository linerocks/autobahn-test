import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';

import { sequelizeClientProvider } from './sequelize.client';

@Module({
  imports: [ConfigModule],
  providers: [sequelizeClientProvider],
  exports: [sequelizeClientProvider],
})
export class SequelizeModule {}
