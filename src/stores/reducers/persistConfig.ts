import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducers from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['patient', 'employee'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;
