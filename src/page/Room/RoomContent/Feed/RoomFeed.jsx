import React, { useState, useEffect, useRef} from 'react';
import "./RoomFeed.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RoomMain from '../../RoomMain';

function RoomFeed({onContentChange}) {
  const [isClicked, setIsClicked] = useState(false);
  const [modalClicked, setModalClicked] = useState(false);
  const [member, setmember] = useState("승현");
  const modalRef = useRef(null);

  useEffect(()=>{
    const handleClickOutsideModal = (event) => { 
      if (!modalRef.current.contains(event.target)) {
          setModalClicked(false);
      }else{
        setModalClicked(true);
      }
    };
    window.addEventListener('click', handleClickOutsideModal);

    return () => {
      window.removeEventListener('click', handleClickOutsideModal);
    };
  },[])

  const modal = () => {
    setModalClicked(!modalClicked);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    if(isClicked === false){
      increaseLikeCount();
    }else{
      decreaseLikeCount();
    }
  };

  // const MyComponent = () => {
  //   if(member == '승현'){
  //     return <div>This is rendered when condition is true.</div>;
  //   }else{
  //     return <div>This is rendered when condition is false.</div>;  
  //   }
  // }

  const increaseLikeCount = () => {
    let Count = document.getElementById("likecount").innerHTML;
    Count = (Number)(Count) + 1;
    document.getElementById("likecount").innerHTML = Count;
  }

  const decreaseLikeCount = () => {
    let Count = document.getElementById("likecount").innerHTML;
    Count = Count - 1;
    document.getElementById("likecount").innerHTML = Count;
  }

  const location = (content) => {
    onContentChange(content);
    console.log(content);
  }

  return (
    <div className='roomfeed'>
      <div className='room-box'>
        <div className='writeFeed' style={{cursor:'pointer'}} onClick={() => location('writefeed')} >작성하기</div> 
        <div className='feed'>      
          <div className='feedHeader'>
            <div className='userheader'>
              <div className='userProfile'></div>
              <span className='username'>shyn0604</span>
            </div>
            <div className='drop-box'>
              <MoreVertIcon onClick={modal} style={{cursor:'pointer'}} ref={modalRef} ></MoreVertIcon> 
              <div className={`droppage ${modalClicked ? 'show' : ''}`} >  
                  <ul>
                      <li>
                        <a href="#">수정</a>
                      </li>
                      <li>
                        <a href="#" style={{color:'red'}}>삭제</a>
                      </li>
                    </ul>
              </div>
            </div>
          </div>
          <div className='feedContent'>
            <div className='feedimg'>
              <div>
                <div className='bigimg'></div>
              </div>
              <div className='feedimg2'>
                <div className='smallimg'></div>
                <div className='otherimg'><em className='num'>2+</em></div>
              </div>
            </div>
            <div className='Title'>lorem</div>
            <div className='Content'>citationem dicta rerum tempora reprehenderit voluptatibus repudiandae consequatur consectetur similique suscipit iste aut consequuntur, blanditiis eligendi unde eius!</div>
          </div>
          <div className='feedfooter'>
            <div onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
              <FavoriteIcon style={{color: 'red', position:'relative' ,display : isClicked? 'block' : 'none' , fontSize:'25px'}} ></FavoriteIcon>
            </div>
            <div onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
              <FavoriteBorderIcon style={{color:'gray', position:'relative',display : !isClicked? 'block' : 'none', fontSize:'25px'}}/>
            </div>
            <div id = "likecount" style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '2px'}}>12</div>
              <ModeCommentOutlinedIcon style={{color:'gray', fontSize : '23px', marginLeft : '9px' ,marginTop : '2px',cursor : 'pointer' }}/> 
              <div style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '3px'}}>31</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomFeed;