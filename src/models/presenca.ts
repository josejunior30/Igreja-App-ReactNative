export type PresencaDTO ={

    id: number;
    data: Date;
    chamadaAluno: number;
    alunos: alunos;
    projetosChamada: projetosChamada;

}

export type alunos ={
    id: number;
    nome: string;
   
}
export type projetosChamada = {
    id: number;
    nome: string;

}