'use client';
import dynamic from 'next/dynamic';
const ConvexityChart = dynamic(() => import('../../components/ConvexityChart'), { ssr: false });
export default ConvexityChart;
