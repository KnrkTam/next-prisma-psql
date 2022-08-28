import Link from "next/link";

export default function Home() {
 
  return (
    <>
      <main className="flex flex-col m-10">
        <h1 className="text-center m-10 font-extrabold text-[5vw] animate-in fade-in duration-700 ">
          {" "}
          Index
        </h1>
        <div className="flex flex-col w-full text-center"></div>

        <div className="flex flex-col text-center">
          <Link href="/login" target="_blank" className="cursor-pointer">
            <a className="text-blue-500 hover:text-blue-300">
              Login
            </a>
          </Link>
          <span className="m-2">Or</span>
          <Link href="/signup" target="_blank" className="cursor-pointer">
            <a className="text-blue-500 hover:text-blue-300">
              No account? Sign up here
            </a>
          </Link>
        </div>
      </main>
    </>
  );
}
