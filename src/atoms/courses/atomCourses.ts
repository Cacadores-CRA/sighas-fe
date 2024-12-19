import { atomWithStorage } from 'jotai/utils';

export interface Course {
  id: number;
  name: string;
  department: string;
  teachers: number;
  students: number;
  status: 'Ativo' | 'Em Pausa';
}

const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Engenharia de Software',
    department: 'Computação',
    teachers: 12,
    students: 150,
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Arquitetura',
    department: 'Engenharia',
    teachers: 8,
    students: 120,
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Administração',
    department: 'Negócios',
    teachers: 15,
    students: 200,
    status: 'Ativo',
  },
  {
    id: 4,
    name: 'Design Digital',
    department: 'Artes',
    teachers: 6,
    students: 80,
    status: 'Em Pausa',
  },
  {
    id: 5,
    name: 'Medicina',
    department: 'Saúde',
    teachers: 25,
    students: 100,
    status: 'Ativo',
  },
];

export const coursesAtom = atomWithStorage<Course[]>('courses', mockCourses);

// Helper functions
export const getCoursesStats = (courses: Course[]) => {
  const activeCourses = courses.filter((course) => course.status === 'Ativo');
  const totalTeachers = courses.reduce(
    (sum, course) => sum + course.teachers,
    0
  );
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );

  return {
    total: courses.length,
    active: activeCourses.length,
    totalTeachers,
    totalStudents,
    activePercentage: Math.round((activeCourses.length / courses.length) * 100),
  };
};

export const getActiveCourses = (courses: Course[]) => {
  return courses.filter((course) => course.status === 'Ativo');
};
