import React, { FormEvent, useState } from 'react'
import {
  Container,
  Box,
  Avatar,
  Typography,
  Input,
  Link,
  Button,
  Modal,
} from '@mui/material'

import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { avatarChange } from '../../../features/profile/services/ChangeAvatar'

import { RoutesEnum } from '../../../app/router/types'

import { fetchGetUser } from '../../../features/profile/services/GetUser'

export interface AvatarModal {
  modal: boolean
  toggleModal: () => void
  handleSubmit: (e: FormEvent<Element>) => void
}

export const ChangeAvatarModal: React.FC<AvatarModal> = ({
  modal,
  toggleModal,
  handleSubmit,
}) => {
  const navigate = useNavigate()

  return (
    <>
      <Modal open={modal} onClose={toggleModal}>
        <Box
          sx={{
            width: 450,
            height: 200,
            color: 'white',
            backgroundColor: '#212329',
            borderRadius: 3,
            m: '15.5rem auto auto',
            p: 1,
            textAlign: 'center',
          }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
            Загрузите ваш аватар
          </Typography>
          <form id="avatar-form" onSubmit={handleSubmit}>
            <Input
              id="avatar"
              type="file"
              name="avatar"
              sx={{ mt: 3, color: 'white' }}
            />
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: '10px',
                  fontSize: 16,
                  mt: 2,
                  color: 'white',
                  backgroundColor: '#2a2f3f',
                  '&:hover': {
                    background: '#1976d2',
                  },
                }}
                type="submit">
                Сохранить
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  )
}
