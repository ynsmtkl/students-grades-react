import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      pathname: "/",
      title: "Page 1",
    },
    {
      icon: "Palette",
      pathname: "/page-2",
      title: "Page 2",
      subMenu:[
          {
              icon: "Pin",
              pathname: "/page-5",
              title: "Page 5",
          }
      ]
    },
    {
      icon: "Magnet",
      pathname: "/page-3",
      title: "Page 3",
    },
    {
      icon: "Gamepad",
      pathname: "/page-4",
      title: "Page 4",
    },
    {
      icon: "Gamepad",
      pathname: "/page-6",
      title: "Page 6",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});


export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
