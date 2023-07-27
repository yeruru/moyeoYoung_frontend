import React, { useState } from 'react';
import { TextField, InputAdornment, Box, Button } from '@mui/material';

function AddTodoForm({ addTodo, state }) {
  const [content, setContent] = useState('');
  const [placeholder, setPlaceholder] = useState("추가할 항목을 작성하세요");

  function handleSubmit(e) {
    e.preventDefault();
    if (content) {
      addTodo({ content : content });
      setContent('');
    }
  }

  const handleFocus = () => setPlaceholder("입력중...");
  const handleBlur = () => setPlaceholder("추가할 항목을 작성하세요");

  return (state ==='okMember' &&
    <Box component="form" onSubmit={handleSubmit} sx={{ border: '1px solid #ddd', width: '400px', mt: 1, mb: 2 }}>
      <TextField
        variant="outlined"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            height: '100%',
            '&.Mui-focused fieldset': {
              borderColor: '#1EC078',
            },
            '& fieldset': {
              borderColor: '',
            },
          },
        }}
      
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button sx={{ color: '#1EC078', backgroundColor: 'transparent' }} type="submit">
                추가하기
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default AddTodoForm;
