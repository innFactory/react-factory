import { History } from "history";
import { combineReducers } from "redux";
import { Todo } from "../model/index";
import * as todoReducer from "./todo";
import * as configReducer from './config';


<% if (includeSnackbars) { %>
import * as snackbarReducer from './snackbarEvent';
import { SnackbarEvent } from "../model";
<% } %>

export interface RootState {
	drawerOpen: boolean;
	todoList: Todo[];<% if (includeSnackbars) { %>
     snackbarEvents: SnackbarEvent[];	<% } %>
}

export default (history: History) =>
	combineReducers({
		...configReducer,
		...todoReducer,<% if (includeSnackbars) { %>
		...snackbarReducer,<% } %>
	});
