import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivities() {
  const activities = [
    {
      user: 'MS',
      name: 'Maria Silva',
      time: '09:00',
      description: 'Nova matrícula no 3º Ano',
      type: 'success',
    },
    {
      user: 'JR',
      name: 'João Rodrigues',
      time: '08:45',
      description: 'Chamada finalizada: Matemática - Turma A',
      type: 'info',
    },
    {
      user: 'AS',
      name: 'Ana Santos',
      time: '08:30',
      description: 'Boletim gerado para João Santos',
      type: 'info',
    },
    {
      user: 'PL',
      name: 'Pedro Lima',
      time: '08:15',
      description: 'Alteração de horário: Física - Lab 3',
      type: 'warning',
    },
  ];

  return (
    <Card className='col-span-1 lg:col-span-2'>
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {activities.map((activity, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage
                  src={`/avatars/${activity.user.toLowerCase()}.png`}
                  alt={activity.name}
                />
                <AvatarFallback>{activity.user}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {activity.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {activity.description}
                </p>
              </div>
              <div className='ml-auto font-medium'>{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
