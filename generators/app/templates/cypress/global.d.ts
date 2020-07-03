/// <reference types="cypress" />

declare module "@cypress/code-coverage/*";

declare namespace Cypress {
	interface Chainable {
		/**
		 * testCommand
		 */
		testCommand(): void;
	}
}
