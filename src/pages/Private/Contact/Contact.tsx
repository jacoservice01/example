import { useFetchAndLoad } from '../../../hooks';
import { sendMail } from '../../../services/public.service';
import { validateName, validateDescription, validateEmail, incorrectName, incorrectMessage, incorrectEmail,
   nameRequired, messageRequired, emailRequired } from '../../../utilities';
import { LayoutContainer } from '../../../styled-components';
import { Backdrop, CircularProgress, Button, TextField, Box } from '@mui/material';
import { useState} from 'react';
import { useForm } from 'react-hook-form';
import { EmailForm } from '../../../models';


export const Contact = () => {


  const {loading, callEndpoint } = useFetchAndLoad();
  const [response, setResponse] = useState("");

  const { register, handleSubmit, reset , formState: {errors} } = useForm<EmailForm>()

  
  const onSubmit = (data: EmailForm) => 
  {
    console.log("hola");
      const fetchData = async () => {
      const res = await callEndpoint(sendMail({name: data.name, email: data.email, message: data.message}));
      if(res.data.success){
        setResponse("The form has been submitted successfully.");
        reset(); 
      } else{
        setResponse("There was an error sending the message, please try again later.")
      }

    }
    console.log("hola2");
    fetchData().catch((err)=> console.log(err))    
  }

  return (
    <LayoutContainer >
      <Box component="span" sx={{ p: 4, border: '1px dashed grey', alignSelf: "center" }}>     
        <h1>If you have a query you can write me</h1>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>     
        <form onSubmit={handleSubmit(onSubmit)} >

        <TextField
          type="text"
          error={errors.name?true:false}
          id="name"
          label="name"
          margin="normal"
          {...register("name", { required: true, pattern: validateName })}
          helperText={errors.name?.type === 'pattern'?incorrectName:errors.name? nameRequired:""}
          style={{width:"49%"}}        
        />{" "}
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
        <TextField
          error={errors.message?true:false}
          id="message"
          label="message"
          margin="normal"
          multiline
          rows={5}
          
          {...register("message", { required: true, pattern: validateDescription })}
          helperText={errors.message?.type === 'pattern'?incorrectMessage:errors.message? messageRequired:""}
          fullWidth
            />
        <br/>

        
        <Button variant="outlined" type='submit'>Send</Button>
        <p>{response}</p>
        </form>
      </Box>
    </LayoutContainer>
  );
};
export default Contact;
