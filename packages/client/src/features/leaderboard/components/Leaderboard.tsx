import { Typography, Container } from '@mui/material';
import { FC, useEffect, useState, useMemo } from 'react';
import UsersList from './UsersList';
import { useFetching } from '../hooks/useFetching';
import UsersService from '../services/UsersService';
import { getPageCount } from '../utils/pages';
import { useUsers } from '../hooks/useUsers';
import { FetchUsersType, SortOrder } from '../types';
import { ColumnHeader } from './ColumnHeader';
import { styles } from '../styles/styles';

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

    return (
        <Container sx={styles.startContainer}>
            <Typography textAlign={'center'} variant="h4">
                Результаты
            </Typography>
            <Container disableGutters  sx={styles.horizontalContainer}>
                <ColumnHeader text='Место' width={150} changeSortOrder={changeSortOrder} sortField={sortFields.id}/>
                <ColumnHeader text='Игрок' width={200} changeSortOrder={changeSortOrder} sortField={sortFields.name}/>
                <ColumnHeader text='Счёт' width={200} changeSortOrder={changeSortOrder} sortField={sortFields.scores}/>
                <ColumnHeader text='Дата' width={200} changeSortOrder={changeSortOrder} sortField={sortFields.date}/>
            </Container>
            <UsersList users={sortedAndSearchedUsers} />
        </Container>
    );
};

