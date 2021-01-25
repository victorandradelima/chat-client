import React from 'react'
import { Box, Typography, AppBar, Toolbar } from '@material-ui/core'
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone'

const MenuBar: React.FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box pr={1}>
            <ForumTwoToneIcon />
          </Box>
          <Typography variant="h6" className="title">
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default MenuBar
