import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.svg";

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
                Email sent
              </h2>
              <div className="mt-2 text-center intro-x text-slate-400">
                We've sent you an email. Please check your inbox.
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
