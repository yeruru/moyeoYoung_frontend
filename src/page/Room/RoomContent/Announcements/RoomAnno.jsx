import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RoomAnno() {
    const navigate = useNavigate();

    const [notices, setNotices] = useState([]);
    const { roomId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8090/rooms/${roomId}/notices`)
            .then(response => {
                setNotices(response.data);
            });
    }, [roomId]);

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date; // milliseconds difference
      const diffSecs = Math.round(diffMs / 1000); // seconds difference
      const diffMins = Math.round(diffSecs / 60); // minutes difference
      const diffHrs = Math.round(diffMins / 60); // hours difference
      const diffDays = Math.round(diffHrs / 24); // days difference

      if (diffSecs < 60) {
          return `${diffSecs}초 전`;
      } else if (diffMins < 60) {
          return `${diffMins}분 전`;
      } else if (diffHrs < 24) {
          return `${diffHrs}시간 전`;
      } else {
          return `${diffDays}일 전`;
      }
  };

  return (
      <div style={styles.container}>
          <h2 style={styles.title}>모임방 공지사항</h2>
          <div>
              {notices.map(notice => (
                  <div style={styles.listItem} key={notice.id} onClick={() => navigate(`/roomMain/${roomId}/detailAnno/${notice.id}`)}> 
                      <div style={styles.listTitle}>{notice.title}</div>
                      <div style={styles.listInfo}>
                          <span style={styles.listNickname}>{notice.nickname}</span>
                          <span style={styles.listDate}>{notice.updatedAt ? `수정됨 · ${formatDate(notice.updatedAt)}` : formatDate(notice.createdAt)}</span>
                      </div>
                  </div>
              ))}
          </div>
          <div style={styles.button} onClick={() => navigate(`/roomMain/writeAnno/${roomId}`)}>
              글쓰기
          </div>
      </div>
  );
}

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif"
    },
    title: {
        marginBottom: "20px"
    },
    listItem: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginBottom: "10px",
        cursor: "pointer"
    },
    listTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "10px"
    },
    listInfo: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "12px",
        color: "#888"
    },
    listNickname: {
        marginRight: "10px"
    },
    listDate: {},
    button: {
        display: "inline-block",
        marginTop: "20px",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        textAlign: "center"
    }
};

export default RoomAnno;
