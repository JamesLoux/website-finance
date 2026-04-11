'use client'
import dynamic from 'next/dynamic'
const SABRCalibrationChart = dynamic(
  () => import('../../components/SABRCalibrationChart'),
  { ssr: false }
)
export default SABRCalibrationChart
