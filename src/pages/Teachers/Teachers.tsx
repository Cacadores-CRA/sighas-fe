// import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from './DataTable';
import { columns } from './columns';
import { data } from './mockData';

export const TeachersPage = () => {
  return (
    <div className='flex flex-col flex-1 gap-4 items-center justify-center'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Todos os professores</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
