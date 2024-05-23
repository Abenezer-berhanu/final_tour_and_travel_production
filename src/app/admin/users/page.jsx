import AdminSmallUsersTable from '@/components/uiComponents/AdminSmallUsersTable'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-2xl font-bold'>All Users</h1>
      <AdminSmallUsersTable />
    </div>
  )
}

export default page