'use client';

import { useState } from 'react';
import {
  coursesAtom,
  getCoursesStats,
  type Course,
} from '@/atoms/courses/atomCourses';
import { useAtom } from 'jotai';
import { BarChart3, ChevronDown, Plus, Search } from 'lucide-react';

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
  DialogTrigger,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CoursesPage = () => {
  const [courses, setCourses] = useAtom(coursesAtom);
  const [selectedTab, setSelectedTab] = useState<string>('overview');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    department: '',
    teachers: '',
    students: '',
    status: 'Ativo',
  });

  const stats = getCoursesStats(courses);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const courseData = {
        id: Date.now(),
        name: newCourse.name,
        department: newCourse.department,
        teachers: parseInt(newCourse.teachers),
        students: parseInt(newCourse.students),
        status: newCourse.status as 'Ativo' | 'Em Pausa',
      };

      setCourses([...courses, courseData]);
      setIsAddCourseOpen(false);
      setNewCourse({
        name: '',
        department: '',
        teachers: '',
        students: '',
        status: 'Ativo',
      });
    } catch (error) {
      console.error('Error adding course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen  bg-white  rounded-md p-8'>
      <header className='mb-8'>
        <h1 className='text-4xl font-bold text-slate-900'>Cursos</h1>
        <p className='text-slate-500'>
          Gerencie todos os cursos da instituição
        </p>
      </header>

      {/* Stats Cards */}
      <div className='mb-8 grid gap-6 md:grid-cols-3'>
        <Card className='bg-white shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-lg font-medium'>
              Total de Cursos
            </CardTitle>
            <BarChart3 className='h-5 w-5 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-slate-900'>
              {stats.total}
            </div>
            <p className='text-sm font-medium text-green-500'>
              {stats.active} ativos
            </p>
          </CardContent>
        </Card>
        <Card className='bg-white shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-lg font-medium'>Cursos Ativos</CardTitle>
            <BarChart3 className='h-5 w-5 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-slate-900'>
              {stats.active}
            </div>
            <p className='text-sm font-medium text-slate-500'>
              {stats.activePercentage}% do total
            </p>
          </CardContent>
        </Card>
        <Card className='bg-white shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-lg font-medium'>
              Alunos Matriculados
            </CardTitle>
            <BarChart3 className='h-5 w-5 text-purple-500' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-bold text-slate-900'>
              {stats.totalStudents.toLocaleString('pt-BR')}
            </div>
            <p className='text-sm font-medium text-green-500'>
              {stats.totalTeachers} professores
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Section */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold text-slate-900'>Todos os cursos</h2>
          <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
            <DialogTrigger asChild>
              <Button className='bg-blue-500 hover:bg-blue-600'>
                <Plus className='mr-2 h-4 w-4' /> Adicionar Curso
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Curso</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes do novo curso abaixo.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCourse}>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='name' className='text-right'>
                      Nome
                    </Label>
                    <Input
                      id='name'
                      value={newCourse.name}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, name: e.target.value })
                      }
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='department' className='text-right'>
                      Departamento
                    </Label>
                    <Input
                      id='department'
                      value={newCourse.department}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          department: e.target.value,
                        })
                      }
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='teachers' className='text-right'>
                      Professores
                    </Label>
                    <Input
                      id='teachers'
                      type='number'
                      min='0'
                      value={newCourse.teachers}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, teachers: e.target.value })
                      }
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='students' className='text-right'>
                      Alunos
                    </Label>
                    <Input
                      id='students'
                      type='number'
                      min='0'
                      value={newCourse.students}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, students: e.target.value })
                      }
                      className='col-span-3'
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='status' className='text-right'>
                      Status
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setNewCourse({ ...newCourse, status: value })
                      }
                      defaultValue={newCourse.status}
                    >
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Selecione o status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Ativo'>Ativo</SelectItem>
                        <SelectItem value='Em Pausa'>Em Pausa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit'>Adicionar Curso</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='rounded-lg border bg-white shadow-lg'>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className='border-b p-4'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <div className='relative flex-1'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400' />
                  <Input placeholder='Buscar cursos...' className='pl-10' />
                </div>
                <TabsList className='grid w-full grid-cols-3 sm:w-auto'>
                  <TabsTrigger value='overview'>Visão Geral</TabsTrigger>
                  <TabsTrigger value='analytics'>Análise</TabsTrigger>
                  <TabsTrigger value='reports'>Relatórios</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value='overview'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Curso</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Professores</TableHead>
                    <TableHead>Alunos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course: Course) => (
                    <TableRow key={course.id}>
                      <TableCell className='font-medium'>
                        {course.name}
                      </TableCell>
                      <TableCell>{course.department}</TableCell>
                      <TableCell>{course.teachers}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            course.status === 'Ativo'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {course.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              Ações <ChevronDown className='ml-2 h-4 w-4' />
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value='analytics' className='p-6'>
              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                <Card>
                  <CardHeader>
                    <CardTitle>Média de Alunos</CardTitle>
                    <CardDescription>por curso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>45.2</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Taxa de Conclusão</CardTitle>
                    <CardDescription>últimos 12 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>78%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Satisfação dos Alunos</CardTitle>
                    <CardDescription>média geral</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>4.7/5</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Receita Total</CardTitle>
                    <CardDescription>ano corrente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='text-3xl font-bold'>R$ 1.2M</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value='reports' className='p-6'>
              <div className='grid gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios Disponíveis</CardTitle>
                    <CardDescription>
                      Selecione um relatório para visualizar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className='space-y-2'>
                      <li>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                        >
                          <BarChart3 className='mr-2 h-4 w-4' />
                          Desempenho dos Cursos
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                        >
                          <BarChart3 className='mr-2 h-4 w-4' />
                          Tendências de Matrícula
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                        >
                          <BarChart3 className='mr-2 h-4 w-4' />
                          Análise de Feedback dos Alunos
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
