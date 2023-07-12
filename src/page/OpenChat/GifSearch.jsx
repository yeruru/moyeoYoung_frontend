import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './GifSearch.css'; // 추가 - CSS 파일

let ipmod = 1 ? 'http://localhost:8090/search-gifs' : 'http://211.108.241.185:8090/search-gifs'


const GifSearch = ({ onImageClick }) => {
  const [term, setTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const inputRef = useRef(null); // 추가 - 입력창에 대한 참조 생성

  // 추가 - 컴포넌트가 마운트되면 입력창에 포커스를 줍니다.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchGifs = async (term) => {
    if (term !== '') {
      const response = await axios.get(ipmod, {
        params: {
          q: term
        },
      });
      setGifs(response.data.results);
    } else {
      setGifs([]);
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setTerm(value);
    searchGifs(value);
  };

  const handleImageClick = (imageUrl) => {
    onImageClick(imageUrl);
  };

  return (
      <div className="modal">
        <form>
          <input
            ref={inputRef} // 추가 - 입력창에 참조 연결
            type="text"
            value={term}
            onChange={onInputChange}
            className="inputBox" 
            placeholder="GIF 검색..."
          />
        </form>
        <div className="gifContainer">
          {gifs.map((gif, index) => (
            <img
              key={index}
              src={gif.media_formats.gif.url}
              alt={gif.title}
              className="gif"
              onClick={() => handleImageClick(gif.media_formats.gif.url)}
            />
          ))}
        </div>
      </div>
  );
};

export default GifSearch;