import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import noImage from '../../../../assets/noImage.jpg';


export const CardMovie = ({movie}: any) => {

  return (
    <Card sx={{ maxWidth: 300 }}>      
      <CardMedia
        component="img"
        height="450"
        width="300"
        style={{background: `url('${noImage}')`, backgroundSize: "100% 100%"}}
        image= {movie.poster}
        alt="green iguana"
      />
      <CardContent>        
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {movie.year}
        </Typography>        
      </CardContent>   
    </Card>
  );
}

export default CardMovie;