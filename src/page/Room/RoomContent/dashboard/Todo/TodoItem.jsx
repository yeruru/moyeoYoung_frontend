import React, { useState } from 'react';
import { Checkbox, IconButton, Typography, Grid, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdateTodoForm from './UpdateTodoForm';

function TodoItem({ todo, toggleComplete, removeTodo, updateTodo, state }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  function handleCheckboxClick() {
    toggleComplete(todo.id);
  }

  function handleRemoveClick() {
    const shouldDelete = window.confirm("삭제하시겠습니까?");
    if (shouldDelete) {
      removeTodo(todo.id);
    }
  }

  function handleEditClick() {
    setIsEditing(true);
    setAnchorEl(null);
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return isEditing ? (
    <UpdateTodoForm todo={todo} updateTodo={updateTodo} setIsEditing={setIsEditing}/>
  ) : (
    <Box
      sx={{
        border: '1px solid #ddd',
        p: 0.5,
        display: 'flex',
        marginBottom: '10px',
        width: '400px',
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Typography variant="body1" style={{ textDecoration: todo.completed ? 'line-through' : null , paddingLeft: '10px' }}>
            {todo.content}
          </Typography>
        </Grid>
        { state === 'okMember' &&
          <>
          <Grid item xs={1}>
          <Checkbox
            checked={todo.completed===1 ? true : false}
            onClick={handleCheckboxClick}
            sx={{ color: (todo.completed===1 ? true : false) ? "#1EC078" : "", '&.Mui-checked': { color: "#1EC078" } }}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>수정</MenuItem>
            <MenuItem onClick={handleRemoveClick}>삭제</MenuItem>
          </Menu>
        </Grid>
        </>
        }
        
      </Grid>
    </Box>
  );
}

export default TodoItem;
