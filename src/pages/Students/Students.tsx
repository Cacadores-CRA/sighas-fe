import { useState } from 'react';
import { useStudentsList } from '@/services/students/useListStudents';
import { Link, useSearch } from '@tanstack/react-router';
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
import { AddStudentModal } from '@/components/modals/AddStudents';

export function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: students } = useStudentsList();
  const searchParams: { modal: boolean } = useSearch({ strict: false });
  const [isModalOpen, setIsModalOpen] = useState(searchParams.modal ?? false);

  const filteredStudents = students?.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.institutionalEmail
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.enrollment.includes(searchQuery)
  );

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
        <CardTitle className='text-2xl font-bold'>Todos os alunos</CardTitle>
        <Button onClick={() => setIsModalOpen(true)}>
          <UserPlus className='mr-2 h-4 w-4' /> Adicionar Aluno
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
                <TableHead>Matricula</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents?.length ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.userId}>
                    <TableCell className='font-medium'>
                      {student.name}
                    </TableCell>
                    <TableCell>{student.institutionalEmail}</TableCell>
                    <TableCell>{student.enrollment}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === 'ACTIVE' ? 'default' : 'secondary'
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Link to={`/students/${student.enrollment}`}>
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
                    Nenhum aluno encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <AddStudentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
