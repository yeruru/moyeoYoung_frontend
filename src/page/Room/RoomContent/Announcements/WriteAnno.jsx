import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function WriteAnno() {
    const navigate = useNavigate();
    const { roomId } = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [memberId, setMemberId] = useState('');
    const [nickname, setNickname] = useState('');

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
        
                        setMemberId(data.memberId);
                        setNickname(data.nickname);
                        setImageUrl(data.fileName); 
                    } else {
                        console.error('HTTP error:', response.status);
                        alert('로그인이 필요합니다!');
                        navigate(`/login`);
                    }
                } catch (error) {
                    console.error('Error fetching member info:', error);
                    alert('로그인이 필요합니다!');
                    navigate(`/login`);
                }
            }
        };
        
        fetchMemberInfo();
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        
        const notice = {
            title: title,
            content: content,
            memberId: memberId,
            nickname: nickname,
            imageUrl: imageUrl,
            roomId: roomId,
        };

        axios.post(`http://localhost:8090/rooms/${Number(roomId)}/notices`, notice)
            .then(response => {
                navigate(`/roomMain/roomAnno/${roomId}`)
            });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>공지글 작성</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>제목</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={styles.input} />

                <label style={styles.label}>내용</label>
                <textarea value={content} onChange={e => setContent(e.target.value)} style={styles.textarea} />

                <input type="hidden" value={memberId} />
                <input type="hidden" value={nickname} />
                <input type="hidden" value={imageUrl} />
                <input type="submit" value="작성하기" style={styles.submitButton} />
            </form>
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
    form: {
        display: "flex",
        flexDirection: "column"
    },
    label: {
        marginBottom: "10px"
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginBottom: "10px",
        width: "500px",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        height: "200px",
        width: "500px",
        resize: "none",
        marginBottom: "10px"
    },
    submitButton: {
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        width: "522px",

    }
};

export default WriteAnno;
