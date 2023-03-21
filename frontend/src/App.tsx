import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import { Box, Card, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Skeleton, TextField, Typography } from '@mui/material'
import { DateRange, Send } from '@mui/icons-material';
import { useMutation } from 'react-query';

function App() {
  const [question, setQuestion] = useState<string>('');

  const placeholder = `2022年2月の素数の日付`

  const askMutation = useMutation(
    async (question: string) => {
      const req = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question})
      })
      if(req.ok) {
        return (await req.json()) as {answer: string[]}
      }
      return null;
    }
  )
  function askQuestion() {
    askMutation.mutate(question)
  }

  function DateList() {
    return (
      <Card sx={{width: '400px', minHeight: '400px', height:'fit-content', marginX: 'auto'}}>
        {
          askMutation.isLoading
          ? <Skeleton variant="rounded" width={400} height={400}/>
          :
          <List>
            {
              (askMutation.data?.answer ?? []).map((date, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <DateRange/>
                  </ListItemIcon>
                  <ListItemText>
                    {date}
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
        }
      </Card>
    )

  }

  return (
    <div className="App">
      <Box sx={{marginX: 'auto', minWidth: "720px", maxWidth: '1280px'}}>
        <Typography variant='h5'>
          ChatGPTに日付のリストを作ってもらいます
        </Typography>
        <TextField
          sx={{paddingY: '20px', width: '400px'}}
          placeholder={placeholder}
          value={question}
          onChange={e => {
            setQuestion(e.target.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={askQuestion}>
                  <Send/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DateList/>
      </Box>
      <Footer/>
    </div>
  )
}

export default App
