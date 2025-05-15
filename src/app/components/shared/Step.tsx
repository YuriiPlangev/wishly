import React from 'react'

interface Props {
    step: {
        id: number;
        title: string;
        description: string;
    }
}

const Step = ({step}:Props) => {
  return (
   <article className='bg-card rounded-2xl p-8 flex flex-col items-center text-center'>
         <div className='bg-muted h-16 w-16 rounded-[50px] flex items-center justify-center'>
            <p className='font-bold text-2xl'>
            {step.id}
            </p>
         </div>
         <h2 className='text-2xl font-bold my-4'>
            {step.title}
         </h2>
         <p className='text-[16px] text-muted-foreground'>
            {step.description}
         </p>
   </article>
  )
}

export default Step