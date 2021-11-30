import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PostsController } from './posts.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PostsController],
  providers: [
    {
      provide: 'POST_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('POST_SERVICE_HOST'),
            port: configService.get('POST_SERVICE_PORT'),
          },
        }),
    },
  ],
})
export class PostsModule {}
