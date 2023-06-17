import React from 'react'

const AdminLogin = () => {
  return (
    <>
      <div className='min-h-screen flex justify-center items-center'>
        <div className='py-4 md:w-[30%] w-4/5 mx-auto'>
          <div className='mt-6'>
            <img src='/favicon.svg' className='w-[100%] h-20' />
          </div>
          <div className='py-4'>
            <p className='md:text-2xl text-xl font-bold text-center'>ADMIN LOGIN</p>
            <div className=''>
              <form>
                <div className=''>
                  <div className='py-3'>
                    <label>Email</label>
                    <input className='py-2 px-4 w-full outline-none c-text-input' placeholder='Email Address' type='email' />
                  </div>
                  <div className='py-3'>
                    <label>Password</label>
                    <input className='py-2 px-4 w-full outline-none c-text-input' placeholder='Enter Password' type='password' />
                  </div>
                  <div>
                    <button className='c-primary-button w-full'>
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminLogin