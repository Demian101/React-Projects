import React from 'react'
import { data } from '../data/Data'
import {BsPerson,BsThreeDotsVertical} from 'react-icons/bs'

const customers = () => {
  return (
    <div>
      <div className='flex justify-between p-4'>
        {/* <h2>Customers</h2> */}
        {/* <h2>welcome Back, Clint</h2> */}
      </div>
      <div className='p-4 bg-yellow-400'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-between cursor-pointer'>
            <span>Name</span>
            <span className='text-right sm:text-left'>Email</span>
            <span className='hidden md:grid'>Last Order</span>
            <span className='hidden sm:grid'>Method</span>
          </div>
          <ul>
            {data.map((order, id) => (
              <li key={id} className='bg-gray-50 hover:bg-gray-100 my-3 p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-between cursor-pointer'>
                <div className='flex items-center '>
                  <div className='bg-purple-200 p-3 rounded-lg'>
                    <BsPerson className='text-purple-800' />
                  </div>
                  <p className='ml-4'>{order.name.first+''+order.name.last }</p>
                </div>
                <p className='text-right sm:text-left text-gray-600'>{order.name.first}@gmail.com</p>
                <p className='hidden md:flex'>{order.date}</p>
                <div className='hidden sm:flex items-center justify-between'>
                  <p>{order.method}</p>
                  <BsThreeDotsVertical/>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}

export default customers