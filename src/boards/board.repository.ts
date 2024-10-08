import { DataSource, Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create({
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }
}
