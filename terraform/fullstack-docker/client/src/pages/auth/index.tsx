import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

// Import components
import LoadingSpinner from "src/components/LoadingSpinner";

// Import hooks
import { useAuth } from "src/hooks/useAuth";

type SignInFormInputs = {
  username: string;
  password: string;
};
type SignUpFormInputs = {
  username: string;
  password: string;
  name: string;
};

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();
  const navigate = useNavigate();
  const { signin, isPending } = useAuth();

  const onSubmit: SubmitHandler<SignInFormInputs> = (data) => {
    if (isPending) return;
    signin(data);
  };

  return (
    <div className="w-full max-w-[480px] bg-white p-6 rounded-lg border border-blue-700">
      <header>
        <h1 className="font-bold text-4xl">Sign in</h1>
        <p>Do we know you?</p>
      </header>
      <hr className="my-3" />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500">You must enter your username</p>
          )}
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">You must enter your password</p>
          )}
        </div>
        <hr className="my-3" />
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={isPending}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-3 text-center"
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner width="w-4" height="w-4" />
                <span className="ms-3">Wait a few seconds...</span>
              </div>
            ) : (
              "Let me in"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/sign-up")}
            className="w-full bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            or sign up
          </button>
        </div>
      </form>
    </div>
  );
}

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const navigate = useNavigate();
  const { signup, isPending } = useAuth();

  const onSubmit: SubmitHandler<SignUpFormInputs> = (data) => {
    if (isPending) return;
    signup(data);
  };

  return (
    <div className="w-full max-w-[480px] bg-white p-6 rounded-lg border border-blue-700">
      <header>
        <h1 className="font-bold text-4xl">Sign up</h1>
        <p>We've known you yet</p>
      </header>
      <hr className="my-3" />
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500">You must enter your username</p>
          )}
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">You must enter your password</p>
          )}
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("name", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">You must enter your name</p>
          )}
        </div>
        <hr className="my-3" />
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={isPending}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-3 text-center"
          >
            {isPending ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner width="w-4" height="w-4" />
                <span className="ms-3">Wait a few seconds...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/sign-in")}
            className="w-full bg-slate-100 hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Back to sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AuthPage() {
  const location = useLocation();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {location.pathname === "/sign-up" ? <SignUpForm /> : <SignInForm />}
    </div>
  );
}
