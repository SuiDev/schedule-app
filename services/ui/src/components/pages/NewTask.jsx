import React, { createContext } from "react";
import { useMediaQuery } from "react-responsive";

/** Material UI Modules */
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Header from "../organisms/Header";
import MenuBar from "../organisms/MenuBar";

export const MediaContext = createContext();

const NewTask = () => {
  // 画面の横幅が1180px以上のときtrue,1180px以下のときfalse
  const isPCScreen = useMediaQuery({ query: "(min-width: 1180px)" });
  // 画面の横幅が820px以下のときtrue,820px以上のときfalse
  const isTabletScreen = useMediaQuery({ query: "(max-width: 820px)" });
  // 画面の横幅が600px以下のときtrue,600px以上のときfalse
  const isMobileScreen = useMediaQuery({ query: "(max-width: 600px)" });
  // 画面の横幅が880px以下のときtrue,880px以上のときfalse
  const headerResponsiveEdge = useMediaQuery({ query: "(max-width: 880px)" });

  // コンテキストで渡すユーザーメディアデータ
  const mediaData = {
    isPCScreen: isPCScreen,
    isMobileScreen: isMobileScreen,
    isTabletScreen: isTabletScreen,
    headerResponsiveEdge: headerResponsiveEdge,
  };

  return (
    <>
      {/** コンテキストでユーザーメディアデータを渡します。*/}
      <MediaContext.Provider value={mediaData}>
        {mediaData.isPCScreen ? (
          // PCの表示
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            <Header />
            <MenuBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <p>NewTask </p>
            </Box>
          </Box>
        ) : (
          // PC以外の表示
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
            }}
          >
            <Header />
            <MenuBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar />
              <p>NewTask NewTask</p>
            </Box>
          </Box>
        )}
      </MediaContext.Provider>
    </>
  );
};

export default NewTask;
