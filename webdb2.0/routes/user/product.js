const fs = require('fs');
const express = require('express');
const ejs = require('ejs');
const url = require('url');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
// 업로드 디렉터리를 설정한다. 
// const  upload = multer({dest: __dirname + '/../uploads/products'});
const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost',        // DB서버 IP주소
  port: 3306,               // DB서버 Port주소
  user: 'dbuser',            // DB접속 아이디
  password: 'gachon654321',  // DB암호
  database: 'webdb'         //사용할 DB명
});

//  -----------------------------------  상품리스트 기능 -----------------------------------------
// (사용자용) 등록된 상품리스트를 브라우져로 출력합니다.
const PrintCategoryProd = (req, res) => {

  let htmlstream = '';
  let htmlstream2 = '';
  let sql_str, search_cat;
  const query = url.parse(req.url, true).query;
  let page;//쿼리에서 받아온 페이지숫자 query.page
  let pagenationnum;
  console.log(query.category);
  console.log(query);
  if (query.page == undefined) {
    page = 1;
  }
  else
    page = query.page;
  if (req.session.auth) {   // 로그인된 경우에만 처리한다


    if (query.keyword != null) {
      search_cat = "상품검색";
      sql_str = "SELECT product_number, product_company, product_name, product_modelname, product_rdate, product_price, product_imgpath from u19_product where product_name like '%" + query.keyword + "%' order by product_rdate desc;"; // 상품조회SQL

      //페이지네이션을 위해 상품개수 구함(삭제예정)
      sql_str2 = "SELECT count(*) from u19_product WHERE product_name like '%" + query.keyword + "%';"
      console.log(sql_str2);
    }
    else {
      switch (query.category) {
        case 'search': search_cat = "상품검색"; break;
        case 'fan': search_cat = "선풍기"; break;
        case 'aircon': search_cat = "에어컨"; break;
        case 'aircool': search_cat = "냉풍기"; break;
        case 'fridge': search_cat = "냉장고"; break;
        case 'minisun': search_cat = "미니선풍기"; break;
        default: search_cat = "선풍기"; break;
      }
      sql_str = "SELECT product_number, product_company, product_name, product_modelname, product_rdate, product_price, product_imgpath from u19_product where product_category='" + search_cat + "' order by product_rdate desc;"; // 상품조회SQL
    }

    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/navbar.ejs', 'utf8');  // 사용자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/user/product.ejs', 'utf8'); // 카테고리별 제품리스트
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
        //데이터의 길이만큼 페이지 받음(페이지 개수 구함)
        pagenationnum = parseInt(Math.ceil(results.length / 3));
        //페이지에 맞는 데이터 잘라서 보냄
        sliceresults = results.slice((page - 1) * 3, page * 3);

        res.end(ejs.render(htmlstream, {
          'title': '쇼핑몰site',
          'logurl': '/users/logout',
          'loglabel': '로그아웃',
          'regurl': '/users/profile',
          'reglabel': req.session.who,
          'category': search_cat,
          'key': query.keyword,
          'category_name': query.category,
          prodata: sliceresults,
          'total_page': pagenationnum, //페이지개수
          'page': page //현재페이지
        }));  // 조회된 상품정보
      } // else
    }); // db.query()
  }
  else {  // (로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '로그인 필요',
      'warn_message': '상품검색을 하려면, 로그인이 필요합니다.',
      'return_url': '/'
    }));
  }
};

//  -----------------------------------  상품 상세보기 기능 -----------------------------------------
// 상품의 상세한 정보를 브라우져로 출력합니다.

