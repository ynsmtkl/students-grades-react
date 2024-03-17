import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import { FormInput } from "../../base-components/Form";
import * as xlsx from "xlsx";
import { useEffect, useRef, createRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "../../utils/helper";

interface Response {
  nom?: string;
  prenom?: string;
  numero_etudiant?: string;
  filiere?: string;
}

function Main() {

  const navigate = useNavigate();

  function addStudentButtonClick(){
    navigate('/student/add');
  }

  const tableRef = createRef<HTMLDivElement>();
  const tabulator = useRef<Tabulator>();
  const [filter, setFilter] = useState([{field: "nom", type: "like", value: ""},
    {field: "filiere", type: "like", value: ""},
    {field: "numero_etudiant", type: "like", value: ""}
  ]);

  const imageAssets = import.meta.glob<{
    default: string;
  }>("/src/assets/images/fakers/*.{jpg,jpeg,png,svg}", { eager: true });
  const initTabulator = () => {
    if (tableRef.current) {
      tabulator.current = new Tabulator(tableRef.current, {
        ajaxURL: "http://127.0.0.1:8000/api/students",
        printAsHtml: true,
        printStyled: true,
        pagination: true,
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "No matching records found",
        ajaxConfig:{
          method:"GET", //set request type to Position
          headers: {
            "Content-type": 'application/json; charset=utf-8', //set specific content type
          },
        },
        rowFormatter:function(row){
          //row - row component

          var data = row.getData();

            row.getElement().style.height = "50px";

        },
        columns: [
          {
            title: "",
            formatter: "responsiveCollapse",
            width: 40,
            minWidth: 30,
            hozAlign: "center",
            resizable: false,
            headerSort: false,
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
                  <a class="flex items-center mr-3" id="edit" href="javascript:;">
                    <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                  </a>
                  <a class="flex items-center text-danger" id="delete" href="javascript:;">
                    <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                  </a>
                </div>`);
              a.addEventListener("click", function (e) {
                // On click actions
                if (e.target && e.target.tagName.toLowerCase() === 'a') {
                  const id = e.target.id;
                  switch (id) {
                    case 'edit':
                      console.log("Edit Button Clicked");
                      break;
                    case 'delete':
                      console.log("Delete Button Clicked");
                      break;
                    default:
                  }
                }

              });
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
        ],
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
  };


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
  const onFilter = () => {
    if (tabulator.current) {
      tabulator.current.setFilter([{field: "nom", type: "like", value: filter[0].value},
        {field: "filiere", type: "like", value: filter[0].value},
        {field: "numero_etudiant", type: "like", value: filter[0].value}
      ]);
    }
  };

  // On reset filter
  const onResetFilter = () => {
    setFilter([{ ...filter, field: "nom", type: "like", value: ""},
                    { ...filter, field: "filiere", type: "like", value: ""},
                    { ...filter, field: "numero_etudiant", type: "like", value: ""}
    ]);
    onFilter();
  };

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
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="FilePlus" className="w-4 h-4 mr-2" /> New Category
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="UserPlus" className="w-4 h-4 mr-2" /> New Group
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      {/* BEGIN: HTML Table Data */}
      <div className="p-5 mt-5 intro-y box">
        <div className="flex flex-col sm:flex-row sm:items-end">
          <form
            id="tabulator-html-filter-form"
            className="xl:flex xl:w-full sm:mr-auto"
            onSubmit={(e) => {
              e.preventDefault();
              onFilter();
            }}
          >
            <div className="items-center xl:w-[450px] mt-2 sm:flex sm:mr-4 xl:mt-0">
              <FormInput
                id="tabulator-html-filter-value"
                value={filter[1].value}
                onChange={(e) => {
                  setFilter([
                    {...filter[0], value: e.target.value, },
                    {...filter[1], value: e.target.value, },
                    {...filter[2], value: e.target.value, }
                  ]);
                }}
                type="text"
                className="mt-2 sm:w-40 2xl:w-full sm:mt-0"
                placeholder="Search..."
              />
            </div>
            <div className="mt-2 xl:mt-0">
              <Button
                id="tabulator-html-filter-go"
                variant="primary"
                type="button"
                className="w-full sm:w-16"
                onClick={onFilter}
              >
                Go
              </Button>
              <Button
                id="tabulator-html-filter-reset"
                variant="secondary"
                type="button"
                className="w-full mt-2 sm:w-16 sm:mt-0 sm:ml-1"
                onClick={onResetFilter}
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
              <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
            </Button>
            <Menu className="w-1/2 sm:w-auto">
              <Menu.Button
                as={Button}
                variant="outline-secondary"
                className="w-full sm:w-auto"
              >
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                <Lucide
                  icon="ChevronDown"
                  className="w-4 h-4 ml-auto sm:ml-2"
                />
              </Menu.Button>
              <Menu.Items className="w-40">
                <Menu.Item onClick={onExportCsv}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export CSV
                </Menu.Item>
                <Menu.Item onClick={onExportJson}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                  JSON
                </Menu.Item>
                <Menu.Item onClick={onExportXlsx}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
                  XLSX
                </Menu.Item>
                <Menu.Item onClick={onExportHtml}>
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export
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
      {/* END: HTML Table Data */}
    </>
  );
}

export default Main;
