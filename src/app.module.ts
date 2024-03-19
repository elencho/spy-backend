import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacksModule } from './packs/packs.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'spy-database',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
  // controllers: [AppController, AuthController],
  // providers: [AppService, AuthService],
})
export class AppModule {}
