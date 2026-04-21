import React, { useReducer, useRef, useEffect, useState } from "react";
import GymItem from "./GymItem";
import GymListPage from "./GymListPage";

function gymReducer(state, action) {
  switch (action.type) {
    case "INIT_DATA":
      return action.data;
    default:
      return state;
  }
}

const GymListFound = () => {
  const [rawData, dispatch] = useReducer(gymReducer, []);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const observerTarget = useRef(null);

  // 1. 초기 데이터 생성
  useEffect(() => {
    const data = Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      name: `RE:FIT 헬스장 ${i + 1}호점`,
      distance: parseFloat((Math.random() * 4.9 + 0.1).toFixed(1)),
      price: Math.floor(Math.random() * 51 + 20) * 1000,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    }));
    dispatch({ type: "INIT_DATA", data });
  }, []);

  const displayedGyms = rawData.slice(0, page * 10);
  const hasMore = displayedGyms.length < rawData.length;

  // 2. 무한 스크롤 로직 의존성 배열 고정 , Cleanup
  useEffect(() => {
    if (!observerTarget.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log(" 다음 페이지로...");
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 } //
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();

    //  [hasMore, setPage] 구성을 유지하여 에러 방지!
  }, [hasMore, setPage]);

  // 3. 상세 페이지 화면 (조건부 렌더링)
  if (selectedId) {
    const selectedGym = rawData.find((g) => g.id === selectedId);
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "30px",
            borderRadius: "15px",
          }}
        >
          <h2>{selectedGym?.name}</h2>
          <p>
            📍 거리: {selectedGym?.distance}km | 💰 가격:{" "}
            {selectedGym?.price.toLocaleString()}원
          </p>
          <p>여기는 {selectedId}호점의 상세 정보 페이지입니다.</p>
          <button
            onClick={() => setSelectedId(null)}
            style={{ marginBottom: "20px" }}
          >
            ← 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 4. 목록 화면
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>🛡️ RE:FIT 헬스장 검색 </h2>

      {/* 목록 박스 */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {displayedGyms.map((gym) => (
          <GymItem key={gym.id} gym={gym} onSelect={setSelectedId} />
        ))}
      </div>

      {/* 감시 대상 (박스 밖으로 빼서 브라우저가 잘 보이게 함) */}
      <div
        ref={observerTarget}
        style={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f9f9f9",
          marginTop: "10px",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        {hasMore
          ? "🔄 더 많은 헬스장 로딩 중..."
          : "✅ 모든 헬스장을 확인했습니다."}
      </div>
    </div>
  );
};

export default GymListFound;
