import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    }
}));


function BeerTable(props) {
    const headRows = [
        { id: 'name', numeric: false, label: 'Beer Name' },
        { id: 'brewery', numeric: false, label: 'Brewery' },
        { id: 'abv', numeric: true, label: 'ABV (%)' },
        { id: 'type', numeric: false, label: 'Type' },
        { id: 'location', numeric: false, label: 'Location' },
    ]


    const classes = useStyles()
    const beerData = props.beerData




    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headRows.map(row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                            >
                                {row.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {beerData.map(beer => (
                        <TableRow key={beer.id}>
                            <TableCell component="th" scope="row">
                                {beer.name}
                            </TableCell>
                            <TableCell align="left">{beer.brewery}</TableCell>
                            <TableCell align="right">{beer.abv}</TableCell>
                            <TableCell align="left">{beer.type}</TableCell>
                            <TableCell align="left">{beer.location}</TableCell>                       </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
};


export default BeerTable
