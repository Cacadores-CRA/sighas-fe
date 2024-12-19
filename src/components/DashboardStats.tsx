import { BookOpen, GraduationCap, School, Users } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  {
    name: 'Jan',
    total: 1200,
  },
  {
    name: 'Fev',
    total: 1300,
  },
  {
    name: 'Mar',
    total: 1400,
  },
  {
    name: 'Abr',
    total: 1350,
  },
  {
    name: 'Mai',
    total: 1500,
  },
  {
    name: 'Jun',
    total: 1450,
  },
];

export function DashboardStats() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total de Alunos</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>1,234</div>
          <p className='text-xs text-muted-foreground'>+20 novos esta semana</p>
          <div className='h-[80px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data}>
                <Bar dataKey='total' fill='#22c55e' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Professores Ativos
          </CardTitle>
          <GraduationCap className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>145</div>
          <p className='text-xs text-muted-foreground'>+3 este mês</p>
          <div className='h-[80px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data}>
                <Bar dataKey='total' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Disciplinas</CardTitle>
          <BookOpen className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>48</div>
          <p className='text-xs text-muted-foreground'>Ativas neste semestre</p>
          <div className='h-[80px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data}>
                <Bar dataKey='total' fill='#f59e0b' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Salas em Uso</CardTitle>
          <School className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>32/35</div>
          <p className='text-xs text-muted-foreground'>91% de ocupação</p>
          <div className='h-[80px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={data}>
                <Bar dataKey='total' fill='#ec4899' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
