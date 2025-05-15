"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "../../components/ui/button"
import Gift from "../../components/shared/Gift"
import { useParams } from 'next/navigation'
import useGiftIdeasStore from '../../store/useGiftIdeasStore'
import { useEffect } from "react"
import Header from "@/app/components/shared/Header"

export default function CategoryPage() {
  const { id } = useParams()
  const { ideas, fetchGiftIdeas } = useGiftIdeasStore()

  useEffect(() => {
    if (ideas.length === 0) {
      fetchGiftIdeas()
    }
  }, [ideas, fetchGiftIdeas])

  const idea = ideas.find(i => i.id === id)

  const gifts = idea.gifts || [] 

  return (
    <div className="min-h-screen pb-16">
      <Header />

      <div className="container mx-auto mt-12 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gifts {idea.title}</h1>
              <p className="text-gray-600">Find the perfect gift for every occasion</p>
            </div>
          </div>

          <div className="relative  w-full h-48 md:h-64 rounded-2xl overflow-hidden mb-8">
            <Image src={idea.photoUrl} alt={idea.title} fill className="object-contain" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <p className="text-muted-foreground">Showing {gifts.length} gift ideas</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 p-4 rounded-3xl bg-card">
            {gifts.map((gift: any) => (
              <Gift key={gift.id} gifts={gift} />
            ))}
          </div>

          <div className="text-center">
            {gifts.length > 18 && (
              <Button variant="outline" className="rounded-xl border-[#D4B499] px-8 cursor-pointer">
                Load More
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
