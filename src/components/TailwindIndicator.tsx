export function TailwindIndicator() {
  const { width, height } = useScreenSize();

  if (import.meta.env.PROD) return null;
  return (
    <div className='bg-gray-800 fixed bottom-1 right-16 z-50 flex h-6 items-center justify-center rounded-full p-3 font-mono text-sm font-semibold text-white'>
      <div className='block sm:hidden'>
        <span className='text-lg font-bold text-red-500 shadow-md'>xs</span>{' '}
        {width}x{height}
      </div>
      <div className='hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden'>
        <span className='text-lg font-bold text-orange-500 shadow-md'>sm</span>{' '}
        {width}x{height}
      </div>
      <div className='hidden md:block lg:hidden xl:hidden 2xl:hidden'>
        <span className='text-lg font-bold text-yellow-500 shadow-md'>md</span>{' '}
        {width}x{height}
      </div>
      <div className='hidden lg:block xl:hidden 2xl:hidden'>
        <span className='text-lg font-bold text-green-500 shadow-md'>lg</span>{' '}
        {width}x{height}
      </div>
      <div className='hidden xl:block 2xl:hidden'>
        <span className='text-lg font-bold text-blue-500 shadow-md'>xl:</span>{' '}
        {width}x{height}
      </div>
      <div className='hidden 2xl:block'>
        <span className='text-lg font-bold text-purple-500 shadow-md'>2xl</span>{' '}
        {width}x{height}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};
