import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const fetchIdeas = async () => {
  const ideasRef = collection(db, 'Ideas');
  const snapshot = await getDocs(ideasRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};