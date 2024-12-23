import { TeacherEducationType, TeacherStatusType } from './teachers';

export type GroupStatusType = 'OPEN' | 'ACTIVE' | 'CLOSED';
export interface GroupResponse {
  id: string;
  code: string;
  subjectId: string;
  academicPeriod: string;
  status: GroupStatusType;
  professors: ProfessorResponse[];
  students: StudentResponse[];
  createdAt: string;
}

export interface ProfessorResponse {
  userId: string;
  siape: string;
  name: string;
  surname: string;
  status: TeacherStatusType;
  education: TeacherEducationType;
  institutionalEmail: string;
  createdAt: string;
}

export interface StudentResponse {
  userId: string;
  name: string;
  status: string;
  enrollment: string;
  institutionalEmail: string;
  createdAt: string;
}
