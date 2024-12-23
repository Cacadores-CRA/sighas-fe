'use client';

import { useState } from 'react';
import { useListSubjects } from '@/services/subjects/useListSubjtects';
import {
  BookOpen,
  Calendar,
  Filter,
  GraduationCap,
  MoreVertical,
  Search,
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
import { AddSubjectModal } from '@/components/modals/AddSubject';

export function SubjectsPage() {
  const { data: subjects } = useListSubjects();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDisciplines = subjects?.filter((subject) => {
    const matchesSearch =
      subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all';
    return matchesSearch && matchesCategory;
  });

  // // Calculate stats
  // const stats = {
  //   totalDisciplines: subjects?.length,
  //   currentSemester: '2024.1',
  //   // Compare with previous semester (if stored)
  //   newDisciplines: subjects?.filter((d) => d.createdAt === '2024.1').length,
  //   previousSemesterStudents: 2584, // This could come from an API or historical data
  // };

  // const studentIncrease = Math.round(
  //   ((stats.totalStudents - stats.previousSemesterStudents) /
  //     stats.previousSemesterStudents) *
  //     100
  // );

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
            <div className='text-2xl font-bold'>{subjects?.length}</div>
            <p className='text-xs text-muted-foreground'>
              +{subjects?.filter((d) => d.createdAt === '2024.1').length} novas
              este semestre
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
          <AddSubjectModal />
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
              {/* <TabsTrigger value='exact'>Exatas</TabsTrigger>
              <TabsTrigger value='human'>Humanas</TabsTrigger>
              <TabsTrigger value='biological'>Biológicas</TabsTrigger> */}
            </TabsList>
          </Tabs>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2'>
          {filteredDisciplines?.map((subject) => (
            <Card
              key={subject.id}
              className='group relative overflow-hidden transition-all hover:shadow-lg'
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge
                    variant='secondary'
                    className='bg-green-100 text-green-700'
                  >
                    {subject.code}
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
                <CardTitle className='text-xl'>{subject.title}</CardTitle>
                <CardDescription>{subject.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-2'>
                  <div className='flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      {subject.shortTitle}
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
