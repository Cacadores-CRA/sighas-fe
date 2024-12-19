import { Calendar, FileText, PlusCircle, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Button className='w-full justify-start' variant='default'>
          <PlusCircle className='mr-2 h-4 w-4' />
          Nova Turma
        </Button>
        <Button className='w-full justify-start' variant='secondary'>
          <UserPlus className='mr-2 h-4 w-4' />
          Adicionar Aluno
        </Button>
        <Button className='w-full justify-start' variant='secondary'>
          <FileText className='mr-2 h-4 w-4' />
          Gerar Relatório
        </Button>
        <Button className='w-full justify-start' variant='secondary'>
          <Calendar className='mr-2 h-4 w-4' />
          Agendar Evento
        </Button>
      </CardContent>
    </Card>
  );
}
