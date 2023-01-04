import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/main/Loading';
import ListItem from '../../../components/admin-panel/ListItem';
import { allUsers } from '../../../apis';

const users = () => {
  const queryClient = new QueryClient

  const getUsers = useMutation({
    mutationFn: async (body) => await allUsers(body),
    onSuccess: (data) => {
      console.log('DATA IN MUTATE', data)
      data.data.push({name: 'dalam'})
      queryClient.setQueryData(['users'], data.data)
    },
    onError: (err) => console.error(err)
  })

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await (await allUsers(x)).data,
  })

  const [x, setX] = useState({page:0, limit:2 })

  useEffect(() => {
    getUsers.mutate(x)
  }, [x])
  console.log(users)

  return (
    <div>
      <button onClick={() => setX({
        page: 0,
        limit: 4
      })}>Dalam</button>
    {/* {
      !users[0] ?
      <p className='font-light'>No Product found.</p>
        :
        users.map((product:Product) => (
          <ListItem
            key={product._id}
            title={product.title}
            _id={product._id}
            isProduct={true}
          />
      ))
    } */}
 </div>
  )
}

export default users