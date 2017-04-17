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

  getProductDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = contacts.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  placeOrder(data){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = {
          orderId: "KJHDNSF7SDAF87"
        };
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }
}