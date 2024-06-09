export type PresencaDTO = {
    id: number;
    data: Date;
    chamadaAluno: number;
    alunos: Alunos; 
    projetosChamada: ProjetosChamada; 
}

export type Alunos = {
    id: number;
    nome: string;
}

export type ProjetosChamada = {
    id: number;
    nome: string;
}
