import {FormInput, FormLabel} from "../../base-components/Form";
import clsx from "clsx";
import Button from "../../base-components/Button";
import LoadingIcon from "../../base-components/LoadingIcon";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import React, {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Password = ({studentId, showNotification, extractErrorMessages}) => {

  const [loadingPassword, setLoadingPassword] = useState(false)
  const navigate = useNavigate()
  const [resultPassword, setResultPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [new_password, setNewPassword] = useState("")

  const schema2 = yup
    .object({
      password: yup.string().required("Your current Password is required!"),
      new_password: yup.string().required("Entre your new password")
        .matches(/.{8,}/, "Minimum 8 characters")
        .matches(/(?=.*\d)/, "At least one number")
        .matches(/(?=.*[^\w\d\s])/, "At least one special character"),
      confirm_password: yup.string().required("Password Confirmation is required!")
        .oneOf([yup.ref("new_password"), null], "Confirmation doesn't match the new password"),
    })
  const {
    register,
    trigger,
    formState: {errors},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema2),
  });

  const onPasswordSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loadingPassword) return;
    setLoadingPassword(true);
    setResultPassword(await trigger());

    console.log(resultPassword)

    if (resultPassword) {
      const formDataPassword = new FormData(event.target);
      console.log(formDataPassword.get("password"))
      console.log(formDataPassword.get("new_password"))
     try {
        const res = await axios.post("http://127.0.0.1:8000/api/students/" + studentId + "/change-password", formDataPassword)
        if (res.status == 200) {
          setLoadingPassword(false);
          navigate('/')
          showNotification(true, "student added successfully!");
        } else {
          setLoadingPassword(false);
          showNotification(false, "error adding student");
        }
      } catch (error) {
        const errorMessages = extractErrorMessages(error?.response);

        // Now errorMessages array contains all the error messages
        console.log(errorMessages);
        for (const message in errorMessages) {
          setLoadingPassword(false);
          showNotification(false, message);
        }
      }
    }else{
      setLoadingPassword(false)
    }
  };

  return (
    <>
      <div className="col-span-12 intro-y lg:col-span-12 xl:col-span-6">
        {/* BEGIN: Form Validation */}
        <div className="card box">
          <div
            className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
            <h2 className="mr-auto text-base font-medium">
              Change Password: {resultPassword}
            </h2>
          </div>
          <div className="p-5">
            <div className="card box">
              {/* BEGIN: Validation Form */}
              <form className="validate-password-form" onSubmit={onPasswordSubmit}>
                <div className="input-form">
                  <FormLabel
                    htmlFor="password"
                    className="flex flex-col w-full sm:flex-row"
                  >
                    Current Password
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                  </FormLabel>
                  <FormInput
                    {...register("password")}
                    id="password"
                    type="password"
                    name="password"
                    className={clsx({
                      "border-danger": errors.password,
                    })}
                  />
                  {errors.password && (
                    <div className="mt-2 text-danger">
                      {typeof errors.password.message === "string" &&
                        errors.password.message}
                    </div>
                  )}
                </div>
                <div className="input-form mt-2">
                  <FormLabel
                    htmlFor="new_password"
                    className="flex flex-col w-full sm:flex-row"
                  >
                    New Password
                    <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                  </FormLabel>
                  <FormInput
                    {...register("new_password")}
                    id="new_password"
                    type="password"
                    name="new_password"
                    className={clsx({
                      "border-danger": errors.new_password,
                    })}
                  />

                    {errors.new_password && (
                      <div className="mt-2 text-danger">
                        {typeof errors.new_password.message === "string" &&
                          errors.new_password.message}
                      </div>
                    )}
                  <div className="input-form mt-2">
                    <FormLabel
                      htmlFor="confirm_password"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Confirm Password
                      <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                    </FormLabel>
                    <FormInput
                      {...register("confirm_password")}
                      id="confirm_password"
                      type="password"
                      name="confirm_password"
                      className={clsx({
                        "border-danger": errors.confirm_password,
                      })}
                    />
                    {errors.confirm_password && (
                      <div className="mt-2 text-danger">
                        {typeof errors.confirm_password.message === "string" &&
                          errors.confirm_password.message}
                      </div>
                    )}
                  </div>
                </div>

                <Button variant="primary" type="submit" className="mt-5">
                  Envoyer
                  {(loadingPassword && resultPassword) && (
                    <LoadingIcon icon="oval" color="white" className="w-4 h-4 ml-2"/>
                  )}
                </Button>
              </form>
              {/* END: Validation Form */}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Password
