import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Modal, Button } from '@mui/material';
import axios from 'axios';
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

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [visibleCharacters, setVisibleCharacters] = useState([]);
  const [showAllCharacters, setShowAllCharacters] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(`https://rickandmortyapi.com/api/episode`, {
          params: { page: page }
        });
        console.log('Episodes data:', res.data); 
        setEpisodes(res.data.results || []);
        setPageQty(res.data.info.pages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEpisodes();
  }, [page]);

  const handleOpen = async (episode) => {
    try {
      const characterRequests = episode.characters.slice(0, 3).map(url => axios.get(url));
      const characterResponses = await Promise.all(characterRequests);
      const characters = characterResponses.map(res => res.data);
      setSelectedEpisode(episode);
      setVisibleCharacters(characters);
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEpisode(null);
    setVisibleCharacters([]);
    setShowAllCharacters(false);
  };

  const handleLoadMore = async () => {
    if (!selectedEpisode) return;

    try {
      const characterRequests = selectedEpisode.characters.slice(visibleCharacters.length).map(url => axios.get(url));
      const characterResponses = await Promise.all(characterRequests);
      const moreCharacters = characterResponses.map(res => res.data);
      setVisibleCharacters(prevCharacters => [...prevCharacters, ...moreCharacters]);
      setShowAllCharacters(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ my: 4 }}>
      <CastomCard items={episodes} pageQty={pageQty} page={page} setPage={setPage} handleOpen={handleOpen} type='episode'/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedEpisode && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedEpisode.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Air Date: {selectedEpisode.air_date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Episode: {selectedEpisode.episode}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Characters:
              </Typography>
              {visibleCharacters.map((character, index) => (
                <Typography key={character.id} variant="body2" color="text.secondary">
                  {index + 1}. {character.name}
                </Typography>
              ))}
              {!showAllCharacters && visibleCharacters.length < selectedEpisode.characters.length && (
                <Button onClick={handleLoadMore} sx={{ mt: 2 }}>
                  Load more
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default Episodes;
