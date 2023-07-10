import React, { useState } from 'react';
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';



function Note() {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheckedItems, setIsCheckedItems] = useState([]);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: '이예림0000000000',
      content: '안녕하세요~~~ 모임에 가입하고 싶어용~~',
      date: '2023-07-03'
    },
    {
      id: 2,
      name: '천승현',
      content: '안녕하세요~~~ 모임에 가입하고 싶어용~~',
      date: '2023-07-03'
    },
    {
      id: 3,
      name: '정세훈',
      content: '안녕하세요~~~ 모임에 가입하고 싶어용~~',
      date: '2023-07-03'
    },
    {
      id: 4,
      name: '홍성빈',
      content: '안녕하세요~~~ 모임에 가입하고 싶어용~~dddddddddddddddddd',
      date: '2023-07-03'
    }
  ]);

  const handleCheckAll = () => {
    setIsCheckedAll(!isCheckedAll);
    setIsCheckedItems([]);
  };

  const handleCheckItem = (index) => {
    const updatedCheckedItems = [...isCheckedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setIsCheckedItems(updatedCheckedItems);
    setIsCheckedAll(false);
  };

  const handleDeleteChecked = () => {
    if (isCheckedAll) {
      setTableData([]);
      setIsCheckedItems([]);
    } else {
      const updatedTableData = tableData.filter((_, index) => !isCheckedItems[index]);
      setTableData(updatedTableData);
      setIsCheckedItems([]);
    }
  };

  return (
    <div className="note wrap">
      <div className='note-flex'>
        
        <div>
          <div>
          <button className='note-btn' onClick={handleDeleteChecked}>쪽지삭제</button>
            <table>
              <thead>
                <tr>
                  <th scope='col' className='check'>
                    <input
                      type="checkbox"
                      checked={isCheckedAll}
                      onChange={handleCheckAll}
                    />
                  </th>
                  <th scope='col' className='th-name'>보낸사람</th>
                  <th scope='col' className='th-content'>내용</th>
                  <th scope='col' className='th-date'>날짜</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row.id}>
                    <td className='check'>
                      <input
                        type="checkbox"
                        checked={isCheckedAll || isCheckedItems[index]}
                        onChange={() => handleCheckItem(index)}
                      />
                    </td>
                    <td className='td-name'><p>{row.name}</p></td>
                    <td className='td-content'><p>{row.content}</p></td>
                    <td className='td-date'><p>{row.date}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination count={10} shape="rounded" 
      style={{display: 'flex',
              justifyContent: 'center',
              marginTop: '30px'}}/>
    </div>
  );
}

export default Note;

