const userModel = require("../Models/profilemodel");



exports.registration = (req, res) => {
	let reqBody = req.body;
    let fName = reqBody["fName"]
    let lName = reqBody['lName']
    let email = reqBody['email']
    let userName = reqBody['userName']
    let password = reqBody['password']
    let postBody = {
        fName: fName,
        lName : lName,
        email:email,
        userName:userName,
        password: password,
    }

	userModel.create(postBody, (err, data) => {
		if (err) {
			res.status(400).json({ status: "Data Create Fail ", data: err });
		} else {
			res.status(200).json({
				status: "Data Create Success ",data: data,
			});
		}
	});
};


exports.login = (req, res) => {
    let reqBody = req.body;
    let userName = reqBody["userName"]
    let password = reqBody['password']
    
    userModel.find( {userName:userName, password:password},(err, data) => {
        if (err) {
            res.status(400).json({status:'login Fail', data:err})
        } else {
            if (data.length > 0) {
                res.status(200).json({status:" Login success", data:data})
            } else {
                res.status(401).json({status:"Unauthorized"})
            }
        }
    })
}

exports.changePassword= (req,res)=>{

    let password = req.body['password']
    let _id = req.body['_id']
    let postBody ={
        _id: _id,
        password:password
    }

    userModel.updateOne({_id:_id}, {$set:postBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:'Password Change Fail', data:err})
        }else{
            res.status(200).json({status:"password Change Success ", data:data})
        }
    })
}