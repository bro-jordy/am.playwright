// test.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('/Users/dieudonnejordy/aladinmall-playwright-testing/pages/homepage.js');

test.describe('@Login Aladinmall Tests', () => {
  test.setTimeout(30000); // Menambahkan timeout untuk seluruh test

  test('Login AladinMall', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await expect(homePage.textMasukVerif).toHaveText('Masuk'); // Verifikasi text Masuk
    await expect(homePage.emailInput).toBeVisible(); // Verifikasi bahwa elemen input email terlihat setelah pindah ke halaman login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await expect(homePage.imgUserVerif).toBeVisible(); // Verifikasi img user muncul
    await expect(homePage.carouselVerif).toBeVisible(); // Verifikasi carousel muncul
    await expect(homePage.sectionPilihaVerif).toBeVisible(); // Verifikasi section produk pilihan 
    await expect(homePage.sectionOfficialVerif).toBeVisible(); // Verifikasi section official store muncul
    await expect(homePage.brandTerpopulerVerif).toBeVisible(); // Verifikasi brand terpopuler muncul
    
    
  });

  test('Search Product', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('baju');// Input nama product lalu auto enter
    await expect(homePage.tabProdukVerif).toHaveText('Produk'); // Verifikasi text Produk
    await expect(homePage.tabTokoVerif).toHaveText('Toko');
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
   
   
  });

  test('Add product to cart from PLP', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await expect(homePage.emailInput).toBeVisible(); // Verifikasi bahwa elemen input email terlihat setelah pindah ke halaman login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await expect(homePage.halamanUtama).toBeVisible(); // Verifikasi bahwa setelah login berhasil, halaman beralih ke dashboard (atau halaman yang relevan setelah login)
    await homePage.searchProduct('baju');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.AddToCartPLP();// Klik produk secara acak dan add to cart

  });

  test('Produk Detail Page', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('baju');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.clickPLP();// Klik produk secara acak dan add to cart
    await expect(homePage.textTotalPesananVerif).toHaveText('Total Pesanan');
    
  });

  test('Add product to cart from PDP', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('baju');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.clickPLP();// Klik produk secara acak dan add to cart
    await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
    await expect(homePage.textRingkasanBelanjaVerif).toHaveText('Ringkasan Belanja');
    
  });

  test('Checkout from PLP', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('baju');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.AddToCartPLP();// Klik produk secara acak dan add to cart
    await homePage.cartFromHomepage();
    await homePage.cartPage();
    await expect(homePage.textCheckoutVerif).toHaveText('Checkout');

  });

  test('Checkout from PDP', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('baju');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.clickPLP();// Klik produk secara acak dan add to cart
    await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
    await homePage.cartPage();
    await expect(homePage.textCheckoutVerif).toHaveText('Checkout');
    
  });

  test('Delete cart', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.cartFromHomepage(); // Buka cart dari homepage
    await homePage.deletecartPage(); // Buka cart lalu delete produk
    await expect(homePage.textCartEmpty).toHaveText('Keranjang Kamu Kosong Nih')
    
    
  });

  test('Verify Pengiriman', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('Lipstick Yahud');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.clickPLP();// Klik produk secara acak dan add to cart
    await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
    await homePage.cartPage();
    await homePage.selectCourier();
    // await expect(homePage.jne_promoButton).toBeVisible(); // Verifikasi jne promo muncul
    await expect(homePage.sap_regButton).toBeVisible(); // Verifikasi  sap reg muncul
    await expect(homePage.ambilditempatButton).toBeVisible(); // Verifikasi  ambil ditempat muncul
    await expect(homePage.grab_carButton).toBeVisible(); // Verifikasi  grab car muncul

    
  });

  test('Verify Pembayaran', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('dieudonne.jordy@misteraladin.com', 'thefthing123'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('Lipstick Yahud');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.logProductList(); // Log produk yang ditemukan
    await homePage.clickPLP();// Klik produk secara acak dan add to cart
    await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
    await homePage.cartPage();
    await homePage.selectCourierSAP();
    await homePage.selectPayment();
    await expect(homePage.emoney_shopeeButton).toBeVisible(); // Verifikasi emoney shopee muncul
    await expect(homePage.emoney_gopayButton).toBeVisible(); // Verifikasi gopay muncul
    await expect(homePage.emoney_ovoButton).toBeVisible(); // Verifikasi ovo muncul
    await expect(homePage.va_bcaButton).toBeVisible(); // Verifikasi va bca muncul
    await expect(homePage.va_mncButton).toBeVisible(); // Verifikasi va mnc muncul
    await expect(homePage.va_briButton).toBeVisible(); // Verifikasi va bri muncul
    await expect(homePage.va_permataButton).toBeVisible(); // Verifikasi va permata muncul
  });
  
  // test('Checkout 1 Produk dengan Payment Emoney Gopay', async ({ page }) => {
  //   const homePage = new HomePage(page);
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage();
  //   await homePage.selectCourierSAP();
  //   await homePage.selectPaymentGopay();
    
  // });

  

  // test('Pembayaran Test dengan Report', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   let paymentError = null;
  
  //   page.on('response', async response => {
  //     const url = response.url();
  //     if (url.includes('/payment_api') && response.status() >= 400) {
  //       paymentError = {
  //         url: url,
  //         status: response.status(),
  //         body: await response.text()
  //       };
  //     }
  //   });
  
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage();
  //   await homePage.selectCourierSAP();
  //   await homePage.selectPaymentGopay();
  
  //   // Assert jika ada error dalam API pembayaran
  //   if (paymentError) {
  //     throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
  //   }
  // });
  
  

});

