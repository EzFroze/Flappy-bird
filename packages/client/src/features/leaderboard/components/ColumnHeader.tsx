import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { SortOrder } from '../types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { styles } from '../styles/styles';

interface ColumnHeaderProps {
    text:string
    width: number
    changeSortOrder:(sort: string) => void
    sortField:any
}

export const ColumnHeader: FC<ColumnHeaderProps> = ({ text, width, changeSortOrder, sortField }) => {
    return (
        <>
            <Box sx={{  width:width, height: 64, bgcolor: 'lightBlue', ...styles.centerContainer }}>
                <Box sx={styles.container} >
                    <Button onClick={() => changeSortOrder("id")} sx={{ minWidth: 32, height: 32 }} variant="text">
                        {sortField == SortOrder.AscendingOrder &&
                            <ArrowDownwardIcon />
                        }
                        {sortField == SortOrder.DescendingOrder &&
                            <ArrowUpwardIcon />
                        }
                    </Button>
                    <Typography variant="h5" component="h2">
                        {text}
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

