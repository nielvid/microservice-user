import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Inject,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guards/auth.guads';
import { CreatePostDto } from './post.dto';

@Controller('posts')
export class PostsController {
  constructor(@Inject('POST_SERVICE') private client: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() post: CreatePostDto) {
    return this.client.send({ cmd: 'post' }, post);
  }
  @Get(':id')
  SinglePost(@Param('id') id: string) {
    return this.client.send({ cmd: 'one-post' }, id);
  }
  @Get()
  fetchAllPost() {
    return this.client.send({ cmd: 'all-post' }, '');
  }
}
