import { Module } from '@nestjs/common';

import { AppModule } from './app.module';
import { ViewModule } from '@/modules/view/view.module';

@Module({
  imports: [AppModule, ViewModule],
})
export class ServerModule {}
