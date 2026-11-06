import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefasService.findOne(+id);
  }

  @Post()
  create(@Body() createTarefaDto: CreateTarefaDto) {
    return this.tarefasService.create(createTarefaDto);
  }

  @Put(':id')
  updateAll(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto) {
    return this.tarefasService.updateAll(+id, updateTarefaDto);
  }

  @Patch(':id')
  updatePartial(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto) {
    return this.tarefasService.updatePartial(+id, updateTarefaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarefasService.remove(+id);
  }
}
