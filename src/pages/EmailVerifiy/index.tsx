import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";

function Login() {
  return (
    <>
      <div className="flex justify-center items-center -m-3 sm:-mx-8 p-3 sm:px-8 h-screen lg:overflow-hidden dark:bg-darkmode-800 bg-primary xl:bg-secondary">
        <DarkModeSwitcher />
        <MainColorSwitcher />
        <div className="w-full sm:px-10">
          {/* BEGIN: Login Form */}
          <div className="flex h-screen justify-center py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div className="w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md dark:bg-darkmode-700 bg-white sm:px-8 xl:p-10 sm:w-3/4 lg:w-2/4 xl:w-auto">
              <div className="flex justify-center items-start pt-2 pb-5 -intro-x">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="w-20"
                  src={logoUrl}
                />
              </div>
              <h2 className="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                Email verification
              </h2>
              <div className="mt-2 text-center intro-x text-slate-400 xl:hidden">
                A few more clicks to sign in to your account. Manage all your
                e-commerce accounts in one place
              </div>
              <div className="mt-8 intro-x">
                <FormInput
                  type="text"
                  className="block px-4 py-3 intro-x min-w-full xl:min-w-[350px]"
                  placeholder="Your email @edu.umi.ac.ma"
                />
              </div>

              <div className="mt-5 text-center xl:mt-8">
                <Button
                  variant="primary"
                  className="w-full px-4 py-3 align-top xl:w-full xl:mr-3"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
          {/* END: Login Form */}
        </div>
      </div>
    </>
  );
}

export default Login;
