import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { prisma } from "../lib/prisma";
import { GetServerSideProps } from "next";


interface Users {
  users: {
    email:string;
    username: string;
    id: string;
  }[];
}

interface FormData {
  username: string;
  password: string;
  email: string;
  id: string;
}
export default function Signup({ users }: Users) {
  const [form, setForm] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    id: "",
  });
  let usernames: string[] = [];
  let emails: string[] = [];
  users.map((user) => {
    usernames.push(user.username);
    emails.push(user.email);
  });

  // Validation
  const mail_format = /\S+@\S+\.\S+/;
  const [confirmPassword, setConfirmPassword] = useState("");
  const isUserNameValid = form.username.length > 3 && form.username.length < 20;
  const isUserNameRepeated = usernames.includes(form.username);
  const isEmailRepeated = emails.includes(form.email);

  const isPasswordValid =
    form.password.length > 5 && form.password == confirmPassword;

  const isEmailValid = mail_format.test(form.email);

  const isValid = isUserNameValid && isPasswordValid && isEmailValid && !isUserNameRepeated && !isEmailRepeated;
  const router = useRouter();
  async function createUser(data: FormData) {
    try {
      fetch("http://localhost:3000/api/createUser", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      });
      // .then(() => setForm({ username: "", email: "", password: "", id: "" }))
      // .then(() => setConfirmPassword(""));
    } catch (e) {
      console.error(e);
    }
  }

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  const togglePasswordShown2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const handleSubmit = async (data: FormData) => {
    try {
      toast.promise(createUser(data), {
        loading: "Saving...",
        success: (
          <b>Signed up successfully! You will be redirect to login page</b>
        ),
        error: <b>Failed to Sign up</b>,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="flex flex-col m-10">
        <div>
          {/* {users.map((user) => {
            return <p key={user.id}>{user.username}</p>;
          })} */}
        </div>
        <h1 className="text-center m-10 font-extrabold text-[5vw] animate-in fade-in duration-700 ">
          {" "}
          Create new account now !
        </h1>

        <div className="flex flex-col w-full text-center">
          <div className="error-message flex flex-col">
            {!isUserNameValid && (
              <span className="text-red-500">
                Username must exceed 3 characters
              </span>
            )}
            {isUserNameRepeated && (
              <span className="text-red-500">Username has been used</span>
            )}
            {isEmailRepeated && (
              <span className="text-red-500">Email has been registered</span>
            )}
            {!isPasswordValid && (
              <span className="text-red-500">Password invalid</span>
            )}
            {!isEmailValid && (
              <span className="text-red-500">
                Email invalid {form.email.toString()}
              </span>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(form);
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
            <div className="flex items-center space-x-2 space-y-1">
              <label>Email: </label>
              <input
                // type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            <div className="flex items-center space-x-2 ">
              <label htmlFor="confirmPassword">Re-enter password: </label>
              <input
                id="confirmPassword"
                type={passwordShown2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="re-type password"
                className="border-2 shadow border-gray-500 p-1"
              ></input>

              <button
                className="z-40 w-5 h-5 cursor-pointer"
                type="button"
                onClick={togglePasswordShown2}
              >
                {passwordShown2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            <div className="flex flex-col text-center">
              <button
                type="submit"
                disabled={!isValid}
                className="transition fotn-bold cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-700 hover:to-orange-700 hover:scale-110 rounded-3xl m-2 p-3 mt-10 "
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email:true,
      // password: true,
    },
  });
  return {
    props: {
      users,
    },
  };
};
