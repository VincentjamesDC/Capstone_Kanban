import React, { useEffect, useState } from 'react'

export const Pagination = ({ postsPerPage, totalPosts, paginate, currentP, indexOfFirstPost, indexOfLastPost }) => {
    const [showPrev, setShowPrev] = useState(true);
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
       <div className='px-24'>
           <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
                  <div class="text-sm text-gray-500 ">
                      Page <span class="font-medium text-gray-700 ">{indexOfFirstPost + 1} to {(indexOfLastPost > totalPosts) ? (indexOfLastPost - (indexOfLastPost - totalPosts)) : indexOfLastPost} of {totalPosts}</span> 
                  </div>

                  <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
                        {
                        currentP > 1 &&   
                            <a onClick={() =>paginate(currentP - 1)} class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-gray-700 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>

                                <span>
                                    previous
                                </span>
                            </a>
                        }
                      
                     

                      {currentP < pageNumbers.length &&
                            <a onClick={() =>paginate(currentP + 1)}  lass="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-white capitalize transition-colors duration-200 bg-gray-700 border rounded-md sm:w-auto gap-x-2 hover:bg-gray-800 ">
                                <span>
                                    Next
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        }

                     
                  </div>
              </div>
       </div>

    
   
  )
}
