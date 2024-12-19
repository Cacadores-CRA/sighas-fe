import { useState } from 'react';
import { useGetTeacher } from '@/services/teachers/useGetTeacher';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  Pencil,
  User,
  UserCog,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

export const TeacherPage = () => {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const { data: teacher, isLoading } = useGetTeacher(id || '');
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    defaultValues: {
      name: teacher?.name,
      email: teacher?.institutionalEmail,
      siape: teacher?.siape,
      education: teacher?.education,
      status: teacher?.status,
    },
  });

  const handleSave = (updatedData: any) => {
    // Implement save logic here
    toast.success('Alterações salvas');
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className='container mx-auto py-10 max-w-4xl'>
        <div className='flex items-center justify-center h-[60vh]'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className='container mx-auto py-10 max-w-4xl'>
        <Card>
          <CardContent className='flex flex-col items-center justify-center h-[60vh]'>
            <h2 className='text-2xl font-semibold mb-2'>
              Professor não encontrado
            </h2>
            <p className='text-muted-foreground mb-4'>
              Não foi possível encontrar as informações deste professor.
            </p>
            <Button onClick={() => navigate({ to: '/teachers' })}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Voltar para lista
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-10 max-w-4xl space-y-6'>
      <div className='flex items-center justify-between'>
        <Button
          variant='ghost'
          onClick={() => navigate({ to: '/teachers' })}
          className='hover:bg-secondary'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Voltar para lista
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Pencil className='h-4 w-4 mr-2' />
              Editar Professor
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Editar Professor</DialogTitle>
              <DialogDescription>
                Faça as alterações necessárias nos dados do professor. Clique em
                salvar quando terminar.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSave)}>
                <div className='grid gap-4 py-4'>
                  <FormField
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Institucional</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='siape'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIAPE</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='education'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grau de Educação</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Selecione o grau' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='GRADUATE'>Graduação</SelectItem>
                            <SelectItem value='MASTER'>Mestrado</SelectItem>
                            <SelectItem value='DOCTORATE'>Doutorado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Selecione o status' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='ACTIVE'>Ativo</SelectItem>
                            <SelectItem value='INACTIVE'>Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex justify-end space-x-2'>
                  <Button variant='outline' onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button type='submit'>Salvar alterações</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0'>
          <div>
            <CardTitle className='text-2xl font-bold'>
              Detalhes do Professor
            </CardTitle>
            <p className='text-sm text-muted-foreground'>
              Informações completas do cadastro do professor
            </p>
          </div>
        </CardHeader>
        <CardContent className='mt-6'>
          <div className='grid gap-6'>
            <div className='flex items-center space-x-4'>
              <div className='h-16 w-16 rounded-full bg-secondary flex items-center justify-center'>
                <User className='h-8 w-8 text-secondary-foreground' />
              </div>
              <div>
                <h2 className='text-2xl font-bold'>{teacher.name}</h2>
                <p className='text-muted-foreground'>
                  Professor {teacher.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </p>
              </div>
            </div>

            <Separator />

            <div className='grid grid-cols-2 gap-6'>
              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Email Institucional
                  </h3>
                </div>
                <p className='text-lg font-medium'>
                  {teacher.institutionalEmail}
                </p>
              </div>

              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <UserCog className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    SIAPE
                  </h3>
                </div>
                <p className='text-lg font-medium'>{teacher.siape}</p>
              </div>

              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <GraduationCap className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Grau de Educação
                  </h3>
                </div>
                <Badge variant='outline' className='text-base'>
                  {teacher.education === 'GRADUATE' && 'Graduação'}
                  {teacher.education === 'MASTER' && 'Mestrado'}
                  {teacher.education === 'DOCTORATE' && 'Doutorado'}
                </Badge>
              </div>

              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  <User className='h-4 w-4 text-muted-foreground' />
                  <h3 className='text-sm font-medium text-muted-foreground'>
                    Status
                  </h3>
                </div>
                <Badge
                  variant={
                    teacher.status === 'ACTIVE' ? 'default' : 'secondary'
                  }
                >
                  {teacher.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
