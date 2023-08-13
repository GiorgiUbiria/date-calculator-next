import Link from 'next/link'

const MainLogo = () => {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <p className='text-white rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block 
dark:border-white'>
        Date Calculator
      </p>
    </Link>
  )
}

export default MainLogo