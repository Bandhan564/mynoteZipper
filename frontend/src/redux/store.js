import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducer/userReducer";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from "./reducer/notesReducer";

const reducer = combineReducers({
   userLogin:userLoginReducer,
   userRegister:userRegisterReducer,
   noteList:noteListReducer,
   noteCreate:noteCreateReducer,
   noteUpdate:noteUpdateReducer,
   noteDelete:noteDeleteReducer,
   userUpdate:userUpdateReducer
})

const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo")) || null;
const initialState = {
    userLogin:{userInfo:userInfoFromStorage}
};

const middlewares = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlewares)))

export default store