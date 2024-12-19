import { atomWithStorage } from 'jotai/utils';

export interface Discipline {
  id: string;
  name: string;
  code: string;
  department: string;
  professor: string;
  students: number;
  semester: string;
  category: 'exact' | 'human' | 'biological';
  status: 'active' | 'inactive' | 'pending';
}

export const mockDisciplines: Discipline[] = [
  {
    id: '1',
    name: 'Cálculo I',
    code: 'MAT101',
    department: 'Matemática',
    professor: 'Dr. Silva',
    students: 45,
    semester: '2024.1',
    category: 'exact',
    status: 'active',
  },
  {
    id: '2',
    name: 'Literatura Brasileira',
    code: 'LET202',
    department: 'Letras',
    professor: 'Dra. Santos',
    students: 38,
    semester: '2024.1',
    category: 'human',
    status: 'active',
  },
  {
    id: '3',
    name: 'Anatomia',
    code: 'BIO303',
    department: 'Biologia',
    professor: 'Dr. Costa',
    students: 32,
    semester: '2024.1',
    category: 'biological',
    status: 'active',
  },
  {
    id: '4',
    name: 'Física I',
    code: 'FIS101',
    department: 'Física',
    professor: 'Dr. Oliveira',
    students: 40,
    semester: '2024.1',
    category: 'exact',
    status: 'active',
  },
  {
    id: '5',
    name: 'História da Arte',
    code: 'ART201',
    department: 'Artes',
    professor: 'Dra. Lima',
    students: 35,
    semester: '2024.1',
    category: 'human',
    status: 'active',
  },
  {
    id: '6',
    name: 'Química Orgânica',
    code: 'QUI202',
    department: 'Química',
    professor: 'Dr. Pereira',
    students: 30,
    semester: '2024.1',
    category: 'exact',
    status: 'active',
  },
  {
    id: '7',
    name: 'Psicologia Social',
    code: 'PSI301',
    department: 'Psicologia',
    professor: 'Dra. Ferreira',
    students: 42,
    semester: '2024.1',
    category: 'human',
    status: 'active',
  },
  {
    id: '8',
    name: 'Microbiologia',
    code: 'BIO404',
    department: 'Biologia',
    professor: 'Dr. Rodrigues',
    students: 28,
    semester: '2024.1',
    category: 'biological',
    status: 'active',
  },
];

export const disciplinesAtom = atomWithStorage<Discipline[]>(
  'disciplines',
  mockDisciplines
);

// Helper functions for filtering and stats
export const getDepartmentStats = (disciplines: Discipline[]) => {
  return disciplines.reduce(
    (acc, discipline) => {
      acc[discipline.department] = (acc[discipline.department] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
};

export const getCategoryStats = (disciplines: Discipline[]) => {
  return disciplines.reduce(
    (acc, discipline) => {
      acc[discipline.category] = (acc[discipline.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
};

export const getTotalStudents = (disciplines: Discipline[]) => {
  return disciplines.reduce((sum, discipline) => sum + discipline.students, 0);
};

export const getAverageStudentsPerClass = (disciplines: Discipline[]) => {
  return Math.round(getTotalStudents(disciplines) / disciplines.length);
};
