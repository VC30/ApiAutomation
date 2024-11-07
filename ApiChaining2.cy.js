describe("API Chaining",()=>{

    const auth_token = 'Bearer 6e06861d33a1bfe578c7c9b7114103b02b542f0a9d66dd658beff03b3a1bff28'

    it("create, update and delete user in Gorest API",()=>{

        cy.request({
            method:'POST',
            url:'https://gorest.co.in/public/v2/users',
            body:{
                name:'Ola omo Ola',
                gender:'male',
                email: Math.random().toString(5).substring(2)+'@gmail.com',
                status:'active'
            },
            headers:{
                Authorization: auth_token
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(201)
            const userId = response.body.id
            //updating result

            cy.request({

                method:'PUT',
                url:`https://gorest.co.in/public/v2/users/${userId}`,
                body:{
                    name:'JJ Okocha'
                },
                headers:{
                    Authorization: auth_token
                }
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.name).to.equal('JJ Okocha')

                //deleting request

                cy.request({
                    method:'DELETE',
                    url:`https://gorest.co.in/public/v2/users/${userId}`,
                    headers:{
                        Authorization: auth_token
                    }
                })
                .then((response)=>{
                    expect(response.status).to.equal(204)
                })
            })

        })
    })




})