test.describe('@sanity Aladinmall Payment', () => {
  test.setTimeout(80000); // Menambahkan timeout untuk seluruh test

  test('Pembayaran - Shopee', async ({ page }) => {
    const homePage = new HomePage(page);
    let paymentError = null;
  
    page.on('response', async response => {
      const url = response.url();
      if (url.includes('/payment_api') && response.status() >= 400) {
        paymentError = {
          url: url,
          status: response.status(),
          body: await response.text()
        };
      }
    });
  
    
    await homePage.navigate();
    await homePage.loginPage(); // Klik tombol login
    await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
    await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
    await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
    await homePage.clickPLP();// Klik produk secara acak dan add to cart
    await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranajng
    await homePage.cartPage(); // Klik cart & checklist all product
    await homePage.selectCourierSAP(); // Klik kurir sap reg
    await homePage.selectPaymentShopee(); // Klik payment shopee
  
    // Assert jika ada error dalam API pembayaran
    if (paymentError) {
      throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
    }
  });

  // test('Pembayaran - Gopay', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   let paymentError = null;
  
  //   page.on('response', async response => {
  //     const url = response.url();
  //     if (url.includes('/payment_api') && response.status() >= 400) {
  //       paymentError = {
  //         url: url,
  //         status: response.status(),
  //         body: await response.text()
  //       };
  //     }
  //   });
  
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage(); // Klik cart & checklist all product
  //   await homePage.selectCourierSAP(); // Klik kurir sap reg
  //   await homePage.selectPaymentGopay(); // Klik payment gopay
  
  //   // Assert jika ada error dalam API pembayaran
  //   if (paymentError) {
  //     throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
  //   }
  // });
  
  // test('Pembayaran - OVO', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   let paymentError = null;
  
  //   page.on('response', async response => {
  //     const url = response.url();
  //     if (url.includes('/payment_api') && response.status() >= 400) {
  //       paymentError = {
  //         url: url,
  //         status: response.status(),
  //         body: await response.text()
  //       };
  //     }
  //   });
  
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage(); // Klik cart & checklist all product
  //   await homePage.selectCourierSAP(); // Klik kurir sap reg
  //   await homePage.selectPaymentOvo('8111092799'); // Klik payment ovo
  
  //   // Assert jika ada error dalam API pembayaran
  //   if (paymentError) {
  //     throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
  //   }
  // });

  // test('Pembayaran - MNC Bank', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   let paymentError = null;
  
  //   page.on('response', async response => {
  //     const url = response.url();
  //     if (url.includes('/payment_api') && response.status() >= 400) {
  //       paymentError = {
  //         url: url,
  //         status: response.status(),
  //         body: await response.text()
  //       };
  //     }
  //   });
  
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage(); // Klik cart & checklist all product
  //   await homePage.selectCourierSAP(); // Klik kurir sap reg
  //   await homePage.selectPaymentMNC(); // Klik payment va mnc bank
  
  //   // Assert jika ada error dalam API pembayaran
  //   if (paymentError) {
  //     throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
  //   }
  // });

  // test('Pembayaran - BCA', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   let paymentError = null;
  
  //   page.on('response', async response => {
  //     const url = response.url();
  //     if (url.includes('/payment_api') && response.status() >= 400) {
  //       paymentError = {
  //         url: url,
  //         status: response.status(),
  //         body: await response.text()
  //       };
  //     }
  //   });
  
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage(); // Klik cart & checklist all product
  //   await homePage.selectCourierSAP(); // Klik kurir sap reg
  //   await homePage.selectPaymentBCA(); // Klik payment va bca
  
  //   // Assert jika ada error dalam API pembayaran
  //   if (paymentError) {
  //     throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
  //   }
  // });

  // test('Pembayaran - Permata', async ({ page }) => {
  //   const homePage = new HomePage(page);
  //   let paymentError = null;
  
  //   page.on('response', async response => {
  //     const url = response.url();
  //     if (url.includes('/payment_api') && response.status() >= 400) {
  //       paymentError = {
  //         url: url,
  //         status: response.status(),
  //         body: await response.text()
  //       };
  //     }
  //   });
  
    
  //   await homePage.navigate();
  //   await homePage.loginPage(); // Klik tombol login
  //   await homePage.performLogin('snipangeling123@gmail.com', '86527873'); // Input email dan password, lalu klik submit
  //   await homePage.searchProduct('4UT0M4T10NT3ST N6');// Input nama product lalu auto enter
  //   await page.waitForSelector('//*[@class="relative w-full h-[365px]"]'); // Menunggu elemen produk muncul
  //   await homePage.clickPLP();// Klik produk secara acak dan add to cart
  //   await homePage.addToCartfromPDP(); //Klik add to cart dan ke keranjang
  //   await homePage.cartPage(); // Klik cart & checklist all product
  //   await homePage.selectCourierSAP(); // Klik kurir sap reg
  //   await homePage.selectPaymentBRI(); // Klik payment va bri
  
  //   // Assert jika ada error dalam API pembayaran
  //   if (paymentError) {
  //     throw new Error(`Payment API gagal: ${paymentError.status} ${paymentError.url}\nResponse: ${paymentError.body}`);
  //   }
  // });

});
