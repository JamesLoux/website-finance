'use client';
import dynamic from 'next/dynamic';

const VannaPutChart = dynamic(
  () => import('../../components/VannaPutChart'),
  { ssr: false, loading: () => <div className="h-96 bg-gray-50 border border-gray-300 rounded-xl animate-pulse" /> }
);

export default function VannaWrapper() {
  return <VannaPutChart />;
}
