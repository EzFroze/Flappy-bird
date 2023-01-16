import { Box, Button, Typography } from '@mui/material';
import { FC } from 'react';
import { ColumnHeaderProps, SortOrder } from '../types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { styles } from '../styles/styles';

export const ColumnHeader: FC<ColumnHeaderProps> = ({ text, width, changeSortOrder, sortField, sortOrder }) => {
    return (
        <>
            <Box sx={{ width: width, height: 64, bgcolor: 'lightBlue', ...styles.centerContainer }}>
                <Box sx={styles.container} >
                    <Button onClick={() => changeSortOrder(sortField)} sx={{ minWidth: 32, height: 32 }} variant="text">
                        {sortOrder == SortOrder.AscendingOrder &&
                            <ArrowDownwardIcon />
                        }
                        {sortOrder == SortOrder.DescendingOrder &&
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

