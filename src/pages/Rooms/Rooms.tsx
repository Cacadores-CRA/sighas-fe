'use client';

import { useState } from 'react';
import { roomsAtom } from '@/atoms/rooms/atomRooms';
import { useAtom } from 'jotai';
import {
  Clock,
  DoorClosed,
  Filter,
  MapPin,
  MoreVertical,
  Plus,
  Projector,
  Search,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface Room {
  id: string;
  number: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  currentOccupancy: number;
  type: 'classroom' | 'laboratory' | 'auditorium';
  status: 'available' | 'in-use' | 'maintenance';
  equipment: string[];
  nextClass?: {
    name: string;
    time: string;
  };
}

export function RoomsPage() {
  const [rooms, setRooms] = useAtom(roomsAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    number: '',
    name: '',
    building: '',
    floor: '',
    capacity: '',
    type: '',
    description: '',
    hasProjector: false,
    hasAirConditioning: false,
    hasComputers: false,
  });

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.building.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || room.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 text-green-500';
      case 'in-use':
        return 'bg-blue-500/10 text-blue-500';
      case 'maintenance':
        return 'bg-yellow-500/10 text-yellow-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'in-use':
        return 'Em Uso';
      case 'maintenance':
        return 'Em Manutenção';
      default:
        return status;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => {
    setNewRoom((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewRoom((prev) => ({ ...prev, type: value }));
  };

  const handleNewRoomSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newRoomData: Room = {
        id: Date.now().toString(), // temporary ID generation
        number: newRoom.number,
        name: newRoom.name,
        building: newRoom.building,
        floor: newRoom.floor,
        capacity: parseInt(newRoom.capacity),
        currentOccupancy: 0,
        type: newRoom.type as 'classroom' | 'laboratory' | 'auditorium',
        status: 'available',
        equipment: [
          ...(newRoom.hasProjector ? ['Projetor'] : []),
          ...(newRoom.hasAirConditioning ? ['Ar Condicionado'] : []),
          ...(newRoom.hasComputers ? ['Computadores'] : []),
        ],
      };

      setRooms([...rooms, newRoomData]);
      setIsNewRoomModalOpen(false);
      setNewRoom({
        number: '',
        name: '',
        building: '',
        floor: '',
        capacity: '',
        type: '',
        description: '',
        hasProjector: false,
        hasAirConditioning: false,
        hasComputers: false,
      });
    } catch (error) {
      console.error('Error adding new room:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats from rooms data
  const stats = {
    totalRooms: rooms.length,
    totalCapacity: rooms.reduce((sum, room) => sum + room.capacity, 0),
    occupancyRate: Math.round(
      (rooms.reduce((sum, room) => sum + room.currentOccupancy, 0) /
        rooms.reduce((sum, room) => sum + room.capacity, 0)) *
        100
    ),
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='grid gap-4 md:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total de Salas
            </CardTitle>
            <DoorClosed className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalRooms}</div>
            <p className='text-xs text-muted-foreground'>
              Total de salas disponíveis
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Capacidade Total
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalCapacity}</div>
            <p className='text-xs text-muted-foreground'>
              Alunos simultaneamente
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Taxa de Ocupação
            </CardTitle>
            <Projector className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.occupancyRate}%</div>
            <Progress value={stats.occupancyRate} className='mt-2' />
          </CardContent>
        </Card>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-3xl font-bold tracking-tight'>Todas as salas</h2>
          <Dialog
            open={isNewRoomModalOpen}
            onOpenChange={setIsNewRoomModalOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className='mr-2 h-4 w-4' /> Nova Sala
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle className='text-2xl font-bold'>
                  Adicionar Nova Sala
                </DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da nova sala. Clique em salvar quando
                  terminar.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewRoomSubmit}>
                <div className='grid gap-6 py-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='number'>Número</Label>
                      <Input
                        id='number'
                        name='number'
                        value={newRoom.number}
                        onChange={handleInputChange}
                        placeholder='Ex: 101'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Nome</Label>
                      <Input
                        id='name'
                        name='name'
                        value={newRoom.name}
                        onChange={handleInputChange}
                        placeholder='Ex: Sala de Aula 101'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='building'>Prédio</Label>
                      <Input
                        id='building'
                        name='building'
                        value={newRoom.building}
                        onChange={handleInputChange}
                        placeholder='Ex: Bloco A'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='floor'>Andar</Label>
                      <Input
                        id='floor'
                        name='floor'
                        value={newRoom.floor}
                        onChange={handleInputChange}
                        placeholder='Ex: 1º Andar'
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='capacity'>Capacidade</Label>
                      <Input
                        id='capacity'
                        name='capacity'
                        type='number'
                        value={newRoom.capacity}
                        onChange={handleInputChange}
                        placeholder='Ex: 40'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='type'>Tipo</Label>
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecione o tipo de sala' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='classroom'>
                            Sala de Aula
                          </SelectItem>
                          <SelectItem value='laboratory'>
                            Laboratório
                          </SelectItem>
                          <SelectItem value='auditorium'>Auditório</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='description'>Descrição</Label>
                    <Textarea
                      id='description'
                      name='description'
                      value={newRoom.description}
                      onChange={handleInputChange}
                      placeholder='Descreva as características da sala...'
                    />
                  </div>
                  <div className='space-y-4'>
                    <Label>Equipamentos</Label>
                    <div className='flex items-center justify-between'>
                      <Label
                        htmlFor='hasProjector'
                        className='flex items-center gap-2 cursor-pointer'
                      >
                        <Projector className='h-4 w-4' />
                        Projetor
                      </Label>
                      <Switch
                        id='hasProjector'
                        checked={newRoom.hasProjector}
                        onCheckedChange={() =>
                          handleSwitchChange('hasProjector')
                        }
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label
                        htmlFor='hasAirConditioning'
                        className='flex items-center gap-2 cursor-pointer'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M8 16a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 1 16V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v12Z' />
                          <path d='M8 8h8' />
                          <path d='M8 12h8' />
                          <path d='M14 16h1.5a3.5 3.5 0 0 0 3.5-3.5V4a1 1 0 0 0-1-1h-4' />
                          <path d='M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' />
                        </svg>
                        Ar Condicionado
                      </Label>
                      <Switch
                        id='hasAirConditioning'
                        checked={newRoom.hasAirConditioning}
                        onCheckedChange={() =>
                          handleSwitchChange('hasAirConditioning')
                        }
                      />
                    </div>
                    <div className='flex items-center justify-between'>
                      <Label
                        htmlFor='hasComputers'
                        className='flex items-center gap-2 cursor-pointer'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect width='20' height='14' x='2' y='3' rx='2' />
                          <line x1='8' x2='16' y1='21' y2='21' />
                          <line x1='12' x2='12' y1='17' y2='21' />
                        </svg>
                        Computadores
                      </Label>
                      <Switch
                        id='hasComputers'
                        checked={newRoom.hasComputers}
                        onCheckedChange={() =>
                          handleSwitchChange('hasComputers')
                        }
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter className='flex items-center justify-between'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsNewRoomModalOpen(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                  <Button type='submit' disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          />
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          />
                        </svg>
                        Salvando...
                      </>
                    ) : (
                      'Salvar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex w-full items-center space-x-2 sm:w-auto'>
            <div className='relative flex-1 sm:flex-initial'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Buscar salas...'
                className='pl-8 w-full sm:w-[300px]'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant='outline' size='icon'>
              <Filter className='h-4 w-4' />
            </Button>
          </div>

          <Tabs
            defaultValue='all'
            className='w-full sm:w-auto'
            onValueChange={setSelectedType}
          >
            <TabsList>
              <TabsTrigger value='all'>Todas</TabsTrigger>
              <TabsTrigger value='classroom'>Salas de Aula</TabsTrigger>
              <TabsTrigger value='laboratory'>Laboratórios</TabsTrigger>
              <TabsTrigger value='auditorium'>Auditórios</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className='group relative overflow-hidden transition-all hover:shadow-lg'
            >
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge
                    variant='secondary'
                    className={getStatusColor(room.status)}
                  >
                    {getStatusText(room.status)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <MoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Agendar</DropdownMenuItem>
                      <DropdownMenuItem>Ver horários</DropdownMenuItem>
                      <DropdownMenuItem className='text-red-600'>
                        Reportar problema
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className='text-xl'>{room.name}</CardTitle>
                <CardDescription className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4' />
                  {room.building} - {room.floor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>Ocupação</span>
                      <span className='font-medium'>
                        {room.currentOccupancy}/{room.capacity}
                      </span>
                    </div>
                    <Progress
                      value={(room.currentOccupancy / room.capacity) * 100}
                      className='h-2'
                    />
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {room.equipment.map((item, index) => (
                      <Badge
                        key={index}
                        variant='outline'
                        className='bg-background'
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>

                  {room.nextClass && (
                    <div className='flex items-center gap-2 text-sm text-muted-foreground border-t pt-4'>
                      <Clock className='h-4 w-4' />
                      <span>
                        Próxima aula: {room.nextClass.name} às{' '}
                        {room.nextClass.time}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
