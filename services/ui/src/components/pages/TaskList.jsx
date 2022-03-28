import React, { createContext } from "react";
import { useMediaQuery } from "react-responsive";

/** Material UI Modules */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "../organisms/Header";
import MenuBar from "../organisms/MenuBar";
import FrappeGantt from "../utils/ganttChart/FrappeGantt";

export const MediaContext = createContext();

const TaskList = () => {
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

  // TODO: tasksが0だと画面が描画されない
  const tasks = [
    {
      id: "Task 1",
      name: "Redesign website",
      start: "2016-12-15",
      end: "2016-12-31",
      progress: 10,
      dependencies: "",
    },
    {
      id: "Task 2",
      name: "Redesign website",
      start: "2016-12-28",
      end: "2016-12-31",
      progress: 20,
      dependencies: "Task 1",
    },
    {
      id: "Task 3",
      name: "Redesign website",
      start: "2016-12-28",
      end: "2016-12-31",
      progress: 0,
      dependencies: "Task 2, Task 1",
    },
    {
      id: "Task 4",
      name: "Redesign website",
      start: "2016-12-15",
      end: "2016-12-31",
      progress: 10,
      dependencies: "",
    },
    {
      id: "Task 5",
      name: "Redesign website",
      start: "2016-12-28",
      end: "2016-12-31",
      progress: 20,
      dependencies: "Task 4",
    },
    {
      id: "Task 6",
      name: "Redesign website",
      start: "2016-12-28",
      end: "2016-12-31",
      progress: 0,
      dependencies: "Task 5, Task 4",
    },
  ];

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt2", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich2", 237, 9.0, 37, 4.3),
    createData("Eclair2", 262, 16.0, 24, 6.0),
  ];

  return (
    <>
      {/** コンテキストでユーザーメディアデータを渡します。*/}
      <MediaContext.Provider value={mediaData}>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            overflow: "hidden",
          }}
        >
          <Header />
          <MenuBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <div>
              並び替え：
              <Button>終了日が近い順</Button>
              <Button>開始日順</Button>
              <Button>重要度順</Button>
              <Button>共有者が多い順</Button>
            </div>
            <div>
              フィルター：
              <Button>今日までの未完了タスク</Button>
              <Button>タスク者が自分</Button>
            </div>
            {/** ガントチャート */}
            <div
              style={{
                width: "10%",
                display: "inline-block",
                verticalAlign: "top",
              }}
            >
              <TableContainer component={Paper} elevation={0}>
                <Table
                  sx={{
                    minWidth: 100,
                    borderLeft: 1,
                    borderLeftColor: "#e0e0e0",
                  }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead sx={{ height: 59.5 }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          stroke: "#e0e0e0",
                          borderTop: 0.1,
                          borderTopColor: "#e0e0e0",
                          borderBottomWidth: 1,
                        }}
                      >
                        Dessert (100g serving)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          height: rows.length === index + 1 ? 35 : 40,
                          backgroundColor: index % 2 ? "#f5f5f5" : "white",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ borderColor: "#ebeff2" }}
                        >
                          {row.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div
              style={{
                width: "28%",
                display: "inline-block"
              }}
            >
              <FrappeGantt
                onClick={task => console.log(task)}
                onDateChange={(task, start, end) =>
                  console.log(task, start, end)
                }
                onProgressChange={(task, progress) =>
                  console.log(task, progress)
                }
                onTasksChange={tasks => console.log(tasks)}
                tasks={tasks}
              />
            </div>
          </Box>
        </Box>
      </MediaContext.Provider>
    </>
  );
};

export default TaskList;
