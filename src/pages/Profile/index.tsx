import _ from "lodash";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import {FormSwitch} from "../../base-components/Form";
import Progress from "../../base-components/Progress";
import Lucide from "../../base-components/Lucide";
import StackedBarChart1 from "../../components/StackedBarChart1";
import SimpleLineChart from "../../components/SimpleLineChart";
import {Menu, Tab} from "../../base-components/Headless";
import {Tab as HeadlessTab} from "@headlessui/react";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Table from '../../base-components/Table';
import {NonValide, Valide, Rattrapage} from './status'


interface module {
  abbreviation: string;
  description: string;
  nom: string;
  semestre: semestre;
}

interface semestre {
  nom: string;
  session: string;
}

interface note {
  note_ordinaire: number;
  note_rattrapage: number;
  note_finale: number;
  absent: boolean;
}

interface inscription {
  module: module;
  note: note;
}

function Main() {
  const [inscriptions, setInscriptions] = useState<Array<inscription>>();
  const location = useLocation();
  const navigate = useNavigate();


  const studentData = location.state?.studentData;

  const handleEditMenuClick = () => {
    navigate(`/student/update`, {state: {studentData}});
  };

  const fetch = async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/students/' + studentData?.id + '/notes');
    if (response.status == 200) {
      setInscriptions(response.data)
    } else {
      console.log("error loading modules")
    }
  }

  useEffect(() => {
    fetch();
  }, [])


  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Student Profile</h2>
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Info */}
        <div className="px-5 pt-5 mt-5 intro-y box">
          <Menu className="flex justify-end">
            <Menu.Button as="a" className="block w-5 h-5">
              <Lucide
                icon="MoreVertical"
                className="w-5 h-5 text-slate-500"
              />
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item onClick={handleEditMenuClick}>
                <Lucide icon="Edit" className="w-4 h-4 mr-2"/>
                Edit Infos
              </Menu.Item>
            </Menu.Items>
          </Menu>
          <div className="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400">
            <div className="flex items-center justify-center flex-1 px-5 lg:justify-start">
              <div className="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit">
                <img
                  alt="image de profile"
                  className="rounded-full"
                  src="/src/assets/images/placeholders/profile.png"
                />
                <div
                  className="absolute bottom-0 right-0 flex items-center justify-center p-2 mb-1 mr-1 rounded-full bg-primary">
                  <Lucide icon="Camera" className="w-4 h-4 text-white"/>
                </div>
              </div>
              <div className="ml-5">
                <div className="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal">
                  {studentData.nom} {studentData.prenom}
                </div>
                <div className="text-slate-500">{studentData.filiere}</div>
              </div>
            </div>
            <div
              className="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3">
                Student Details
              </div>
              <div className="flex flex-col items-center justify-center mt-4 lg:items-start">
                <div className="flex items-center truncate sm:whitespace-normal">
                  <Lucide icon="User" className="w-4 h-4 mr-2"/>
                  CNE: {studentData.numero_etudiant}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Calendar" className="w-4 h-4 mr-2"/>
                  Date naissance: {studentData.date_naissance}
                </div>
                <div className="flex items-center mt-3 truncate sm:whitespace-normal">
                  <Lucide icon="Mail" className="w-4 h-4 mr-2"/>
                  Email: {studentData.email}
                </div>
              </div>
            </div>
          </div>
          <Tab.List
            variant="link-tabs"
            className="flex-col justify-center text-center sm:flex-row lg:justify-start"
          >
            <Tab fullWidth={false}>
              <Tab.Button className="py-4 cursor-pointer">Inscriptions</Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="py-4 cursor-pointer">
                Notes
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="py-4 cursor-pointer">
                Activities
              </Tab.Button>
            </Tab>
            <Tab fullWidth={false}>
              <Tab.Button className="py-4 cursor-pointer">Tasks</Tab.Button>
            </Tab>
          </Tab.List>
        </div>
        {/* END: Profile Info */}
        <Tab.Panels className="mt-5 intro-y">
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              {/* BEGIN: Top Categories */}
              <div className="col-span-12 intro-y box ">
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Les modules
                  </h2>
                  <Menu className="ml-auto">
                    <Menu.Button as="a" className="block w-5 h-5">
                      <Lucide
                        icon="MoreHorizontal"
                        className="w-5 h-5 text-slate-500"
                      />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                      <Menu.Item>
                        <Lucide icon="Plus" className="w-4 h-4 mr-2"/> Add
                        Category
                      </Menu.Item>
                      <Menu.Item>
                        <Lucide icon="Settings" className="w-4 h-4 mr-2"/>
                        Settings
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>
                <div className="mt-5">
                  {inscriptions?.map((inscription) => (
                    <div className="intro-x">
                      <div className="flex items-center px-5 py-3 mb-3 box zoom-in">
                        <div
                          className="flex justify-center items-center w-10 h-10 overflow-hidden rounded-full image-fit bg-primary/25">
                          <b>{inscription.module.abbreviation}</b>
                        </div>
                        <div className="ml-4 mr-auto">
                          <div className="font-medium">{inscription.module.nom}</div>
                          <div className="font-normal">{inscription.module.description}</div>
                          <div className="text-slate-500 text-xs mt-0.5">
                            {inscription.module.semestre.nom}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 intro-y box">
                <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Les notes des modules
                  </h2>
                </div>
                <div className="my-5 mx-3">
                  <div className="overflow-x-auto">
                    <Table bordered hover>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th className="whitespace-nowrap">Module</Table.Th>
                          <Table.Th className="whitespace-nowrap text-center">
                            Note ordinaire
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap text-center">
                            Note rattrapage
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap text-center">
                            Absent
                          </Table.Th>
                          <Table.Th className="whitespace-nowrap text-center">
                            Validation
                          </Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {inscriptions?.map((inscription) => (
                          <Table.Tr>
                            <Table.Td>{inscription.module.nom}</Table.Td>
                            <Table.Td className="text-center">{inscription.note.note_ordinaire}</Table.Td>
                            <Table.Td className="text-center">{inscription.note.note_rattrapage}</Table.Td>
                            <Table.Td className="text-center">{inscription.note.absent ? 'Absent' : ''}</Table.Td>
                            <Table.Td className="text-center">
                              {!inscription.note.note_rattrapage ? (
                                inscription.note.note_ordinaire > 10 ? ( <Valide/> ) : ( <Rattrapage/> )
                              ) : (
                                Math.max(inscription.note.note_ordinaire, inscription.note.note_rattrapage) > 10 ? ( <Valide/> ) : ( <NonValide/> )
                              )}
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default Main;
