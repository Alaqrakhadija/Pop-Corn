const express = require("express");
const app = express();
const bcrypt = require('bcryptjs');
var url = require('url');
const query = require("../models/database");
const mySql = require('mysql');
const { randomInt } = require("crypto");

var db = mySql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'movies'
});

exports.getSignup = (request, res, next) => {
    res.render("signup");
}
exports.postSignup = (req, res, next) => {
    // response.render('login');
    console.log(req.body);

    const { name, email, pass, re_pass } = req.body;
    db.query('SELECT email FROM usertable WHERE email = ?', [email], async(error, result) => {
        if (error) {
            console.log(error);
        }
        if (result.length > 0) { //the email exist breviosly in our db
            return res.render('signup', {
                message: 'That email is already in use'
            });


        } else if (pass !== re_pass) {
            return res.render('signup', {
                message: 'The passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(pass, 8);
        //console.log(hashedPassword);

        db.query('INSERT INTO usertable SET ?', { username: name, email: email, password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error);
                // response.end();
                // response.render('/signup');
            } else {
                console.log(result);
                res.redirect(307, '/ques');
            }


            res.end();

        });
    }); // the value

};

exports.getLogin = (req, res, next) => {

    res.render("login");
}
exports.postLogin = async function(req, res) {

    var email = req.body.email;
    var password = req.body.pass;
    db.query('SELECT * FROM usertable WHERE email = ?', [email], async function(error, results, fields) {
        if (error) {
            return res.render('login', {
                message: 'error ocurred'
            });

        } else {
            if (results.length > 0) {
                const comparision = await bcrypt.compare(password, results[0].password)
                if (comparision) {

                    res.redirect(url.format({
                        pathname: "/login/save",
                        query: {
                            email: email
                        }
                    }));


                } else {
                    return res.render('login', {
                        message: 'Email and Password do not match'
                    });

                }
            } else {
                return res.render('login', {
                    message: 'Email does not exist'
                });
            }
        }
    });
};

exports.saveSession = async function(req, res) {
    req.session.email = req.query.email;
    res.redirect('/Home');
}
exports.home = async function(req, res) {
    req.session.email = '';
    res.render("PopCorn");
}
exports.editProfile = async function(req, res) {
    var num1 = req.body.Name;
    var num2 = req.body.Email;
    var numm = req.body.setD_gender;
    var num4 = req.body.Pass;
    if (num4 != undefined) {
        let passw = await bcrypt.hash(num4, 8);
        var qyeryi;
        qyeryi = `UPDATE usertable SET username='${num1}',gender='${numm}',password='${passw}' WHERE email="${req.session.email}"`;
    } else {
        qyeryi = `UPDATE usertable SET username='${num1}',gender='${numm}' WHERE email="${req.session.email}"`;

    }
    const dataa = await query(qyeryi);
    res.redirect('/Profile');
}
exports.questions = async function(req, res) {
    emailforqu = req.body.email;
    res.render("ques");
}
exports.sendQuestions = async function(req, res) {

    var old = req.body.rad2;
    var age_appropriateness = req.body.rad5;
    var genre1 = req.body.Action;
    var genre2 = req.body.Comedy;
    var genre3 = req.body.Rarity;
    var genre4 = req.body.Moondancer;
    var genre5 = req.body.Surprise;
    var genre6 = req.body.TwilightSparkle;
    var genre7 = req.body.Fluttershy;
    var genre8 = req.body.DerpyHooves;
    var genre9 = req.body.PrincessCelestia;
    var genre10 = req.body.Gusty;
    var genre11 = req.body.Discord;
    var genre12 = req.body.Clover;
    var genre13 = req.body.BabyMoondancer;
    var genre14 = req.body.Medley;
    var genre15 = req.body.Firefly;

    var genre = "";
    if (genre1 !== undefined) genre = genre + "," + genre1;
    if (genre2 !== undefined) genre = genre + "," + genre2;
    if (genre3 !== undefined) genre = genre + "," + genre3;
    if (genre4 !== undefined) genre = genre + "," + genre4;
    if (genre5 !== undefined) genre = genre + "," + ngenre5;
    if (genre6 !== undefined) genre = genre + "," + genre6;
    if (genre7 !== undefined) genre = genre + "," + genre7;
    if (genre8 !== undefined) genre = genre + "," + genre8;
    if (genre9 !== undefined) genre = genre + "," + genre9;
    if (genre10 !== undefined) genre = genre + "," + genre10;
    if (genre11 !== undefined) genre = genre + "," + genre11;
    if (genre12 !== undefined) genre = genre + "," + genre12;
    if (genre13 !== undefined) genre = genre + "," + genre13;
    if (genre14 !== undefined) genre = genre + "," + genre14;
    if (genre15 !== undefined) genre = genre + "," + genre15;

    var actor1 = req.body.MatthewBroderick;
    var actor2 = req.body.JeffreyJones;
    var actor3 = req.body.EilleFanning;
    var actor4 = req.body.ChrisPratt;
    var actor5 = req.body.ScarlettJohansson;
    var actor6 = req.body.JusticeSmith;
    var actor7 = req.body.TimothéeChalamet;
    var actor8 = req.body.DerpyHooves;
    var actor9 = req.body.EmiliaClarke;
    var actor10 = req.body.MiaSara;
    var actor11 = req.body.JenniferGrey;
    var actor12 = req.body.CindyPickett;
    var actor13 = req.body.NickNolte;
    var actor14 = req.body.JulietteLewis;
    var actor15 = req.body.JoeDonBaker;

    var actor = "";
    if (actor1 !== undefined) actor = actor + "," + actor1;
    if (actor2 !== undefined) actor = actor + "," + actor2;
    if (actor3 !== undefined) actor = actor + "," + actor3;
    if (actor4 !== undefined) actor = actor + "," + actor4;
    if (actor5 !== undefined) actor = actor + "," + actor5;
    if (actor6 !== undefined) actor = actor + "," + actor6;
    if (actor7 !== undefined) actor = actor + "," + actor7;
    if (actor8 !== undefined) actor = actor + "," + actor8;
    if (actor9 !== undefined) actor = actor + "," + actor9;
    if (actor10 !== undefined) actor = actor + "," + actor10;
    if (actor11 !== undefined) actor = actor + "," + actor11;
    if (actor12 !== undefined) actor = actor + "," + actor12;
    if (actor13 !== undefined) actor = actor + "," + actor13;
    if (actor14 !== undefined) actor = actor + "," + actor14;
    if (actor15 !== undefined) actor = actor + "," + actor15;

    const qyeryi = `INSERT INTO questions (old,FavActor,age_appropriateness,email,genre) VALUES ('${old}','${actor}','${age_appropriateness}','${emailforqu}','${genre}')`;
    const dataa = await query(qyeryi);

    emailforqu = '';
    res.redirect('/login');
}



exports.profile = async function(req, res) {
    if (req.session.email) {
        const qyeryy = `SELECT * FROM usertable WHERE email='${req.session.email}'`;
        const data = await query(qyeryy);


        res.render("Profile", { data });
    } else
        res.redirect("/PopCorn");
}
exports.youMightlike = async function(req, res) {
        if (req.session.email) {
            const qyery1 =
                "SELECT img_url,title,year,genre,rating,runtime FROM `mytable` LIMIT 4";

            const YouMightLikeQyery =
                ' SELECT * FROM `questions` WHERE email= "' + `${req.session.email}` + '"';
            const YouMight = await query(YouMightLikeQyery);

            const gen = YouMight[0].Genre.split(",");
            const actor = YouMight[0].FavActor.split(",");
            const year = YouMight[0].old.split("-");
            const age = YouMight[0].age_appropriateness;

            var qyery3;
            if (age.includes("Yes")) {
                qyery3 = 'SELECT * FROM mytable WHERE rating = "G" AND(genre LIKE "%' + `${gen[randomInt(1,gen.length)]}` + '%" OR actors LIKE "%' + `${actor[randomInt(1,actor.length)]}` + '%" OR year BETWEEN ' + `${year[0]}` + ' AND ' + `${year[1]}` + ') ORDER BY RAND() LIMIT 8';
            } else {
                qyery3 =
                    'SELECT * FROM mytable WHERE genre LIKE "%' + `${gen[randomInt(1,gen.length)]}` + '%" OR actors LIKE "%' + `${actor[randomInt(1,actor.length)]}` + '%" OR year BETWEEN ' + `${year[0]}` + ' AND ' + `${year[1]}` + ' ORDER BY RAND() LIMIT 8';
            }
            const result = await query(qyery1);
            const result2 = await query(qyery3);

            result.forEach(element => {
                element.genre = element.genre.replace(/'/g, '');
                element.genre = element.genre.replace("[", '');
                element.genre = element.genre.replace("]", '');

            });

            res.render("index", { result, result2 });
        } else {

            res.redirect(
                "/PopCorn"

            );
        }
    }
    // exports.logout=(req, res) => {
    //    req.logout();
    //    res.redirect("/");
    //   };