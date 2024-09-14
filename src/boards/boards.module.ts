import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import {Board} from "./board.entity"
import { BoardsController } from "./boards.controller";
import { BoardService } from "./boards.service";
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  controllers: [BoardsController],
  providers: [
    BoardService,
    BoardRepository,
  ]
})
export class BoardsModule {}
