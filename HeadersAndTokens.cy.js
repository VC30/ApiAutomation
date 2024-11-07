describe("API Testing",()=>{

    let authToken = null;

    before("Creating access token",()=>{
        cy.request({

            method:"POST",
            url:"https://simple-books-api.glitch.me/api-clients/",
            headers: {
                      'Content-Type':'application/json'
                     },
            body: {
                clientName: 'AJANI',
                clientEmail: Math.random().toString(5).substring(2)+"@gmail.com"
            }

        }).then((response)=>{

            authToken = response.body.accessToken;
        });

    });


    before("Creating new order",()=>{
        cy.request({

            method:"POST",
            url:"https://simple-books-api.glitch.me/orders/",
            headers: {
                      'Content-Type':'application/json',
                      'Authorization':'Bearer ' + authToken
                     },
            body: {
                bookId: 1,
                customerName: 'asdfjlkl'
            }

        }).then((response)=>{

            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true)
        });

    });


    it("Getting all orders",()=>{ 

        cy.request({
            method:"GET",
            url:"https://simple-books-api.glitch.me/orders/",
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + authToken
               },
               cookies: {
                'cookieName':'mycookies'
               }

            }).then((response)=>{

                expect(response.status).to.eq(200);
                expect(response.body).has.length(1);
            });

    })

})