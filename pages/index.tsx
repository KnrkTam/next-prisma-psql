import Link from "next/link";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface FormData {
  username: string;
  password: string;
  id: string;
}
export default function Home() {
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
    id: "",
  });
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <main className="flex flex-col m-10">
        <h1 className="text-center m-10 font-extrabold text-[5vw] animate-in fade-in duration-700 ">
          {" "}
          Index
        </h1>
        <div className="flex flex-col w-full text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="m-auto space-y-1"
          >
            <div className="flex items-center space-x-2 space-y-1">
              <label>Username: </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="border-2 shadow border-gray-500 p-1"
              />
            </div>
            <div className="flex items-center space-x-2 ">
              <label htmlFor="password">Password: </label>
              <input
                id="password"
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border-2 shadow border-gray-500 p-1"
              ></input>
              <button
                className="z-40 w-5 h-5 cursor-pointer"
                type="button"
                onClick={togglePasswordShown}
              >
                {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            <div className="flex flex-col text-center">
              <button
                type="submit"
                className="transition cursor-pointer bg-green-500 text-white hover:bg-green-600 hover:scale-110 rounded-3xl m-2 p-3 mt-10 "
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col text-center">
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
