// import { Link } from '@tanstack/react-router';

import { Monitor, UserCheck, UsersRound } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatisticInfo } from '@/components/StatisticInfo';

import { columns } from './Columns';
import { DataTable } from './DataTable';
import { data } from './mockData';

export const TeachersPage = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-16 h-full'>
        <h1 className='text-2xl font-medium'>Olá, Evano 👋</h1>
        <Card className='w-full'>
          <CardContent className='p-0'>
            <div className='flex p-8 items-center justify-between'>
              <StatisticInfo
                title='Total Professores'
                amount={5423}
                subtitle='16% Este mês'
                status='increase'
                icon={<UsersRound className='text-emerald-600 size-11' />}
              />
              <StatisticInfo
                title='Professores Ativos'
                amount={1893}
                subtitle='1% Este mês'
                status='decrease'
                icon={<UserCheck className='text-emerald-600 size-11' />}
              />
              <StatisticInfo
                title='Professores Inativos'
                amount={189}
                status='increase'
                icon={<Monitor className='text-emerald-600 size-11' />}
              />
            </div>
          </CardContent>
        </Card>
        <Card className='w-full rounded-[40px] px-9 py-7'>
          <CardHeader>
            <CardTitle className='text-2xl leading-3 font-semibold'>
              Todos os professores
            </CardTitle>
            {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent className='p-0 px-7'>
            <DataTable columns={columns} data={data} />
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
