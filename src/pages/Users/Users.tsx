// import { Link } from '@tanstack/react-router';
import { useUsersList } from '@/api/Users/useUsersList';
import { Monitor, UserCheck, UsersRound } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatisticInfo } from '@/components/StatisticInfo';

import { columns } from './Columns';
import { DataTable } from './DataTable';
import { UserRegisterModalForm } from './UserRegisterModalForm';

export const UsersPage = () => {
  const { data: usersData } = useUsersList([]);

  // const sortedUsersData = usersData?.sort((a, b) => {
  //   if (a.id < b.id) return -1;
  //   if (a.id > b.id) return 1;
  //   return 0;
  // });

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-16 h-full'>
        <h1 className='text-2xl font-medium'>Olá, Evano 👋</h1>
        <Card className='w-full'>
          <CardContent className='p-0'>
            <div className='flex p-8 items-center justify-between'>
              <StatisticInfo
                title='Total Usuários'
                amount={usersData?.length ?? 0}
                subtitle='16% Este mês'
                status='increase'
                icon={<UsersRound className='text-emerald-600 size-11' />}
              />
              <StatisticInfo
                title='Usuários Ativos'
                amount={(usersData && usersData?.length / 2) ?? 0}
                subtitle='1% Este mês'
                status='decrease'
                icon={<UserCheck className='text-emerald-600 size-11' />}
              />
              <StatisticInfo
                title='Usuários Inativos'
                amount={189}
                status='increase'
                icon={<Monitor className='text-emerald-600 size-11' />}
              />
            </div>
          </CardContent>
        </Card>
        <Card className='w-full min-h-[700px] rounded-[40px] px-9 py-7'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='text-2xl leading-3 font-semibold'>
              Todos os Usuários
            </CardTitle>
            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
            <UserRegisterModalForm />
          </CardHeader>
          <CardContent className='p-0 px-7'>
            <DataTable columns={columns} data={usersData ?? []} />
          </CardContent>
          {/* <CardFooter className='flex justify-between'>
            <Button variant='outline'>Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};
