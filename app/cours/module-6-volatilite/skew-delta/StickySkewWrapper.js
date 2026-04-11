'use client';
import dynamic from 'next/dynamic';

const StickySkewChart = dynamic(
  () => import('../../components/StickySkewChart'),
  { ssr: false, loading: () => <div className="h-64 bg-gray-50 border border-gray-300 rounded-xl animate-pulse" /> }
);

export default function StickySkewWrapper() {
  return <StickySkewChart />;
}
