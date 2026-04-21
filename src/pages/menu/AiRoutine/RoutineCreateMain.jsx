// import React from "react";
// import { useAiRoutine } from "../../hooks/useAiRoutine";

// export default function RoutineCreateMain() {
//   const { rountines, viewRoutines, removeRoutine, navigate } = useAiRoutine();

//   return (
//     <div className="page">
//       <div className="list-header">
//         <h2>내 루틴 ({rountines.length})</h2>
//         <button onClick={() => navigate("generate")}> + 새 루틴</button>
//       </div>

//       {routine.length === 0 ? (
//         <p>아직 저장된 루틴이 없습니다.</p>
//       ) : (
//         <div className="routine-grid">
//           {routine.map((routine) => (
//             <div key={routine.id} className="routine-card">
//               <h3>{routine.name}</h3>
//               <p>
//                 {routine.days} · {Route.duration}{" "}
//               </p>
//               <div className="card-actions">
//                 <buttion onClick={() => viewRoutine(routine.id)}>
//                   상세보기
//                 </buttion>
//                 <buttion onClick={() => removeRoutineRoutine(routine.id)}>
//                   삭제
//                 </buttion>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
