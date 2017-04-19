let latency = 200;

let products = [
  {
    id:"1",
    name:'Radical Coffee Maker',
    description:'The best coffee maker your ass will ever own',
    imgUrl:'',
    price:42.50
  },
  {
    id:"2",
    name:'The Worst Shit Ever',
    description:'The worst coffee maker your ass will ever own',
    imgUrl:'',
    price:12.99
  },
  {
    id:"3",
    name:'Some Gnarly Product',
    description:'You dont want to use this thing or buy it or nothing',
    imgUrl:'',
    price:0.99
  },
  {
    id:"4",
    name:'Stupid Coffee Maker',
    description:'Tries to make tea, doesn\'t understand its place in the world',
    imgUrl:'',
    price:66.60
  },
  {
    id:"5",
    name:'Tub of Butter',
    description:'I don\'t think you\'re ready for this jelly',
    imgUrl:'',
    price:900.00
  }
];

let shippingInfo = {
  firstName: "Joe",
  lastName: "Smith",
  street: "250 University Avenue",
  apartmentNum:	"227",
  city:	"Toronto",
  province:	"Ontario",
  postalCode:	"M5A0E3"
};

let items = [
  {
    id:"1",
    name:'Radical Coffee Maker',
    price: 42.50,
    quantity: 1,
    subtotal: 42.50
  },
  {
    id:"2",
    name:'The Worst Shit Ever',
    price: 12.99,
    quantity: 3,
    subtotal: 38.97
  },
];

let totals = {
  subtotal: 81.48,
  taxes: 10.59,
  total: 92.07
}

export class WebAPI {
  isRequesting = false;
  
  getProductList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = products.map(x =>  { return {
          id:x.id,
          name:x.name,
          description:x.description,
          imgUrl:x.imgUrl,
          price:x.price
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  placeOrder(data){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = {
          orderId: "KJHDNSF7SDAF87",
          success: true
        };
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getOrder(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = {      
          shippingInfo: shippingInfo,
          items: items,
          totals: totals,
          email: "joe@smith.com"
        };
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }
}