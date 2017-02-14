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
            var out = {
                repo: "",
                owner: ""
            };
            var repoName = payload.repository.full_name.split("/");
            out.repo = repoName[0];
            out.owner = repoName[1];
            resolve(out);
        }catch(exc){
            reject("Cannot extract repo owner and name");
        }
    });
};

module.exports = {
    acceptValidPRs
};
