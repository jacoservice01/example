import { ImageList, ImageListItem, Typography, Grid, Box } from "@mui/material";
import { LayoutContainer} from "../../../styled-components";
import jaco1 from '../../../assets/jaco1.png';
import jaco2 from '../../../assets/jaco2.png';
import jaco3 from '../../../assets/jaco3.jpeg';
import jaco4 from '../../../assets/jaco4.jpeg';
import jaco5 from '../../../assets/jaco5.jpeg';
import "./styles.css";
import { useEffect, useState } from 'react';

const itemData = [
  {
    img: jaco1,
    title: 'Bed',
  },
  {
    img: jaco2,
    title: 'Kitchen',
  },
  {
    img: jaco3,
    title: 'Sink',
  },
  {
    img: jaco4,
    title: 'Chairs',
  },
  {
    img: jaco5,
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  
  
];



function Home() {
  const [size,setSize] = useState('xl');

  function ddd(width: Number){
      if (width <= 576) return 'xs';
      if (width <= 768) return 'sm';
      if (width <= 992) return 'md';
      if (width <= 1200) return 'lg';
      return 'xl';
  }

  useEffect(() => {	
    window.addEventListener("resize", ()=>{  
        //console.log(window.i.innerWidth);  
        //switch (window.innerWidth){

        //}
        setSize(ddd(window.innerWidth));
      //console.log(ddd(window.innerWidth));
      
      /*if (window.innerWidth > 1023) {
          setSize(3);   
          console.log('screen large') 
        }
        else {
          setSize(2)
          console.log('screen small') 
        }*/
    });
  },[]);

  return (
  <LayoutContainer>
    <Typography variant="h4" sx={{textAlign: "center"}} gutterBottom>
      Hello, my name is Ruben.
    </Typography>
    <Typography variant="h6" gutterBottom>
    I am a web and mobile developer, I have experience in android java, react js, react native and node express for backend. Can you see the code for this page at <a href="https://github.com/ruben6b19/react-example" rel="noreferrer" target="_blank">https://github.com/ruben6b19/react-example</a>
    
    </Typography>
    <Typography variant="h6" gutterBottom>
      Can you see my last personal project bellow, can you download my app at <a href="https://play.google.com/store/apps/details?id=com.jacoservice.customer" rel="noreferrer" target="_blank">JacoService</a>    
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <div className="video-responsive">
            <iframe
              width="425"
              height="240"
              src={"https://www.youtube.com/embed/ueCGXeZK-Xk"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />     
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <ImageList sx={{ width: size==='xl'? 1000 : size==='lg'? 700: size==='md'? 550: size==='xs'? 900:700, height: 600, alignSelf: "center" }} variant="woven" cols={size==='xl'? 4 : size==='lg'? 3: size==='md'? 2: 2 } gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=161&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Box>
    
  

  </LayoutContainer>
  )
}
export default Home;
