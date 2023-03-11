describe('ApiMonsters', () => {
  describe('Static queries', () => {
    it('should get monsters', () => {
			cy.request('GET', '/api/monsters/').then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).length.to.be.greaterThan(1);
			});
    });
		
		it('should get a monster', () => {
			cy.request('GET', '/api/monsters/adult-red-dragon').then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.name).to.equal('Adult Red Dragon');
			});
    });
  });
});
