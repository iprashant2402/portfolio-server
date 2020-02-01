var admin = require('firebase-admin');

var serviceAccount = require("./firebaseCred/doorzy-firebase-cred.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://doorzy-dev.firebaseio.com"
});

var order_flag = false;
var user_flag = false;


function calculate_total_sales(orders){

  var total = 0;

  orders.forEach(function(order){
    if(order.statusCode!="cancelled"){
      console.log("ORDER ID : " + order.oid);
    for(var i=0; i<order.products.length; i++){
      if(order.products[i].amount){
        console.log(order.products[i].amount);
        total = total + parseInt(order.products[i].amount);
      }
    }
  }
  });

  return total;

}

function calculate_total_profit(orders){

  var profit = 0;
  var sale = calculate_total_sales(orders);
  var total = 0;
  var packingTotal = 0;
  orders.forEach(function(order){
  if(order.statusCode!="cancelled" && !order.active){
    if(order.packingCharge){
      packingTotal = packingTotal + order.packingCharge;
    }
    if(order.total){
      total = total + order.total;
    }
  } 
  });

  profit = total - sale - packingTotal;
  return profit;

}

var start_date, end_date;


var start_time = new Date("1 Nov 2019");
var end_time = new Date("1 Dec 2019");

var ordersRef = admin.firestore().collection('orders').where('regTime','>=',start_time.getTime()).where('regTime','<=',end_time.getTime());
var usersRef = admin.firestore().collection('users');
var orders_list = [];
var users_list = [];
ordersRef.get().then(function(orders){
  orders.forEach(function(order){
    orders_list.push(order.data());
  });
  order_flag = true;
}).catch(err => console.log(err));

function get_sales(){
  if(!order_flag){
    setTimeout(get_sales,1000);
  }
  else{
    console.log("TOTAL SALES : "+calculate_total_sales(orders_list));
    console.log("NO OF ORDERS : "+orders_list.length);
    console.log("TOTAL PROFIT : "+calculate_total_profit(orders_list));
  }
}

get_sales();

// usersRef.get().then(function(users){
//   users.forEach(function(user){
//     users_list.push(user.data());
//   });
//   user_flag = true;
// }).catch(err => console.log(err));
// get_sales();
