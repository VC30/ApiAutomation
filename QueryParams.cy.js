describe("API testing",()=>{


    const queryParam = {page:2}
    it("passing query parameters",()=>{

        cy.request({

            method: 'POST',
            url: 'https://regres.in/api/users?page=2',
            qs: queryParam
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            // expect(response.body.page).to.eq(2);
            // expect(response.body.data).has.length(6);

        })

    })

})