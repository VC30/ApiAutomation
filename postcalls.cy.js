describe("api testing",()=>{


    it("Approach1 - Hardcoded json object",()=>{

        const requestBody ={
            tourist_name: "Mike",
            tourist_email: "lil0123@gmail.com",
            tourist_location:"Ghana"
        }

        cy.request({
                method: "POST",
                url:"http://restapi.adequateshop.com/api/Tourist",
                body: requestBody
            })
            .then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq("Mike")
                expect(response.body.tourist_email).to.eq("lil0123@gmail.com")
                expect(response.body.tourist_location).to.eq("Ghana")
            })
    })


    it("Approach2 - Dynamically generating json object",()=>{

        const requestBody ={
            tourist_name: Math.random().toString(5).substring(2),
            tourist_email: Math.random().toString(5).substring(2) + "@gmail.com",
            tourist_location:"Ghana"
        }

        cy.request({
                method: "POST",
                url:"http://restapi.adequateshop.com/api/Tourist",
                body: requestBody
            })
            .then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            })
    })

    it.only("Approach 3 - Using Fixtures",()=>{

        cy.fixture('tourists').then((data) => {

            const requestBody = data;

            cy.request({
                method: "POST",
                url:"http://restapi.adequateshop.com/api/Tourist",
                body: requestBody
            })
            .then((response)=>{
                expect(response.status).to.eq(201)
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)

                expect(response.body).has.property('tourist_mail',requestBody.tourist_email)
                expect(response.body).to.have.property('tourist_location',requestBody.tourist_location)
            })
        })
    })

})