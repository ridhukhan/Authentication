import React from 'react'

const ForgotPass = () => {
  return (
    <div>

<h1>submit ur account email and we send a code</h1>
 <form onSubmit={submithandler} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col
     md:ml-auto w-full mt-10 md:mt-0">
      <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
      
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" 
          value={email}
           onChange={(e)=>setEmail(e.target.value)} 
           className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>

     
      <button   className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
       disabled={loading}>{loading?"submitting data.......":"LOGIN"}</button>
   <Link to={"/register"} className='text-amber-700'>Don't have an Account??</Link>
    </form>
  




    </div>
  )
}

export default ForgotPass