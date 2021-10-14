const   fs = require('fs');
const   express = require('express');
const   ejs = require('ejs');
const   mysql = require('mysql');
const   bodyParser = require('body-parser');
const   session = require('express-session');
const   multer = require('multer');
const upload = multer({dest: __dirname + '/../../public/images/uploads/products'});  // 업로드 디렉터리를 설정한다.
const   router = express.Router();

const   db = mysql.createConnection({
  host: 'localhost',        // DB서버 IP주소
  port: 3306,               // DB서버 Port주소
  user: 'dbuser',            // DB접속 아이디
  password: 'gachon654321',  // DB암호
  database: 'webdb'         //사용할 DB명
});

//  -----------------------------------  상품리스트 기능 -----------------------------------------
// (관리자용) 등록된 상품리스트를 브라우져로 출력합니다.
const AdminPrintProd = (req, res) => {
  let    htmlstream = '';
  let    htmlstream2 = '';
  let    sql_str;

       if (req.session.auth && req.session.admin)   {   // 관리자로 로그인된 경우에만 처리한다
           htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs','utf8');    // 헤더부분
           htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs','utf8');  // 관리자메뉴
           htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminproduct.ejs','utf8'); // 괸리자메인화면
           htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs','utf8');  // Footer
           sql_str = "SELECT itemid, category, maker, pname, modelnum, rdate, price, amount from u0_products order by rdate desc;"; // 상품조회SQL

           res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

           db.query(sql_str, (error, results, fields) => {  // 상품조회 SQL실행
               if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
               else if (results.length <= 0) {  // 조회된 상품이 없다면, 오류메시지 출력
                   htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
                   res.status(562).end(ejs.render(htmlstream2, { 'title': '알리미',
                                      'warn_title':'상품조회 오류',
                                      'warn_message':'조회된 상품이 없습니다. 아래버튼을 누르면 상품등록으로 이동합니다',
                                      'return_url':'/adminprod/form' }));
                   }
              else {  // 조회된 상품이 있다면, 상품리스트를 출력
                     res.end(ejs.render(htmlstream,  { 'title' : '쇼핑몰site',
                                                       'logurl': '/users/logout',
                                                       'loglabel': '로그아웃',
                                                       'regurl': '/users/aprofile',
                                                       'reglabel': req.session.who,
                                                        prodata : results }));  // 조회된 상품정보
                 } // else
           }); // db.query()
       }
       else  {  // (관리자로 로그인하지 않고) 본 페이지를 참조하면 오류를 출력
         htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
         res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                            'warn_title':'상품등록기능 오류',
                            'warn_message':'관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
                            'return_url':'/' }));
       }

};
router.get('/list', AdminPrintProd);      // 상품리스트를 화면에 출력

//  -----------------------------------  상품등록기능 -----------------------------------------
// 상품등록 입력양식을 브라우져로 출력합니다.
const PrintAddProductForm = (req, res) => {
  let    htmlstream = '';

       if (req.session.auth && req.session.admin) { // 관리자로 로그인된 경우에만 처리한다
         htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs','utf8');    // 헤더부분
         htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs','utf8');  // 관리자메뉴
         htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/product_form.ejs','utf8'); // 상품정보입력
         htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs','utf8');  // Footer

         res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});
         res.end(ejs.render(htmlstream,  { 'title' : '쇼핑몰site',
                                           'logurl': '/users/logout',
                                           'loglabel': '로그아웃',
                                           'regurl': '/users/profile',
                                           'reglabel': req.session.who }));
       }
       else {
         htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
         res.status(563).end(ejs.render(htmlstream, { 'title': '알리미',
                            'warn_title':'상품등록기능 오류',
                            'warn_message':'관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
                            'return_url':'/' }));
       }

};

