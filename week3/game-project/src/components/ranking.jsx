import styled from "@emotion/styled";
import { useEffect, useState } from "react";
// timeNow / gameLevel / playTime -> localStorage의 키

function Ranking({updateRanking}) {
    const [rankingData, setRankingData] = useState([]);
  
    useEffect(() => {
      // 로컬스토리지에서 데이터 가져오기
      const everyRanking = JSON.parse(localStorage.getItem("gameData")) || [];
      setRankingData(everyRanking);
    }, [updateRanking]);
  
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
border-collapse: collapse;
`
const TableHeader = styled.th`
`
const TableRow = styled.tr`
`
const TableCell = styled.td`
text-align: center;
`


export default Ranking;