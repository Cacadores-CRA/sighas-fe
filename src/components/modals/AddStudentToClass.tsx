import { useState } from 'react';
import { useAddStudentToClass } from '@/services/classes/useAddStudentToClass';
import { useGetClasse } from '@/services/classes/useGetClasse';
import { useListStudents } from '@/services/students/useListStudents';
import { Search, UserPlus } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AddStudentToClassModalProps {
  open: boolean;
  onClose: () => void;
  classId: string;
}

export function AddStudentToClassModal({
  open,
  onClose,
  classId,
}: AddStudentToClassModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: students } = useListStudents();
  const { data: classDetails } = useGetClasse(classId);
  const { mutateAsync: addStudentToClass } = useAddStudentToClass();

  const isStudentInClass = (studentId: string) => {
    return classDetails?.students?.some(
      (classStudent) => classStudent.enrollment === studentId
    );
  };

  const filteredStudents = students?.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.institutionalEmail
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.enrollment.includes(searchQuery)
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleAddStudent = async (studentId: string) => {
    try {
      await addStudentToClass({
        classId,
        enrollment: studentId,
      });
      onClose();
    } catch (error) {
      console.error('Error adding student to class:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[475px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            Adicionar Aluno à Turma
          </DialogTitle>
        </DialogHeader>

        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Buscar aluno por nome, email ou matrícula...'
            className='pl-8'
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <ScrollArea className='h-[300px] mt-4'>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
            </div>
          ) : (
            <div className='space-y-4'>
              {!students || students.length === 0 ? (
                <div className='text-center text-muted-foreground py-4'>
                  Não há alunos cadastrados no sistema
                </div>
              ) : (
                <div className='space-y-4'>
                  {filteredStudents?.map((student) => (
                    <div
                      key={student.enrollment}
                      className='flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors'
                    >
                      <div className='flex items-center space-x-3'>
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${student.name}`}
                          />
                          <AvatarFallback>
                            {student.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>{student.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            Matrícula: {student.enrollment}
                          </p>
                        </div>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleAddStudent(student.enrollment)}
                        disabled={isStudentInClass(student.enrollment)}
                        variant={
                          isStudentInClass(student.enrollment)
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        <UserPlus className='mr-2 h-4 w-4' />
                        {isStudentInClass(student.enrollment)
                          ? 'Adicionado'
                          : 'Adicionar'}
                      </Button>
                    </div>
                  ))}
                  {filteredStudents?.length === 0 && (
                    <div className='text-center text-muted-foreground py-4'>
                      Nenhum aluno encontrado
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
