import { Module } from '@nestjs/common';
import { controllers, repositories, services } from './module';

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...services, ...repositories],
  exports: [...services, ...repositories],
})
export class AppModule {}
