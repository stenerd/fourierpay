import React from 'react'

const Titlebar = ({children}) => {
    return (
        <>
            <div className='dashboard-header pt-24 pb-8 px-16'>
                <div className='flex justify-between '>
                    {children}
                </div>
            </div>
        </>
    )
}


export default Titlebar;