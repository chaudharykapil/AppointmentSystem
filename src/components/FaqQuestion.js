import { ExpandMore } from '@mui/icons-material'
import { Paper, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material'
import React from 'react'

export default function FaqQuestion() {
  return (
    <Paper elevation={3} sx={{width:"70%", marginY:"0.5rem"}} >
        <Accordion sx={{width:"100%",minHeight:"5rem"}}>
            <AccordionSummary
            expandIcon={<ExpandMore />}
            >
                <Typography sx={{fontSize:"1.4rem",fontWeight:"bold"}}>How long does it take to build my Dashboard?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
      </Accordion>
    </Paper>
  )
}
