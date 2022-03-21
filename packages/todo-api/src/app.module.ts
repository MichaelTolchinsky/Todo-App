import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from 'config.schema';
import { TodoModule } from './todo/todo.module';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService:ConfigService) => ({
        "type": "postgres",
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //entities: ["dist/**/*.entity{.ts,.js}"],
        "autoLoadEntities": true,
        "synchronize": true,
      })
    }),
    TodoModule],
  providers: [],
})
export class AppModule {}
