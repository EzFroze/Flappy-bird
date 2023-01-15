import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import { pink } from '@mui/material/colors';
import { FC } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { User, UsersListProps } from '../types';

const UsersList: FC<UsersListProps> = ({ users }) => {
    return (
        <List
            sx={{ width: '100%', maxWidth: 750, bgcolor: 'background.paper' }}>
            {users.map((user: User) =>
                <Paper sx={{ padding: 0 }} elevation={2} key={user.id}>
                    <ListItem sx={{ mb: '5px', pl: '5px', pr: '5px' }}>
                        <ListItemText sx={{ textAlign: 'center', width: 50 }} >
                            <Paper elevation={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 10, width: 64, height: 64 }}>
                                {user.place == 1 &&
                                    <EmojiEventsIcon sx={{ color: 'orange', width: 48, height: 48 }} />
                                }
                                {user.place == 2 &&
                                    <WorkspacePremiumIcon sx={{ color: 'silver', width: 48, height: 48 }} />
                                }
                                {user.place == 3 &&
                                    <CelebrationIcon sx={{ color: '#cd7f32', width: 48, height: 48 }} />
                                }
                                {user.place > 3 &&
                                    user.place
                                }
                            </Paper>
                        </ListItemText>
                        <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center', width: 100, height: 64 }}>
                            <Paper elevation={1} sx={{ borderRadius: 10, width: 64, height: 64 }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://artcorgi.com/wp-content/uploads/2014/09/happy.png"
                                    sx={{ bgcolor: pink[500], width: 64, height: 64 }}
                                />
                            </Paper>
                        </ListItemAvatar>
                        <ListItemText sx={{ textAlign: 'center', width: 200 }} primary={user.name} />
                        <ListItemText sx={{ textAlign: 'center', width: 200 }} primary={user.scores} />
                        <ListItemText sx={{ textAlign: 'center', width: 200 }} primary={user.date} />
                    </ListItem>
                </Paper>
            )}
        </List >
    );
};

export default UsersList;