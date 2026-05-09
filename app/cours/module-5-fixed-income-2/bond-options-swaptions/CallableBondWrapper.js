'use client';

import dynamic from 'next/dynamic';

const CallableBondChart = dynamic(
  () => import('../../components/CallableBondChart'),
  { ssr: false }
);

export default function CallableBondWrapper() {
  return <CallableBondChart />;
}
