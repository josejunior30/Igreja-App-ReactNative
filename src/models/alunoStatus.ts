
export type alunoStatusDTO = {
  id: number;
  pendencia: string;
  alunos: alunos[];
};
export type alunos = {
  id: number;
  nome: string;
  dataNascimento: Date;
  idade: string;
  rg: string;
  responsavel: string;
  cpfResponsavel: string;
  telefone: string;
  AlunoStatus: number;
};
