# Social Media App
A social Media App (frontend) using React, Redux and React-router-dom. 

## Covered Concepts
* Key Redux terms: store, reducer, state, dispatch, thunk. 
* Create Redux store using `configureStore`. 
* Combine reducer logics and actions related to one state in one file: `createSlice`. 
* Redux immutable update pattern and "mutating" immutable update with `Immer` library. 
* Put async logic into `thunk`. 
* Read data from the store with the `useSelector` hook. 
* Dispatch actions to update the store using the `useDispatch` hook. 
* `createAsyncThunk` generates `pending/fulfilled/rejected` action types automatically.
* Memoized selector functions can be used to optimize performance: `createSelector`.
* Normalized state structure is a recommended approach for storing items. 
  - "Normalization" means no duplication of data, and keeping items stored in a lookup table by item ID. 
  - Normalized state shape usually looks like {ids: [], entities: {}}. 
