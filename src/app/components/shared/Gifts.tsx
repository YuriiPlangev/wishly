"use client"
import React, { useEffect, useState } from 'react'
import Gift from './Gift'
import Container from './Container'
import { Button } from '../ui/button'
import usePopularStore from '../../store/usePopularItemsStore'
import GiftSkeleton from '../skeleton/GiftSkeleton'

interface Props {
    giftsRef: React.RefObject<HTMLElement>
}

const Gifts = ({ giftsRef }: Props) => {
    const { items, fetchPopularItems } = usePopularStore()
    const [slice, setSlice] = useState(6)
    const [isLoading, setIsLoading] = useState(true)
    const GiftMemo = React.memo(Gift);

   useEffect(() => {
    const loadItems = async () => {
        setIsLoading(true)
        await fetchPopularItems()
        setIsLoading(false)
    }
    loadItems()
}, [fetchPopularItems])

    const displayedItems = items.slice(0, slice)
    const skeletonArray = Array.from({ length: isLoading ? slice : displayedItems.length })

    return (
        <Container>
            <section className='bg-card rounded-[24px] pt-6 pb-2 px-4' ref={giftsRef}>
                <h2 className='text-3xl font-bold mb-12'>
                    Popular Gifts
                </h2>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {isLoading
                        ? skeletonArray.map((_, index) => (
                            <GiftSkeleton key={index} />
                          ))
                        : displayedItems.map((item) => (
                            <GiftMemo key={item.id} gifts={item} />
                          ))
                    }
                </div>

                {!isLoading && displayedItems.length < items.length && (
                    <div className='text-center my-12'>
                        <Button
                            onClick={() => setSlice(slice + 6)}
                            className='bg-[#D4B497] md:hover:bg-[#C9A88D] text-black rounded-[9999px] p-5'
                        >
                            More Gift Ideas
                        </Button>
                    </div>
                )}
            </section>
        </Container>
    )
}

export default Gifts
