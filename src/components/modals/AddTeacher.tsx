import { useState } from 'react';
import { useCreateTeacher } from '@/services/teachers/useCreateTeacher';
import { useTeachersList } from '@/services/teachers/useListTearchers';
import { UserDataType, useUsersList } from '@/services/users/useListUsers';
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

import { TeacherDetailsModal } from './TeacherDetails';

interface AddTeacherModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddTeacherModal({ open, onClose }: AddTeacherModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const { data: users } = useUsersList();
  const { data: teachers } = useTeachersList();
  const { mutateAsync } = useCreateTeacher();

  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);

  const availableUsers = users?.filter(
    (user) => !teachers?.some((teacher) => teacher.userId === user.id)
  );

  const filteredUsers = availableUsers?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.cpf.includes(searchQuery)
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleUserSelect = (user: UserDataType) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const assignTeacherRole = async (siape: string, education: string) => {
    if (!selectedUser) return;

    await mutateAsync({
      userId: selectedUser.id,
      startingDate: new Date().toISOString(),
      endingDate: new Date().toISOString(),
      status: 'CREATED',
      siape,
      education: education,
      institutionalEmail: selectedUser.email,
    });

    setShowDetails(false);
    setSelectedUser(null);
    onClose();
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[475px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            Adicionar Professor
          </DialogTitle>
        </DialogHeader>

        <div className='relative'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Buscar usuário por nome, email ou SIAPE...'
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
              {filteredUsers?.map((user) => (
                <div
                  key={user.id}
                  className='flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors'
                >
                  <div className='flex items-center space-x-3'>
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                      />
                      <AvatarFallback>
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{user.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Button size='sm' onClick={() => handleUserSelect(user)}>
                    <UserPlus className='mr-2 h-4 w-4' />
                    Adicionar
                  </Button>
                </div>
              ))}
              {filteredUsers?.length === 0 && (
                <div className='text-center text-muted-foreground py-4'>
                  Nenhum usuário encontrado
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {selectedUser && (
          <TeacherDetailsModal
            open={showDetails}
            onClose={handleDetailsClose}
            onConfirm={assignTeacherRole}
            user={selectedUser}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
