import express, { request, response } from 'express';
import { user, product } from './datamodel.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import speakeasy from 'speakeasy';
import jwt_decode from 'jwt-decode';

import {} from 'dotenv/config';

const router = express.Router();

let presentCode = 0;
let setCode = (code) => {
    presentCode=code;
    // console.log(presentCode)
}

const rounds = 10;

router.post('/', async(request, response) => {   
    const{email,password}=request.body
    
        try{
            const checkuser = await user.findOne({email:email});
        if(checkuser){
            const checkpassword = await bcrypt.compare(password, checkuser.password);

            if(checkuser && checkpassword){
                // response.status(200).json({data});
                const token = jsonwebtoken.sign(
                    { _id: checkuser._id, email: checkuser.email, password: checkuser.password },
                    process.env.JWT_LOGIN_TOKEN,
                    {
                    expiresIn: "1d",
                    }
                );
                // console.log(token);
                response.json({
                    msg: "exist",
                    token
                }
                );
                // response.status(200).json({checkuser})
            }
        else{
            response.json('invalid details')
        }
        }
        else{
            // response.json(checkuser);
            response.json("not exist");
            // response.json(response.data);
        }
        }
        catch(e){
            console.log(e);
        }
}

)

router.post('/signup', async(request, response) => {
    const{email,password,fname,lname}=request.body
    // const testmail="chr@gmail.com";
    try{
        if(email && password && fname && lname){
            const checkUser = await user.findOne({email:email});
            const hashpass = await bcrypt.hash(password, rounds);
            // response.json(checkUser);
            if(!checkUser){
                const newuser={
                    fname:fname,
                    lname:lname,
                    email:email,
                    password:hashpass,
                }

                const newUser= await user.insertMany([newuser]);
                response.json('done saving');
            }

            else{
                response.json('user already exist');
            }

        }

            // else{
            //     response.json('not saved')
            // }

            // else{
            //     response.json('email exist');
            // }
        // }

        else{
                response.json('please fill all details');
                // console.log('please fill details');
        }

    }
    catch(e){
        console.log(e);
    }


})


router.post('/forgot', async(request, response) => {
    const {email} = request.body;
    const checkuser = await user.findOne({email:email});
    // console.log(checkuser)
    if(checkuser){

        const secretkey = speakeasy.generateSecret({ length: 20 });
        const code = speakeasy.totp({
            secretkey: secretkey.base32,
            encoding: 'base32'
        });

        setCode(code);

        let config = {
            service: 'gmail',
            auth : {
                user: 'uddhikaishara@gmail.com',
                pass: 'ufzdqisqlgdpcedk',
            }
        }

        let transporter = nodemailer.createTransport(config);

        let mailgenarator = new Mailgen({
            theme: "default",
            product: {
                name: "Antique Shop",
                link: "https://mailgen.js/"
            }
        })

        let responses = {
            body: {
                name: checkuser.fname,
                intro: "Your code is below",
                table: {
                    data : [{
                        item: "Code",
                        description : `Your requested code is ${code}`,
                    }]
                },
                outro : "Thank you",
            }
        }

        let mail = mailgenarator.generate(responses);

        let message = {
            from: 'uddhikaishara@gmail.com',
            to: email,
            subject: "Your OTP Code",
            html: mail
        }

        transporter.sendMail(message).then(() =>{
            return response.json({
                msg: 'email sent',
            });
        }).catch(error => {
            return response.json('mail not sent');
        })

    }
    else{
        response.json('no email');
    }
})

router.post('/verify', async(request, response) => {
    const{crcode} = request.body

    if(crcode === presentCode){
        return response.json('match');
    }
    else{
        return response.json('not match');
    }
})

router.post('/verifypass', async(request, response) => {
    const {fetchemail, password, againpassword} = request.body;
    // console.log(fetchemail);
    const encryptpassword = await bcrypt.hash(password, rounds);
    const updatepass = await user.findOneAndUpdate({email:fetchemail},{password:encryptpassword});   

    if(updatepass){
        return response.json("updated");
    }
    else{
        return response.json("not updated");
    }
    
})

router.post('/googleauth', async(request, response) => {
    const {credentialResponse} = request.body;
    // console.log(credentialResponse);
    const details = jwt_decode(credentialResponse.credential);
    // console.log(details);

    const goemail = details.email;
    const checkgouser = await user.findOne({email:goemail});

    const token = jsonwebtoken.sign(
        { email: details.email, password: details.password },
        process.env.JWT_LOGIN_TOKEN,
        {
        expiresIn: "1d",
        }
    );

    if(!checkgouser){
        const newgouser = {
            fname: details.given_name,
            lname: details.family_name,
            email: goemail,
            password: 'AntiqueDefault@123',
        }

        await user.insertMany([newgouser]);

        return response.json({
            msg: 'success',
            email: goemail,
            token
        })
    }

    else if(details.email_verified == true){
        return response.json({
            msg: 'success',
            email: goemail,
            token
        })
    }
    
    else{
        return response.json({
            msg: 'not success',
            email: goemail,
        })
    }
    // console.log(details);
})

router.get('/showproducts', async(request, response) => {
    try{
        const products = await product.find({});
        return response.json(products);
        
    }
    catch(error){
        return response.json("display error");
    }
})


router.post('/addproducts', async(request, response) => {
    const{name,price,desc,image}=request.body
    try{
        if(name && price && desc){
            // const checkUser = await user.findOne({email:email});
            // if(!checkUser){
                const newuser={
                    pname:name,
                    price:price,
                    pdesc:desc,
                    pimg: image,
                }

                await product.insertMany([newuser]);
                const updatedproducts = await product.find({});
                response.json({msg: 'added', data: updatedproducts});
            // }

            // else{
            //     response.json('user already exist');
            // }

        }

            // else{
            //     response.json('not saved')
            // }

        // }

        else{
                response.json({msg: 'fill'});
        }

    }
    catch(e){
        console.log(e);
    }
})

router.post('/checklogin', async(request, response) => {
    const {token} = request.body;
    // console.log(token);
    if(token){
        try{
            const decode = jsonwebtoken.verify(token, process.env.JWT_LOGIN_TOKEN);
            response.json(decode);
            // console.log(decode);
        }
        catch(error){
            response.json(error.message);
        }
    }
    else{
        response.json("no token")
    }
})

router.post('/getuserdetails', async(request, response) => {
    const{cemail} = request.body;
        if(cemail){
        try{
            const checkuser = await user.findOne({email:cemail});
            if(checkuser){
                return response.json(checkuser);
            }
            else{
                return response.json('no records');
            }

        }
        catch(error){
            console.log(error);
        }
    }
    else{
        response.json('email not identified')
    }
})

router.put('/updateprofile', async(request, response) => {
    const {email,fname,lname,password,image} = request.body;

    if(email && fname && lname && password && image){

        const hashpass = await bcrypt.hash(password, rounds);
        const updateduser = {
            email,
            fname,
            lname,
            password: hashpass,
            img: image
        }
        const updateuser = await user.findOneAndUpdate({email:email}, updateduser);
        if(updateuser){
            return response.json('success')
        }
        else{
            return response.json('failed')
        }
    }

    else{
        return response.json('fill');
    }

})

export default router;