// 상품등록 양식에서 입력된 상품정보를 신규로 등록(DB에 저장)합니다.
const HanldleAddProduct = (req, res) => {  // 상품등록
  let    body = req.body;
  let    htmlstream = '';
  let    datestr, y, m, d, regdate;
  let    prodimage = '/images/uploads/products/'; // 상품이미지 저장디렉터리
  let    picfile = req.file;
  let    result = { originalName  : picfile.originalname,
                   size : picfile.size     }

       console.log(body);     // 이병문 - 개발과정 확인용(추후삭제).

       if (req.session.auth && req.session.admin) {
           if (body.itemid == '' || datestr == '') {
             console.log("상품번호가 입력되지 않아 DB에 저장할 수 없습니다.");
             res.status(563).end('<meta charset="utf-8">상품번호가 입력되지 않아 등록할 수 없습니다');
          }
          else {

              prodimage = prodimage + picfile.filename;
              regdate = new Date();
              db.query('INSERT INTO u0_products (itemid, category, maker, pname, modelnum,rdate,price,dcrate,amount,event,pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
                    [body.itemid, body.category, body.maker, body.pname, body.modelnum, regdate,
                     body.price, body.dcrate, body.amount, body.event, prodimage], (error, results, fields) => {
               if (error) {
                   htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
                   res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                                 'warn_title':'상품등록 오류',
                                 'warn_message':'상품으로 등록할때 DB저장 오류가 발생하였습니다. 원인을 파악하여 재시도 바랍니다',
                                 'return_url':'/' }));
                } else {
                   console.log("상품등록에 성공하였으며, DB에 신규상품으로 등록하였습니다.!");
                   res.redirect('/adminprod/list');
                }
           });
       }
      }
     else {
         htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
         res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                            'warn_title':'상품등록기능 오류',
                            'warn_message':'관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
                            'return_url':'/' }));
       }
};
router.get('/form', PrintAddProductForm);   // 상품등록화면을 출력처리
router.post('/product', upload.single('photo'), HanldleAddProduct);    // 상품등록내용을 DB에 저장처리

//  -----------------------------------  회원리스트 기능 -----------------------------------------
// (관리자용) 등록된 회원리스트를 브라우져로 출력합니다.
const AdminPrintUsers = (req, res) => {
  let    htmlstream = '';
  let    htmlstream2 = '';
  let    sql_str;

       if (req.session.auth && req.session.admin)   {   // 관리자로 로그인된 경우에만 처리한다
           htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs','utf8');    // 헤더부분
           htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs','utf8');  // 관리자메뉴
           htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminuserlist.ejs','utf8'); // 관리자회원리스트메뉴
           htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs','utf8');  // Footer
           sql_str = "SELECT uid, pass, name, phone, address, point from u0_users;"; // 상품조회SQL

           res.writeHead(200, {'Content-Type':'text/html; charset=utf8'});

           db.query(sql_str, (error, results, fields) => {  // 회원조회 SQL실행
               if (error) { res.status(564).end("AdminPrintUsers: DB query is failed"); }
               else if (results.length <= 0) {
                   htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
                   res.status(564).end(ejs.render(htmlstream2, { 'title': '알리미',
                                      'warn_title':'사용자조회 오류',
                                      'warn_message':'조회된 사용자가 없습니다.',
                                      'return_url':'/' }));
                   }
              else {
                     res.end(ejs.render(htmlstream,  { 'title' : '쇼핑몰site',
                                                       'logurl': '/users/logout',
                                                       'loglabel': '로그아웃',
                                                       'regurl': '/users/profile',
                                                       'reglabel': req.session.who,
                                                        prodata : results }));
                 }
           });
       }
       else  {  // (관리자로 로그인하지 않고) 본 페이지를 참조하면 오류를 출력
         htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
         res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                            'warn_title':'상품등록기능 오류',
                            'warn_message':'관리자로 로그인되어 있지 않아서, 리스트 기능을 사용할 수 없습니다.',
                            'return_url':'/' }));
       }

};

// REST API의 URI와 핸들러를 매핑합니다.
router.get('/ulist', AdminPrintUsers);      // 회원리스트를 화면에 출력


// --------------- 정보변경 기능을 개발합니다 --------------------
const   PrintAdminProfile = (req, res) => {
  let    htmlstream = '';

       htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs','utf8');
       res.status(562).end(ejs.render(htmlstream, { 'title': '알리미',
                           'warn_title':'계정정보 준비중',
                           'warn_message':'계정정보(예, 암호변경, 주소변경, 전화번호변경 등)변경기능을 추후에 개발할 예정입니다',
                          'return_url':'/' }));
}

module.exports = router;
