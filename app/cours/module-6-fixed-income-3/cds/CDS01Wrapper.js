'use client'
import dynamic from 'next/dynamic'
const CDS01Chart = dynamic(() => import('../../components/CDS01Chart'), { ssr: false })
export default function CDS01Wrapper() {
  return <CDS01Chart />
}
