import { useState } from 'react';
import { useAddTeacherToClass } from '@/services/classes/useAddTeacherToClass';
import { useGetClasse } from '@/services/classes/useGetClasse';
import { useTeachersList } from '@/services/teachers/useListTearchers';
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

interface AddTeacherToClassModalProps {
  open: boolean;
  onClose: () => void;
  classId: string;
}

export function AddTeacherToClassModal({
  open,
  onClose,
  classId,
}: AddTeacherToClassModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: teachers } = useTeachersList();
  const { mutateAsync: addTeacherToClass } = useAddTeacherToClass();
  const { data: classDetails } = useGetClasse(classId);

  const isTeacherInClass = (teacherId: string) => {
    return classDetails?.professors?.some(
      (classTeacher) => classTeacher.siape === teacherId
    );
  };

  const filteredTeachers = teachers?.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.institutionalEmail
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      teacher.siape.includes(searchQuery)
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleAddTeacher = async (teacherId: string) => {
    try {
      await addTeacherToClass({
        classId,
        siape: teacherId,
      });
      onClose();
    } catch (error) {
      console.error('Error adding teacher to class:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[475px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            Adicionar Professor à Turma
          </DialogTitle>
        </DialogHeader>

        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Buscar professor por nome, email ou SIAPE...'
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
            <>
              {!teachers || teachers.length === 0 ? (
                <div className='text-center text-muted-foreground py-4'>
                  Não há professores cadastrados no sistema
                </div>
              ) : (
                <div className='space-y-4'>
                  {filteredTeachers?.map((teacher) => (
                    <div
                      key={teacher.siape}
                      className='flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors'
                    >
                      <div className='flex items-center space-x-3'>
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${teacher.name}`}
                          />
                          <AvatarFallback>
                            {teacher.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className='font-medium'>{teacher.name}</p>
                          <p className='text-sm text-muted-foreground'>
                            SIAPE: {teacher.siape}
                          </p>
                        </div>
                      </div>
                      <Button
                        size='sm'
                        onClick={() => handleAddTeacher(teacher.siape)}
                        disabled={isTeacherInClass(teacher.siape)}
                        variant={
                          isTeacherInClass(teacher.siape)
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        <UserPlus className='mr-2 h-4 w-4' />
                        {isTeacherInClass(teacher.siape)
                          ? 'Adicionado'
                          : 'Adicionar'}
                      </Button>
                    </div>
                  ))}
                  {filteredTeachers?.length === 0 && (
                    <div className='text-center text-muted-foreground py-4'>
                      Nenhum professor encontrado
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
