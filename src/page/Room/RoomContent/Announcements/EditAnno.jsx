import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const styles = {
  container: {
      width: '80%',
      margin: 'auto',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)',
      marginTop: '2rem',
      fontFamily: 'Arial, sans-serif',
      background: 'white',
  },
  formGroup: {
      marginBottom: '1rem',
  },
  formLabel: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '1.2rem',
      fontWeight: 'bold',
  },
  formInput: {
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
  },
  formTextarea: {
      width: '100%',
      padding: '0.5rem',
      fontSize: '1rem',
      borderRadius: '5px',
      border: '1px solid #ccc',
      minHeight: '100px',
  },
  submitButton: {
      padding: '0.5rem 1rem',
      fontSize: '1.2rem',
      color: 'white',
      background: 'blue',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
  }
};

function EditAnno() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { annoId, roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isNaN(annoId) && !isNaN(roomId)) {
        axios.get(process.env.REACT_APP_BURL+`/rooms/${roomId}/notices/${annoId}`)
            .then(response => {
                setTitle(response.data.title);
                setContent(response.data.content);
            });
      }
    }, [annoId, roomId]);

    const handleSubmit = event => {
        event.preventDefault();

        axios.put(process.env.REACT_APP_BURL+`/rooms/${roomId}/notices/${annoId}`, { title, content })
            .then(response => {
              navigate(`/roomMain/roomAnno/${roomId}`);
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.formGroup}>
                <label style={styles.formLabel}>제목</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={styles.formInput} />
            </div>
            <div style={styles.formGroup}>
                <label style={styles.formLabel}>내용</label>
                <div style={styles.editorContainer}>
                    <ReactQuill value={content} onChange={setContent} />
                </div>
            </div>
            <button style={styles.submitButton} type="submit" onClick={handleSubmit}>수정하기</button>
        </div>
    );
}

export default EditAnno;
