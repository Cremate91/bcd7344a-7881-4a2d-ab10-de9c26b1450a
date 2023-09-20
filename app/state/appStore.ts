import { create } from 'zustand'
import { TLEvent } from '../types'

interface AppState {
  events: TLEvent[] | [],
  cart: TLEvent[] | [],
  isCartDrawerOpen: boolean,
  toggleCartDrawer: () => void,
  isDateModalOpen: boolean,
  toggleDateModal: () => void,
  initEvents: () => void,
  addToCart: (event: TLEvent) => void
  removeFromCard: (event: TLEvent) => void
  filterBySearch: (search: string) => void
  filterDateStart: Date
  filterDateEnd: Date
  setFilterDateStart: (date: Date) => void
  setFilterDateEnd: (date: Date) => void
}

export const useAppStore = create<AppState>()(set => ({
  events: [],
  cart: [],
  isCartDrawerOpen: false,
  toggleCartDrawer: () => set(state => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  isDateModalOpen: false,
  toggleDateModal: () => set(state => ({ isDateModalOpen: !state.isDateModalOpen })),
  initEvents: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_TL_URL}`)
    const data: TLEvent[] = await res.json()
    set({ events: data })
  },
  addToCart: event => set(state => ({
    events: state.events.filter(storeEvent => storeEvent._id !== event._id),
    cart: [...state.cart, event]
  })),
  removeFromCard: event => set(state => ({
    events: [...state.events, event],
    cart: state.cart.filter(stateEvent => stateEvent._id !== event._id)
  })),
  filterBySearch: search => (set(state => ({
    events: state.events.filter(storeEvent => storeEvent.title.includes(search))
  }))),
  filterDateStart: new Date('2021-10-13'),
  filterDateEnd: new Date('2021-10-15'),
  setFilterDateStart: date => (set(() => ({filterDateStart: date}))),
  setFilterDateEnd: date => (set(() => ({filterDateEnd: date})))
}))
