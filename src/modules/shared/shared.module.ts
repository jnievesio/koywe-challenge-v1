import { Module } from '@nestjs/common';
import { FirebaseService } from './service/firebase.service';
import { AuthGuard } from './guard/auth.guard';

@Module({
  providers: [FirebaseService, AuthGuard],
  exports: [FirebaseService, AuthGuard],
})
export class SharedModule {}
