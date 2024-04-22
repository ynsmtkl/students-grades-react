import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "../../base-components/PreviewComponent";
import {
  FormSwitch,
  FormLabel,
  FormInput,
  FormTextarea,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import {useForm} from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import Filieres from "./Filieres";
import {useState} from "react";
import Litepicker from "../../base-components/Litepicker";
import { useLocation } from 'react-router-dom'
function AddStudent() {

  const [filiere, setFiliere] = useState(0);
  const [date, setDate] = useState("");

  const location = useLocation();
  const studentData = location.state?.studentData;
  if(studentData){
    studentData.date_naissance = studentData?.date_naissance.replaceAll("-", "/");
  }

  const handleChange = (nouvelleFiliere: React.SetStateAction<number>) => {
    setFiliere(nouvelleFiliere);
  };

  const schema = yup
    .object({
      name: yup.string().required().min(5),
      prenom: yup.string().required().min(3),
      email: yup.string().required().email(),
      cne: yup.string().required().matches(/^[A-Za-z]\d{9}$/, "CNE must be like M123456789"),
    })
  const {
    register,
    trigger,
    formState: {errors},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('filiere_id', filiere+"");
    console.log(formData.get("name"));
    const result = await trigger();
    if (!result) {
      const failedEl = document
        .querySelectorAll("#failed-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      failedEl.classList.remove("hidden");
      Toastify({
        node: failedEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    } else {
      const successEl = document
        .querySelectorAll("#success-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      successEl.classList.remove("hidden");
      Toastify({
        node: successEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">{studentData? 'Update student': 'Add student'}</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-12 xl:col-span-6">
          {/* BEGIN: Form Validation */}
          <PreviewComponent className="intro-y box">
            {({toggle}) => (
              <>
                <div
                  className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Implementation
                  </h2>
                </div>
                <div className="p-5">
                  <Preview>
                    {/* BEGIN: Validation Form */}
                    <form className="validate-form" onSubmit={onSubmit}>
                      <div className="input-form">
                        <FormLabel
                          htmlFor="validation-form-1"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Nom
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                        </FormLabel>
                        <FormInput
                          {...register("name")}
                          id="validation-form-1"
                          type="text"
                          name="name"
                          value={studentData?.nom}
                          className={clsx({
                            "border-danger": errors.name,
                          })}
                          placeholder="hatim "
                        />
                        {errors.name && (
                          <div className="mt-2 text-danger">
                            {typeof errors.name.message === "string" &&
                              errors.name.message}
                          </div>
                        )}
                        <div className="input-form">
                          <FormLabel
                            htmlFor="validation-form-2"
                            className="flex flex-col w-full sm:flex-row"
                          >
                            Prenom
                            <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                          </FormLabel>
                          <FormInput
                            {...register("prenom")}
                            id="validation-form-1"
                            type="text"
                            name="prenom"
                            value={studentData?.prenom}
                            className={clsx({
                              "border-danger": errors.prenom,
                            })}
                            placeholder="mousaddak"
                          />
                          {errors.prenom && (
                            <div className="mt-2 text-danger">
                              {typeof errors.prenom.message === "string" &&
                                errors.prenom.message}
                            </div>
                          )}
                        </div>
                      </div>
                      <Filieres selectedValue={studentData?.filiere} onChange={handleChange}/>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-3"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Email
                          <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, email address format
                            </span>
                        </FormLabel>
                        <FormInput
                          {...register("email")}
                          id="validation-form-2"
                          type="email"
                          name="email"
                          value={studentData?.email}
                          className={clsx({
                            "border-danger": errors.email,
                          })}
                          placeholder="example@gmail.com"
                        />
                        {errors.email && (
                          <div className="mt-2 text-danger">
                            {typeof errors.email.message === "string" &&
                              errors.email.message}
                          </div>
                        )}
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-4"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          Date de naissance
                        </FormLabel>
                        <div className="relative w-full mx-auto">
                          <div className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                            <Lucide icon="Calendar" className="w-4 h-4" />
                          </div>
                          <Litepicker value={studentData?.date_naissance} options={{
                            autoApply: false,
                            showWeekNumbers: true,
                            format: 'DD/MM/YYYY',
                            dropdowns: {
                              minYear: 1970,
                              maxYear: null,
                              months: true,
                              years: true,
                            },
                          }} className="pl-12" />
                        </div>
                      </div>
                      <div className="mt-3 input-form">
                        <FormLabel
                          htmlFor="validation-form-4"
                          className="flex flex-col w-full sm:flex-row"
                        >
                          CNE
                        </FormLabel>
                        <FormInput
                          {...register("cne")}
                          id="validation-form-2"
                          type="text"
                          name="cne"
                          value={studentData?.numero_etudiant}
                          className={clsx({
                            "border-danger": errors.cne,
                          })}
                          placeholder="M123456789"
                        />
                        {errors.cne && (
                          <div className="mt-2 text-danger">
                            {typeof errors.cne.message === "string" &&
                              errors.cne.message}
                          </div>
                        )}
                      </div>
                      <Button variant="primary" type="submit" className="mt-5">
                        Register
                      </Button>
                    </form>
                    {/* END: Validation Form */}
                  </Preview>
                </div>
              </>
            )}
          </PreviewComponent>
          {/* END: Form Validation */}
          {/* BEGIN: Success Notification Content */}
          <Notification
            id="success-notification-content"
            className="flex hidden"
          >
            <Lucide icon="CheckCircle" className="text-success"/>
            <div className="ml-4 mr-4">
              <div className="font-medium">Registration success!</div>
              <div className="mt-1 text-slate-500">
                Please check your e-mail for further info!
              </div>
            </div>
          </Notification>
          {/* END: Success Notification Content */}
          {/* BEGIN: Failed Notification Content */}
          <Notification
            id="failed-notification-content"
            className="flex hidden"
          >
            <Lucide icon="XCircle" className="text-danger"/>
            <div className="ml-4 mr-4">
              <div className="font-medium">Registration failed!</div>
              <div className="mt-1 text-slate-500">
                Please check the fileld form.
              </div>
            </div>
          </Notification>
          {/* END: Failed Notification Content */}
        </div>
      </div>
    </>
  );
}

export default AddStudent;
