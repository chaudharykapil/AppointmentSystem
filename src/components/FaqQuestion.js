import { ExpandMore } from '@mui/icons-material'
import { Paper, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material'
import React from 'react'

export default function FaqQuestion(props) {
  return (
    <Paper elevation={3} sx={{width:"70%", marginY:"0.5rem"}} >
        <Accordion sx={{width:"100%",minHeight:"5rem"}}>
            <AccordionSummary
            expandIcon={<ExpandMore />}
            >
                <Typography sx={{fontSize:"1.4rem",fontWeight:"bold"}}>{props.ques}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                {props.ans}
                </Typography>
            </AccordionDetails>
      </Accordion>
    </Paper>
  )
}
