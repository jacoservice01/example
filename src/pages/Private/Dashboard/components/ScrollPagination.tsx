import { createCharacterAdapter } from '../../../../adapters';
import { useFetchAndLoad } from '../../../../hooks';
import { addList, resetCharacter} from '../../../../redux/states/character';
import { AppStore } from '../../../../redux/store';
import { getCharacter} from '../../../../services/public.service';
import { Backdrop, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CardMorty from './CardMorty';
import { useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';


export const ScrollPagination = () => {
    const [page,setPage] = useState(1);
    const [pages,setPages] = useState(2);


    const [lastElement, setLastElement] = useState(null);
    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                console.log("first---")
                console.log(first)
                setPage(state => state+1);
                
                						
            }
        },{threshold: 0.25, root: null})
    )
    useEffect(() => {		
		const currentElement = lastElement;
		const currentObserver = observer.current;
		if (currentElement) {
			currentObserver.observe(currentElement);
		}
		return () => {
			if (currentElement) {				
				currentObserver.unobserve(currentElement);
				
			}
		};
	}, [lastElement]);

  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const characterState = useSelector((store: AppStore) => store.character);
    useEffect(()=>{
        dispatch(resetCharacter());
    },[])

    useEffect(() => {	
        if(page<=pages){
            const fetchData = async () => {
                const res = await callEndpoint(getCharacter(page));
                setPages(res.data.info.pages);
                const transform = res.data.results.map((row: any)=>{
                    return createCharacterAdapter(row)
                })
                dispatch(addList(transform));    
            }
            fetchData().catch((err)=> console.log(err))
        }	
		
	}, [page]);


  return (
    
    <>
        <Stack style={{width: "100%", alignItems: "center"}}>
            <h2>Scroll pagination</h2>
        </Stack>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>                       
        {              
            characterState.map((row: any)=><CardMorty ref={setLastElement} key={row.id}  character={row}/>)
        }      
    </>
  );
};

export default ScrollPagination;