import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
const Fields = ({age,handleChange}) => {
    return (
        <>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <input placeholder='Field Name' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <input placeholder='required' me='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                    </Grid>
                    <Grid item xs={6}>
                        <input placeholder='Options' name='name' className="py-2 px-4 w-full  bg-white rounded-md outline-none" />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Fields