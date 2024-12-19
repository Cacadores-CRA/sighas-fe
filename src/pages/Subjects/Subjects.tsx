'use client';

import { useState } from 'react';
import {
  disciplinesAtom,
  getTotalStudents,
  type Discipline,
} from '@/atoms/subjects/atomSubjects';
import { useAtom } from 'jotai';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SubjectsPage() {
  const [disciplines, setDisciplines] = useAtom(disciplinesAtom);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isNewSubjectModalOpen, setIsNewSubjectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    department: '',
    professor: '',
    students: '',
    category: '',
  });

  const handleNewSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newSubjectData: Discipline = {
        id: Date.now().toString(),
        name: newSubject.name,
        code: newSubject.code,
        department: newSubject.department,
        professor: newSubject.professor,
        students: parseInt(newSubject.students),
        semester: '2024.1', // You might want to make this dynamic
        category: newSubject.category as 'exact' | 'human' | 'biological',
        status: 'active',
      };

      setDisciplines([...disciplines, newSubjectData]);
      setIsNewSubjectModalOpen(false);
      setNewSubject({
        name: '',
        code: '',
        department: '',
        professor: '',
        students: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding new subject:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDisciplines = disciplines.filter((discipline) => {
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

  // Calculate stats
  const stats = {
    totalDisciplines: disciplines.length,
    totalStudents: getTotalStudents(disciplines),
    currentSemester: '2024.1',
    // Compare with previous semester (if stored)
    newDisciplines: disciplines.filter((d) => d.semester === '2024.1').length,
    previousSemesterStudents: 2584, // This could come from an API or historical data
  };

  const studentIncrease = Math.round(
    ((stats.totalStudents - stats.previousSemesterStudents) /
      stats.previousSemesterStudents) *
      100
  );

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
            <div className='text-2xl font-bold'>{stats.totalDisciplines}</div>
            <p className='text-xs text-muted-foreground'>
              +{stats.newDisciplines} novas este semestre
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
            <div className='text-2xl font-bold'>
              {stats.totalStudents.toLocaleString('pt-BR')}
            </div>
            <p className='text-xs text-muted-foreground'>
              {studentIncrease > 0 ? '+' : ''}
              {studentIncrease}% em relação ao último semestre
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
            <div className='text-2xl font-bold'>{stats.currentSemester}</div>
            <p className='text-xs text-muted-foreground'>
              Início em {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4 bg-white p-4 rounded-md'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>
            Todas as disciplinas
          </h2>
          <Button onClick={() => setIsNewSubjectModalOpen(true)}>
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

        {/* New Subject Modal */}
        <Dialog
          open={isNewSubjectModalOpen}
          onOpenChange={setIsNewSubjectModalOpen}
        >
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Nova Disciplina</DialogTitle>
              <DialogDescription>
                Preencha os dados da nova disciplina
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewSubjectSubmit}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Nome
                  </Label>
                  <Input
                    id='name'
                    className='col-span-3'
                    value={newSubject.name}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='code' className='text-right'>
                    Código
                  </Label>
                  <Input
                    id='code'
                    className='col-span-3'
                    value={newSubject.code}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, code: e.target.value })
                    }
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='department' className='text-right'>
                    Departamento
                  </Label>
                  <Input
                    id='department'
                    className='col-span-3'
                    value={newSubject.department}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        department: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='professor' className='text-right'>
                    Professor
                  </Label>
                  <Input
                    id='professor'
                    className='col-span-3'
                    value={newSubject.professor}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        professor: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='students' className='text-right'>
                    Alunos
                  </Label>
                  <Input
                    id='students'
                    type='number'
                    className='col-span-3'
                    value={newSubject.students}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, students: e.target.value })
                    }
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='category' className='text-right'>
                    Categoria
                  </Label>
                  <Select
                    value={newSubject.category}
                    onValueChange={(value) =>
                      setNewSubject({ ...newSubject, category: value })
                    }
                    required
                  >
                    <SelectTrigger className='col-span-3'>
                      <SelectValue placeholder='Selecione uma categoria' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='exact'>Exatas</SelectItem>
                      <SelectItem value='human'>Humanas</SelectItem>
                      <SelectItem value='biological'>Biológicas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsNewSubjectModalOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg
                        className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    'Salvar'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
