const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../../public/images/uploads/products' });  // 업로드 디렉터리를 설정한다.
const router = express.Router();
const url = require('url');
const { query } = require('express');
const { Console } = require('console');


const db = mysql.createConnection({
  host: 'localhost',        // DB서버 IP주소
  port: 3306,               // DB서버 Port주소
  user: 'dbuser',            // DB접속 아이디
  password: 'gachon654321',  // DB암호
  database: 'webdb'         //사용할 DB명
});

//  -----------------------------------  상품리스트 기능 -----------------------------------------
// (관리자용) 등록된 상품리스트를 브라우져로 출력합니다.
// 상품 조회기능 추가
const AdminPrintProd = (req, res) => {
  let htmlstream = '';
  let sql_str;
  const query = url.parse(req.url, true).query;
  const sort = query.sort; //정렬방법 저장
  const keyword = query.keyword; //키워드 저장

  //첫 접근이므로 페이지네이션번호가 정의되지 않았을경우
  if (query.page == undefined) {
    page = 1;
  }
  //페이지네이션 번호가 정의되었을 경우
  else
    page = query.page;

  if (req.session.auth && req.session.admin) {   // 관리자로 로그인된 경우에만 처리한다
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminproduct.ejs', 'utf8'); // 괸리자메인화면
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer
    //정렬방법별로 SQL문 다르게 줌
    if (sort == "name")
      sql_str = "SELECT product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product where product_name like '%" + keyword + "%' order by product_rdate desc;";
    else if (sort == "modelname")
      sql_str = "SELECT product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product where product_modelname like '%" + keyword + "%' order by product_rdate desc;"; // 상품조회SQL
    else if (sort == "etc")
      sql_str = "SELECT product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product where product_description like '%" + keyword + "%' or product_company like '%" + keyword + "%' or product_saleform like '%" + keyword + "%' or product_price like '%" + keyword + "%' or product_category like '%" + keyword + "%' order by product_rdate desc;";
    else if (sort == "rating")
      sql_str = "select p.product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product as p join u19_comment as c on p.product_number = c.product_number group by p.product_number order by AVG(comment_rating) desc";
    else if (sort == "sell")
      sql_str = "select count(*)*p.product_price as cell, p.product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product as p join u19_order as o on o.product_number = p.product_number group by o.product_number order by count(*)*p.product_price desc;";
    else if (sort == "stock")
      sql_str = "SELECT product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product order by product_stock desc;";
    else if (sort == null)
      sql_str = "SELECT product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_stock from u19_product order by product_rdate desc;";

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

    db.query(sql_str, (error, results, fields) => {  // 상품조회 SQL실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
      else if (results.length <= 0) {  // 조회된 상품이 없다면, 오류메시지 출력
        htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
        res.status(562).end(ejs.render(htmlstream2, {
          'title': '알리미',
          'warn_title': '상품조회 오류',
          'warn_message': '조회된 상품이 없습니다. 아래버튼을 누르면 상품등록으로 이동합니다',
          'return_url': '/adminprod/list'
        }));
      }
      else {  // 조회된 상품이 있다면, 상품리스트를 출력
        //데이터의 길이만큼 페이지 받음(페이지 개수 구함)
        pagenationnum = parseInt(Math.ceil(results.length / 5));
        //페이지에 맞는 데이터 잘라서 보냄
        sliceresults = results.slice((page - 1) * 5, page * 5);

        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          'key': query.keyword, //검색한 키워드
          'sort': sort,
          'total_page': pagenationnum, //페이지개수
          prodata: sliceresults //자른 결과 보냄
        }));  // 조회된 상품정보
      } // else
    }); // db.query()
  }
  else {  // (관리자로 로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품등록기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }

};

router.get('/list', AdminPrintProd);      // 상품리스트를 화면에 출력

