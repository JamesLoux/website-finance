'use client';
import dynamic from 'next/dynamic';
const VolSurfaceChart = dynamic(() => import('../../components/VolSurfaceChart'), { ssr: false });
export default function VolSurfaceWrapper() {
  return <VolSurfaceChart />;
}
