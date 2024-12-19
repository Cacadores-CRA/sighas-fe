import { useGetTeacher } from '@/services/teachers/useGetTeacher';
import { useParams } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TeacherPage = () => {
  const { id } = useParams({ strict: false });
  const { data: teacher } = useGetTeacher(id || '');

  return (
    <div className='container mx-auto py-10'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Detalhes do Professor</CardTitle>
          {/* <EditTeacherModal teacher={} /> */}
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='font-medium text-sm text-muted-foreground'>
                Nome
              </h3>
              <p className='text-lg'>{teacher?.name}</p>
            </div>
            <div>
              <h3 className='font-medium text-sm text-muted-foreground'>
                Email Institucional
              </h3>
              <p className='text-lg'>{teacher?.institutionalEmail}</p>
            </div>
            <div>
              <h3 className='font-medium text-sm text-muted-foreground'>
                SIAPE
              </h3>
              <p className='text-lg'>{teacher?.siape}</p>
            </div>
            <div>
              <h3 className='font-medium text-sm text-muted-foreground'>
                Grau de Educação
              </h3>
              <p className='text-lg'>{teacher?.education}</p>
            </div>
            <div>
              <h3 className='font-medium text-sm text-muted-foreground'>
                Status
              </h3>
              <div
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  teacher?.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {teacher?.status}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
