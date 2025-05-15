import { create } from 'zustand'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firestore/firebase'

interface GiftIdeasState {
    ideas: [],
    fetchGiftIdeas: ()=> Promise<void>
    loading:boolean,
    error: string | null,
}

const useGiftIdeasStore = create<GiftIdeasState>((set) => ({
  ideas: [],
  loading: false,
  error: null,

  fetchGiftIdeas: async () => {
    set({ loading: true, error: null })
    try {
      const querySnapshot = await getDocs(collection(db, 'Ideas'))
      const ideas: Idea[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Idea[]

      set({ ideas, loading: false })
    } catch (err: any) {
      console.error('Ошибка загрузки:', err)
      set({ error: err.message, loading: false })
    }
  }
}))

export default useGiftIdeasStore
