import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { value: { fullName: '', email: '', avatarLink: '' } },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
  },
})
export const { setUser } = userSlice.actions
export default userSlice.reducer
