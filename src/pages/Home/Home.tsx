import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/components/DashboardStats';
import { QuickActions } from '@/components/QuickActions';
import { RecentActivities } from '@/components/RecentActivities';

export default function HomePage() {
  return (
    <div className='flex-1 space-y-4 md:py-8 '>
      <div className='flex items-center justify-between space-y-2'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-muted-foreground'>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
      <DashboardStats />
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7'>
        <RecentActivities />
        <Card className='col-span-1 md:col-span-2 lg:col-span-2'>
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
        <Card className='col-span-1 md:col-span-2 lg:col-span-3'>
          <QuickActions />
        </Card>
      </div>
    </div>
  );
}
