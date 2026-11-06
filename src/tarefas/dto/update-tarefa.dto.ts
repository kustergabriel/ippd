import { CreateTarefaDto } from './create-tarefa.dto';

export class UpdateTarefaDto extends CreateTarefaDto {
  status?: string;
  resultado?: number[] | null;
}