import { Typography, Box, Backdrop, CircularProgress, Button, TextField } from "@mui/material";
import { LayoutContainer} from "../../styled-components";
import jaco from '../../assets/jaco.png';
import "./styles.css";
import { useEffect, useState } from 'react';
import { useFetchAndLoad } from "../../hooks";
import { sendMail } from "../../services/public.service";
import { emailRequired, incorrectEmail, validateEmail } from "../../utilities";
import { EmailForm } from "../../models";
import { useForm } from "react-hook-form";

function DeleteAccount() {

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
        width={"700px"}
        alt={"jacoservice"}
        loading="lazy"
    />
    <Typography variant="h6" gutterBottom>
        Si deseas eliminar definitivamente tu cuenta, deja aqui tu correo con el que te subscribiste, los datos se eliminaran en un plazo de 90 dias<br/>
        <h4>Datos a eliminar</h4>
        <ul>
            <li>Se eliminara la direccion y ubicación que proporcionaste para realizar tus pedidos</li>
            <li>Tambien se eliminara los mensajes de chat que hiciste al usar la aplicacion</li>
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
export default DeleteAccount;
