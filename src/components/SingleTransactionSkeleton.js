import React from 'react'

const SingleTransactionSkeleton = () => {
    return (
        <>
            <div className='space-y-3 relative c-single-trans-ref'>
                <div className='c-center-absolute z-10'>
                    <div className='flex justify-center'>
                        <img src="/images/nolinks.svg" alt="alt-img" />
                    </div>
                    <div className='py-2'>
                       <p className='text-center text-gray-500'>Transaction reference does not exist! <br /> Enter reference and search.</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default SingleTransactionSkeleton;