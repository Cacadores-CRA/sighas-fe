'use client';

import { AffiliationResponse } from '@/@types/affiliations';
import { useGetAffiliation } from '@/services/affilitiaons/useGetAffiliation';
import { GraduationCap, School, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Affiliation {
  id: string;
  type: 'professor' | 'student';
  department: string;
  course?: string;
  startDate: string;
  status: 'active' | 'inactive';
}

interface AffiliationsModalProps {
  userId: string;
  userName: string;
  affiliations: Affiliation[];
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export default function AffiliationsModal({
  userId,
  userName,
  onOpenChange,
  open,
}: AffiliationsModalProps) {
  console.log({ userId });
  const { data: affiliations } = useGetAffiliation(userId);

  console.log({ affiliations });

  const professors = affiliations?.filter(
    (a) => a.affiliationType === 'Professor'
  );
  const students = affiliations?.filter((a) => a.affiliationType === 'Student');

  //   console.log({ userId, userName, affiliations });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button variant='default'>Afiliações</Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl flex items-center gap-2'>
            <Users className='h-6 w-6' />
            Afiliações do Usuário
          </DialogTitle>
          <DialogDescription>
            Visualize todas as afiliações de {userName}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue='all' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='all'>Todas</TabsTrigger>
            <TabsTrigger value='professor'>Professor</TabsTrigger>
            <TabsTrigger value='student'>Aluno</TabsTrigger>
          </TabsList>

          <ScrollArea className='h-[400px] mt-4 rounded-md border p-4'>
            <TabsContent value='all' className='space-y-4'>
              {affiliations?.length ? (
                affiliations.map((affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                  />
                ))
              ) : (
                <p className='text-center text-muted-foreground'>
                  Nenhuma afiliação encontrada
                </p>
              )}
            </TabsContent>

            <TabsContent value='professor' className='space-y-4'>
              {professors?.length ? (
                professors.map((affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                  />
                ))
              ) : (
                <p className='text-center text-muted-foreground'>
                  Nenhuma afiliação como professor
                </p>
              )}
            </TabsContent>

            <TabsContent value='student' className='space-y-4'>
              {students?.length ? (
                students.map((affiliation) => (
                  <AffiliationCard
                    key={affiliation.id}
                    affiliation={affiliation}
                  />
                ))
              ) : (
                <p className='text-center text-muted-foreground'>
                  Nenhuma afiliação como aluno
                </p>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function AffiliationCard({
  affiliation,
}: {
  affiliation: AffiliationResponse;
}) {
  return (
    <div className='rounded-lg border p-4 hover:bg-muted/50 transition-colors'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          {affiliation.affiliationType === 'Professor' ? (
            <School className='h-5 w-5 text-blue-600' />
          ) : (
            <GraduationCap className='h-5 w-5 text-green-600' />
          )}
          <div>
            <h3 className='font-medium'>
              {affiliation.affiliationType} {/* {affiliation.department} */}
            </h3>
            {/* {affiliation.course && (
              <p className='text-sm text-muted-foreground'>
                Curso: {affiliation.course}
              </p>
            )} */}
            <p className='text-sm text-muted-foreground'>
              Início: {new Date(affiliation.startingDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            affiliation.status === 'ACTIVE'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {affiliation.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
        </span>
      </div>
    </div>
  );
}
