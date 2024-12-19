export type TeacherData = {
  name: string;
  email: string;
  siape: string;
  education_level: string;
  perfil: string;
  status: string;
};

export const data: TeacherData[] = [
  {
    name: 'Ana Maria',
    email: 'ana.maria@ifal.edu.br',
    siape: '123456',
    education_level: 'Mestrado',
    perfil: 'Usuário',
    status: 'Ativo',
  },
  {
    name: 'Carlos Souza',
    email: 'carlos.souza@ifal.edu.br',
    siape: '654321',
    education_level: 'Doutorado',
    perfil: 'Usuário',
    status: 'Ativo',
  },
  {
    name: 'Bianca Oliveira',
    email: 'bianca.oliveira@ifal.edu.br',
    siape: '789123',
    education_level: 'Especialização',
    perfil: 'Usuário',
    status: 'Inativo',
  },
  {
    name: 'Fernando Lima',
    email: 'fernando.lima@ifal.edu.br',
    siape: '321987',
    education_level: 'Graduação',
    perfil: 'Usuário',
    status: 'Ativo',
  },
  {
    name: 'Julia Santos',
    email: 'julia.santos@ifal.edu.br',
    siape: '456789',
    education_level: 'Pós-doutorado',
    perfil: 'Usuário',
    status: 'Ativo',
  },
];
