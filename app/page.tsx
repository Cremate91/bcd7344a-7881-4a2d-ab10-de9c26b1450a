'use client'

import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import EventCard from './components/EventCard';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useEffect, useState } from 'react';
import { useAppStore } from './state/appStore';
import format from 'date-fns/format';
import compareAsc from 'date-fns/compareAsc';
import groupBy from 'lodash/groupBy'
import { Card, CardActions, CardContent, CardMedia, Drawer, IconButton, List, ListItem } from '@mui/material';

export default function Home() {
  const {
    events,
    initEvents,
    removeFromCard,
    cart,
    isCartDrawerOpen,
    toggleCartDrawer,
    filterDateStart,
    filterDateEnd
  } = useAppStore();

  useEffect(() => {
    initEvents()
  }, [initEvents])

  if (events?.length === 0) return (
    <Typography variant='h2'>
      No Events
    </Typography>
  )

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    return eventDate >= filterDateStart && eventDate < filterDateEnd
  }).sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))

  const groupedData = groupBy(filteredEvents, event => { return event.date })


  return (
    <main className="flex max-w-none md:max-w-6xl mx-auto flex-col p-4">
      <div className='relative'>
        <Box className="pb-4">
          <Chip variant="outlined" label='London' avatar={<Avatar src="https://flagcdn.com/32x24/gb.png" />} />
          <Chip className='ml-4' variant="outlined" label={`${format(filterDateStart, 'dd.MM.y')} - ${format(filterDateEnd, 'dd.MM.y')}`} />
        </Box>
        <Typography variant='h2'>
          Public Events
        </Typography>
        {
          Object.entries(groupedData).map(([key, events], i) => {
            return (
              <div key={`date-${key}`}>
                <Typography variant='h3' className="my-4 p-4 text-2xl text-blue-500 uppercase sticky top-0 bg-blue-50 bg-opacity-80 shadow-sm z-50">
                  {format(new Date(key), 'dd.MM.y')}
                </Typography>
                <ul className='grid md:grid-cols-3 gap-4'>
                  {events.map(event => {
                    return (
                      <li key={`tl-events-${event._id}`}>
                        <EventCard eventData={event} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })
        }
        <div>

        </div>
        <Drawer anchor='right' open={isCartDrawerOpen} onClose={toggleCartDrawer}>
          <List className='w-full md:w-96'>
            {cart.length > 0 ?
              cart.map(event =>
                <ListItem key={`cart-${event._id}`} className='w-full'>
                  <Card className='flex'>
                    <Box className="flex">
                      <CardMedia
                        component="img"
                        className='w-28'
                        image={event.flyerFront}
                        alt={`${event.title} event cover`}
                      />
                      <CardContent className='flex-1'>
                        <Typography component="div" variant="h5">
                          {event.title}
                        </Typography>
                      </CardContent>
                      <CardActions className='flex justify-end'>
                        <IconButton size="large" aria-label="add to cart" color="error" onClick={() => removeFromCard(event)}>
                          <DeleteOutlinedIcon fontSize='medium' />
                        </IconButton>
                      </CardActions>
                    </Box>

                  </Card>
                </ListItem>
              ) :
              <Typography component="div" variant="h5" className='p-4'>
                No Items in Cart
              </Typography>}
          </List>
        </Drawer>
      </div>
    </main>
  )
}
