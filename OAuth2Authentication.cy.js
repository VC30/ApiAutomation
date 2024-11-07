describe("OAuth2",()=>{

    let accessToken="";

    it("get OAuth2 access token",()=>{

        cy.request({
            method:'POST',
            url:'https://github.com/login/oauth/access_token',
            qs:{
                cliet_id:'3741a7bdbd3ee5d6ae64',
                client_secret:'46452b84277b076844f9ed36edd692b6c79413b6',
                code:'f4597fdefec70ed12969'
            }
        }).then((response)=>{
            //access_token=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&scope=&token_type=bearer
            const params = response.body.split('&');
            accessToken = params[0].split('=')[1];

        })
    })

    it("OAuth2 request",()=>{

        cy.request({
            method:'GET',
            url:'https://api.github.com/user/repos',
            headers:{
                Authorization:'Bearer '+accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body[0].id).to.equal(528033190)

        })

    })

})