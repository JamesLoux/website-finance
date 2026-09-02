'use client';
import dynamic from 'next/dynamic';
const StrategyPayoffChart = dynamic(() => import('../../components/StrategyPayoffChart'), { ssr: false });
export default StrategyPayoffChart;
