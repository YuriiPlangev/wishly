import React, { useEffect, useState } from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import ReservedCard from '../shared/ReservedCard'
import { useUserStore } from '@/app/store/useUserStore'
import { unreserveGift } from '../../../lib/firebase/unreserveGift'
import { getReservedGifts } from '../../../lib/firebase/getReservedGifts' // 💡 ты должен создать эту функцию

const UserReserved = () => {
  const { user } = useUserStore((state) => state)
  const [reservedList, setReservedList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReservedGifts = async () => {
      try {
        const gifts = await getReservedGifts(user.uid) 
        setReservedList(gifts)
      } catch (err) {
        console.error("Ошибка при получении зарезервированных подарков:", err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.uid) {
      fetchReservedGifts()
    }
  }, [user?.uid])


  const handleUnreserve = async (gift) => {
    try {
      await unreserveGift(user.uid, gift)
      setReservedList(prev => prev.filter(item => item.id !== gift.id))
    } catch (err) {
      console.error("Ошибка при снятии резерва:", err)
    }
  }

  if (loading) return <p>Loading reserved gifts...</p>

  return (
    <TabsContent value="reserve" className="space-y-6">
      <h2 className="text-xl font-semibold">Gifts You've Reserved</h2>
      {reservedList.length === 0 ? (
        <p className="text-gray-500">You haven’t reserved any gifts yet.</p>
      ) : (
        <div className="space-y-4">
          {reservedList.map((gift) => (
            <ReservedCard
              key={gift.id}
              reserved={gift}
              onUnreserve={() => handleUnreserve(gift)}
            />
          ))}
        </div>
      )}
    </TabsContent>
  )
}

export default UserReserved
