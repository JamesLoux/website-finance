'use client';

import dynamic from 'next/dynamic';

const DigitalReplicationChart = dynamic(
  () => import('../../components/DigitalReplicationChart'),
  { ssr: false }
);

export default function DigitalReplicationWrapper() {
  return <DigitalReplicationChart />;
}
