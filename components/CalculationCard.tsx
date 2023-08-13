'use client';

import CalculationForm from './CalculationForm'

const CalculationCard = () => {
  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <div className='w-full md:w-[468px] lg:w-[768px] md:h-[368px] lg:h-[468px] rounded-md rounded-br-2xl p-8 relative bg-gray-blue dark:bg-sea-blue shadow-lg scale-100'>
        <CalculationForm />
      </div>
    </div>
  )
}

export default CalculationCard