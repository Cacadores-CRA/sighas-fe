'use client';

import { useState } from 'react';
import { useGetClasse } from '@/services/classes/useGetClasse';
import { useRemoveStudentToClass } from '@/services/classes/useRemoveStudentToClass';
import { useRemoveTeacherToClass } from '@/services/classes/useRemoveTeacherToClass';
import { useParams } from '@tanstack/react-router';
import {
  Calendar,
  GraduationCap,
  Mail,
  Plus,
  Search,
  UserCircle,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AddStudentToClassModal } from '@/components/modals/AddStudentToClass';
import { AddTeacherToClassModal } from '@/components/modals/AddTeacherToClass';

export const ClassePage = () => {
  const { id } = useParams({ strict: false });
  const { data: classDetails } = useGetClasse(id as string);

  const { mutate: removeTeacherToClass } = useRemoveTeacherToClass();
  const { mutate: removeStudentToClass } = useRemoveStudentToClass();

  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8 bg-gradient-to-r from-[#172554] to-[#1e40af] rounded-2xl p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='text-white'>
            <h1 className='text-3xl font-bold'>{classDetails?.code}</h1>
            {/* <p className='mt-1 opacity-90'>{classDetails?.}</p> */}
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              classDetails?.status === 'ACTIVE'
                ? 'bg-green-400 text-green-900'
                : 'bg-red-400 text-red-900'
            } shadow-sm`}
          >
            {classDetails?.status}
          </span>
        </div>

        <div className='flex gap-6 mt-6'>
          <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white'>
            <Calendar className='w-5 h-5' />
            <span>Período {classDetails?.academicPeriod}</span>
          </div>
          <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white'>
            <GraduationCap className='w-5 h-5' />
            <span>{classDetails?.professors.length} professores</span>
          </div>
          <div className='flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white'>
            <Users className='w-5 h-5' />
            <span>{classDetails?.students.length} alunos</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue='info' className='space-y-6'>
        <TabsList className='bg-[#f8fafc] p-1 rounded-lg'>
          <TabsTrigger
            value='info'
            className='data-[state=active]:bg-white data-[state=active]:text-[#172554] rounded-md transition-all'
          >
            Informações
          </TabsTrigger>
          <TabsTrigger
            value='professors'
            className='data-[state=active]:bg-white data-[state=active]:text-[#172554] rounded-md transition-all'
          >
            Professores
          </TabsTrigger>
          <TabsTrigger
            value='students'
            className='data-[state=active]:bg-white data-[state=active]:text-[#172554] rounded-md transition-all'
          >
            Alunos
          </TabsTrigger>
        </TabsList>

        <TabsContent value='info'>
          <div className='grid gap-6 grid-cols-1 lg:grid-cols-2'>
            <Card className='p-6 border-none shadow-lg bg-gradient-to-br from-white to-[#f1f5f9]'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-gray-800'>
                  Informações Gerais
                </CardTitle>
                <CardDescription>
                  Detalhes e estatísticas da turma
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Capacidade da Turma</span>
                    <span className='font-medium'>
                      {classDetails?.students.length}/40 alunos
                    </span>
                  </div>
                  <Progress
                    value={((classDetails?.students?.length || 0) / 40) * 100}
                    className='h-2 bg-[#172554]/10'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-[#172554]/5 rounded-lg p-4'>
                    <p className='text-sm text-gray-600'>Taxa de Presença</p>
                    <p className='text-2xl font-bold text-[#172554] mt-1'>
                      85%
                    </p>
                  </div>
                  <div className='bg-[#172554]/5 rounded-lg p-4'>
                    <p className='text-sm text-gray-600'>Média da Turma</p>
                    <p className='text-2xl font-bold text-[#172554] mt-1'>
                      7.8
                    </p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <h4 className='font-medium text-gray-700'>Horários</h4>
                  <div className='space-y-2'>
                    {[
                      'Segunda-feira: 14:00 - 16:00',
                      'Quarta-feira: 14:00 - 16:00',
                    ].map((horario, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-2 text-sm text-gray-600'
                      >
                        <Calendar className='w-4 h-4 text-[#172554]' />
                        <span>{horario}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='p-6 border-none shadow-lg bg-gradient-to-br from-white to-[#f1f5f9]'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-gray-800'>
                  Desempenho da Turma
                </CardTitle>
                <CardDescription>
                  Distribuição de notas e frequência
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-[300px] mt-4'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                      data={[
                        { nota: '0-2', alunos: 2 },
                        { nota: '2-4', alunos: 3 },
                        { nota: '4-6', alunos: 8 },
                        { nota: '6-8', alunos: 15 },
                        { nota: '8-10', alunos: 12 },
                      ]}
                      margin={{ top: 5, right: 20, bottom: 25, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis
                        dataKey='nota'
                        label={{
                          value: 'Faixa de Notas',
                          position: 'bottom',
                          offset: 15,
                        }}
                      />
                      <YAxis
                        label={{
                          value: 'Número de Alunos',
                          angle: -90,
                          position: 'insideLeft',
                          offset: 10,
                        }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey='alunos'
                        fill='#172554'
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className='p-6 border-none shadow-lg bg-gradient-to-br from-white to-[#f1f5f9] lg:col-span-2'>
              <CardHeader>
                <CardTitle className='text-xl font-semibold text-gray-800'>
                  Próximas Atividades
                </CardTitle>
                <CardDescription>
                  Calendário de avaliações e entregas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    {
                      titulo: 'Prova 1',
                      data: '2024-04-15',
                      tipo: 'Avaliação',
                      peso: '30%',
                    },
                    {
                      titulo: 'Trabalho em Grupo',
                      data: '2024-04-22',
                      tipo: 'Atividade',
                      peso: '20%',
                    },
                    {
                      titulo: 'Apresentação de Projeto',
                      data: '2024-05-05',
                      tipo: 'Apresentação',
                      peso: '25%',
                    },
                  ].map((atividade, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-4 rounded-lg bg-[#172554]/5 hover:bg-[#172554]/10 transition-colors'
                    >
                      <div className='space-y-1'>
                        <h4 className='font-medium text-gray-800'>
                          {atividade.titulo}
                        </h4>
                        <div className='flex items-center gap-4 text-sm text-gray-600'>
                          <div className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            <span>
                              {new Date(atividade.data).toLocaleDateString()}
                            </span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <GraduationCap className='w-4 h-4' />
                            <span>{atividade.tipo}</span>
                          </div>
                        </div>
                      </div>
                      <span className='text-sm font-medium text-[#172554] bg-[#172554]/10 px-3 py-1 rounded-full'>
                        Peso: {atividade.peso}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='professors'>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='relative w-80'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4' />
                <Input
                  placeholder='Buscar professores...'
                  className='pl-10 border-2 focus:border-[#172554] transition-colors'
                />
              </div>
              <Button
                className='bg-[#172554] hover:bg-[#1e3a8a] text-white shadow-md transition-all hover:shadow-lg'
                onClick={() => setIsAddTeacherModalOpen(true)}
              >
                <Plus className='w-4 h-4 mr-2' />
                Adicionar Professor
              </Button>
            </div>

            {!classDetails?.professors ||
            classDetails.professors.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>
                Não há professores cadastrados nesta turma
              </div>
            ) : (
              <div className='grid gap-4'>
                {classDetails?.professors.map((professor) => (
                  <Card
                    key={professor.siape}
                    className='p-6 hover:shadow-lg transition-all border-none bg-gradient-to-br from-white to-[#f1f5f9]'
                  >
                    <div className='flex items-center gap-4'>
                      <Avatar className='h-16 w-16 ring-2 ring-[#172554]/20 ring-offset-2'>
                        {/* <AvatarImage src={professor.avatar} /> */}
                        <AvatarFallback className='bg-gradient-to-br from-[#172554] to-[#1e40af] text-white'>
                          <UserCircle className='w-8 h-8' />
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-lg text-gray-800'>
                          {professor.name}
                        </h3>
                        <div className='flex items-center gap-4 text-sm text-gray-600 mt-1'>
                          <div className='flex items-center gap-2 bg-[#172554]/5 px-3 py-1 rounded-full'>
                            <Mail className='w-4 h-4 text-[#172554]' />
                            {professor.institutionalEmail}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant='outline'
                        className='border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors'
                        onClick={() => {
                          removeTeacherToClass({
                            classId: id as string,
                            siape: professor.siape,
                          });
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value='students'>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='relative w-80'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4' />
                <Input
                  placeholder='Buscar alunos...'
                  className='pl-10 border-2 focus:border-[#172554] transition-colors'
                />
              </div>
              <Button
                onClick={() => setIsAddStudentModalOpen(true)}
                className='bg-[#172554] hover:bg-[#1e3a8a] text-white shadow-md transition-all hover:shadow-lg'
              >
                <Plus className='w-4 h-4 mr-2' />
                Adicionar Alunos
              </Button>
            </div>

            {!classDetails?.students || classDetails.students.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>
                Não há alunos cadastrados nesta turma
              </div>
            ) : (
              <div className='grid gap-4'>
                {classDetails?.students.map((student) => (
                  <Card
                    key={student.enrollment}
                    className='p-6 hover:shadow-lg transition-all border-none bg-gradient-to-br from-white to-[#f1f5f9]'
                  >
                    <div className='flex items-center gap-4'>
                      <Avatar className='h-16 w-16 ring-2 ring-[#172554]/20 ring-offset-2'>
                        {/* <AvatarImage src={student.avatar} /> */}
                        <AvatarFallback className='bg-gradient-to-br from-[#172554] to-[#1e40af] text-white'>
                          <UserCircle className='w-8 h-8' />
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-lg text-gray-800'>
                          {student.name}
                        </h3>
                        <div className='flex items-center gap-4 text-sm text-gray-600 mt-1'>
                          <div className='flex items-center gap-2 bg-[#172554]/5 px-3 py-1 rounded-full'>
                            <span className='text-[#172554]'>
                              Matrícula: {student.enrollment}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant='outline'
                        className='border-2 border-red-200 text-red-600 hover:bg-red-50 transition-colors'
                        onClick={() => {
                          removeStudentToClass({
                            classId: id as string,
                            enrollment: student.enrollment,
                          });
                        }}
                      >
                        Remover
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <AddTeacherToClassModal
        open={isAddTeacherModalOpen}
        onClose={() => setIsAddTeacherModalOpen(false)}
        classId={id as string}
      />
      <AddStudentToClassModal
        open={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        classId={id as string}
      />
    </div>
  );
};
