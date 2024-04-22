import Lucide from "../../base-components/Lucide";
import {Menu} from "../../base-components/Headless";
import Button from "../../base-components/Button";
import {FormInput} from "../../base-components/Form";
import * as xlsx from "xlsx";
import React, {useEffect, useRef, createRef, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {createIcons, icons} from "lucide";
import {TabulatorFull as Tabulator} from "tabulator-tables";
import {stringToHTML} from "../../utils/helper";
import Dialog from "../../base-components/Headless/Dialog";
import Dropzone, {DropzoneElement} from "../../base-components/Dropzone";
import Notification, {NotificationElement} from "../../base-components/Notification";
import axios from "axios";
import Toastify from "toastify-js";

interface Response {
  nom?: string;
  prenom?: string;
  numero_etudiant?: string;
  date_naissance?: string;
  filiere?: string;
}

function Main() {

  const navigate = useNavigate();
  const [warningModalPreview, setWarningModalPreview] = useState(false);
  const [deleteModalPreview, setDeleteModalPreview] = useState(false);
  const dropzoneSingleRef = useRef<DropzoneElement>();
  const deleteButtonRef = useRef(null);
  const [studentId, setStudentId] = useState(0);

  const showNotification = (success: boolean) => {
    if (!success) {
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

  function addStudentButtonClick() {
    navigate('/student/add');
  }

  const deleteStudent = async (stdId) => {
    try {
      const response = await axios.delete(`https://ynsmtkl.tech/api/students/${stdId}/delete`);
      console.log('Response:', response.data);
      if (response.status === 200 && response.data[0] === "success") {
        console.log("student deleted");
        showNotification(true);
      } else {
        console.log("problem deletion of student!!");
        showNotification(false);
      }
    } catch (error) {
      console.error('Error:', error.response);
      showNotification(false);
      return false;
    } finally {
      tabulator.current?.replaceData();
      setDeleteModalPreview(false);
    }
  };

  const tableRef = createRef<HTMLDivElement>();
  const tabulator = useRef<Tabulator>();
  /*const [filter, setFilter] = useState([{field: "nom", type: "like", value: ""},
    {field: "filiere", type: "like", value: ""},
    {field: "numero_etudiant", type: "like", value: ""}
  ]);*/

  let columns = [
    {
      title: "",
      formatter: "responsiveCollapse",
      width: 40,
      minWidth: 30,
      hozAlign: "center",
      resizable: false,
      headerSort: false,
    },

    {
      title: "",
      field: "prenom",
      visible: false,
    },

    // For HTML table
    {
      title: "Nom Complet",
      minWidth: 200,
      responsive: 0,
      field: "nom",
      vertAlign: "middle",
      print: false,
      download: false,
      formatter(cell) {
        const response: Response = cell.getData();
        return `<div>
                <div class="font-medium whitespace-nowrap">${response.nom} ${response.prenom}</div>
              </div>`;
      },
    },
    {
      title: "CNE",
      minWidth: 200,
      responsive: 0,
      field: "numero_etudiant",
      vertAlign: "middle",
      print: false,
      download: false,
      formatter(cell) {
        const response: Response = cell.getData();
        return `<div>
                <div class="text-slate-500 text-xs whitespace-nowrap">${response.numero_etudiant}</div>
              </div>`;
      },
    },
    {
      title: "Filière",
      minWidth: 20,
      width: 100,
      responsive: 0,
      field: "filiere",
      vertAlign: "middle",
      print: false,
      download: false,
      formatter(cell) {
        const response: Response = cell.getData();
        return `<div>
                <div class="text-slate-500 text-xs whitespace-nowrap">${response.filiere}</div>
              </div>`;
      },
    },
    {
      title: "ACTIONS",
      minWidth: 200,
      field: "actions",
      responsive: 1,
      hozAlign: "center",
      headerHozAlign: "center",
      vertAlign: "middle",
      print: false,
      download: false,
      formatter() {
        const a =
          stringToHTML(`<div class="flex lg:justify-center items-center">
                  <div class="flex items-center mr-3" id="edit">
                    <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                  </div>
                  <div class="flex items-center text-danger" id="delete">
                    <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                  </div>
                </div>`);

        return a;
      },
    },

    // For print format
    {
      title: "Nom Complet",
      field: "nom",
      visible: false,
      print: true,
      download: true,
    },
    {
      title: "CNE",
      field: "numero_etudiant",
      visible: false,
      print: true,
      download: true,
    },
    {
      title: "Filière",
      field: "filiere",
      visible: false,
      print: true,
      download: true,
    },
  ];

  const initTabulator = () => {
    if (tableRef.current) {
      tabulator.current = new Tabulator(tableRef.current, {
        ajaxConfig: {
          method: "GET", //set request type to Position
          headers: {
            "Content-type": 'application/json; charset=utf-8', //set specific content type
          },
        },
        ajaxURL: "https://ynsmtkl.tech/api/students", // get all students from api
        printAsHtml: true,
        printStyled: true,
        pagination: true,
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "No matching records found",
        rowFormatter: function (row) {
          //row - row component

          var data = row.getData();

          row.getElement().style.height = "50px";

        },
        columns: columns,
      });
    }

    tabulator.current?.on("renderComplete", () => {
      createIcons({
        icons,
        attrs: {
          "stroke-width": 1.5,
        },
        nameAttr: "data-lucide",
      });
    });

    tabulator.current?.on("rowClick", function (e, row) {
      if (e.target && e.target.tagName.toLowerCase() === 'div') {
        const id = e.target.id;
        switch (id) {
          case 'edit':
            const studentData = row.getData();
            navigate(`/student/update`, {state: {studentData}});
            break;
          case 'delete':
            setStudentId(row.getIndex());
            e.preventDefault();
            setDeleteModalPreview(true);
            /*deleteStudent(row.getIndex()).then((res) => {
              if(res)
                console.log("student deleted");
              else console.log("problem deletion of student!!");
            })*/
            break;
          default:
        }
      }
      //alert("Row " + row.getIndex() + " Clicked!!!!")
    });
  };

  const columnFields = columns.map(column => column.field);

  // OPTIONAL - These columns will not be searched.
  // If you want to search all columns, set to [].
  const ignoreColumns = []
  const searchBarRef = useRef(null);

  const searchFields = columnFields.filter(field => !ignoreColumns.includes(field))


  // Redraw table onresize
  const reInitOnResizeWindow = () => {
    window.addEventListener("resize", () => {
      if (tabulator.current) {
        tabulator.current.redraw();
        createIcons({
          icons,
          attrs: {
            "stroke-width": 1.5,
          },
          nameAttr: "data-lucide",
        });
      }
    });
  };

  // Filter function
  /*const onFilter = () => {
    if (tabulator.current) {
      tabulator.current.setFilter({field: "nom", type: "like", value: filter[0].value});
    }
  };*/

  // On reset filter
  /*const onResetFilter = () => {
    setFilter([{ ...filter, field: "nom", type: "like", value: ""},
                    { ...filter, field: "filiere", type: "like", value: ""},
                    { ...filter, field: "numero_etudiant", type: "like", value: ""}
    ]);
    onFilter();
  };*/

  // Export
  const onExportCsv = () => {
    if (tabulator.current) {
      tabulator.current.download("csv", "etudiants.csv");
    }
  };

  const onExportJson = () => {
    if (tabulator.current) {
      tabulator.current.download("json", "etudiants.json");
    }
  };

  const onExportXlsx = () => {
    if (tabulator.current) {
      (window as any).XLSX = xlsx;
      tabulator.current.download("xlsx", "etudiants.xlsx", {
        sheetName: "Etudiants",
      });
    }
  };

  const onExportHtml = () => {
    if (tabulator.current) {
      tabulator.current.download("html", "etudiants.html", {
        style: true,
      });
    }
  };

  // Print
  const onPrint = () => {
    if (tabulator.current) {
      tabulator.current.print();
    }
  };

  useEffect(() => {
    const searchFunction = () => {
      // Allows searching in multiple columns at the same time
      const filterArray = searchFields.map((field) => {
        // You can customize the properties here
        return {field: field, type: 'like', value: searchBarRef.current?.value.trim()};
      });

      tabulator.current?.setFilter([filterArray])
    };

    const searchBar = searchBarRef.current;

    searchBar?.addEventListener("input", searchFunction);

    const buttonDelete = deleteButtonRef.current;

    buttonDelete?.addEventListener("click", function () {
      console.log("clicked");
    });

    /* File Upload */
    const elDropzoneSingleRef = dropzoneSingleRef.current;
    if (elDropzoneSingleRef) {
      elDropzoneSingleRef.dropzone.on("success", () => {
        alert("Added file.");
      });
      elDropzoneSingleRef.dropzone.on("error", () => {
        alert("No more files please!");
      });
    }

    initTabulator();
    reInitOnResizeWindow();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Tabulator</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button variant="primary" className="mr-2 shadow-md" onClick={addStudentButtonClick}>
            Add New Product
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as={Button} className="px-2 font-normal !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4"/>
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item onClick={(event: React.MouseEvent) => {
                event.preventDefault();
                setWarningModalPreview(true);
              }}>
                <Lucide icon="FilePlus" className="w-4 h-4 mr-2"/> Import students
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="UserPlus" className="w-4 h-4 mr-2"/> New Group
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      {/* Drag Excel File Modal */}
      <Dialog open={warningModalPreview} onClose={() => {
        setWarningModalPreview(false);
      }}
      >
        <Dialog.Panel>
          <div className="p-5">
            <Dropzone getRef={(el) => {
              dropzoneSingleRef.current = el;
            }}
                      options={{
                        url: "https://httpbin.org/post",
                        thumbnailWidth: 150,
                        maxFilesize: 0.5,
                        maxFiles: 1,
                        acceptedFiles: ".xlsx, .xls",
                        headers: {"My-Awesome-Header": "header value"},
                      }}
                      className="dropzone"
            >
              <div className="text-lg font-medium">
                Drop files here or click to upload.
              </div>
              <div className="text-gray-600">
                This is just a demo dropzone. Selected files are
                <span className="font-medium">not</span> actually
                uploaded.
              </div>
            </Dropzone>
          </div>
          <div className="px-5 pb-2 text-center">
            <Button type="button" variant="secondary" size="sm" onClick={() => {
              setWarningModalPreview(false);
            }}
                    className="w-24"
            >
              Annuler
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* End Modal */}
      {/* Modal Delete */}
      <Dialog open={deleteModalPreview} onClose={() => {
        setDeleteModalPreview(false);
      }}
              initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-danger"/>
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete this student? <br/>
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button type="button" variant="outline-secondary" onClick={() => {
              setDeleteModalPreview(false);
            }}
                    className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button type="button" variant="danger" className="w-24" ref={deleteButtonRef} onClick={() => {
              console.log(studentId);
              if (studentId != 0) deleteStudent(studentId);
            }}>
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* End Modal */}
      {/* BEGIN: HTML Table Data */}
      <div className="p-5 mt-5 intro-y box">
        <div className="flex flex-col sm:flex-row sm:items-end">
          <form
            id="tabulator-html-filter-form"
            className="xl:flex xl:w-full sm:mr-auto"
            onSubmit={(e) => {
              e.preventDefault();
              /*onFilter();*/
            }}
          >
            <div className="items-center xl:w-[450px] mt-2 sm:flex sm:mr-2 xl:mt-0">
              <FormInput
                id="searchBar"
                ref={searchBarRef}
                type="text"
                className="mt-2 w-full sm:mt-0"
                placeholder="Search..."
              />
            </div>
            <div className="mt-2 xl:mt-0">
              <Button
                id="tabulator-html-filter-go"
                variant="primary"
                type="button"
                className="w-full sm:w-16"
                onClick={() => searchBarRef.current.value = ""}
              >
                Go
              </Button>
              <Button
                id="tabulator-html-filter-reset"
                variant="secondary"
                type="button"
                className="w-full mt-2 sm:w-16 sm:mt-0 sm:ml-1"
                //onClick={onResetFilter}
              >
                Reset
              </Button>
            </div>
          </form>
          <div className="flex mt-5 sm:mt-0">
            <Button
              id="tabulator-print"
              variant="outline-secondary"
              className="w-1/2 mr-2 sm:w-auto"
              onClick={onPrint}
            >
              <Lucide icon="Printer" className="w-4 h-4 mr-2"/> Print
            </Button>
            <Menu className="w-1/2 sm:w-auto">
              <Menu.Button
                as={Button}
                variant="outline-secondary"
                className="w-full sm:w-auto"
              >
                <Lucide icon="FileText" className="w-4 h-4 mr-2"/> Export
                <Lucide
                  icon="ChevronDown"
                  className="w-4 h-4 ml-auto sm:ml-2"
                />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item onClick={onExportCsv}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2"/> Export CSV
                </Menu.Item>
                <Menu.Item onClick={onExportJson}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2"/> Export
                  JSON
                </Menu.Item>
                <Menu.Item onClick={onExportXlsx}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2"/> Export
                  XLSX
                </Menu.Item>
                <Menu.Item onClick={onExportHtml}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2"/> Export
                  HTML
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hidden">
          <div id="tabulator" ref={tableRef} className="mt-5"/>
        </div>
      </div>

      <Notification
        id="success-notification-content"
        className="flex hidden"
      >
        <Lucide icon="CheckCircle" className="text-success"/>
        <div className="ml-4 mr-4">
          <div className="font-medium">Student Deleted!</div>
          <div className="mt-1 text-slate-500">
            Student deleted successfully
          </div>
        </div>
      </Notification>
      <Notification
        id="failed-notification-content"
        className="flex hidden"
      >
        <Lucide icon="XCircle" className="text-danger"/>
        <div className="ml-4 mr-4">
          <div className="font-medium">Deletion failed!</div>
          <div className="mt-1 text-slate-500">
            Student deletion failed, please try again!
          </div>
        </div>
      </Notification>


      {/* END: HTML Table Data */}
    </>
  );
}

export default Main;
