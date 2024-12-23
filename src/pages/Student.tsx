import { studentStatusLabel, StudentStatusType } from '@/@types/students';
import { useGetStudents } from '@/services/students/useGetStudents';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Mail, User, UserCog } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import EditStudentModal from '@/components/modals/EditStudent';

export const StudentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });

  const { data: student, isLoading } = useGetStudents(id || '');

  console.log({ student });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className='container mx-auto py-10 max-w-4xl space-y-6'>
      <div className='flex items-center justify-between'>
        <Button
          variant='ghost'
          onClick={() => navigate({ to: '/students' })}
          className='hover:bg-secondary'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Voltar para lista
        </Button>
        <EditStudentModal student={student} />
      </div>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <div>
            <CardTitle className='text-2xl font-bold'>
              Detalhes do Aluno
            </CardTitle>
            <p className='text-sm text-muted-foreground'>
              Informações completas do cadastro do aluno
            </p>
          </div>
        </CardHeader>
        <CardContent className='mt-6'>
          <div className='grid gap-6'>
            <div className='flex items-center space-x-4'>
              <div className='h-16 w-16 rounded-full bg-secondary flex items-center justify-center'>
                <User className='h-8 w-8 text-secondary-foreground' />
              </div>
              <div>
                <h2 className='text-2xl font-bold'>{student.name}</h2>
                {/* <p className='text-muted-foreground'>
                  Aluno {student.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </p> */}
              </div>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-6'>
              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Email
                  </h3>
                </div>
                <p className='text-lg font-medium'>
                  {student?.institutionalEmail}
                </p>
              </div>

              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <UserCog className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Matrícula
                  </h3>
                </div>
                <p className='text-lg font-medium'>{student.enrollment}</p>
              </div>

              {/* <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <GraduationCap className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Grau de Educação
                  </h3>
                </div>
                <Badge variant='outline' className='text-base'>
                  {student. === 'GRADUATE' && 'Graduação'}
                  {student.education === 'MASTER' && 'Mestrado'}
                  {student.education === 'DOCTORATE' && 'Doutorado'}
                </Badge>
              </div> */}
              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Status
                  </h3>
                </div>
                <Badge
                  variant={
                    student.status === 'ACTIVE' ? 'default' : 'secondary'
                  }
                >
                  {studentStatusLabel[student.status as StudentStatusType]}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
