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

export type GroupPayload = {
  code: string;
  subjectId: string;
  year: number;
  semester: 'FIRST_SEMESTER' | 'SECOND_SEMESTER';
  status: 'OPEN' | 'ACTIVE' | 'CLOSED';
};
