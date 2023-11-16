const CustomError = require('./Error');
const Enum = require('../config/Enum');

class Response {
  //  constructor -> -bir class oluşturulduğunda ilk çalışan fonksiyondur.
  //                 -contructor içerisindeki this= class içerisindeki değişkenlere erişmemizi sağlar.
  constructor() {}

  //static-> bir class içerisindeki fonksiyonu class adı ile çağırabilmemizi sağlar.
  static succesResponse(data, code = 200) {
    return {
      code,
      data,
    };
  }
  
  E11000
  static errorResponse(error) {
    //instanceof -> bir objenin bir class'a ait olup olmadığını kontrol eder.
    if(error instanceof CustomError) {
      return {
        code: error.code,
        error: {
          message: error.message,
          description: error.description,
        },
      };
    }
    else if (error.message.includes("E11000")){
      return {
        code: Enum.HTTP_CODES.CONFLICT,
        error: {
          message: "Already Exist!",
          description: "This data already exist in database",
        },
      };
    }
    // CustomError dışında bir hata fırlatıldığında bu kısım çalışır.
    return {
      code: Enum.HTTP_CODES.INT_SERVER_ERROR,
      error: {
        message: "Unkonwn Error!",
        description: error.message,
      },
    };
  }
}

module.exports = Response;