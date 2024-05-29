import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Box, Button, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from "@mui/material";
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
                console.log(response.data);
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
        <Container>
            <TextField
                fullWidth
                label="Search by name"
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                }}
                margin="normal"
                sx={{ my: 2 }}
            />
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl sx={{ my: 2, mr: 2, minWidth: 120 }}>
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
                <FormControl sx={{ my: 2, minWidth: 120 }}>
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
            </Box>
            <Button onClick={handleReset} variant="outlined" sx={{ width: 200, height: 50, my: 2 }}>Reset</Button>
            <CastomCard items={characters} pageQty={pageQty} page={page} setPage={setPage} type="character"/>
        </Container>
    );
};

export default Characters;
