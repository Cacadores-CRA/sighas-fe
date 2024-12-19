import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { AxiosErrorData } from '@/types/ErrorTypes';
import { UserDataType } from '@/types/Users/UserDataType';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { customInstance } from '../../../axiosInstance';

export function ActionsMenu({ user }: { user: UserDataType }) {
  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationFn: (id: string) => {
      return customInstance({
        url: `/v1/users/${id}`,
        method: 'DELETE',
        // params,
      });
    },
    onSuccess: () => {
      // ✅ refetch the users list
      toast.success('Usuário deletado com sucesso!.');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: (error: AxiosError<AxiosErrorData>) => {
      console.log('error:');
      console.log(error);

      error.response?.data.errors?.map((error) => {
        toast.error(error.defaultMessage);
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal size='16' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Button
            variant={'secondary'}
            className='w-full'
            onClick={() => {
              deleteUser.mutate(user.id);
            }}
          >
            <Trash className='text-red-500' />
            Excluir
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
