
/*Challenge 1 */

describe('Boomtown: Functional Test', () => {
    const url = 'https://help.goboomtown.com';
    const email = 'TestQA1@testqa.com';
    const password = 'TestQA1!';

    beforeEach(() => {
        cy.visit(url);
    });

    it('Search for "Customer" results', () => {
        cy.get('#hero_search_form').within(() => {
            cy.get('#hero_search').type('customer').type('{enter}');
        });
        cy.get('.search-page-result-title').filter(':contains("Customer")').should('have.length', 16);
        cy.get('.search-page-result-title').filter(':contains("Customers")').should('have.length', 2);
    });

    it('Login to Boomtown', () => {
        cy.get('.link-title').click('top');
        cy.get('#ext-element-352', { timeout: 30000 }).type(email).type('{enter}');
        cy.get('#ext-element-359').type(password).type('{enter}');
        cy.wait(5000);
        cy.url().should('include', '#myWork');
    });
});

/* Challenge 2 */

describe('Boomtown: API Test', () => {

    it('Search API', () => {
        const url = 'https://api.preprod.goboomtown.com/sdk/v1/kb/search';
        const queryParm = 'query=customer';

        cy.request({
            method: 'GET',
            url: url,
            headers: {
                'X-Boomtown-Integration': 'TBYS9Q',
                'X-Boomtown-Key': 'f7LrK5AfEfVyX8vmClqtrtYGCzrcUBk8CYVU2PMzfNm5'
            },
            qs: queryParm,
        }).then((response) => {
            expect(response.status).to.eq(200); /* Pass authentication */

            const data = Object.values(response.body)[1];
            (data === undefined || data.length == 0) ? cy.log("The array is empty") : cy.log("The array is not empty.");
            /* Unable to get data from API*/

            expect(data).to.be.a('array');  /*True */
        });
    });
});