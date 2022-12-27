export const createSlice = () => {
  return {
    name: 'example slice',
    state: {
      example: 'state'
    },
    reducers: {
      log() {
        console.log('reducer call')
      }
    }
  }
}