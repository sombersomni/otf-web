"use client";

import  { useState, useMemo, useCallback } from 'react';
import Button from '@mui/material/Button';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { NBATeam } from '../constants/nba';

// static mappings
const nbaTeamNames = Object.values(NBATeam).filter(team => typeof team === 'string') as string[];

const nbaTeamNameMap: {[key: string]: string} = nbaTeamNames.reduce((acc, teamName) => {
  const value = teamName.replace(' ', '-').toLowerCase();
  acc[teamName.toLowerCase()] = value;
  return acc;
}, {} as {[key: string]: string});

console.log(nbaTeamNameMap);

export default function SimulatedEventForm() {
  const [awayTeam, setAwayTeam] = useState('Atlanta Hawks');
  const [homeTeam, setHomeTeam] = useState('LA Clippers');
  const [awayScore, setAwayScore] = useState(24);
  const [homeScore, setHomeScore] = useState(53);

  // handlers
  const handleAwayTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAwayTeam(event.target.value);
  };

  const handleHomeTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const formData = {
      awayTeam: nbaTeamNameMap[awayTeam.toLowerCase()],
      homeTeam: nbaTeamNameMap[homeTeam.toLowerCase()]
    };
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

  };
  // validation
  const numErrorMessage = "Score must be less than 4 digits"

  const buttonDisabled = [awayTeam, homeTeam, awayScore, homeScore].some(value => !value)
  const nameValidation = (name: string) => !!nbaTeamNameMap[name.toLowerCase()];
  const numValidation = (num: number) => num < 1000;
  const awayTeamErrored = useMemo(() => !nameValidation(awayTeam), [awayTeam]);
  const homeTeamErrored = useMemo(() => !nameValidation(homeTeam), [homeTeam]);
  const awayScoreErrored = useMemo(() => !numValidation(awayScore), [awayScore]);
  const homeScoreErrored = useMemo(() => !numValidation(homeScore), [homeScore]);
  return (
    
    <form noValidate onSubmit={handleSubmit}>
      <FormGroup sx={{ width: '25ch' }}>
        <TextField
          label="Away Team"
          value={awayTeam}
          onChange={handleAwayTeamChange}
          required
          error={awayTeamErrored}
          helperText={awayTeamErrored ? "Must be a valid NBA team name" : "Enter A NBA Away Team Name"}
        />
        <TextField
          label="Home Team"
          value={homeTeam}
          onChange={handleHomeTeamChange}
          required
          error={homeTeamErrored}
          helperText={homeTeamErrored ? "Must be a valid NBA team name" : "Enter A NBA Home Team Name"}
        />

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
        <Button type="submit" variant="contained" color="primary" disabled={buttonDisabled}>Generate</Button>
      </FormGroup>
    </form>
  );
}
