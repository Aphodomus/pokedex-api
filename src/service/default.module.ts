import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DefaultService } from './default.service';


@Module({
  imports: [HttpModule],
  providers: [DefaultService],
  exports: [DefaultService],
})
export class DefaultServiceModule {}
