'use client';

import { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Filter,
  GraduationCap,
  MoreVertical,
  Plus,
  Search,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Discipline {
  id: string;
  name: string;
  code: string;
  department: string;
  professor: string;
  students: number;
  semester: string;
  category: 'exact' | 'human' | 'biological';
  status: 'active' | 'inactive';
}

const mockDisciplines: Discipline[] = [
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
  // Add more mock disciplines...
];

export function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDisciplines = mockDisciplines.filter((discipline) => {
    const matchesSearch =
      discipline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discipline.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discipline.professor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || discipline.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exact':
        return 'bg-blue-500/10 text-blue-500';
      case 'human':
        return 'bg-purple-500/10 text-purple-500';
      case 'biological':
        return 'bg-green-500/10 text-green-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total de Disciplinas
            </CardTitle>
            <BookOpen className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>127</div>
            <p className='text-xs text-muted-foreground'>
              +2 novas este semestre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Alunos Matriculados
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2,842</div>
            <p className='text-xs text-muted-foreground'>
              +10% em relação ao último semestre
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Semestre Atual
            </CardTitle>
            <Calendar className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>2024.1</div>
            <p className='text-xs text-muted-foreground'>
              Início em 05/02/2024
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Todas as disciplinas
          </h2>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Nova Disciplina
          </Button>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex w-full items-center space-x-2 sm:w-auto'>
            <div className='relative flex-1 sm:flex-initial'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar disciplinas...'
                className='pl-8 w-full sm:w-[300px]'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant='outline' size='icon'>
              <Filter className='h-4 w-4' />
            </Button>
          </div>

          <Tabs
            defaultValue='all'
            className='w-full sm:w-auto'
            onValueChange={setSelectedCategory}
          >
            <TabsList>
              <TabsTrigger value='all'>Todas</TabsTrigger>
              <TabsTrigger value='exact'>Exatas</TabsTrigger>
              <TabsTrigger value='human'>Humanas</TabsTrigger>
              <TabsTrigger value='biological'>Biológicas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredDisciplines.map((discipline) => (
            <Card
              key={discipline.id}
              className='group relative overflow-hidden transition-all hover:shadow-lg'
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge
                    variant='secondary'
                    className={getCategoryColor(discipline.category)}
                  >
                    {discipline.department}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <MoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                      <DropdownMenuItem className='text-red-600'>
                        Desativar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className='text-xl'>{discipline.name}</CardTitle>
                <CardDescription>{discipline.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-2'>
                  <div className='flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      {discipline.professor}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      {discipline.students} alunos
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      {discipline.semester}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
