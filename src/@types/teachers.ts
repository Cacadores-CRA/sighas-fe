export type TeacherEducationType =
  | 'HIGH_SCHOOL'
  | 'TECHNICAL_CERTIFICATION'
  | 'ASSOCIATE'
  | 'BACHELOR_EDUCATION'
  | 'BACHELOR'
  | 'POSTGRADUATE'
  | 'MASTER'
  | 'DOCTORATE'
  | 'POST_DOCTORATE';

export type TeacherStatusType =
  | 'ACTIVE'
  | 'CREATED'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'FINISHED';

export const teacherStatusLabel: Record<TeacherStatusType, string> = {
  ACTIVE: 'Ativo',
  CREATED: 'Criado',
  INACTIVE: 'Inativo',
  SUSPENDED: 'Suspenso',
  FINISHED: 'Finalizado',
};

export const teacherEducationLabel: Record<TeacherEducationType, string> = {
  HIGH_SCHOOL: 'Ensino Médio',
  TECHNICAL_CERTIFICATION: 'Certificação Técnica',
  ASSOCIATE: 'Tecnólogo',
  BACHELOR_EDUCATION: 'Licenciatura',
  BACHELOR: 'Bacharelado',
  POSTGRADUATE: 'Pós-graduação',
  MASTER: 'Mestrado',
  DOCTORATE: 'Doutorado',
  POST_DOCTORATE: 'Pós-doutorado',
};
