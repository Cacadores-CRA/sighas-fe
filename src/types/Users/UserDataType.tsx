export type UserDataType = {
  id: string;
  name: string;
  username?: string;
  surname?: string;
  cpf: string;
  email: string;
  education_level:
    | 'Ensino Médio'
    | 'Graduação'
    | 'Mestrado'
    | 'Doutorado'
    | 'Pós-Doutorado';
  birthdate: string; // Formato: "DD/MM/AAAA"
};
