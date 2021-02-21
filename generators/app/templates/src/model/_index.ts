<% if (includeSnackbars) { %>import { SnackbarEventAction } from './snackbarEvent';<% } %>
    import { TodoAction } from './todo';
    import { ConfigAction } from './config';


export * from './todo';
<% if (includeSnackbars) { %>
export * from './snackbarEvent';<% } %>

export type Action =
    | ConfigAction | TodoAction<% if (includeSnackbars) { %>
    | SnackbarEventAction
<% } %>;