//  -----------------------------------  상품등록기능 -----------------------------------------
// 상품등록 입력양식을 브라우져로 출력합니다.
const PrintAddProductForm = (req, res) => {
  let htmlstream = '';

  if (req.session.auth && req.session.admin) { // 관리자로 로그인된 경우에만 처리한다
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/product_form.ejs', 'utf8'); // 상품정보입력
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.end(ejs.render(htmlstream, {
      'title': '쇼핑몰site',
      'logurl': '/users/logout',
      'loglabel': '로그아웃',
      'regurl': '/users/profile',
      'reglabel': req.session.who
    }));
  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(563).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품등록기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }

};

// 상품등록 양식에서 입력된 상품정보를 신규로 등록(DB에 저장)합니다.
const HanldleAddProduct = (req, res) => {  // 상품등록
  let body = req.body;
  let htmlstream = '';
  let datestr, y, m, d, regdate;
  let prodimage = '/images/uploads/products/'; // 상품이미지 저장디렉터리
  let picfile = req.file; //파일처리
  let result = { //올린 파일에서 필요한정보 얻음
    originalName: picfile.originalname,
    size: picfile.size
  }

  if (req.session.auth && req.session.admin) {
    //상품번호나 날짜가 입력안되었을시
    if (body.itemid == '' || datestr == '') {
      console.log("상품번호가 입력되지 않아 DB에 저장할 수 없습니다.");
      res.status(563).end('<meta charset="utf-8">상품번호가 입력되지 않아 등록할 수 없습니다');
    }
    else {
      //이미지 올린것 경로및 이름지정
      prodimage = prodimage + picfile.filename;
      //날짜 구함
      regdate = new Date();
      //상품추가 쿼리
      db.query('INSERT INTO u19_product (product_number, product_category, product_company, product_name, product_modelname, product_rdate, product_price, product_discount, product_stock, product_saleform, product_imgpath, product_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
        [body.itemid, body.category, body.maker, body.pname, body.modelnum, regdate,
        body.price, body.dcrate, body.amount, body.event, prodimage, body.description], (error, results, fields) => {
          if (error) {
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(562).end(ejs.render(htmlstream, {
              'title': '알리미',
              'warn_title': '상품등록 오류',
              'warn_message': '상품으로 등록할때 DB저장 오류가 발생하였습니다. 원인을 파악하여 재시도 바랍니다',
              'return_url': '/'
            }));
          } else {
            console.log("상품등록에 성공하였으며, DB에 신규상품으로 등록하였습니다.!");
            res.redirect('/adminprod/list');
          }
        });
    }
  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품등록기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

// 상품 수정및 삭제 폼 가져오기
const PrintPutProductForm = (req, res) => {
  const query = url.parse(req.url, true).query;
  //placeholder를 위한 상품정보 가져옴
  sql_str = "SELECT product_category, product_number, product_company, product_name, product_modelname, product_rdate, product_price, product_imgpath, product_description, product_stock, product_saleform, product_discount from u19_product where product_number=" + query.productid + ";";
  let htmlstream = '';

  if (req.session.auth && req.session.admin) { // 관리자로 로그인된 경우에만 처리한다
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/put_product_form.ejs', 'utf8'); // 상품정보입력
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

    db.query(sql_str, (error, results, fields) => {  // 상품조회 SQL실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
      else if (results.length <= 0) {  // 조회된 상품이 없다면, 오류메시지 출력
        htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
        res.status(562).end(ejs.render(htmlstream2, {
          'title': '알리미',
          'warn_title': '상품조회 오류',
          'warn_message': '조회된 상품이 없습니다.',
          'return_url': '/'
        }));
      }
      else {  // 조회된 상품이 있다면, 상품리스트를 출력

        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          prodata: results
        }));  // 조회된 상품정보
      } // else
    }); // db.query()

  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(563).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품등록기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }

};
//상품 수정요청시 기능
const HanldleUpdateProduct = (req, res) => {  // 상품등록
  let body = req.body;
  let htmlstream = '';
  let datestr, y, m, d, regdate;
  let prodimage = '/images/uploads/products/'; // 상품이미지 저장디렉터리

  let picfile;
  let result
  //상품사진 수정하는경우/안하는경우 나누어서 처리
  if (req.file == null) {
  }
  else {
    picfile = req.file;
    result = {
      originalName: picfile.originalname,
      size: picfile.size
    }
  }

  if (req.session.auth && req.session.admin) {
    if (body.itemid == '' || datestr == '') {
      console.log("상품번호가 입력되지 않아 DB에 저장할 수 없습니다.");
      res.status(563).end('<meta charset="utf-8">상품번호가 입력되지 않아 등록할 수 없습니다');
    }
    else {

      regdate = new Date();

      //상품사진 수정하는경우/안하는경우 나누어서 처리
      if (req.file == null)
        sql_str = "UPDATE u19_product SET product_category = ?, product_company = ?, product_name = ?, product_modelname = ?, product_rdate = ?, product_price = ?, product_discount = ?, product_stock = ?, product_saleform = ?, product_description = ? WHERE product_number = ?";
      else {
        prodimage = prodimage + picfile.filename;
        sql_str = "UPDATE u19_product SET product_category = ?, product_company = ?, product_name = ?, product_modelname = ?, product_rdate = ?, product_price = ?, product_discount = ?, product_stock = ?, product_saleform = ?, product_imgpath = '" + prodimage + "', product_description = ? WHERE product_number = ?";
      }

      db.query(sql_str,
        [body.category, body.maker, body.pname, body.modelnum, regdate,
        body.price, body.dcrate, body.amount, body.event, body.description, body.itemid], (error, results, fields) => {
          if (error) { //상품번호가 존재하는등의 에러
            console.log(error);
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(562).end(ejs.render(htmlstream, {
              'title': '알리미',
              'warn_title': '상품등록 오류',
              'warn_message': '상품으로 등록할때 DB저장 오류가 발생하였습니다. 원인을 파악하여 재시도 바랍니다',
              'return_url': '/'
            }));
          } else {
            console.log("상품수정에 성공하였으며, DB에 신규상품으로 등록하였습니다.!");
            res.redirect('/adminprod/list');
          }
        });
    }
  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품등록기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

//상품삭제요청시 기능
const handleDeleteProduct = (req, res) => {
  let body = req.body;

  let htmlstream = '';

  //상품삭제 쿼리
  sql_str = 'DELETE from u19_product WHERE product_number = ?';

  if (req.session.auth && req.session.admin) {
    //상품번호가 없을경우
    if (body.itemid == '') {
      console.log("상품번호가 입력되지 않아 DB에 저장할 수 없습니다.");
      res.status(563).end('<meta charset="utf-8">상품번호가 입력되지 않아 등록할 수 없습니다');
    }
    else {
      db.query(sql_str,
        [body.itemid], (error, results, fields) => {
          //DB에러가 났을경우
          if (error) {
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(562).end(ejs.render(htmlstream, {
              'title': '알리미',
              'warn_title': '상품삭제 오류',
              'warn_message': '상품을 삭제할때 DB저장 오류가 발생하였습니다. 원인을 파악하여 재시도 바랍니다',
              'return_url': '/'
            }));
          } else {
            console.log("상품삭제에 성공하였으며, DB에서 삭제하였습니다.!");
            res.redirect('/adminprod/list');
          }
        });
    }
  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품삭제 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품삭제 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

router.get('/form', PrintAddProductForm);   // 상품등록화면을 출력처리
router.post('/product', upload.single('photo'), HanldleAddProduct);    // 상품등록내용을 DB에 저장처리
router.get('/putproductform', PrintPutProductForm); //상품 수정화면 출력
router.post('/putproduct', upload.single('photo'), HanldleUpdateProduct); //상품 수정 db에 처리
router.post('/deleteproduct', upload.none(), handleDeleteProduct); //상품삭제

//  -----------------------------------  회원리스트 기능 -----------------------------------------
// (관리자용) 등록된 회원리스트를 브라우져로 출력합니다.
const AdminPrintUsers = (req, res) => {
  let htmlstream = '';
  let htmlstream2 = '';
  let sql_str;
  const query = url.parse(req.url, true).query;
  const sort = query.sort; //분류방법별 정렬방식받음
  const keyword = query.keyword; //키워드 받음
//첫접근이므로 페이지가 정의되지 않은경우
  if (query.page == undefined) {
    page = 1;
  }
  //페이지가 이미 정의된경우
  else
    page = query.page;

  if (req.session.auth && req.session.admin) {   // 관리자로 로그인된 경우에만 처리한다
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminuserlist.ejs', 'utf8'); // 관리자회원리스트메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer
    //회원정보 조회SQL
    sql_str = "SELECT user_id, user_pw, user_name, user_phonenum, user_address, user_mileage from u19_user;"; 

    //유저조회 순서및 정보를 정렬방법별로 구분함
    //오름차순
    if (sort == "up")
      sql_str = "SELECT user_id, user_pw, user_name, user_phonenum, user_address, user_mileage from u19_user where user_name like '%" + keyword + "%' order by user_name;";
    //내림차순
    else if (sort == "down")
      sql_str = "SELECT user_id, user_pw, user_name, user_phonenum, user_address, user_mileage from u19_user where user_name like '%" + keyword + "%' order by user_name desc;";
    //이름순정렬
    else if (sort == "namesort")
      sql_str = "SELECT user_id, user_pw, user_name, user_phonenum, user_address, user_mileage from u19_user order by user_name;";
    //매출순정렬
    else if (sort == "salessort")
      sql_str = "select sum(product_price) as sum, o.user_id, user_pw, user_name, user_phonenum, user_address, user_mileage from u19_order as o join u19_user as u on o.user_id = u.user_id join u19_product as p on o.product_number = p.product_number group by u.user_id order by sum(product_price) desc;";
    //navbar을 통한 접근
    else if (sort == null)
      sql_str = "SELECT user_id, user_pw, user_name, user_phonenum, user_address, user_mileage from u19_user;";


    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

    db.query(sql_str, (error, results, fields) => {  // 회원조회 SQL실행
      if (error) { res.status(564).end("AdminPrintUsers: DB query is failed"); }
      else if (results.length <= 0) {
        htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
        res.status(564).end(ejs.render(htmlstream2, {
          'title': '알리미',
          'warn_title': '사용자조회 오류',
          'warn_message': '조회된 사용자가 없습니다.',
          'return_url': '/'
        }));
      }
      else {
        pagenationnum = parseInt(Math.ceil(results.length / 5));
        //페이지에 맞는 데이터 잘라서 보냄
        sliceresults = results.slice((page - 1) * 5, page * 5);


        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          'key': query.keyword, //검색한 키워드
          'sort': sort, //정렬방법
          'total_page': pagenationnum, //페이지개수
          prodata: sliceresults //잘라진 데이터
        }));
      }
    });
  }
  else {  // (관리자로 로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품리스트 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품리스트 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }

};

//회원정보 수정및 삭제 폼 출력
const PrintPutUserForm = (req, res) => {
  const query = url.parse(req.url, true).query;
  //placeholder를 위한 회원정보 가져옴
  sql_str = "SELECT user_id, user_name, user_phonenum, user_address, user_mileage from u19_user where user_id=" + query.userid + ";";
  let htmlstream = '';

  if (req.session.auth && req.session.admin) { // 관리자로 로그인된 경우에만 처리한다
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/put_user_form.ejs', 'utf8'); // 상품정보입력
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

    db.query(sql_str, (error, results, fields) => {  // 상품조회 SQL실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
      else if (results.length <= 0) {  // 조회된 회원이 없다면, 오류메시지 출력
        htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
        res.status(562).end(ejs.render(htmlstream2, {
          'title': '알리미',
          'warn_title': '사용자 조회 오류',
          'warn_message': '조회된 사용자가 없습니다.',
          'return_url': '/'
        }));
      }
      else {  // 조회된 회원이 있다면, 회원정보를 출력

        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          prodata: results
        }));  // 조회된 상품정보
      } // else
    }); // db.query()

  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(563).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '사용자조회 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 사용자조회 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

const HanldleUpdateUser = (req, res) => {  // 사용자 마일리지 변경
  let body = req.body;
  let htmlstream = '';

  sql_str = 'UPDATE u19_user SET user_mileage = ? WHERE user_id = ?';

  if (req.session.auth && req.session.admin) {
    if (body.uid == '') { //사용자 아이디가 없을경우
      console.log("사용자이름이 입력되지 않아 DB에 저장할 수 없습니다.");
      res.status(563).end('<meta charset="utf-8">사용자이름이 입력되지 않아 등록할 수 없습니다');
    }
    else {
      db.query(sql_str,
        [body.umileage, body.uid], (error, results, fields) => {
          if (error) {
            //사용자 정보변경오류가 생길경우
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(562).end(ejs.render(htmlstream, {
              'title': '알리미',
              'warn_title': '사용자 마일리지 변경 오류',
              'warn_message': '사용자 마일리지 변경 오류',
              'return_url': '/'
            }));
          } else {
            console.log("사용자정보 수정에 성공하였으며, DB에 사용자정보를 업데이트했습니다!");
            res.redirect('/adminprod/ulist');
          }
        });
    }
  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '유저수정기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 유저수정 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

//사용자 삭제 기능
const HandleDeleteUser = (req, res) => {
  let body = req.body;
  let htmlstream = '';

  //사용자 삭제 SQL
  sql_str = "DELETE from u19_user WHERE user_id = '" + body.uid + "';";

  if (req.session.auth && req.session.admin) {
    //사용자 아이디가 없을경우
    if (body.uid == '') {
      console.log("사용자 아이디가 입력되지 않아 삭제할 수 없습니다.");
      res.status(563).end('<meta charset="utf-8">사용자 아이디가 입력되지 않아 삭제할 수 없습니다.');
    }
    else {
      //사용자 삭제 SQL
      db.query(sql_str,
        (error, results, fields) => {
          if (error) {
            console.log(error);
            htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
            res.status(562).end(ejs.render(htmlstream, {
              'title': '알리미',
              'warn_title': '회원삭제 오류',
              'warn_message': '회원을 삭제할때 DB저장 오류가 발생하였습니다. 원인을 파악하여 재시도 바랍니다',
              'return_url': '/'
            }));
          } else {
            console.log("상품삭제에 성공하였으며, DB에서 삭제하였습니다.!");
            res.redirect('/adminprod/ulist');
          }
        });
    }
  }
  else {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '상품등록기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 상품등록 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};


// REST API의 URI와 핸들러를 매핑합니다.
router.get('/ulist', AdminPrintUsers);      // 회원리스트를 화면에 출력
router.get('/putuserform', PrintPutUserForm);
router.post('/putuser', HanldleUpdateUser);
router.post('/deleteuser', HandleDeleteUser);
//  -----------------------------------  댓글관리 기능 -----------------------------------------
//사용자 댓글출력
const PutCommentForm = (req, res) => {
  
  const query = url.parse(req.url, true).query;

  let htmlstream = '';
  //댓글 저장
  let comment;
  //평균별점
  let average_rating=0;
  let product_name = "";
    //댓글 조회 SQL문
    sql_str = "select comment_number, comment_contents, user_id, comment_rating from u19_comment where product_number = " + query.productid + ";";

    //상품이름조회 sql문
    sql_str2 = "select product_name from u19_product where product_number = " + query.productid + ";"
  if (req.session.auth && req.session.admin) 
  {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/admin_put_comment.ejs', 'utf8'); // 댓글관리
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

    db.query(sql_str2, (error, results, fields) => { //상품이름조회 sql실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); console.log(error);}
      else {
        product_name = results[0].product_name;
      }
    });
    db.query(sql_str, (error, comment_results, fields) => {  // 댓글조회 SQL실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); console.log(error);}
      else if (comment_results.length <= 0) {  // 조회된 상품이 없다면, 오류메시지 출력
        htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
        res.status(562).end(ejs.render(htmlstream2, {
          'title': '알리미',
          'warn_title': '댓글없음',
          'warn_message': '조회된 댓글이 없습니다.',
          'return_url': '/'
        }));
      }
      //댓글이 있을경우
      else {
        comment = comment_results;
        //상품의 평균 평점구함
        for(let i = 0; i < Object.keys(comment_results).length; i++){
          average_rating +=  Number.parseInt(comment_results[i].comment_rating);
        }
        average_rating = average_rating / Object.keys(comment_results).length;
        average_rating = average_rating.toFixed(1);

        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          'average_rating': average_rating, //평균평점
          'product_name': product_name, //상품이름
          'product_id': query.productid, //상품아이디
          prodata2: comment //댓글정보
        }));  // 조회된 댓글정보
      }
    }); // db.query()
  }
  else
  {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '댓글관리기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 댓글관리 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

//댓글삭제기능
const DeleteCommentForm = (req, res) => {

  let body = req.body;
  let htmlstream = '';
  //댓글 저장
  let comment;
  //평균별점
  let average_rating=0;
  let product_name = "";
    //댓글 조회 SQL문
    sql_str = "select comment_number, comment_contents, user_id, comment_rating from u19_comment where product_number = " + body.productid + ";";

    //상품이름조회 sql문
    sql_str2 = "select product_name from u19_product where product_number = " + body.productid + ";"

    //댓글삭제 SQL문
    sql_str3 = "DELETE from u19_comment WHERE comment_number = '" + body.comment_number + "';";
    
  if (req.session.auth && req.session.admin) 
  {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/adminbar.ejs', 'utf8');  // 관리자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/admin/admin_put_comment.ejs', 'utf8'); // 댓글관리
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });


    db.query(sql_str3, (error, results, fields) => { //댓글삭제 sql실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); console.log(error);}
      else {
        console.log(results);
      }
    });

    db.query(sql_str2, (error, results, fields) => { //상품이름조회 sql실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); console.log(error);}
      else {
        product_name = results[0].product_name;
        console.log(results);
      }
    });
    db.query(sql_str, (error, comment_results, fields) => {  // 댓글조회 SQL실행
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); console.log(error);}
      else if (comment_results.length <= 0) {  // 조회된 상품이 없다면, 오류메시지 출력
        htmlstream2 = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
        res.status(562).end(ejs.render(htmlstream2, {
          'title': '알리미',
          'warn_title': '댓글없음',
          'warn_message': '조회된 댓글이 없습니다.',
          'return_url': '/'
        }));
      }
      //댓글이 있을경우
      else {
        comment = comment_results;
        //상품평점 구함
        for(let i = 0; i < Object.keys(comment_results).length; i++){
          average_rating +=  Number.parseInt(comment_results[i].comment_rating);
        }
        average_rating = average_rating / Object.keys(comment_results).length;
        average_rating = average_rating.toFixed(1);

        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          'average_rating': average_rating,
          'product_name': product_name,
          'product_id': body.productid,
          prodata2: comment
        }));  // 조회된 댓글정보
      }
    }); // db.query()
  }
  else
  {
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '댓글관리기능 오류',
      'warn_message': '관리자로 로그인되어 있지 않아서, 댓글관리 기능을 사용할 수 없습니다.',
      'return_url': '/'
    }));
  }
};

router.get('/putcomment', PutCommentForm); //댓글관리 폼 출력
router.post('/putcomment', DeleteCommentForm); //댓글삭제및 댓글관리 폼 출력

module.exports = router;
