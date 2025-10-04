import { Routes, Route, Navigate } from "react-router-dom";
// import PlayPage from "./pages/PlayPage"; // 後で作るページ

export default function App() {
  return (
    <Routes>
      {/* "/" にアクセスしたら /play にリダイレクト */}
      <Route path="/" element={<Navigate to="/play" replace />} />

      {/* Unity を埋め込むページ */}
      {/* <Route path="/play" element={<PlayPage />} /> */}

      {/* その他は 404 表示 */}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}