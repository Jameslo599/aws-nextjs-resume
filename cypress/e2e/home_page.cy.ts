describe('Visit page', () => {
  it('succesfully loads', () => {
    cy.visit('/');
  });

  it('obtains previous visitor count', () => {
    cy.request(
      'GET',
      'https://api.awsjameslo.com/getCounter?website_id=0&website_name=awsjameslo'
    ).then((response) => {
      expect(response.body[0]).to.be.a('number');
    });
  });

  it('invalid query parameters should fail', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.awsjameslo.com/getCounter?website_id=0&website_name=undefined',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body).contains('error');
    });
  });

  it('increments previous visitor count by one', () => {
    cy.request(
      'GET',
      'https://api.awsjameslo.com/getCounter?website_id=0&website_name=awsjameslo'
    ).then((response) => {
      cy.request('PUT', 'https://api.awsjameslo.com/incrementCounter', {
        website_name: 'jameshlo',
        website_id: 1,
        total_visitors: response.body,
      }).then((res) => {
        expect(res.body.total_visitors).to.be.greaterThan(response.body);
      });
    });
  });
});
