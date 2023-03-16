const domain = require("supertest")("http://barru.pythonanywhere.com");
const validasi = require("chai").expect;

describe("Scenario Login Feature", function () {
  it("Verify Success Login with valid email and password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "siapaya27@gmail.com", password: "siapaya27" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('SUCCESS_LOGIN');
    validasi(response.body.message).to.eql('Anda Berhasil Login');
    validasi(response.body).to.include.keys("data", "message", "status", "credentials"); 
  });

  it("Verify Failed Login with invalid email and valid password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "siapayaa27@gmail.com", password: "siapaya27" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(response.body).to.include.keys("data", "message", "status"); 
  });

  it("Verify Failed Login with valid email and empty password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "siapaya27@gmail.com", password: "" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(response.body.data).to.eql("User's not found"); 
  });

  it("Verify Failed Login with valid email and password contain symbol", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "siapaya27@gmail.com", password: "siapaya27_" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Tidak boleh mengandung symbol');
    validasi(response.body.data).to.eql("Password tidak valid"); 
  });

  it("Verify Failed Login with valid email and empty password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "siapaya27@gmail.com", password: "" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Email atau Password Anda Salah');
    validasi(response.body.data).to.eql("User's not found"); 
  });

  it("Verify Failed Login with empty email and password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "", password: "" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_LOGIN');
    validasi(response.body.message).to.eql('Cek kembali email anda');
    validasi(response.body.data).to.eql("Email tidak valid"); 
  });
});  

describe("Scenario Register Feature", function () {  
  it("Verify Success Register with valid email, password, and name", async function () { 
    const response = await domain 
      .post("/register")
      .send({ email: "hazell27@gmail.com", password: "hazel27", name: "hazel" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('SUCCESS_REGISTER');
    validasi(response.body.message).to.eql('created user!');
    validasi(response.body.data).to.eql("berhasil"); 
  });

  it("Verify Failed Register because the email has already been registered", async function () { 
    const response = await domain 
      .post("/register")
      .send({ email: "siapaya27@gmail.com", password: "hazel27", name: "hazel" });
      
    // VALIDASI OUTPUT
    validasi(response.body.status).to.eql('FAILED_REGISTER');
    validasi(response.body.message).to.eql('Gagal Registrasi');
    validasi(response.body.data).to.eql("Email sudah terdaftar, gunakan Email lain"); 
  });
});
