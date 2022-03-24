import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
