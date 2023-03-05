"use client";

import  { useState, useMemo } from 'react';
import FormGroup from '@mui/material/FormGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select'


import { NBATeam } from '../constants/nba';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

// static mappings
const nbaTeamNames = Object.values(NBATeam).filter(team => typeof team === 'string') as string[];

const nbaTeamNameMap: {[key: string]: string} = nbaTeamNames.reduce((acc, teamName) => {
  const value = teamName.replace(' ', '-').toLowerCase();
  acc[teamName.toLowerCase()] = value;
  return acc;
}, {} as {[key: string]: string});

export default function SimulatedEventForm() {
  const [awayTeam, setAwayTeam] = useState(nbaTeamNameMap[(NBATeam.ATLANTA_HAWKS as string).toLowerCase()]);
  const [homeTeam, setHomeTeam] = useState(nbaTeamNameMap[(NBATeam.LA_CLIPPERS as string).toLowerCase()]);
  const [awayScore, setAwayScore] = useState(24);
  const [homeScore, setHomeScore] = useState(53);
  const [loading, setLoading] = useState(false);

  // handlers
  const handleAwayTeamChange = (event: SelectChangeEvent) => {
    setAwayTeam(event.target.value);
  };

  const handleHomeTeamChange = (event: SelectChangeEvent) => {
    setHomeTeam(event.target.value);
  };

  const handleAwayScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwayScore(Number(event.target.value) || 0);
  };

  const handleHomeScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHomeScore(Number(event.target.value) || 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = {
      awayTeam,
      homeTeam,
      awayScore,
      homeScore
    };
    console.log(formData);
    try {
      const response = await fetch('http://localhost:8080/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  // validation
  const numErrorMessage = "Score must be less than 4 digits"
  const scoreTooHigh = (num: number) => num > 999;
  const nameCollisionErrored = useMemo(() => awayTeam == homeTeam, [awayTeam, homeTeam]);
  const awayScoreErrored = useMemo(() => scoreTooHigh(awayScore), [awayScore]);
  const homeScoreErrored = useMemo(() => scoreTooHigh(homeScore), [homeScore]);
  const buttonDisabled = (
    [awayTeam, homeTeam, awayScore, homeScore].some(value => !value)
    || nameCollisionErrored || awayScoreErrored || homeScoreErrored
  )

  return (
    <Stack spacing={4} direction="row" alignContent="center">
      <Stack
        sx={{ width: '25vw' }}
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Stack>
          <Typography variant="h4" gutterBottom>
            Simulate a Generated Post
          </Typography>
          <Typography variant="body1" gutterBottom>
            Generate a social posted based on the simulated values below.
          </Typography>
        </Stack>
          <form noValidate onSubmit={handleSubmit}>
            <FormGroup sx={{ width: '25ch' }}>
              <FormControl required error={nameCollisionErrored}>
                <InputLabel htmlFor="away-team-select">Select NBA Away Team</InputLabel>
                <Select
                  id="away-team-select"
                  value={awayTeam}
                  label="Away Team"
                  onChange={handleAwayTeamChange}
                >
                  {
                    nbaTeamNames.map(
                      name => (<MenuItem key={name} value={nbaTeamNameMap[name.toLowerCase()]}>{name}</MenuItem>)
                    )
                  }
                </Select>
                <FormHelperText>{nameCollisionErrored ? "Must be a different team name" : "Select a NBA Away Team"}</FormHelperText>  
              </FormControl>
              <FormControl required error={nameCollisionErrored}>
                <InputLabel htmlFor="home-team-select">Select NBA Home Team</InputLabel>
                <Select
                value={homeTeam}
                label="Home Team"
                onChange={handleHomeTeamChange}
                required
              >
                {
                  nbaTeamNames.map(
                    name => (<MenuItem key={name} value={nbaTeamNameMap[name.toLowerCase()]}>{name}</MenuItem>)
                  )
                }
              </Select>
              <FormHelperText>{nameCollisionErrored ? "Must be a different team name" : "Select a NBA Home Team"}</FormHelperText>
              </FormControl>
              <TextField
                label="Away Score"
                value={awayScore}
                onChange={handleAwayScoreChange}
                type="number"
                required
                error={awayScoreErrored}
                helperText={awayScoreErrored ? numErrorMessage : "Enter Away Team Score"}
              />
              <TextField
                label="Home Score"
                value={homeScore}
                onChange={handleHomeScoreChange}
                type="number"
                required
                error={homeScoreErrored}
                helperText={homeScoreErrored ? numErrorMessage : "Enter Home Team Score"}
              />
              <LoadingButton
                type="submit"
                color="primary"
                variant="outlined"
                disabled={buttonDisabled}
                loading={loading}
              >
                Generate
              </LoadingButton>
            </FormGroup>
          </form>
        </Stack>
      </Stack>
  );
}
