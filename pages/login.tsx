import Password from '../components/Password';
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <main className='flex flex-col m-10'>
        <h1 className="text-center m-10 font-extrabold text-[5vw] animate-in fade-in duration-700 "> Login Demo</h1>
        <div className='flex flex-col w-full text-center'>
          <form className='m-auto space-y-1'>
            <div className='flex items-center space-x-2 space-y-1'>
              <label htmlFor="username">Username: </label>
              <input name="username" placeholder="Username" className='border-2 shadow border-gray-500 p-1 '/>
            </div>
            <div className='flex items-center space-x-2 '>
              <Password />
            </div>
          
          </form>
        </div>
        
        <div className='flex flex-col text-center'>
          <button type="submit" className="transition cursor-pointer bg-green-500 text-white hover:bg-green-600 hover:scale-110 rounded-3xl m-2 p-3 mt-10 ">
                Submit
          </button>
          <span className='m-2'>Or</span>
          <Link href="/signup" target="_blank" className="cursor-pointer">
             <a className="text-blue-500 hover:text-blue-300">No account? Sign up here</a>

          </Link>
        </div>
      
      </main>

    </>
  )
}