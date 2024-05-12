import {
  FormLabel,
  FormInput,
} from "../../base-components/Form";
import Button from "../../base-components/Button";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";
import {useForm} from "react-hook-form";
import Toastify from "toastify-js";
import clsx from "clsx";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, {useEffect} from "react";
import {useState} from "react";
import Litepicker from "../../base-components/Litepicker";
import {useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";
import {parse, format} from 'date-fns';
import LoadingIcon from "../../base-components/LoadingIcon";
import Password from "./Password";

function AddStudent() {

  const [filiere, setFiliere] = useState(0);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location)

  interface ErrorResponse {
    data: {
      message: string;
      errors: {
        [key: string]: string[];
      };
    };
    status: number;
    statusText: string;
    // Add other properties as needed
  }

  // Function to extract all error messages
  function extractErrorMessages(response: ErrorResponse): string[] {
    const errorMessages: string[] = [];

    // Loop through each error field and extract error messages
    for (const field in response.data.errors) {
      const messages = response.data.errors[field];
      errorMessages.push(...messages);
    }

    return errorMessages;
  }

  const studentData = location.state?.studentData;
  useEffect(() => {
    if (studentData) {
      setDate(studentData?.date_naissance.replaceAll("-", "/"));
    }
  }, [])

  /*const handleChange = (nouvelleFiliere: React.SetStateAction<number>) => {
    setFiliere(nouvelleFiliere);
  };*/

  const handleDateChange = (newDate: React.SetStateAction<string>) => {
    setDate(newDate);
  };

  const changeDateFormat = (originalDate: string) => {
    const parsedDate = parse(originalDate, 'dd/MM/yyyy', new Date());
    return format(parsedDate, 'MM/dd/yyyy');
  }

  const schema = yup
    .object({
      nom: yup.string().required().min(5),
      prenom: yup.string().required().min(3),
      email: yup.string().required().email(),
      numero_etudiant: yup.string().required()
        .matches(/^[A-Za-z]\d{9}$/, "CNE must be like M123456789"),
    })
  const {
    register,
    trigger,
    formState: {errors},
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const showNotification = (result: boolean, message: string) => {
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
  }
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    const result = await trigger();

    if (result) {
      const formData = new FormData(event.target);
      /*if (filiere == 0){
        setFiliere(studentData?.filiere_id);
      }
      console.log(filiere);
      formData.append('filiere_id', filiere +"");*/
      formData.append('date_naissance', changeDateFormat(date));
      let url;
      if (studentData) {
        formData.append('id', studentData?.id);
        url = "http://127.0.0.1:8000/api/students/" + studentData?.id + "/update";
      } else {
        url = "http://127.0.0.1:8000/api/students/add"
      }
      try {
        const res = await axios.post(url, formData)
        if (res.status == 200) {
          setLoading(false);
          navigate('/')
          showNotification(true, "student added successfully!");
        } else {
          setLoading(false);
          showNotification(false, "error adding student");
        }
      } catch (error) {
        const errorMessages = extractErrorMessages(error.response);

        // Now errorMessages array contains all the error messages
        console.log(errorMessages);
        for (const message in errorMessages) {
          setLoading(false);
          showNotification(false, message);
        }
      }
    }
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">{studentData ? 'Update student' : 'Add student'}</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-12 xl:col-span-6">
          {/* BEGIN: Form Validation */}
          <div className="card box">
            <div
              className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
              <h2 className="mr-auto text-base font-medium">
                Personnel Informations
              </h2>
            </div>
            <div className="p-5">
              <div>
                {/* BEGIN: Validation Form */}
                <form className="validate-form" onSubmit={onSubmit}>
                  <div className="input-form">
                    <FormLabel
                      htmlFor="nom"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Nom
                      <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                    </FormLabel>
                    <FormInput
                      {...register("nom")}
                      id="nom"
                      type="text"
                      name="nom"
                      defaultValue={studentData?.nom}
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
                    <div className="input-form mt-3">
                      <FormLabel
                        htmlFor="prenom"
                        className="flex flex-col w-full sm:flex-row"
                      >
                        Prenom
                        <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">

                            </span>
                      </FormLabel>
                      <FormInput
                        {...register("prenom")}
                        id="prenom"
                        type="text"
                        name="prenom"
                        defaultValue={studentData?.prenom}
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
                  {/*<Filieres selectedValue={studentData?.filiere} onChange={handleChange}/>*/}
                  <div className="mt-3 input-form">
                    <FormLabel
                      htmlFor="email"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Email
                      <span className="mt-1 text-xs sm:ml-auto sm:mt-0 text-slate-500">
                              Required, email address format
                            </span>
                    </FormLabel>
                    <FormInput
                      {...register("email")}
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={studentData?.email}
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
                      htmlFor="date_naissance"
                      className="flex flex-col w-full sm:flex-row"
                    >
                      Date de naissance
                    </FormLabel>
                    <div className="relative w-full mx-auto">
                      <div
                        className="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
                        <Lucide icon="Calendar" className="w-4 h-4"/>
                      </div>
                      <Litepicker value={date} onChange={handleDateChange} options={{
                        autoApply: false,
                        showWeekNumbers: true,
                        format: 'DD/MM/YYYY',
                        dropdowns: {
                          minYear: 1970,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                      }} className="pl-12"/>
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
                      {...register("numero_etudiant")}
                      id="validation-form-2"
                      type="text"
                      name="numero_etudiant"
                      defaultValue={studentData?.numero_etudiant}
                      className={clsx({
                        "border-danger": errors.numero_etudiant,
                      })}
                      placeholder="M123456789"
                    />
                    {errors.numero_etudiant && (
                      <div className="mt-2 text-danger">
                        {typeof errors.numero_etudiant.message === "string" &&
                          errors.numero_etudiant.message}
                      </div>
                    )}
                  </div>
                  <Button variant="primary" type="submit" className="mt-5">
                    Envoyer
                    {loading && (
                      <LoadingIcon icon="oval" color="white" className="w-4 h-4 ml-2"/>
                    )}
                  </Button>
                </form>
                {/* END: Validation Form */}
              </div>
            </div>

          </div>
          {/* END: Form Validation */}
          {/* BEGIN: Success Notification Content */}
          <Notification
            id="success-notification-content"
            className="flex hidden"
          >
            <Lucide icon="CheckCircle" className="text-success"/>
            <div className="ml-4 mr-4">
              <div className="font-medium">Student Added!</div>
              <div className="mt-1 text-slate-500">
                Student added successfully!
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
              <div className="font-medium">Error Add student</div>
              <div className="mt-1 text-slate-500">
                It was an error in this operation.
              </div>
            </div>
          </Notification>
          {/* END: Failed Notification Content */}
        </div>
        {!!studentData && (
          <Password studentId={studentData?.id} showNotification={showNotification} extractErrorMessages={extractErrorMessages}/>
        )}
      </div>
    </>
  );
}

export default AddStudent;
