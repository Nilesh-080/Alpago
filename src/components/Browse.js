import React from 'react'
import Header from './Header'
import WeatherApp from './WeatherApp/WeatherApp';
import UserList from './Userlist'

const Browse = () => {
  return (
    <div className=''>
      <img className='absolute -z-10 w-screen h-screen' src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      <Header />
      <WeatherApp />
      <div className='bg-gray-200 mt-0'>
      <UserList />
      </div>
      
    </div>
  )
}

export default Browse