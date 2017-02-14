const acceptValidPRs = (payload) => {

    return new Promise((resolve, reject)=>{
        const pr = payload.pull_request || false;
        if(!payload.hasOwnProperty("pull_request")){
            return reject(false);
        }
        if(payload.pull_request.state !== 'closed'){
            return reject(false);
        }
        if(payload.pull_request.merged !== true){
            return reject(false);
        }
        return resolve(payload.pull_request);
    });
};
const getRepoAndOwner = (payload) => {

    return new Promise((resolve, reject)=>{
        try{
            var repoData = {
                name: "",
                owner: ""
            };
            var repoName = payload.repository.full_name.split("/");
            repoData.owner = repoName[0];
            repoData.name = repoName[1];
            resolve(repoData);
        }catch(exc){
            reject("Cannot extract repo owner and name");
        }
    });
};

module.exports = {
    acceptValidPRs,
    getRepoAndOwner
};
