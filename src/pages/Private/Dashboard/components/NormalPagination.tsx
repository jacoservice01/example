import { createCharacterAdapter } from '../../../../adapters';
import { useFetchAndLoad } from '../../../../hooks';
import { list } from '../../../../redux/states/character';
import { AppStore } from '../../../../redux/store';
import { getCharacter} from '../../../../services/public.service';
import { Backdrop, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CardMorty from './CardMorty';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const NormalPagination = () => {
  const [page,setPage] = useState(1);
  const [pages,setPages] = useState(1);

  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const characterState = useSelector((store: AppStore) => store.character);

  useEffect(() => {		
    const fetchData = async () => {
      const res = await callEndpoint(getCharacter(page));
      setPages(res.data.info.pages);
      const transform = res.data.results.map((row: any)=>{
        return createCharacterAdapter(row)
      })
      dispatch(list(transform));
    }
    fetchData().catch((err)=> console.log(err))    
    
		
	}, [page]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };


  return (
    
    <>
        <Stack style={{width: "100%", alignItems: "center"}}>
            <h2>Normal pagination</h2>
        </Stack>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>                       
        {              
            characterState.map((row: any)=><CardMorty key={row.id}  character={row}/>)
        }       
        <Stack spacing={2} style={{width: "100%", alignItems: "center"}}>
            <Pagination count={pages} page={page} onChange={handleChange} color="secondary"  />
        </Stack>
      
    </>
  );
};

export default NormalPagination;