import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle, Typography, TextField, Paper, Grid, List, ListItem, ListItemText, Fab } from '@material-ui/core'
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone'
import SendIcon from '@material-ui/icons/Send'
import Message from '../../models/Message'
import { hourConvert, fullNameValidation } from '../../helpers'
import MenuBar from '../menu-bar'
import './chat-styles.scss'

const websocket = new WebSocket('ws://localhost:1337')
websocket.onmessage = event => console.log('Websocket server => OnMessage')

const Chat: React.FC = () => {
  const [author, setAuthor] = useState('')
  const [dialogOpen, setDialogOpen] = useState(true)
  const [buttonActive, setButtonActive] = useState(false)
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<Message[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    websocket.onmessage = event => {
      if (JSON.parse(event.data).type === 'history') {
        setHistory([...JSON.parse(event.data).data])
      }

      if (JSON.parse(event.data).type === 'message') {
        setMessages([...messages, JSON.parse(event.data).data])
      }
    }
    window.scrollTo(0, document.body.scrollHeight)
  }, [messages])

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (message.trim()) {
      websocket.send(message)
      setMessage('')
    }
  }

  const handleClickSubmit = (): void => {
    if (message.trim()) {
      websocket.send(message)
      setMessage('')
    }
  }

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAuthor(event.target.value)
    if (fullNameValidation(event.target.value)) {
      setButtonActive(true)
    } else {
      setButtonActive(false)
    }
  }

  const handleButtonName = (): void => {
    websocket.send(author)
    setDialogOpen(false)
    window.scrollTo(0, document.body.scrollHeight)
  }

  const handleFormSubmitName = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    websocket.send(author)
    setDialogOpen(false)
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <>
      <MenuBar />
      <Grid container component={Paper} className="chatSection">
        <Grid className="chatMessageList" item xs={9}>
          <List className="messageArea">
            {history.map((message: Message, i: number) => {
              return (
                <ListItem key={i} className={author === message.author ? 'alignRight' : 'alignLeft'}>
                  <Paper className="paperMessageArea" elevation={3}>
                    <Box padding={1}>
                      <ListItemText primary={`${message.text}`} secondary={<>
                        <Typography component="span" variant="subtitle2" style={{ color: `${message.color}` }}>{message.author}</Typography>
                        {` — ${hourConvert(message.time)}`}
                      </>} />
                    </Box>
                  </Paper>
                </ListItem>
              )
            })}
            {messages.map((message: Message, i: number) => {
              return (
                <ListItem key={i} className={author === message.author ? 'alignRight' : 'alignLeft'}>
                  <Paper className="paperMessageArea" elevation={3}>
                    <Box padding={1}>
                      <ListItemText primary={`${message.text}`} secondary={<>
                        <Typography component="span" variant="subtitle2" style={{ color: `${message.color}` }}>{message.author}</Typography>
                        {` — ${hourConvert(message.time)}`}
                      </>} />
                    </Box>
                  </Paper>
                </ListItem>
              )
            })}
          </List>
          <Grid container className="textArea">
            <form onSubmit={handleFormSubmit}>
              <Grid className="inputTextArea">
                <TextField id="inputMessage" onChange={e => setMessage(e.target.value)} value={message} label="Mensagem:" fullWidth />
              </Grid>
              <Grid className="alignRight submitTextArea">
                <Fab onClick={handleClickSubmit} color="primary" aria-label="add"><SendIcon /></Fab>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen}>
        <Box px={2} py={4}>
          <Grid container>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <ForumTwoToneIcon fontSize="large" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <DialogTitle className="titleNameModal"> Bem vindo ao Chat! </DialogTitle>
            </Grid>
            <Grid className="inputButtonNameArea" item xs={12}>
              <form onSubmit={handleFormSubmitName}>
                <TextField value={author} onChange={handleInputName} label="Nome completo:" fullWidth />
                <Fab disabled={!buttonActive} variant="extended" onClick={handleButtonName} size="large" color="primary" aria-label="add">Iniciar</Fab>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  )
}

export default Chat
