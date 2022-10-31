import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    token: null
  },
  reducers: {
    setCredentials: (state, { payload: { id, email, firstName, lastName, token } }) => {
      state.id = id
      state.email = email
      state.firstName = firstName
      state.lastName = lastName
      state.token = token
    },
    removeCredentials: (state) => {
      state.id = null
      state.email = null
      state.firstName = null
      state.lastName = null
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCredentials, removeCredentials } = userSlice.actions

export default userSlice.reducer