const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const crypto = require('./crypto')

//암호화모듈 추출

//--------------------------------------------------
const db = mysql.createConnection({
   host: 'localhost',        // DB서버 IP주소
   port: 3306,               // DB서버 Port주소
   user: 'dbuser',            // DB접속 아이디
   password: 'gachon654321',  // DB암호
   database: 'webdb'         //사용할 DB명
});

router.use(bodyParser.urlencoded({ extended: false }));
//  -----------------------------------  회원가입기능 -----------------------------------------
// 회원가입 입력양식을 브라우져로 출력합니다.
const PrintRegistrationForm = (req, res) => {

   let htmlstream = '';

   htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');
   htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/navbar.ejs', 'utf8');
   htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/user/reg_form.ejs', 'utf8');
   htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

   if (req.session.auth) {  // true :로그인된 상태,  false : 로그인안된 상태
      res.end(ejs.render(htmlstream, {
         'title': '쇼핑몰site',
         'logurl': '/users/logout',
         'loglabel': '로그아웃',
         'regurl': '/users/profile',
         'reglabel': req.session.who
      }));
   }
   else {
      res.end(ejs.render(htmlstream, {
         'title': '쇼핑몰site',
         'logurl': '/users/auth',
         'loglabel': '로그인',
         'regurl': '/users/reg',
         'reglabel': '가입'
      }));
   }

};

// 회원가입 양식에서 입력된 회원정보를 신규등록(DB에 저장)합니다.
const HandleRegistration = (req, res) => {  // 회원가입

   let body = req.body;
   let htmlstream = '';

   //암호화
   body.pw1 = crypto.encrypt(body.pw1);

   console.log(body.uid);     // 임시로 확인하기 위해 콘솔에 출력해봅니다.
   console.log(body.uname);
   console.log(body.pw1);


   if (body.uid == '' || body.pw1 == '') {
      console.log("데이터입력이 되지 않아 DB에 저장할 수 없습니다.");
      res.status(600).end('<meta charset="utf-8">데이터가 입력되지 않아 가입을 할 수 없습니다');
   }
   else {

      db.query('INSERT INTO u19_user (user_id, user_pw, user_name, user_phonenum, user_address, user_mileage) VALUES (?, ?, ?, ?, ?, ?)', [body.uid, body.pw1, body.uname, body.uphone, body.uaddress, 1000000], (error, results, fields) => {
         if (error) {
            console.log(db.query);
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(600).end(ejs.render(htmlstream, {
               'title': '알리미',
               'warn_title': '회원가입 오류',
               'warn_message': '이미 회원으로 등록되어 있습니다. 바로 로그인을 하시기 바랍니다.',
               'return_url': '/'
            }));
         } else {
            console.log("회원가입에 성공하였으며, DB에 신규회원으로 등록하였습니다.!");
            res.redirect('/');
         }
      });

   }
};

// REST API의 URI와 핸들러를 매핑합니다.
router.get('/reg', PrintRegistrationForm);   // 회원가입화면을 출력처리
router.post('/reg', HandleRegistration);   // 회원가입내용을 DB에 등록처리
router.get('/', function (req, res) { res.send('respond with a resource 111'); });

// ------------------------------------  로그인기능 --------------------------------------

// 로그인 화면을 웹브라우져로 출력합니다.
const PrintLoginForm = (req, res) => {
   let htmlstream = '';

   htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');
   htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/navbar.ejs', 'utf8');
   htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/user/login_form.ejs', 'utf8');
   htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');
   res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

   if (req.session.auth) {  // true :로그인된 상태,  false : 로그인안된 상태
      res.end(ejs.render(htmlstream, {
         'title': '쇼핑몰site',
         'logurl': '/users/logout',
         'loglabel': '로그아웃',
         'regurl': '/users/profile',
         'reglabel': req.session.who
      }));
   }
   else {
      res.end(ejs.render(htmlstream, {
         'title': '쇼핑몰site',
         'logurl': '/users/auth',
         'loglabel': '로그인',
         'regurl': '/users/reg',
         'reglabel': '가입'
      }));
   }

};

