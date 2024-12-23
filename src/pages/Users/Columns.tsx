import { UserDataType } from '@/services/users/useListUsers';
import { ColumnDef } from '@tanstack/react-table';
import { format, parseISO } from 'date-fns';
import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { ActionsMenu } from './ActionsMenu';

export const columns: ColumnDef<UserDataType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'cpf',
    header: 'CPF',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('cpf')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email Institucional
          <ChevronsUpDown size='16' />
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'birthdate',
    header: 'Data de Nascimento',
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        const date = parseISO(dateString); // Converte a string para um objeto Date
        return format(date, 'dd/MMM/yyyy').toUpperCase(); // Formata a data no formato MM/DD/YYYY
      };

      return (
        <div className='capitalize'>
          {formatDate(row.getValue('birthdate'))}
        </div>
      );
    },
  },
  {
    accessorKey: 'afilliations',
    header: 'Afiliações',
    cell: ({ row }) => {
      return <Button onClick={() => console.log(row)}>Afiliações</Button>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return <ActionsMenu user={user} />;
    },
  },
];
