import { Character } from '../models';
import { loadAbort } from '../utilities';
import axios from 'axios';

export const login = () => {
  const controller = loadAbort();
  return {
    call: axios.get<Character>('https://rickandmortyapi.com/api/character/2', { signal: controller.signal }),
    controller
  };
};

export const getMorty = () => {
  return axios.get<Character>('https://rickandmortyapi.com/api/character/2');
};

export const getRick = () => {
  return axios.get<Character>('https://rickandmortyapi.com/api/character/1');
};

export const getCoolMorty = () => {
  const controller = loadAbort();
  return { call: axios.get<Character>('https://rickandmortyapi.com/api/character/2', { signal: controller.signal }), controller };
};

export const getCoolRick = () => {
  const controller = loadAbort();
  return { call: axios.get<Character>('https://rickandmortyapi.com/api/character/1', { signal: controller.signal }), controller };
};

export const getCharacter = (page: Number) => {
  const controller = loadAbort();
  return { call: axios.get<Character>('https://rickandmortyapi.com/api/character/?page='+page, { signal: controller.signal }), controller };
};

export const sendMail = (data: Object) => {
  const controller = loadAbort();
  return { call: axios.post<Character>('https://jacoservice.herokuapp.com/api/sendMail',data, { signal: controller.signal }), controller };
};

export const getMoviesByName = (s: string, page: Number) => {
  const controller = loadAbort();
  return { call: axios.get(`https://www.omdbapi.com/?apikey=8770cfb5&s=${s}&page=${page}`, { signal: controller.signal }), controller };
};