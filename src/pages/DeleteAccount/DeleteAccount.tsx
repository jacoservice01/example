import { ImageList, ImageListItem, Typography, Grid, Box, Backdrop, CircularProgress, Button, TextField, useForkRef } from "@mui/material";
import { LayoutContainer} from "../../styled-components";
import jaco1 from '../../assets/jaco1.png';
import jaco2 from '../../assets/jaco2.png';
import jaco3 from '../../assets/jaco3.jpeg';
import jaco4 from '../../assets/jaco4.jpeg';
import jaco5 from '../../assets/jaco5.jpeg';
import jaco from '../../assets/jaco.png';
import "./styles.css";
import { useEffect, useState } from 'react';
import { useFetchAndLoad } from "../../hooks";
import { sendMail } from "../../services/public.service";
import { emailRequired, incorrectEmail, validateEmail } from "../../utilities";
import { EmailForm } from "../../models";
import { useForm } from "react-hook-form";

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

  useEffect(() => {	
    window.addEventListener("resize", ()=>{  
        //console.log(window.i.innerWidth);  
        //switch (window.innerWidth){

        //}
        //setSize(ddd(window.innerWidth));
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


  const {loading, callEndpoint } = useFetchAndLoad();
  const [response, setResponse] = useState("");

  const { register, handleSubmit, reset , formState: {errors} } = useForm<EmailForm>()

  
  const onSubmit = (data: EmailForm) => 
  {
    console.log("hola");
      const fetchData = async () => {
      const res = await callEndpoint(sendMail({name: data.name, email: data.email, message: data.message}));
      if(res.data.success){
        setResponse("Tu solicitud se ha enviado correctamente.");
        reset(); 
      } else{
        setResponse("Hubo un error intenta nuevamente.")
      }

    }
    console.log("hola2");
    fetchData().catch((err)=>{
        console.log("hola2",err);
        setResponse("Hubo un error intenta nuevamente.")
    })    
  }

  return (
  <LayoutContainer>
    <Typography variant="h4" sx={{textAlign: "center"}} gutterBottom>
        Eliminacion de cuenta
    </Typography>
    <img
        src={`${jaco}?w=161&fit=crop&auto=format`}
        srcSet={`${jaco}?w=161&fit=crop&auto=format&dpr=2 2x`}
        alt={"jacoservice"}
        loading="lazy"
    />
    <Typography variant="h6" gutterBottom>
        Si deseas eliminar definitivamente tu cuenta, deja aqui tu correo con el que subscribiste, los datos se eliminaran en un plazo de 90 dias<br/>
        <h4>Datos a eliminar</h4>
        <ul>
            <li>Se eliminara la direccion y ubicacion que proporcionaste para realizar tus pedidos</li>
            <li>Tambien se eliminara los mensajes de chat de la aplicacion</li>
        </ul>
        <h4>Datos a conservar:</h4>
        <ul>
            <li>Se conservara los pedidos que hiciste solo para fines estadisticos para el comercio</li>
        </ul>

    </Typography>
    <Box component="span" sx={{ p: 4, border: '1px dashed grey', alignSelf: "center" }}>     
        <h1>Escribe aqui tu correo a eliminar</h1>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>     
        <form onSubmit={handleSubmit(onSubmit)} >

        <TextField
          type="text"
          error={errors.email?true:false}
          id="email"
          label="email"
          margin="normal"
          {...register("email", { required: true, pattern: validateEmail })}
          helperText={errors.email?.type === 'pattern'?incorrectEmail:errors.email?emailRequired: ""}
          style={{width:"49%"}}        
        />
        
        <br/>

        
        <Button variant="outlined" type='submit'>Send</Button>
        <p>{response}</p>
        </form>
    </Box>
  </LayoutContainer>
  )
}
export default Home;
