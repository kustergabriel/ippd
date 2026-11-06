import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';

@Injectable()
export class TarefasService {
  private tarefas: Tarefa[] = [];
  private readonly filePath = path.resolve(process.cwd(), 'src/data/tasks.json');

  private async loadFromFile(): Promise<void> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.tarefas = data ? (JSON.parse(data) as Tarefa[]) : [];
    } catch {
      this.tarefas = [];
      await fs.writeFile(this.filePath, JSON.stringify(this.tarefas, null, 2), 'utf-8');
    }
  }

  private async saveToFile(): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(this.tarefas, null, 2), 'utf-8');
  }

  async findAll(): Promise<Tarefa[]> {
    await this.loadFromFile();
    return this.tarefas;
  }

  async findOne(id: number): Promise<Tarefa | null> {
    await this.loadFromFile();
    return this.tarefas.find((tarefa) => tarefa.id === id) ?? null;
  }

  async create(createTarefaDto: CreateTarefaDto): Promise<Tarefa> {
    await this.loadFromFile();

    const novaTarefa: Tarefa = {
      id: this.tarefas.length ? this.tarefas[this.tarefas.length - 1].id + 1 : 1,
      descricao: createTarefaDto.descricao,
      data: createTarefaDto.data,
      fim: createTarefaDto.fim,
      status: 'pendente',
      resultado: [],
    };

    this.tarefas.push(novaTarefa);
    await this.saveToFile();
    return novaTarefa;
  }

  async updateAll(id: number, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa | null> {
    await this.loadFromFile();
    const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);

    if (index === -1) {
      return null;
    }

    const tarefaAtualizada: Tarefa = {
      ...this.tarefas[index],
      ...updateTarefaDto,
      resultado: updateTarefaDto.resultado ?? this.tarefas[index].resultado,
    };

    this.tarefas[index] = tarefaAtualizada;
    await this.saveToFile();
    return this.tarefas[index];
  }

  async updatePartial(id: number, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa | null> {
    await this.loadFromFile();
    const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);

    if (index === -1) {
      return null;
    }

    const tarefaAtualizada: Tarefa = {
      ...this.tarefas[index],
      ...updateTarefaDto,
      resultado: updateTarefaDto.resultado ?? this.tarefas[index].resultado,
    };

    this.tarefas[index] = tarefaAtualizada;
    await this.saveToFile();
    return this.tarefas[index];
  }

  async remove(id: number): Promise<Tarefa | null> {
    await this.loadFromFile();
    const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);

    if (index === -1) {
      return null;
    }

    const [removida] = this.tarefas.splice(index, 1);
    await this.saveToFile();
    return removida;
  }
}