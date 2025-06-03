"use client"
import React, { useEffect, useState } from 'react'
import Idea from './Idea'
import Container from './Container'
import useGiftIdeasStore from '@/app/store/useGiftIdeasStore'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Autoplay from "embla-carousel-autoplay"
import IdeaSkeleton from '../skeleton/IdeaSkeleton'

const Ideas = () => {

    const { ideas, fetchGiftIdeas } = useGiftIdeasStore()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadIdeas = async () => {
            await fetchGiftIdeas()
            setIsLoading(false)
        }
        loadIdeas()
    }, [fetchGiftIdeas])

    const skeletonArray = Array.from({ length: 6 })

    return (
        <Container>
            <section className='py-16'>
                <h2 className='text-center text-2xl font-bold mb-12'>
                    Find you perfect gift
                </h2>

                {isLoading ? (
                    <div className='grid grid-cols-2 gap-12 justify-items-center sm:grid-cols-3 md:grid-cols-6'>
                        {skeletonArray.map((_, index) => (
                            <IdeaSkeleton key={index} />
                        ))}
                    </div>
                ) : ideas.length > 6 ? (
                    <Carousel
                        opts={{ loop: true }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                                stopOnMouseEnter: true,
                                stopOnInteraction: false,
                                stopOnFocusIn: true,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {ideas.map((idea) => (
                                <CarouselItem className="basis-1/3 sm:basis-1/4 md:basis-1/7 justify-items-center" key={idea.id}>
                                    <Idea idea={idea} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                ) : (
                    <div className='grid grid-cols-2 gap-12 justify-items-center sm:grid-cols-3 md:grid-cols-6'>
                        {ideas.map((idea) => (
                            <Idea key={idea.id} idea={idea} />
                        ))}
                    </div>
                )}
            </section>
        </Container>
    )
}

export default Ideas
