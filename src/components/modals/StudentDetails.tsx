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

interface StudentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (enrollment: string) => void;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function StudentDetailsModal({
  open,
  onClose,
  onConfirm,
  user,
}: StudentDetailsModalProps) {
  const [enrollment, setEnrollment] = useState('');
  const [enrollmentError, setEnrollmentError] = useState('');

  const handleSubmit = () => {
    onConfirm(enrollment);
    setEnrollment('');
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
            <Label htmlFor='enrollment'>Matrícula</Label>
            <Input
              id='enrollment'
              value={enrollment}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setEnrollment(value);
                setEnrollmentError(
                  value.length === 10 ? '' : 'Matrícula deve ter 10 dígitos'
                );
              }}
              placeholder='Digite a matrícula'
              className={enrollmentError ? 'border-red-500' : ''}
            />
            {enrollmentError && (
              <span className='text-sm text-red-500'>{enrollmentError}</span>
            )}
          </div>

          <div className='flex justify-end space-x-2 mt-4'>
            <Button variant='outline' onClick={onClose}>
              Cancelar
            </Button>
            <Button
              disabled={!enrollment || !!enrollmentError}
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
