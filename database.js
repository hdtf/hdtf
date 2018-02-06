let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 50000,
    user: "root",
    password: "510S!Dea", // TODO change temporary password
    database: "ICE"
});

const ERROR_CODE = {
    Unavailable_ID: 401,
    No_matched_ID: 402,
    Wrong_credentials: 403,
    DB_error: 501
};

module.exports.ERROR_CODE = ERROR_CODE;

module.exports.setDB = function (name, numb, phone, git, act, interest, talent, callback) {
    pool.getConnection(function (err, con) {
        if(err){
            console.log(err);
            callback(ERROR_CODE.DB_error);
        }else{
            let sql = "INSERT INTO NewMembers (name, numb, phone, git, act, 3DPrint, 3DModeling, VR, AR, Programming, AI, IoT, BlockChain, Hardware, InterestGuitar, TalentGuitar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let values = [name, numb, phone, git, act, 0, 0, 0, 0, 0, 0, 0, 0, 0, interest[9], talent[9]];
            for(let i=0; i<9; i++){
                values[i+5] = interest[i]+talent[i];
            }
            con.query(sql, values, function (err, result) {
                con.release();
                if(err) {
                    console.log(err);
                    callback(ERROR_CODE.DB_error);
                }else if(!result.affectedRows){
                    callback(ERROR_CODE.Wrong_credentials);
                }else{
                    callback(false);
                }
            })
        }
    })
};