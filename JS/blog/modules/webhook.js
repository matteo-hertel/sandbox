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

module.exports = {
    acceptValidPRs
};
