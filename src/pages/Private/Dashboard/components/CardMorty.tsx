import React, {  useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import noImage from '../../../../assets/19.jpeg';
import { resolveStatus } from '../utilities';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';



export const CardMorty = ({character}: any, ref: any) => {
  const [counter,setCounter] = useState(0);
  const [favorite,setFavorite] = useState(false);
  return (
    <Card ref={ref} sx={{ maxWidth: 300 }}>
      
      <CardMedia
        component="img"
        height="300"
        width="300"
        style={{background: `url('${noImage}')` }}
        image= {character.image}
        alt="green iguana"
      />
      <CardContent>
      
      
        
        <Typography gutterBottom variant="h5" component="div">
          {character.name}
        </Typography>
        <Typography variant="body2"  >
          {resolveStatus(character.status)} <strong>{character.status+" - "+character.species}</strong> <br/>
          Last known location:<br/> <strong>{character.location}</strong>
        </Typography>
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={()=>setCounter((count)=>count+1)}>
          <ThumbUp  />
        </IconButton>
        {counter}  
        <IconButton color="error" aria-label="upload picture" component="label" onClick={()=>setFavorite(!favorite)}>
          {
            favorite
            ?<Favorite/>
            :<FavoriteBorder />

          }
        </IconButton>
      </CardContent>
    
    </Card>
  );
}
const forwardredCard3 = React.forwardRef(CardMorty);

export default forwardredCard3;