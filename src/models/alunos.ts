export type alunosDTO = {
  id: number;
  nome: string;
  dataNascimento: Date;
  rg: string;
  responsavel: string;
  cpfResponsavel: string;
  telefone: string;
  alunoStatus: alunoStatus;
  rua: string;
  cep: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  projetos: projetos;
  email: string;
  AlunoDoenca: number;
  sangue: string;
  pergunta: string;
};
export type alunoStatus ={
  id: number;
  pendencia: string;
}
export type alunoDTO = {
  id: number;
  nome: string;
  dataNascimento: Date;
  email: string;
  rg: string;
  responsavel: string;
  cpfResponsavel: string;
  telefone: string;
  idade: number;
  url: string;
  rua: string;
  cep: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  projetos: projetos;
  alunoStatus: alunoStatus;
  AlunoDoenca: number;
  sangue: string;
  pergunta: string;
};

export type projetos = {
  id: number;
  nome: string;
};
