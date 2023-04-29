import React, {useState, useEffect} from 'react'
import useAuthContext from '../../context/Authentication'
import FadeInOut from '../../animations/Fade';

const UsersPage = () => {
 
  const {users, getUsers, deleteUser, del_result, closeDelResultFast, onChange, setFormvalues, formValues, errors, showModal, setModal, createUser, result, closeResultFast, loading } = useAuthContext();

  useEffect(() => {
    getUsers();
  }, []);

    const submitDelete = () => {
        deleteUser(delID);
        setDeleteModal(false);
    }

    const [deleteModal, setDeleteModal] = useState(false);
    const [delID, setDelID] = useState('');
    const [delName, setDelName] = useState('');

    const handleDelete = (id, name) => {
        setDelID(id);
        setDelName(name);
        setDeleteModal(true);
    }

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
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>

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
                                <td className="w-1/3 text-left py-3 px-4">
                                    <button onClick={() => handleDelete(user.id, user.name)} className='px-4 py-2 bg-red-600 text-sm font-medium hover:bg-red-500 duration-100 transition-all ease-out text-white rounded-md'>Delete</button>
                                </td>

                            </tr>
                        )
                    })
                }
               
              
                </tbody>
                </table>
            </div>
        </div>
        {
            result && 
            <FadeInOut show={result} duration={150}>
                <div className='w-1/6 absolute bottom-2 right-6'>
                    <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <div className="ml-3 text-sm font-medium">
                            <p>Successfully Created!</p>
                        </div>
                        <button onClick={closeResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </FadeInOut>
        }
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
                            
                            <button type="submit" className="flex items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            {
                                loading ? <div role="status">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : <span className="inline-block " id='sign-in'>Create</span>
                            }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
        </FadeInOut>
        }

        {
            deleteModal && 
            <FadeInOut show={deleteModal} duration={200}>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 bg-zinc-800/60 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg md:h-auto">

                <div className="relative bg-white rounded-lg shadow-lg">
                    <button onClick={() => setDeleteModal(false)}  type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 ">Delete User: {delName}?</h3>
                        <div className='flex gap-2'>
                        <button type="button" onClick={() => submitDelete()} className="flex items-center justify-center w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {
                                loading ? <div role="status">
                                <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : <span className="inline-block " id='sign-in'>Delete</span>
                            }
                            
                            
                        </button>
                        <button onClick={() => setDeleteModal(false)} className="w-full text-gray-800 bg-gray-300 hover:bg-gray-400 transition-all duration-100 ease-out border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Cancel
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        </FadeInOut>
        }

        {
            del_result && 
            <FadeInOut show={del_result} duration={150}>
                <div className='w-1/6 absolute bottom-2 right-6'>
                    <div id="alert-border-3" className="flex p-4 mb-4 border-t-4  text-white bg-gray-800 border-green-800 rounded-md" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <div className="ml-3 text-sm font-medium">
                            <p>User Deleted!</p>
                        </div>
                        <button onClick={closeDelResultFast} type="button" className="ml-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 inline-flex h-8 w-8 bg-gray-800 text-green-400 hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
                        <span className="sr-only">Dismiss</span>
                        <svg aria-hidden="true" className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            </FadeInOut>
        }

       

    </div>
  )
}

export default UsersPage