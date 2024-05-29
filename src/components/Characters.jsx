import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Box, Button, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Grid } from "@mui/material";
import CastomCard from './CastomCard';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pageQty, setPageQty] = useState(0);
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');

    const handleReset = () => {
        setStatus('');
        setGender('');
        setQuery('');
    }

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/`, {
                    params: {
                        page: page,
                        name: query,
                        status: status,
                        gender: gender
                    }
                });
                setCharacters(response.data.results);
                setPageQty(response.data.info.pages);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setCharacters([]);
                setPageQty(0);
            }
        };

        fetchCharacters();
    }, [query, page, status, gender]);

    return (
        <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt:3}}>
                        <FormControl sx={{ minWidth: 120, mb: 2 }}>
                            <InputLabel htmlFor="status-select">Status</InputLabel>
                            <Select
                                native
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                input={<OutlinedInput label="Status" id="status-select" />}
                            >
                                <option aria-label="None" value="" />
                                <option value="Alive">Alive</option>
                                <option value="Dead">Dead</option>
                                <option value="unknown">Unknown</option>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120, mb: 2 }}>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                id="gender-select"
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                                input={<OutlinedInput label="Gender" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                        <Button onClick={handleReset} variant="outlined">Reset</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <TextField
                            fullWidth
                            label="Search by name"
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setPage(1);
                            }}
                            margin="normal"
                            sx={{ mb: 2 }}
                        />
                        <CastomCard items={characters} pageQty={pageQty} page={page} setPage={setPage} type="character" />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Characters;
