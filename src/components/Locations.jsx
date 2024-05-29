import React, { useEffect, useState } from 'react'
import { Container, Box, Typography, Modal } from '@mui/material'
import axios from 'axios'
import CastomCard from './CastomCard';

// styles for modal window from mui
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [visibleResidents, setVisibleResidents] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const query = `
          query($page: Int){
            locations(page: $page){
              info {
                count
                pages
              }
              results {
                id
                name
                type
                residents {
                  id
                  name
                }
              }
            }
          }
        `;
        const variables = { page: page };
        const res = await axios.post('https://rickandmortyapi.com/graphql', {
          query: query,
          variables: variables
        });

        const data = res.data.data.locations;
        setLocations(data.results);
        setPageQty(data.info.pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLocation();
  }, [page]);

  const handleOpen = (location) => {
    setSelectedLocation(location);
    setVisibleResidents(location.residents.slice(0, 3));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLocation(null);
    setVisibleResidents([]);
  };

  return (
    <Container sx={{ my: 4 }}>

      <CastomCard items={locations} pageQty={pageQty} page={page} setPage={setPage} handleOpen={handleOpen} type='location'/>
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedLocation && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedLocation.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Type: {selectedLocation.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Residents:
              </Typography>
              {visibleResidents.map((resident, index) => (
                <Typography key={resident.id} variant="body2" color="text.secondary">
                  {index + 1}. {resident.name}
                </Typography>
              ))}
            </>
          )}
        </Box>
      </Modal>
    </Container>
  )
}

export default Locations
