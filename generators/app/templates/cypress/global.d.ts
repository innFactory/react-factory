/// <reference types="cypress" />

declare module '@cypress/code-coverage/*';

declare namespace Cypress {
	interface Chainable {
		/**
		 * testCommand
		 */
		testCommand(): void;

		// cypress-react-selector
		waitForReact(): void;
		react(componentName: string, props?: Object, state?: Object): Chainable;
		getReact(componentName: string, props?: Object, state?: Object): Chainable;
		getProps(propName: string): Chainable;
	}
}
