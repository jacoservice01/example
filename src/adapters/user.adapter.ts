export const createUserAdapter = (user: any) => ({
  id: user.id,
  name: user.name,
  gender: user.gender,
  status: user.status,
  image: user.image,
  location: user.location.name,
  species: user.species,
  type: user.type
});
/*export const createUserAdapter = (user: any) => ({
  name: user.data.name,
  gender: user.data.gender,
  status: user.data.status
});
*/