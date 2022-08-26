import Link from "next/link";

import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

interface FormData {
  username: string;
  password: string;
}

export default function Home() {
  const [form, setForm] = useState<FormData>({
    username: "",
    password: "",
  });

  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  async function checkUserAuth(data: FormData) {
    const checkAuthJSON = await fetch("http://localhost:3000/api/loginAuth", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const res = await checkAuthJSON.json();

    if (checkAuthJSON.status === 200) {
      if (res.login === "success") {
        const token = res.token; 

        if (token) {
          const json:{username?:string, status?: string} = jwt.decode(token)
          toast.success(`Welcome back ${json.username}! Redirecting to the user dashboard`);
        }

        setTimeout(() => {
          router.push("/dashboard/user");
        }, 2000);
        return;
      }
    }
    return toast.error(res .login);
  }

  const handleSubmit = async (data: FormData) => {
    try {
      checkUserAuth(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="flex flex-col m-10">
        <h1 className="text-center m-10 font-extrabold text-[5vw] animate-in fade-in duration-700 ">
          {" "}
          Login Demo
        </h1>
        <div className="flex flex-col w-full text-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(form);
            }}
            className="m-auto space-y-1"
          >
            <div className="flex items-center space-x-2 space-y-1">
              <label htmlFor="username">Username: </label>
              <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="border-2 shadow border-gray-500 p-1 "
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
          <div className="flex flex-col text-center">
            <span className="m-2">Or</span>
            <Link href="/signup" target="_blank" className="cursor-pointer">
              <a className="text-blue-500 hover:text-blue-300">
                No account? Sign up here
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
