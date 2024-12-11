import { ArrowDown, ArrowUp } from 'lucide-react';

export function StatisticInfo({
  title,
  amount,
  subtitle,
  status,
  icon,
}: {
  title: string;
  amount: number;
  subtitle?: string;
  status: 'increase' | 'decrease';
  icon: React.ReactNode;
}) {
  return (
    <div className='flex gap-4'>
      <div className='size-20 bg-background rounded-full flex items-center justify-center'>
        {icon}
      </div>
      <div className='flex flex-col'>
        <p className='text-gray-600'>{title}</p>
        <h1 className='font-bold text-3xl text-gray-600'>{amount}</h1>
        {subtitle && (
          <div className='flex gap-2'>
            {status == 'increase' ? (
              <>
                <ArrowUp className='text-emerald-600' />
                <p className='font-bold text-gray-600'>{subtitle}</p>
              </>
            ) : (
              <>
                <ArrowDown className='text-red-700' />
                <p className='font-bold text-gray-600'>{subtitle}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
