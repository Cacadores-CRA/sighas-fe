import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TeacherDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (siape: string, education: string) => void;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function TeacherDetailsModal({
  open,
  onClose,
  onConfirm,
  user,
}: TeacherDetailsModalProps) {
  const [siape, setSiape] = useState('');
  const [education, setEducation] = useState('');
  const [siapeError, setSiapeError] = useState('');

  const handleSubmit = () => {
    onConfirm(siape, education);
    setSiape('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            {` Detalhes do ${user.name}`}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='siape'>Número SIAPE</Label>
            <Input
              id='siape'
              value={siape}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 7);
                setSiape(value);
                setSiapeError(
                  value.length === 7 ? '' : 'SIAPE deve ter 7 dígitos'
                );
              }}
              placeholder='Digite o número SIAPE'
              className={siapeError ? 'border-red-500' : ''}
            />
            {siapeError && (
              <span className='text-sm text-red-500'>{siapeError}</span>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='education'>Nível de Educação</Label>
            <Select onValueChange={setEducation} value={education}>
              <SelectTrigger>
                <SelectValue placeholder='Selecione o nível de educação' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='HIGH_SCHOOL'>Ensino Médio</SelectItem>
                <SelectItem value='TECHNICAL_CERTIFICATION'>
                  Certificação Técnica
                </SelectItem>
                <SelectItem value='ASSOCIATE'>Associado</SelectItem>
                <SelectItem value='BACHELOR_EDUCATION'>
                  Bacharelado em Educação
                </SelectItem>
                <SelectItem value='BACHELOR'>Bacharel</SelectItem>
                <SelectItem value='POSTGRADUATE'>Pós-Graduação</SelectItem>
                <SelectItem value='MASTER'>Mestrado</SelectItem>
                <SelectItem value='DOCTORATE'>Doutorado</SelectItem>
                <SelectItem value='POST_DOCTORATE'>Pós-Doutorado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-end space-x-2 mt-4'>
            <Button variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              disabled={!siape || !education || !!siapeError}
              onClick={handleSubmit}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
