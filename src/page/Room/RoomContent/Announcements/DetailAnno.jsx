import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';

const styles = {
    container: {
        width: '80%',
        margin: 'auto',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
        marginTop: '2rem',
    },
    title: {
        fontSize: '2rem',
        borderBottom: '1px solid gray',
        paddingBottom: '1rem',
    },
    content: {
        marginTop: '2rem',
        border: '1px solid gray',
        padding: '1rem',
        borderRadius: '10px',
        whiteSpace: 'pre-line',
        marginBottom: '15px',
    },
    authorAndDate: {
        marginTop: '1rem',
        color: 'gray',
    },
    button: {
        marginRight: '1rem',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'white',
    },
    deleteButton: {
        background: 'red',
    },
    editButton: {
        background: 'blue',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
  },
  button: {
      marginRight: '1rem',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      color: 'white',
  },
  deleteButton: {
      background: 'red',
  },
  editButton: {
      background: 'blue',
  },
  backButton: {
      background: 'green',
  },
};

  function DetailAnno({}) {
    const [notice, setNotice] = useState();
    const [currentUserId, setCurrentUserId] = useState(null);
    const { annoId, roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNaN(annoId) && !isNaN(roomId)) {
            axios.get(`http://localhost:8090/rooms/${roomId}/notices/${annoId}`)
                .then(response => {
                    setNotice(response.data);
                    console.log(response.data);
                });
            }
    }, [annoId, roomId]);

    useEffect(() => {
        const fetchMemberInfo = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                try {
                    const response = await fetch('http://localhost:8090/member/mypage', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();

                        if (!data.memberId) {
                            alert('로그인이 필요합니다!');
                            navigate(`/login`);
                            return;
                        }

                        setCurrentUserId(data.memberId);
                    } else {
                        console.error('HTTP error:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching member info:', error);
                }
            }
        };

        fetchMemberInfo();
    }, []);

    const handleDelete = () => {
      if (notice.memberId !== currentUserId) {
        alert('삭제 권한이 없습니다.');
        return;
      }
    
      const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
      if (confirmDelete) {
        axios.delete(`http://localhost:8090/rooms/${roomId}/notices/${annoId}`)
          .then(response => {
            navigate(`/roomMain/roomAnno/${roomId}`);
          });
      }
    };
    
    const handleEdit = () => {
        if (notice.memberId !== currentUserId) {
          alert('수정 권한이 없습니다.');
          return;
      }
      navigate(`/roomMain/${roomId}/editAnno/${annoId}`);
    }

    const handleBackToList = () => {
      navigate(`/roomMain/roomAnno/${roomId}`);
    };

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    };

    return (
          <div style={styles.container}>
              {notice && (
                  <>
                      <div style={styles.title}>{notice.title}</div>
                      <div style={styles.authorAndDate}>
                          작성자: {notice.nickname} <br/>
                          {notice.updatedAt ? `수정일: ${formatDate(notice.updatedAt)}` : `작성일: ${formatDate(notice.createdAt)}`}
                      </div>
                      <div style={styles.content}>{notice.content}</div>
                      <div style={styles.buttonContainer}>
                          <button style={{...styles.button, ...styles.backButton}} onClick={handleBackToList}>목록으로</button>
                          <div>
                              <button style={{...styles.button, ...styles.editButton}} onClick={handleEdit}>수정하기</button>
                              <button style={{...styles.button, ...styles.deleteButton}} onClick={handleDelete}>삭제하기</button>
                          </div>
                      </div>
                  </>
              )}
          </div>
      );
    }
export default DetailAnno;
