import { useState } from 'react';
import {
  teacherEducationLabel,
  TeacherEducationType,
  teacherStatusLabel,
  TeacherStatusType,
} from '@/@types/teachers';
import { useTeachersList } from '@/services/teachers/useListTearchers';
import { Link } from '@tanstack/react-router';
import { Pencil, Search, UserPlus } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddTeacherModal } from '@/components/modals/AddTeacher';

export function TeachersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: teachers } = useTeachersList();

  const filteredTeachers = teachers?.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.institutionalEmail
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      teacher.siape.includes(searchQuery)
  );

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
        <CardTitle className='text-2xl font-bold'>
          Todos os professores
        </CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <UserPlus className='mr-2 h-4 w-4' /> Adicionar Professor
        </Button>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-2 mb-4'>
          <Search className='text-muted-foreground' />
          <Input
            placeholder='Buscar professores...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='max-w-sm'
          />
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email Institucional</TableHead>
                <TableHead>SIAPE</TableHead>
                <TableHead>Grau de Educação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers?.length ? (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.userId}>
                    <TableCell className='font-medium'>
                      {teacher.name}
                    </TableCell>
                    <TableCell>{teacher.institutionalEmail}</TableCell>
                    <TableCell>{teacher.siape}</TableCell>
                    <TableCell>
                      {
                        teacherEducationLabel[
                          teacher.education as TeacherEducationType
                        ]
                      }
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          teacher.status === 'ACTIVE' ? 'default' : 'secondary'
                        }
                      >
                        {
                          teacherStatusLabel[
                            teacher.status as TeacherStatusType
                          ]
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/teachers/${teacher.siape}`}>
                        <Button variant='outline'>
                          <Pencil className='mr-2 h-4 w-4' />
                          Editar
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center text-muted-foreground'
                  >
                    Nenhum professor encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <AddTeacherModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
