"use client"
import { Fragment, useRef } from 'react';
import Gifts from '../shared/Gifts';
import Footer from '../shared/Footer';
import Header from '../shared/Header';
import Hero from '../shared/Hero';
import How from '../shared/How';
import Ideas from '../shared/Ideas';

export default function HomeClient() {
  const giftsRef = useRef<HTMLElement | null>(null);

  const scrollToGifts = () => {
    if (giftsRef.current) {
      giftsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Fragment>
      <Header />
      <Hero scrollToGifts={scrollToGifts} />
      <Ideas />
      <Gifts giftsRef={giftsRef} />
      <How />
      <Footer />
    </Fragment>
  );
}
