<% if (includeSnackbars) { %>import { SnackbarEventAction } from './snackbarEvent';<% } %>
    import { TodoAction } from './todo';

export * from './todo';
<% if (includeSnackbars) { %>
export * from './snackbarEvent';<% } %>

export type Action =
    | TodoAction<% if (includeSnackbars) { %>
    | SnackbarEventAction
<% } %>;
