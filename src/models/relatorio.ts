


export type RelatorioDTO = {
  id: number;
  data: Date;
  'A aula ocorreu normalmente?': string;
  'Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?': string;
  'Houve dificuldade com o material das aulas?': string;
  'Alguma sugestão para a equipe de trabalho?': string;
  'Mais alguma observação ou sugestão?': string;
  projetosRelatorio: projetosRelatorio;
};

export type projetosRelatorio = {
  id: number;
  nome: string;
  lider: string;
};
