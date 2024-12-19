import { atomWithStorage } from 'jotai/utils';

export interface Room {
  id: string;
  number: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  currentOccupancy: number;
  type: 'classroom' | 'laboratory' | 'auditorium';
  status: 'in-use' | 'available' | 'maintenance';
  equipment: string[];
  nextClass?: {
    name: string;
    time: string;
  };
}

const rooms: Room[] = [
  {
    id: '1',
    number: '101',
    name: 'Sala de Aula 101',
    building: 'Bloco A',
    floor: '1º Andar',
    capacity: 40,
    currentOccupancy: 35,
    type: 'classroom',
    status: 'in-use',
    equipment: ['Projetor', 'Ar Condicionado', 'Quadro Digital'],
    nextClass: {
      name: 'Matemática Discreta',
      time: '14:00',
    },
  },
  {
    id: '2',
    number: 'LAB02',
    name: 'Laboratório de Informática 02',
    building: 'Bloco B',
    floor: 'Térreo',
    capacity: 30,
    currentOccupancy: 0,
    type: 'laboratory',
    status: 'available',
    equipment: ['Computadores', 'Projetor', 'Ar Condicionado'],
  },
  {
    id: '3',
    number: 'AUD01',
    name: 'Auditório Principal',
    building: 'Bloco Central',
    floor: 'Térreo',
    capacity: 200,
    currentOccupancy: 0,
    type: 'auditorium',
    status: 'maintenance',
    equipment: ['Sistema de Som', 'Projetor', 'Microfones'],
  },
];

export const roomsAtom = atomWithStorage<Room[]>('rooms', rooms);
