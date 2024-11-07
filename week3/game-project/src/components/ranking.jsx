import styled from "@emotion/styled";
import { useEffect, useState } from "react";
// timeNow / gameLevel / playTime -> localStorage의 키

function Ranking({updateRanking}) {
    const [rankingData, setRankingData] = useState([]);
  
    useEffect(() => {
      // 로컬스토리지에서 데이터 가져오기
      const everyRanking = JSON.parse(localStorage.getItem("gameData")) || [];
      const sortedRanking = everyRanking.sort((a, b) => a.playTime - b.playTime);
      setRankingData(everyRanking);
    }, [updateRanking]);
      const handleReset = () => {
        // 로컬 스토리지 초기화
        localStorage.removeItem("gameData");
    
        // 상태 초기화
        setRankingData([]);
      };
  
    return (
      <Table>
        <thead>
          <tr>
            <TableHeader>순위</TableHeader>
            <TableHeader>날짜</TableHeader>
            <TableHeader>레벨</TableHeader>
            <TableHeader>플레이 시간</TableHeader>
          </tr>
        </thead>
        <tbody>
          {rankingData.map((eachRank, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{eachRank.timeNow}</TableCell>
              <TableCell>{eachRank.gameLevel}</TableCell>
              <TableCell>{eachRank.playTime}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    );
  }

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`
const TableHeader = styled.th`
  background-color: #CCAAAA;
  color: white;
  padding: 1rem 1.2rem;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #ddd;
`
const TableRow = styled.tr`
background-color: #fff;
&:nth-child(even) {
background-color: #ffff22;
}
`
const TableCell = styled.td`
padding: 1rem 1.2rem;
text-align: center;
border: 1px solid #ddd;
font-size: 1rem;
`


export default Ranking;