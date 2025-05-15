import React from 'react'
import Step from './Step'
import Container from './Container'

const How = () => {

    interface Step {
        id: number;
        title: string;
        description: string;
    }

    const steps : Step[] = [
        { id: 1, title: 'Create Your Wishlist', description: 'Add items you`d love to receive for any occasion' },
        { id: 2, title: 'Share With Friends', description: 'Send your wishlist to friends and family' },
        { id: 3, title: 'Receive Perfect Gifts', description: 'No more unwanted gifts or duplicates' },
    ]

  return (
    <Container>
    <section className='pb-12'>
        <h2 className='text-center text-3xl font-bold my-12'>
            How It Works
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {steps.map((step) => (
                <Step key={step.id} step={step} />
            ))}
        </div>
    </section>
    </Container>
  )
}

export default How