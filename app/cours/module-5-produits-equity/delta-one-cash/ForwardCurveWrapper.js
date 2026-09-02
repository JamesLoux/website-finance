'use client';
import dynamic from 'next/dynamic';
const ForwardCurveChart = dynamic(() => import('../../components/ForwardCurveChart'), { ssr: false });
export default ForwardCurveChart;
