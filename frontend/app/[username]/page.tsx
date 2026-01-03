"use client"
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive'
import { SectionCards } from '@/components/ui/section-cards'
import useAuth from '@/hooks/use-auth';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

const AdminDashboard = () => {
  // const {data: isAuthenticated, isPending} = useAuth()

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     redirect('/auth')
  //   }
  // }, [isAuthenticated]);

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive  />
      </div>
    </>
  )
}

export default AdminDashboard