import { IconButton, InputBase, Paper, Stack, Pagination, Backdrop, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { createMovieAdapter } from '../../../../adapters';
import { useFetchAndLoad } from '../../../../hooks';
import { list, resetMovie } from '../../../../redux/states/movie';
import { AppStore } from '../../../../redux/store';
import { getMoviesByName} from '../../../../services/public.service';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  CardMovie from './CardMovie';
import { useForm } from "react-hook-form";

function Search() {
    interface EForm {
        name: string
    }
    const [page,setPage] = useState(1);
    const [pages,setPages] = useState(0);
    const [message,setMessage] = useState("");
    const [name,setName] = useState<EForm>({name: ""});

    const { loading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const movieState = useSelector((store: AppStore) => store.movie);


    

    const { register, handleSubmit} = useForm<EForm>()

   
    const getMovies = (name: string, page: Number) =>{
        setMessage("")
        const fetchData = async () => {
            dispatch(resetMovie())
            const res = await callEndpoint(getMoviesByName(name ,page));
            if(res.data.Response==='True'){
                
                setPages(Math.ceil(res.data.totalResults/10))
                const transform = res.data.Search.map((row: any)=>{
                    return createMovieAdapter(row)
                })
                dispatch(list(transform));
            }
            else{
                setMessage(res.data.Error);
                setPages(0)
            }
        }
        fetchData().catch((err)=> console.log(err)) 
    }
    const onSubmit = (data: EForm) => 
    {
        setName({name: data.name})
        setPage(1)
        getMovies(data.name, 1);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        getMovies(name.name, value)
    };

    return (
        <> 
            <Stack style={{width: "100%", alignItems: "center"}}>
                <Paper
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                    
                    <InputBase
                        id="message"
                        sx={{ ml: 1, flex: 1 }}
                        {...register("name", { required: true})}
                        placeholder="Search movie"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>                
            </Stack>
            <p>{message}</p>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {
                movieState.map((row:any)=><CardMovie key={row.imdbID} movie={row}/>)
            }            
            <Stack spacing={2} style={{width: "100%", alignItems: "center"}}>
                <Pagination count={pages} page={page} onChange={handleChange} color="secondary"  />
            </Stack>
        </>
    )
  }
  export default Search;
  