const DetailPageLoad = (req, res) => {
  const query = url.parse(req.url, true).query;
  let htmlstream = '';
  let u_mileage;

  sql_str = "SELECT product_number, product_company, product_name, product_modelname, product_rdate, product_price, product_imgpath, product_description from u19_product where product_number=" + query.productid + ";";
  sql_str2 = "SELECT user_mileage from u19_user where user_id = '" + req.session.userid + "';";


  if (req.session.auth) {   // 로그인된 경우에만 처리한다

    htmlstream = fs.readFileSync(__dirname + '/../../views/common/header.ejs', 'utf8');    // 헤더부분
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/navbar.ejs', 'utf8');  // 사용자메뉴
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/user/product_detail.ejs', 'utf8'); // 카테고리별 제품리스트
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../../views/common/footer.ejs', 'utf8');  // Footer

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    db.query(sql_str2, (error, results, fields) => {
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
      else {
        u_mileage = results[0].user_mileage;
      }

    })
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
          'u_mileage': u_mileage,
          prodata: results
        }));  // 조회된 상품정보
      } // else
    }); // db.query()
  }
  else {  // (로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '로그인 필요',
      'warn_message': '상품검색을 하려면, 로그인이 필요합니다.',
      'return_url': '/'
    }));
  }

};

//구매기능 구현
const BuyingProduct = (req, res) => {
  let body = req.body;


  let sql_str1;
  let sql_str2;
  let sql_str3;
  let amount = body.amount;
  let stock;
  let restmileage = (body.u_mileage - (body.p_price * amount));

  sql_str1 = "UPDATE u19_user SET user_mileage = " + restmileage + " WHERE user_id = '" + req.session.userid + "';";
  sql_str2 = "SELECT product_stock from u19_product where product_number = '" + body.p_name + "';"

  console.log(sql_str1);
  console.log(sql_str2);


  if (req.session.auth) {   // 로그인된 경우에만 처리한다

    //유저 마일리지 수정함
    db.query(sql_str1, (error, results, fields) => {
      if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
      else {

        //제품 재고량 가져옴
        db.query(sql_str2, (error, results, fields) => {
          if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
          else {

            //원래재고에서 amount만큼 없앰
            stock = results[0].product_stock - amount
            sql_str3 = "UPDATE u19_product SET product_stock = " + stock + " WHERE product_number = '" + body.p_name + "';"

            //제품 재고량 수정
            db.query(sql_str3, (error, results, fields) => {
              if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
              else {
                let datestr, y, m, d, regdate;
                regdate = new Date();
                sql_str_insert_order = "INSERT INTO u19_order (order_date, product_number, user_id) values('" + regdate.getFullYear() + "-" + (regdate.getMonth() + 1) + "-" + regdate.getDate() + "', '" + body.p_name + "', '" + req.session.userid + "');";
                console.log(sql_str_insert_order);

                //amount만큼 주문횟수 추가함
                for (i = 0; i < amount; i++) {
                  db.query(sql_str_insert_order, (error, results, fields) => {
                    if (error) { res.status(562).end("AdminPrintProd: DB query is failed"); }
                    else {
                    }
                  })
                }
                console.log("재고는 : " + stock + " 주문이 잘 처리되었습니다.");
                console.log("남은 마일리지는 : " + restmileage);
                htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
                res.status(562).end(ejs.render(htmlstream, {
                  'title': '주문성공',
                  'warn_title': body.p_name + ' 주문을 성공하였습니다',

                  'warn_message': "주문수량 : " + amount + "개 입니다. 남은 마일리지는 : " + restmileage + " 입니다.",
                  'return_url': '/'
                }));


              }
            })
          }

        })
      }

    })
  }

  else {  // (로그인하지 않고) 본 페이지를 참조하면 오류를 출력
    htmlstream = fs.readFileSync(__dirname + '/../../views/common/alert.ejs', 'utf8');
    res.status(562).end(ejs.render(htmlstream, {
      'title': '알리미',
      'warn_title': '로그인 필요',
      'warn_message': '상품검색을 하려면, 로그인이 필요합니다.',
      'return_url': '/'
    }));
  }

}
// REST API의 URI와 핸들러를 매핑합니다.
router.get('/list', PrintCategoryProd);      // 상품리스트를 화면에 출력
router.get('/detailpage', DetailPageLoad);   // 상품 상세조회 화면 출력
router.post('/buy', BuyingProduct);

module.exports = router;
