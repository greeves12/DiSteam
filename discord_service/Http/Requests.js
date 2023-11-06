module.exports = {createFetchPlayer, fetchAuthToken, fetchServerConfig, fetchVerifiedAccounts, deleteToken};

function fetchAuthToken(discordId){
    return new Promise((resolve) => {

            fetch(process.env.LINK + "/auth", {
                method: 'POST', 
                body: JSON.stringify({ 
                    discord_id: discordId
            }), 
            headers: { 
                'Content-type': 'application/json; charset=UTF-8',
                'api_key': process.env.API_KEY,  
            }, 
        }) 
        .then((response) => response.json()) 
        .then((json) => {
            resolve(json);
        });
    });
}

function createFetchPlayer(discordID){
    return new Promise((resolve) => {
        fetch(process.env.LINK + "/members/get", {
            method: "POST",
            body: JSON.stringify({
                discord_id: discordID
            }),
            headers: {
                'api_key': process.env.API_KEY,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            resolve(json);
        });

    });
}

function fetchServerConfig(serverId, ownerId){
    return new Promise((resolve) => {
        fetch(process.env.LINK + "/config/get", {
            method: 'POST',
            body: JSON.stringify({
                server_id: serverId,
                owner_id: ownerId
            }),
            headers: { 
                'Content-type': 'application/json; charset=UTF-8',
                'api_key': process.env.API_KEY,  
            }, 
        })
        .then((response) => response.json())
        .then((json) => {
            resolve(json);
        });
    });
}

    /**
     * 
     * @returns {Array}
     */
    function fetchVerifiedAccounts(){
        return new Promise((resolve) => {
            fetch(process.env.LINK + "/auth/verified", {
                method: 'POST',
                headers :{
                'Content-type': 'application/json; charset=UTF-8',
                'api_key': process.env.API_KEY,
                },
            })
            .then((response) => response.json())
            .then((json) => resolve(json))
        });
    }

function deleteToken(discordId){
    fetch(process.env.LINK + "/auth/delete", {
        method: 'POST',
        body: JSON.stringify({
            discord_id: discordId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'api_key': process.env.API_KEY, 
        }
    });
}
