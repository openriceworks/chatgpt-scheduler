import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import {
  Box,
  Card,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useMutation } from "react-query";

function App() {
  const [question, setQuestion] = useState<string>("");

  const placeholder = `2022年2月の素数の日付`;

  const askMutation = useMutation(async (question: string) => {
    const req = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
    if (req.ok) {
      return (await req.json()) as { answer: string[] };
    }
    return null;
  });
  function askQuestion() {
    askMutation.mutate(question);
  }

  function DateList() {
    return (
      <Box sx={{ width: "400px", marginX: "auto" }}>
        {askMutation.isLoading ? (
          <Skeleton variant="rounded" width={400} height={100} />
        ) : askMutation.data?.answer ? (
          <List>
            {(askMutation.data?.answer ?? []).map((date, index) => (
              <ListItem key={index}>
                <ListItemText>{date}</ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <></>
        )}
      </Box>
    );
  }

  return (
    <div className="App">
      <Box
        sx={{
          marginX: "auto",
          minWidth: "720px",
          maxWidth: "1280px",
          minHeight: "400px",
          height: "fit-content",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "10px" }}>
          ChatGPTに日付のリストを作ってもらいます
        </Typography>
        <Card
          sx={{
            marginX: "auto",
            marginBottom: "10px",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <TextField
            sx={{ width: "400px" }}
            placeholder={placeholder}
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={askQuestion}>
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Card>
        <Card
          sx={{ marginX: "auto", width: "fit-content", height: "fit-content" }}
        >
          <DateList />
        </Card>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
