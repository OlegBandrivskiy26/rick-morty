import React from 'react';
import { Grid, CardActionArea, CardContent, CardMedia, Typography, Box, Pagination, Card } from "@mui/material";
import placeholderImage from "../img/placeholder.png";

const CastomCard = ({ items = [], pageQty, page, setPage, handleOpen, type }) => {
  return (
    <>
      <Grid container spacing={2}>
        {items.length > 0 ? (
          items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }} onClick={() => handleOpen && handleOpen(item)}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="280"
                    image={type === 'character' ? item.image : placeholderImage}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="div"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                      title={item.name}
                    >
                      {item.name}
                    </Typography>
                    {type === 'character' && (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Gender: {item.gender}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Species: {item.species}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {item.status}
                        </Typography>
                      </>
                    )}
                    {type === 'location' && (
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Type: {item.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Residents: {item.residents.length}
                        </Typography>
                      </>
                    )}
                    {type === 'episode' &&(
                      <>
                        <Typography variant="body2" color="text.secondary">
                            Air Date: {item.air_date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Episode: {item.episode}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Characters: {item.characters.length}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ my: 2 }}>
            No items found
          </Typography>
        )}
      </Grid>
      {items.length > 0 && (
        <Box spacing={2} sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => setPage(num)}
          />
        </Box>
      )}
    </>
  );
};

export default CastomCard;
