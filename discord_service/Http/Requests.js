module.exports = {createFetchPlayer, fetchAuthToken, fetchServerConfig};

function fetchAuthToken(discordId){
    return new Promise((resolve) => {
            fetch(process.env.TOKEN_LINK, { 
                method: 'POST', 
                body: JSON.stringify({ 
                    discord_id: parseInt(discordId,10)
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
        fetch(process.env.MEMBER_LINK, {
            method: "POST",
            body: JSON.stringify({
                discord_id: parseInt(member.id, 10)
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
        fetch(process.env.CONFIG_LINK, {
            method: 'POST',
            body: JSON.stringify({
                server_id: parseInt(serverId, 10),
                owner_id: parseInt(ownerId, 10)
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