import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import nothing from '../../../../images/Group 153.svg'

const itemsPerPage = 10;

function RoomAnno({state, room}) {
    const navigate = useNavigate();

    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(1);
    const [loginMemberId, setLoginMemberId] = useState(0);
    const [kingmember, setKingMember]= useState(0);
    const { roomId } = useParams();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BURL}/rooms/${roomId}/notices`)
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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BURL}/feed/getmemberId`,{
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(res=>{
          setLoginMemberId(res.data);
        })

        axios.get(`${process.env.REACT_APP_BURL}/room/getroomMain/${roomId}`)
        .then(res=>{
            setKingMember(res.data.memberId);
        })
        .catch(err=>{
            console.log(err);
        })
    },[accessToken, roomId]);

    const handlePageChange = (event, value) => {
      setPage(value);
    };

    const style = {
        container: {
            padding: '20px',
            backgroundColor: 'white',
        },
        title: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px'
        },
        table: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            backgroundColor: '#ddd',
        },
        row: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #ddd',
            cursor: 'pointer',
        },
        thTitle: { flex: '6', textAlign: 'left' },
        thAuthor: { flex: '2', textAlign: 'left' },
        thDate: { flex: '2', textAlign: 'left' },
        tdTitle: { flex: '6', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        tdAuthor: { flex: '2', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        tdDate: { flex: '2', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
        button: {
            display: 'inline-block',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#1EC078',
            color: 'white',
            cursor: 'pointer',
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
        },
        emptyItemBox: {
            height : '500px',
            width: '60%',
            margin: '140px auto 0px auto',
            textAlign: 'center',
        
        }
    }

    return (
        <div style={style.container}>
            <div style={style.title}>
                <h2 style={{ visibility: notices.length === 0 ? 'hidden' : 'visible' }}>모임방 공지사항</h2>
                {
                    loginMemberId === kingmember &&
                    <div style={style.button} onClick={() => navigate(`/roomMain/writeAnno/${roomId}`)}>
                        글쓰기
                    </div>
                }
            </div>
    
            {notices.length === 0 ? (
                <div style={style.emptyItemBox}>
                    <div>
                        <img src={nothing} style={{width : '200px', marginBottom:'40px'}}/>
                    </div>
                    <p>공지사항이 존재하지 않습니다</p>
                </div>
            ) : (
                <>
                    <div style={style.table}>
                        <div style={style.headerRow}>
                            <div style={style.thTitle}>제목</div>
                            <div style={style.thAuthor}>작성자</div>
                            <div style={style.thDate}>날짜</div>
                        </div>
                        {
                        notices.slice((page-1)*itemsPerPage, page*itemsPerPage).map(notice => (
                            <div style={style.row} key={notice.id} onClick={() => navigate(`/roomMain/${roomId}/detailAnno/${notice.id}`)}>
                                <div style={style.tdTitle}>{notice.title}</div>
                                <div style={style.tdAuthor}>{notice.nickname}</div>
                                <div style={style.tdDate}>{notice.updatedAt ? `${formatDate(notice.updatedAt)} · 수정됨` : formatDate(notice.createdAt)}</div>
                            </div>
                        ))
                        }
                    
                    </div>
                    <div style={style.pagination}>
                        <Pagination count={Math.ceil(notices.length/itemsPerPage)} page={page} onChange={handlePageChange} />
                    </div>
                </>
            )}
        </div>
    );
}
    export default RoomAnno;
