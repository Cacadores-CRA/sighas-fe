'use client';

import { useState } from 'react';
import { useClassesList } from '@/services/classes/useListClasses';
import { useNavigate } from '@tanstack/react-router';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  MoreVertical,
  Search,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddClassesModal } from '@/components/modals/AddClasses';

type Turma = {
  id: string;
  code: string;
  subjectId: string;
  academicPeriod: string;
  status: 'ACTIVE' | 'INACTIVE';
  professors: string[];
  students: string[];
  createdAt: string;
  subjectName: string; // This would come from subject lookup
};

const turmas: Turma[] = [
  {
    id: '507f80268-d803-478e-9d64-aaf663781ef9',
    code: 'CRO-AP-POO',
    subjectId: 'c74ea446-c16d-4e67-86de-1a0b4a4b2ce4',
    academicPeriod: '2024.1',
    status: 'ACTIVE',
    professors: [],
    students: [],
    createdAt: '2024-12-18T20:54:07.488593',
    subjectName: 'Programação Orientada a Objetos',
  },
  {
    id: 'b64cb56a-6085-4f16-98d1-c4d33e8b7bef',
    code: 'CRO-AP-IMRC',
    subjectId: 'cef32577-080e-4227-abfc-33fdee5a9195',
    academicPeriod: '2024.2',
    status: 'ACTIVE',
    professors: [],
    students: [],
    createdAt: '2024-12-18T20:54:07.488593',
    subjectName: 'Introdução à Metodologia de Pesquisa',
  },
  {
    id: '8913d905-71a3-4e1d-a550-e90323e74c2a',
    code: 'CRO-SP-CQII',
    subjectId: '74f1a550-876d-449f-8222-25f51c25d112',
    academicPeriod: '2024.1',
    status: 'ACTIVE',
    professors: [],
    students: [],
    createdAt: '2024-12-18T20:54:07.488593',
    subjectName: 'Cálculo Quântico II',
  },
];

export const ClassesPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: classes } = useClassesList();

  const filteredTurmas = classes?.filter((turma) => {
    const matchesFilter = filter === 'all' || filter === turma.academicPeriod;

    const matchesSearch =
      turma.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.subjectId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalTurmas = turmas.length;
  const totalStudents = turmas.reduce(
    (sum, turma) => sum + turma.students.length,
    0
  );
  const activeTurmas = turmas.filter(
    (turma) => turma.status === 'ACTIVE'
  ).length;

  return (
    <div className=''>
      <div className='flex items-center gap-2 mb-8'>
        <h1 className='text-2xl font-semibold'>Gerenciamento de Turmas</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <Card className='p-6'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Total de Turmas
              </p>
              <h2 className='text-3xl font-bold mt-2'>{totalTurmas}</h2>
              <p className='text-sm text-gray-500 mt-1'>Turmas cadastradas</p>
            </div>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <BookOpen className='w-5 h-5 text-gray-600' />
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>
                Total de Alunos
              </p>
              <h2 className='text-3xl font-bold mt-2'>{totalStudents}</h2>
              <p className='text-sm text-gray-500 mt-1'>Alunos matriculados</p>
            </div>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <Users className='w-5 h-5 text-gray-600' />
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <div className='flex items-start justify-between'>
            <div>
              <p className='text-sm font-medium text-gray-500'>Turmas Ativas</p>
              <h2 className='text-3xl font-bold mt-2'>{activeTurmas}</h2>
              <p className='text-sm text-gray-500 mt-1'>No período atual</p>
            </div>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <Calendar className='w-5 h-5 text-gray-600' />
            </div>
          </div>
        </Card>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Todas as turmas</h2>
          <AddClassesModal />
        </div>

        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'>
          <div className='relative w-full md:w-80'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4' />
            <Input
              placeholder='Buscar turmas...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>
          <Tabs
            defaultValue='all'
            className='w-full md:w-auto'
            onValueChange={setFilter}
          >
            <TabsList className='grid w-full md:w-auto grid-cols-3'>
              <TabsTrigger value='all'>Todas</TabsTrigger>
              <TabsTrigger value='2024.1'>2024.1</TabsTrigger>
              <TabsTrigger value='2024.2'>2024.2</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredTurmas?.map((turma) => (
            <Card
              key={turma.id}
              className='overflow-hidden cursor-pointer hover:shadow-lg transition-all'
              onClick={() =>
                navigate({ to: '/classes/$id', params: { id: turma.id } })
              }
            >
              <div className='p-6'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <span className='inline-block px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700'>
                      {turma.status}
                    </span>
                    <h3 className='text-lg font-semibold mt-2'>{turma.code}</h3>
                    {/* <p className='text-sm text-gray-500'>{turma.subjectId}</p> */}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <MoreVertical className='w-4 h-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar Turma</DropdownMenuItem>
                      <DropdownMenuItem>Adicionar Professor</DropdownMenuItem>
                      <DropdownMenuItem>Adicionar Alunos</DropdownMenuItem>
                      <DropdownMenuItem className='text-red-600'>
                        Desativar Turma
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Calendar className='w-4 h-4' />
                    <span>Período {turma.academicPeriod}</span>
                  </div>

                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <GraduationCap className='w-4 h-4' />
                    <span>{turma.professors.length} professores</span>
                  </div>

                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <Users className='w-4 h-4' />
                    <span>{turma.students.length} alunos matriculados</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