// 로그인을 수행합니다. (사용자인증처리)
const HandleLogin = (req, res) => {
   let body = req.body;
   let userid, userpass, username;
   let sql_str;
   let htmlstream = '';

   //암호화
   body.pass = crypto.encrypt(body.pass);
   console.log(body.uid);
   console.log(body.pass);


   if (body.uid == '' || body.pass == '') {
      console.log("아이디나 암호가 입력되지 않아서 로그인할 수 없습니다.");
      res.status(601).end('<meta charset="utf-8">아이디나 암호가 입력되지 않아서 로그인할 수 없습니다.');
   }
   else {
      sql_str = "SELECT user_id, user_pw, user_name from u19_user where user_id ='" + body.uid + "' and user_pw='" + body.pass + "';";
      console.log("SQL: " + sql_str);
      db.query(sql_str, (error, results, fields) => {
         if (error) { res.status(601).end("Login Fail as No id in DB!"); }
         else {
            if (results.length <= 0) {  // select 조회결과가 없는 경우 (즉, 등록계정이 없는 경우)
               htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
               res.status(601).end(ejs.render(htmlstream, {
                  'title': '알리미',
                  'warn_title': '로그인 오류',
                  'warn_message': '등록된 계정이나 암호가 틀립니다.',
                  'return_url': '/'
               }));
            } else {  // select 조회결과가 있는 경우 (즉, 등록사용자인 경우)
               results.forEach((item, index) => {
                  userid = item.user_id; userpass = item.user_pw; username = item.user_name;
                  console.log("DB에서 로그인성공한 ID/암호:%s/%s", userid, userpass);
                  if (body.uid == userid && body.pass == userpass) {
                     req.session.auth = 99;      // 임의로 수(99)로 로그인성공했다는 것을 설정함
                     req.session.who = username; // 인증된 사용자명 확보 (로그인후 이름출력용)
                     req.session.userid = userid;
                     if (body.uid == 'admin@gachon.ac.kr')    // 만약, 인증된 사용자가 관리자(admin)라면 이를 표시
                        req.session.admin = true;
                     res.redirect('/');
                  }
               }); /* foreach */
            } // else
         }  // else
      });
   }
}


// ------------------------------  로그아웃기능 --------------------------------------
const HandleLogout = (req, res) => {
   req.session.destroy();     // 세션을 제거하여 인증오작동 문제를 해결
   res.redirect('/');         // 로그아웃후 메인화면으로 재접속
}


// --------------- 정보변경 기능을 개발합니다 --------------------
const PrintProfile = (req, res) => {
   let htmlstream = '';

   sql_str = "SELECT user_phonenum, user_address from u19_user where user_id='" + req.session.userid + "';";
   console.log(sql_str);

   var phonenum;
   var address;
   db.query(sql_str, (error, results, fields) => {
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
      else{
         console.log(results);
         phonenum = results[0].user_phonenum;
         address = results[0].user_address; 

         if (req.session.who != "깐부관리자") {
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');
            htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/navbar.ejs', 'utf8');
            htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/user/change_user_info.ejs', 'utf8');
            htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');
         }
         else {
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');
            htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');
            htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/user/change_user_info.ejs', 'utf8');
            htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');
         }
         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
      
         if (req.session.auth) {  // true :로그인된 상태,  false : 로그인안된 상태
            res.end(ejs.render(htmlstream, {
               'title': '쇼핑몰site',
               'logurl': '/users/logout',
               'loglabel': '로그아웃',
               'regurl': '/users/profile',
               'address':address,
               'phone':phonenum,
               'reglabel': req.session.who
            }));
         }
         else {
            res.end(ejs.render(htmlstream, {
               'title': '쇼핑몰site',
               'logurl': '/users/auth',
               'loglabel': '로그인',
               'regurl': '/users/reg',
               'reglabel': '가입'
            }));
         }
         
      }});
      
   
      
};

const HandleProfile = (req, res) => {

   let body = req.body;
   let htmlstream = '';
   console.log(req.session);
   console.log(body.uphone);
   console.log(body.uaddress);

   body.pw1 = crypto.encrypt(body.pw1);
   console.log(body.pw1);

   if (body.pw1 == '' || body.pw2 == '') {
      console.log("데이터입력이 되지 않아 DB에 저장할 수 없습니다.");
      res.status(600).end('<meta charset="utf-8">바꿀 비밀번호를 입력하세요');
   }
   else {

      db.query('UPDATE u19_user SET user_pw = ?, user_phonenum = ?, user_address = ? WHERE user_id = ?', [body.pw1, body.uphone, body.uaddress, req.session.userid], (error, results, fields) => {
         if (error) {
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(600).end(ejs.render(htmlstream, {
               'title': '알리미',
               'warn_title': '회원정보수정 오류',
               'warn_message': '회원정보수정을 할수 없습니다. 모든 정보를 입력해 주세요.',
               'return_url': '/'
            }));
         } else {
            console.log("정보수정에 성공하였으며, DB에 수정된 내용을 등록하였습니다.!");
            res.redirect('/');
         }
      });

   }
};

// REST API의 URI와 핸들러를 매핑합니다.
router.get('/logout', HandleLogout);       // 로그아웃 기능
router.get('/auth', PrintLoginForm);   // 로그인 입력화면을 출력
router.post('/auth', HandleLogin);     // 로그인 정보로 인증처리
router.get('/profile', PrintProfile);     // 정보변경화면을 출력
router.post('/profile', HandleProfile);   //정보변경 기능을 수행

module.exports = router;
