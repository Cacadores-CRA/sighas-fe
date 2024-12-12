export type UserDataType = {
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
