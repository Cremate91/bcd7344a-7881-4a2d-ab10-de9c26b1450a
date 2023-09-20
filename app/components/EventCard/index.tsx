import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { red } from '@mui/material/colors';
import { AddCircleRounded } from '@mui/icons-material';
import { TLEvent } from '@/app/types';
import { Link } from '@mui/material';
import format from 'date-fns/format';
import { useAppStore } from '@/app/state/appStore';

interface EventCardProps {
  eventData: TLEvent
}

export default function EventCard({ eventData }: EventCardProps) {
  const { addToCart } = useAppStore()

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={eventData.title}
        className='max-h-60 overflow-clip'
      />
      <CardMedia
        sx={{ height: 400 }}
        image={eventData.flyerFront || "https://fakeimg.pl/400x600?text=Cover" }
        title={eventData.title}
      />
      <CardContent>
        <Link aria-label="link to maps" href={eventData.venue.direction} target='_blank' rel="noopener">
          <PlaceOutlinedIcon className='mr-2' />
          <Typography variant='caption'>
            {eventData.venue.name}
          </Typography>
        </Link>
        {eventData.startTime && <Typography variant="body2" color="text.secondary" className='mt-2'>
          | Starts: {format(new Date(eventData.startTime), 'dd.MM.y - hh:mm')}
        </Typography>}
        {eventData.endTime && <Typography variant="body2" color="text.secondary" className='mt-2'>
          | Ends: {format(new Date(eventData.endTime), 'dd.MM.y - hh:mm')}
        </Typography>}
      </CardContent>
      <CardActions className='flex justify-end'>
        <IconButton size="large" aria-label="add to cart" color="primary" onClick={() => addToCart(eventData)}>
          <AddCircleRounded fontSize='medium' className='color-blue-500' />
        </IconButton>
      </CardActions>
    </Card>
  );
}