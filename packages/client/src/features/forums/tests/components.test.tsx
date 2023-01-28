import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from "@testing-library/react";

import { ForumList  } from '../components/ForumList'
import { ForumSendMessage } from '../components/ForumSendMessage'
import { NewForumThread } from '../components/NewForumThread'
import { Forum } from '../components/Forum';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

const themes = [
  'Развитие портала', 
  'Технологии', 
  'Политика', 
  'Творчество', 
  'Recycle Bin'
]
const titles = ['Форумы', 'Темы', 'Ответы']
const headers = ['Название темы', 'Последнее сообщение', 'Ответов', 'Просмотров']

const beDefined = (text: string) => expect(screen.getByText(text)).toBeDefined()

describe('forums', () => {
  describe('send message component', () => {
    test('has default title', () => {
      render(<ForumSendMessage />)
      beDefined('Отправить')
    })
    test('has custom title', () => {
      render(<ForumSendMessage submitButtonTitle="Another label" />)
      beDefined("Another label")
    })
  })

  describe('forum list component', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/forums']}>
            <ForumList />
        </MemoryRouter>
      )
    })

    test('have titles', async () => {
      titles.forEach(title => beDefined(title))
    })

    test('have themes', async () => {
      themes.forEach(theme => beDefined(theme))
    })

    test('navigates to selected forum', () => {
      userEvent.setup().click(screen.getByTestId(`selected-forum-0`)).then(() => {
        beDefined('Развитие портала')
        headers.forEach(header => beDefined(header))
      })
    })
  })

  describe('forum component', () => {
    test('has headers', () => {
      render(<Forum />, { wrapper: BrowserRouter })

      headers.forEach((header) => beDefined(header))
    })
    test('should have pages', () => {
      render(<Forum />, { wrapper: BrowserRouter })

      beDefined('Страницы')
    })

    test('navigates to new thread', () => {
      const route = '/forums/evolution'

      render(
        <MemoryRouter initialEntries={[route]}>
            <Forum />
        </MemoryRouter>
      )

      waitFor(() => screen.getByTestId("link-create-thread")).then(() => {
        userEvent.setup().click(screen.getByTestId("link-create-thread"))
          .then(() => {
            [
              'Название темы', 
              'Новое сообщение', 
              'Создать'
            ].forEach(text => beDefined(text))
          })
      })
    })
  })

  describe('new forum thread component', () => {
    test('has button with label', () => {
      render(<NewForumThread />, { wrapper: BrowserRouter })
      beDefined('Создать')
    })
  })
})