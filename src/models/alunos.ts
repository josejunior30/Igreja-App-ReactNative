export type alunosDTO = {
  id: number;
  nome: string;
  dataNascimento: Date;
  idade: number;
  rg: string;
  responsavel: string;
  cpfResponsavel: string;
  telefone: string;
  url: string;
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

export type alunoDTO = {
  id: number;
  nome: string;
  dataNascimento: Date;
  email: string;
  rg: string;
  responsavel: string;
  cpfResponsavel: string;
  telefone: string;
  url: string;
  rua: string;
  cep: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  projetos: projetos;

  AlunoDoenca: number;
  sangue: string;
  pergunta: string;
};
export type projetos = {
  id: number;
  nome: string;
};
