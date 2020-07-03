// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import "@cypress/code-coverage/support";
// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
	cy.server();

	cy.clock(Date.UTC(2020, 5, 25, 10, 0, 0), ["Date"]);

	// Fixtures
	cy.fixture("example.json").as("testFixture");

	cy.route("GET", "https://myservice.com/test", "@testFixture").as(
		"testRequest"
	);
});
