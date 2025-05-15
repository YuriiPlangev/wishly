"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/app/store/useUserStore';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firestore/firebase';

import Header from '@/app/components/shared/Header';
import UserFriends from '@/app/components/shared/UserFriends';
import UserInfo from '@/app/components/shared/UserInfo';
import UserWishlists from '@/app/components/shared/UserWishlists';
import Container from '../components/shared/Container';
import Footer from '@/app/components/shared/Footer';
import UserReserved from '../components/shared/UserReserved';
import { Tabs } from '@radix-ui/react-tabs';


const Profile = () => {
  const router = useRouter();
  const { user, isUserLoading } = useUserStore((state) => state);

  const [userData, setUserData] = useState({
    wishlists: [],
    reserved: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData({
          ...data,
          wishlists: Array.isArray(data.wishlists) ? data.wishlists : [],
          reserved: Array.isArray(data.reserved) ? data.reserved : [],
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchUserData();
  }, [user, userData]);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/Auth');
    }
  }, [user, isUserLoading]);

  if (isUserLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg animate-pulse">Загрузка профиля...</span>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-1'>
        <Container>
          <Header />
          <Tabs defaultValue='wishlists' className='pb-16'>
            <UserInfo user={userData} />
            <UserWishlists wishlists={userData.wishlists} loading={loading} />
            <UserFriends />
            <UserReserved reserved={userData.reserved} />
          </Tabs>
        </Container>
      </div>
      <Footer />
    </div>
  );
};


export default Profile;
