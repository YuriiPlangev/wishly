import { create } from 'zustand'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firestore/firebase'

interface GiftPopularState {
    items: [],
    fetchPopularItems: ()=> Promise<void>,
    loading:boolean,
    error: string | null,
}


const usePopularStore = create<GiftPopularState>((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchPopularItems: async () => {
    set({ loading: true, error: null })
    try {
      const querySnapshot = await getDocs(collection(db, 'Popular'))
      const items: item[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as item[]

      set({ items, loading: false })
    } catch (err: any) {
      console.error('Ошибка загрузки:', err)
      set({ error: err.message, loading: false })
    }
  }
}))

export default usePopularStore
