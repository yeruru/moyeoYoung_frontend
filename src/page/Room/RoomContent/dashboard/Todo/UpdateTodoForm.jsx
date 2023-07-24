import React, { useState } from 'react';
import { TextField, InputAdornment, Button, Box } from '@mui/material';

function UpdateTodoForm({ todo, updateTodo, setIsEditing }) {
  const [content, setContent] = useState(todo.content);

  function handleSubmit(e) {
    e.preventDefault();
    if (content) {
      updateTodo({
        ...todo,
        content,
      });
      setContent('');
    }
    setIsEditing(false);
  }

  const style = {
    input: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 0,
        '&.Mui-focused fieldset': {
          borderColor: '#1EC078',
        },
        '& fieldset': {
          borderColor: '#ddd',
        },
      },
    },
    button: {
      backgroundColor: 'transparent',
      color: '#1EC078',
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, mb: 2, width: '400px', border: '1px solid #ddd' }}>
      <TextField
        variant="outlined"
        placeholder="수정할 항목을 작성하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        sx={style.input}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button style={style.button} type="submit">
                수정하기
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default UpdateTodoForm;
