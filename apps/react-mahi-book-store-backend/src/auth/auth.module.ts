import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
const crypto = require('crypto');
// Generate a random 32-byte secret key and convert it to a base64 string
const secretKey = crypto.randomBytes(32).toString('base64');

@Module({
  imports: [
    UserModule, // Import UserModule
    JwtModule.register({
      secret: secretKey, // Replace with your actual secret
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
