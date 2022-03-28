import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Acquaintance from "./pages/Acquaintance";
import NewTask from "./pages/NewTask";
import TaskList from "./pages/TaskList";

const App = () => (
  // ルーティング
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/** TODO: ロードマスクを適用します。*/}
    <Suspense fallback={<></>}>
      <Routes>
        {/** タスク一覧 */}
        <Route path="/" element={<TaskList />} />
        {/** タスク作成 */}
        <Route path="/new" element={<NewTask />} />
        {/** 知り合い管理 */}
        <Route path="/acquaintance" element={<Acquaintance />} />
        {/** その他のパスをタスク一覧にリダイレクト */}
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
