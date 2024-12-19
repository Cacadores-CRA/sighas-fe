import { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

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

interface Teacher {
  id: string;
  name: string;
  email: string;
  siape: string;
  education: string;
  status: string;
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Ana Maria',
    email: 'ana.maria@ifal.edu.br',
    siape: '123456',
    education: 'Mestrado',
    status: 'Ativo',
  },
  {
    id: '2',
    name: 'Carlos Souza',
    email: 'carlos.souza@ifal.edu.br',
    siape: '654321',
    education: 'Doutorado',
    status: 'Ativo',
  },
  {
    id: '3',
    name: 'Bianca Oliveira',
    email: 'bianca.oliveira@ifal.edu.br',
    siape: '789123',
    education: 'Especialização',
    status: 'Inativo',
  },
];

export function StudentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.siape.includes(searchQuery)
  );

  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-7'>
        <CardTitle className='text-2xl font-bold'>Alunos</CardTitle>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className='font-medium'>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.siape}</TableCell>
                  <TableCell>{teacher.education}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        teacher.status === 'Ativo' ? 'default' : 'secondary'
                      }
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
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
