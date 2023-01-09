import { ClassNames } from '@emotion/react';
import { Box, Typography, Button } from '@mui/material';
import React, { FC, useEffect, useState, useMemo } from 'react';
import UsersList from './UsersList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useFetching } from '../hooks/useFetching';
import UsersService from '../API/UsersService';
import { getPageCount } from '../utils/pages';
import { useUsers } from '../hooks/useUsers';

export const enum SortOrder {
    AscendingOrder,
    DescendingOrder
}

export const Leaderboard: FC = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(15);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({ sort: '', query: '', order: SortOrder.AscendingOrder });
    const sortedAndSearchedUsers = useUsers(users, filter.sort, filter.query, filter.order);

    const [fetchUsers, isUsersLoading, userError] = useFetching(async (limit: number, page: number) => {
        const [users, headers] = await UsersService.getTop(limit, page);

        const totalCount = headers.get("x-total-count");
        setUsers(users)
        setTotalPages(getPageCount(totalCount, limit))
    });

    const sortFields: Record<string, SortOrder> = useMemo(() => {
        return {
            id: SortOrder.DescendingOrder,
            name: SortOrder.DescendingOrder,
            scores: SortOrder.DescendingOrder,
            date: SortOrder.DescendingOrder
        }
    }, []);

    type FetchUsersType = ((...args: any[]) => Promise<void>)

    useEffect(() => {
        (fetchUsers as FetchUsersType)(limit, page);
    }, [page, limit])

    const changeSortOrder = (sort: string) => {
        let order = sortFields[sort];

        Object.entries(sortFields).forEach(([key, value]) => sortFields[key] = SortOrder.DescendingOrder);

        order == SortOrder.AscendingOrder ? order = SortOrder.DescendingOrder : order = SortOrder.AscendingOrder;
        sortFields[sort] = order;
        setFilter({ ...filter, sort, order });
    }

    const styles: { [key: string]: React.CSSProperties } = {
        startContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        centerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        horizontalContainer: {
            width: '750px',
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '2px'
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    return (
        <div style={styles.startContainer}>
            <Typography textAlign={'center'} variant="h4">
                Результаты
            </Typography>
            <div style={styles.horizontalContainer}>
                <Box style={styles.centerContainer} sx={{ width: 150, height: 64, bgcolor: 'lightBlue' }}>
                    <Box style={styles.container} >

                        <Button onClick={() => changeSortOrder("id")} sx={{ minWidth: 32, height: 32 }} variant="text">
                            {sortFields["id"] == SortOrder.AscendingOrder &&
                                <ArrowDownwardIcon />
                            }
                            {sortFields["id"] == SortOrder.DescendingOrder &&
                                <ArrowUpwardIcon />
                            }

                        </Button>

                        <Typography variant="h5" component="h2">
                            Место
                        </Typography>

                    </Box>
                </Box>
                <Box style={styles.centerContainer} sx={{ width: 200, height: 64, ml: '2px', bgcolor: 'lightBlue' }}>
                    <Box style={styles.container} >

                        <Button onClick={() => changeSortOrder("name")} sx={{ minWidth: 32, height: 32 }} variant="text">
                            {sortFields["name"] == SortOrder.AscendingOrder &&
                                <ArrowDownwardIcon />
                            }
                            {sortFields["name"] == SortOrder.DescendingOrder &&
                                <ArrowUpwardIcon />
                            }
                        </Button>

                        <Typography variant="h5" component="h2">
                            Игрок
                        </Typography>

                    </Box>
                </Box>
                <Box style={styles.centerContainer} sx={{ width: 200, height: 64, ml: '2px', bgcolor: 'lightBlue' }}>

                    <Box style={styles.container} >

                        <Button onClick={() => changeSortOrder("scores")} sx={{ minWidth: 32, height: 32 }} variant="text">
                            {sortFields["scores"] == SortOrder.AscendingOrder &&
                                <ArrowDownwardIcon />
                            }
                            {sortFields["scores"] == SortOrder.DescendingOrder &&
                                <ArrowUpwardIcon />
                            }
                        </Button>

                        <Typography variant="h5" component="h2">
                            Счёт
                        </Typography>

                    </Box>

                </Box>
                <Box style={styles.centerContainer} sx={{ width: 200, height: 64, ml: '2px', bgcolor: 'lightBlue' }}>
                    <Box style={styles.container} >

                        <Button onClick={() => changeSortOrder("date")} sx={{ minWidth: 32, height: 32 }} variant="text">
                            {sortFields["date"] == SortOrder.AscendingOrder &&
                                <ArrowDownwardIcon />
                            }
                            {sortFields["date"] == SortOrder.DescendingOrder &&
                                <ArrowUpwardIcon />
                            }
                        </Button>

                        <Typography variant="h5" component="h2">
                            Дата
                        </Typography>

                    </Box>

                </Box>
            </div>

            <UsersList users={sortedAndSearchedUsers} />
        </div>
    );
};

