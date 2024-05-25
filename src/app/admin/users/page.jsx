import AdminAllUsersTable from '@/components/uiComponents/AdminAllUsersTable'
import { getAllUsers } from '@/lib/actions/users';
import React from 'react'

async function page() {
  const usersRes = await getAllUsers();
  const users = usersRes ? JSON.parse(usersRes) : [];
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-2xl font-bold'>All Users</h1>
      <AdminAllUsersTable users={users} />
    </div>
  )
}

export default page