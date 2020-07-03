import { History } from "history";
import { combineReducers } from "redux";
import { Todo } from "../model/index";
import * as todoReducer from "./todo";

<% if (includeSnackbars) { %>
import * as snackbarReducer from './snackbarEvent';
import { SnackbarEvent } from "../model";
<% } %>

export interface RootState {
	todoList: Todo[];<% if (includeSnackbars) { %>
     snackbarEvents: SnackbarEvent[];	<% } %>
}

export default (history: History) =>
	combineReducers({
		...todoReducer,<% if (includeSnackbars) { %>
		...snackbarReducer,<% } %>
	});
