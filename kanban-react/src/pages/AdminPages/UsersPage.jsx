import React, {useState, useEffect} from 'react'
import useAuthContext from '../../context/Authentication'
import FadeInOut from '../../animations/Fade';

const UsersPage = () => {
 
  const {users, getUsers, onChange, setFormvalues, formValues, errors, showModal, setModal, createUser } = useAuthContext();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
        <div className='md:px-32'>
            <button onClick={() => setModal(true)} className='px-4 py-2 bg-blue-600 text-sm font-medium hover:bg-blue-500 duration-100 transition-all ease-out text-white rounded-md mt-10'>New User</button>
        </div>
        <div className="md:px-32 py-8 w-full">
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                    <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Deparment</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                {
                    users?.filter((user)=>user.role=="User").map(user => {
                        return(
                            <tr key={user.id}>
                                <td className="w-1/3 text-left py-3 px-4">{user.name}</td>
                                <td className="w-1/3 text-left py-3 px-4">{user.email}</td>
                                <td className="w-1/3 text-left py-3 px-4">{user.department}</td>
                                <td className="w-1/3 text-left py-3 px-4">{user.role}</td>
                            </tr>
                        )
                    })
                }
               
              
                </tbody>
                </table>
            </div>
        </div>
        {
            showModal && 
            <FadeInOut show={showModal} duration={200}>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 bg-zinc-800/60 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg md:h-auto">

                <div className="relative bg-white rounded-lg shadow-lg">
                    <button onClick={() => setModal(false)}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 ">Create New User</h3>
                        <form className="space-y-6" onSubmit={createUser}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                                <input type="text" name="name" id="name" value={formValues["name"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
                                {errors.name && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.name[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input type="email" name="email" id="email" value={formValues["email"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@company.com" required/>
                                {errors.email && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span></div>)}

                            </div>
                           
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value={formValues["password"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required/>
                                {errors.password_confirmation && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.password_confirmation[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                                <input type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" value={formValues["password_confirmation"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required/>
                                {errors.password && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span></div>)}

                            </div>
                            <div>
                                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 ">Department</label>
                                <select id="department" name='department' value={formValues["department"]} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option defaultValue>Deparment</option>
                                    <option value="Cutting">Cutting</option>
                                    <option value="Assembly-Prep">Assembly Prep</option>
                                    <option value="Assembly-1">Assembly 1</option>
                                    <option value="Assembly-2">Assembly 2</option>
                                    <option value="Quality-Control">Quality Control</option>
                                    <option value="Finishing-1">Finishing-1</option>
                                    <option value="Finishing-2">Finishing-2</option>
                                </select>
                                {errors.department && (<div className='flex'><span className="text-red-400 text-sm m-2 p-2">{errors.department[0]}</span></div>)}

                            </div>
                            
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        </FadeInOut>
        }

       

    </div>
  )
}

export default UsersPage