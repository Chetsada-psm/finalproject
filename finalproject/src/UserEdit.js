import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Grid, TextField, Typography } from '@mui/material';

export default function UserEdit() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const { id } = useParams();

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://www.melivecode.com/api/users/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result['status'] === 'ok') {
          setFname(result['user']['fname']);
          setLname(result['user']['lname']);
          setUsername(result['user']['username']);
          setEmail(result['user']['email']);
          setAvatar(result['user']['avatar']);
        }
      })
      .catch(error => console.log('error', error));
  }, [id]);

  const handleSumit = async (event) => {
    event.preventDefault();

    const userData = {
      id, // Include the user ID
      fname,
      lname,
      username,
      email,
      avatar,
    };

    try {
      const response = await fetch('https://www.melivecode.com/api/users/update/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);

        if (result.status === 'ok') {
          window.location.href = '/';
        }
      } else {
        alert('Failed to update user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography>
          <Box sx={{ fontSize: 'h6.fontSize', m: 1 }}>Edit User</Box>
        </Typography>
        <form onSubmit={handleSumit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="fname"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setFname(e.target.value)}
                value={fname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lname"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setLname(e.target.value)}
                value={lname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="avatar"
                label="Avatar"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setAvatar(e.target.value)}
                value={avatar}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant="contained" fullWidth>
                Update User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
