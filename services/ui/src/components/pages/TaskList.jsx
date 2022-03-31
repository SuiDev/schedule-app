import React, { createContext } from "react";
import styled from "styled-components";
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

  const tasks = [
    {
      id: "1",
      name: "Redesign website",
      start: "2022-4-1",
      end: "2022-4-30",
      progress: 10,
      dependencies: "",
    },
    {
      id: "2",
      name: "Redesign website",
      start: "2022-4-1",
      end: "2022-4-30",
      progress: 20,
      dependencies: "1",
    },
    {
      id: "3",
      name: "Redesign website",
      start: "2022-4-1",
      end: "2022-4-30",
      progress: 0,
      dependencies: "2, 1",
    },
    {
      id: "4",
      name: "Redesign website",
      start: "2022-4-1",
      end: "2022-4-30",
      progress: 10,
      dependencies: "",
    },
    {
      id: "5",
      name: "Redesign website",
      start: "2022-4-1",
      end: "2022-4-30",
      progress: 20,
      dependencies: "4",
    },
    {
      id: "6",
      name: "Redesign website",
      start: "2022-4-1",
      end: "2022-4-30",
      progress: 0,
      dependencies: "5, 4",
    },
  ];

  const createData = (name, assign) => {
    return { name, assign };
  };

  const rows = [
    createData("task A", "A"),
    createData("task B", "B"),
    createData("task C", "C"),
    createData("task D", "D"),
    createData("task E", "E"),
    createData("task F", "F"),
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
          <Box
            component="main"
            sx={{
              width: "70%",
              flexGrow: 1,
              p: "70px 30px 30px 30px",
            }}
          >
            <ItemListStyle>
              <ItemStyle>
                並び替え：
                <Button>終了日が近い順</Button>
                <Button>開始日順</Button>
                <Button>重要度順</Button>
                <Button>共有者が多い順</Button>
              </ItemStyle>
              <ItemStyle>
                フィルター：
                <Button>今日までの未完了タスク</Button>
                <Button>タスク者が自分</Button>
              </ItemStyle>
            </ItemListStyle>
            {/** タスクが存在するときのみチャートを描画します。 */}
            {tasks.length ? (
              // ガントチャート
              <>
                <div
                  style={{
                    width: "30%",
                    display: "inline-block",
                    verticalAlign: "top",
                  }}
                >
                  <TableContainer component={Paper} elevation={0}>
                    <Table
                      sx={{
                        minWidth: 300,
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
                              backgroundColor: "#f3f0e2",
                            }}
                          >
                            タスク名
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
                    width: "70%",
                    display: "inline-block",
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
              </>
            ) : (
              // タスクが存在しないときメッセージを表示します。
              <NoTaskMessageStyle>
                <p>表示するタスクはありません</p>
              </NoTaskMessageStyle>
            )}
          </Box>
        </Box>
      </MediaContext.Provider>
    </>
  );
};

// 項目グループCSS
const ItemListStyle = styled.div`
  padding: 15px 0 5px 0;
`;

// 項目CSS
const ItemStyle = styled.div`
  font-size: 16px;
  width: 100%;
  margin: 0 0 15px 0;
  border-bottom: 1px solid;
`;

// タスクなしメッセージCSS
const NoTaskMessageStyle = styled.div`
  font-size: 18px;
  text-align: center;
  color: #8f8974;
`;

export default TaskList;
