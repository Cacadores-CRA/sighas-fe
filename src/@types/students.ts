export type StudentStatusType = 'ACTIVE' | 'CREATED' | 'SUSPENDED' | 'FINISHED';

export const studentStatusLabel: Record<StudentStatusType, string> = {
  ACTIVE: 'Ativo',
  CREATED: 'Criado',
  SUSPENDED: 'Suspenso',
  FINISHED: 'Finalizado',
};
