import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Test = ({ contents }) => {

    console.log(contents);
    const temp = ['title', 'start', 'end'];
    const [dense, setDense] = React.useState(false);

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Text only
            </Typography>
            <Demo>
                <List dense={dense}>
                    {
                        temp.map((item) => {
                            return <ListItem>
                                <ListItemText
                                    primary={`${contents[item]}`} 
                                />
                            </ListItem>
                        })
                    }

                </List>
            </Demo>
        </Grid>
    );
}

export default Test;