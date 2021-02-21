import * as React from 'react';
import { useSelector } from 'react-redux';
import { Router, RouteMiddleware, Redirect, stringParser } from 'react-typesafe-routes';
import { HomePage, TodoPage } from './pages';

// Read more about writing a middleware or add query parameter etc.
// https://github.com/innFactory/react-typesafe-routes

export const router = Router(route => ({
	home: route('/', {
		component: HomePage,
	}),
	logout: route('todo', {
		component: TodoPage,
	}),
}));
