// HomePage.js
const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.loginButton = page.locator('#button-masuk');
    this.emailInput = page.locator('//*[@type="email"]'); 
    this.pswrdInput = page.locator('//*[@type="password"]');
    this.submitButton = page.locator('//*[@id="1"]');
    this.searchContainer = page.locator('//*[@type="search"]'); 
    this.searchInput = page.locator('#input-search-popup');
    this.productList = page.locator('//*[@class="relative w-full h-[365px]"]'); 
    this.plp_addtocartButton = page.locator('//*[@id="add-to-cart-plp-desktop"]//*[@id="button-product-filter"]');
    this.pdp_addToCartButton = page.locator('//*[@id="detail-keranjang-btn"]');
    this.pdp_lihatKeranjangButton = page.locator('//*[@id="__next"]/main/div[1]/div/div[2]/div[2]/button');
    this.cartAllCheckBox = page.locator('//*[@id="action-select-all-in-stock-cart-items"]');
    this.checkoutButton = page.locator('//*[@id="action-checkout"]');
    this.cartHomepageButton = page.locator('#button-cart');
    this.viewCartButton = page.locator('button:has-text("Lihat Keranjang")');
    
    this.deleteButton = page.locator("#action-delete-all-in-stock-cart-items");
    this.pengirimanButton = page.locator("//div[contains(text(), 'Pilih Pengiriman')]");
    this.jne_promoButton = page.locator("//div[@class='grid grid-cols-12 content-center cursor-pointer h-24 gap-4 pl-4']//*[contains(text(), 'Rp. 0')]");
    this.jne_regButton = page.locator("//*[contains(text(), 'Reg')]");
    this.jne_yesButton = page.locator("//*[contains(text(), 'YES')]");
    this.jne_spsButton = page.locator("//*[contains(text(), 'SPS')]");
    this.sap_regButton = page.locator("//*[contains(text(), 'SATRIA REG')]");
    this.sap_odsButton = page.locator("//*[contains(text(), 'SATRIA ODS')]");
    this.sap_sdsButton = page.locator("//*[contains(text(), 'SATRIA SDS')]");
    this.grab_carButton = page.locator("//*[contains(text(), 'GrabExpress')]");
    this.grab_instantButton = page.locator("//*[contains(text(), 'Instant Bike')]");
    this.ambilditempatButton = page.locator("//*[contains(text(), 'Ambil Saat Event')]");
    this.paymentButton = page.locator("#button-select-payment");
    this.emoney_shopeeButton = page.locator("//*[contains(text(), 'ShopeePay/SpayLater')]");
    this.emoney_gopayButton = page.locator("//*[contains(text(), 'Go-Pay')]");
    this.emoney_ovoButton = page.locator("//*[contains(text(), 'OVO')]");
    this.emoney_motionpayButton = page.locator("//*[contains(text(), 'Motionpay')]");
    this.va_bcaButton = page.locator("//*[contains(text(), 'Virtual Account BCA')]");
    this.va_briButton = page.locator("//*[contains(text(), 'Virtual Account BRI')]");
    this.va_mncButton = page.locator("//*[contains(text(), 'Virtual Account MNC Bank')]");
    this.va_permataButton = page.locator("//*[contains(text(), 'Virtual Account Permata')]");
    this.phonenumberInput = page.locator("//*[@type = number]");
    this.bayarButton = page.locator("#button-bayar");
    
    

    //verifikasi
    this.textMasukVerif = page.locator('//*[@class="text-2xl font-bold leading-8 py-[14px]"]');
    this.carouselVerif = page.locator('//div[@class="carousel-container relative !h-fit cursor-default"]');
    this.brandTerpopulerVerif = page.locator('//*[@class="flex justify-center gap-2"]');
    this.sectionPilihaVerif = page.locator('//*[@id="__next"]/main/div[2]/div[4]/div/div[1]/div/div[1]/p');
    this.sectionOfficialVerif = page.locator('//*[@id="__next"]/main/div[2]/div[6]/div/div/div[1]/div/div[1]/p');

    this.imgUserVerif = page.locator('//*[@alt="photo-user"]');
    this.tabProdukVerif = page.locator('//*[@id="top-tabbing-plp-desktop"]/div[1]');
    this.tabTokoVerif = page.locator('//*[@id="top-tabbing-plp-desktop"]/div[2]');
    this.textTotalPesananVerif = page.locator('//*[@class="text-xl font-bold text-chinese-black-100"]');
    this.textRingkasanBelanjaVerif = page.locator('//*[@id="label-cart-result"]');
    this.textCheckoutVerif = page.locator('//*[@id="__next"]/main/div/div/h1');
    this.textCartEmpty = page.locator("#empty-cart-items-label");
    this.badgeCart = page.locator('//*[@id="__next"]/main/header/div[2]/div[2]/div/div[3]/div[1]/div/div');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async loginPage() {
    await this.loginButton.click();
  }

  async performLogin(email, password) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await this.pswrdInput.fill(password);
    await this.submitButton.click();
  }

  async searchProduct(productName) {
    await this.searchContainer.fill(productName);
    await this.searchInput.press('Enter');
  }

  async logProductList() {
    const productsCount = await this.productList.count();
    console.log(`Jumlah produk ditemukan: ${productsCount}`);

    for (let i = 0; i < productsCount; i++) {
      const productText = await this.productList.nth(i).textContent();
      console.log(`Produk ${i + 1}: ${productText}`);
    }
  }
  
  async AddToCartPLP() {
    const productsCount = await this.productList.count();
    if (productsCount > 0) {
      const randomIndex = Math.floor(Math.random() * productsCount);
      const randomProduct = this.productList.nth(randomIndex);

      // Klik produk untuk masuk ke PDP atau bisa hover jika diperlukan
      await randomProduct.click();

      // Tunggu tombol "Add to Cart" muncul di halaman produk
      const addToCartButton = randomProduct.locator('button:has-text("+ Keranjang")'); // Sesuaikan dengan teks tombol "Add to Cart"
      await expect(addToCartButton).toBeVisible();

      // Klik tombol "Add to Cart"
      await addToCartButton.click();
      await this.page.waitForTimeout(1000);
    } else {
      throw new Error('Produk tidak ditemukan.');
    }
      await this.plp_addtocartButton.click();
    
  }

  async clickPLP() {
    const productsCount = await this.productList.count();
    if (productsCount > 0) {
      const randomIndex = Math.floor(Math.random() * productsCount);
      const randomProduct = this.productList.nth(randomIndex);

      // Klik produk untuk masuk ke PDP atau bisa hover jika diperlukan
      await randomProduct.click();

      // Tunggu tombol "Add to Cart" muncul di halaman produk
      const clickToPDP = randomProduct.locator('//*[@class="relative overflow-hidden !w-[180px] !h-[180px]"]'); // Sesuaikan dengan teks tombol "Add to Cart"

      // Klik produk ke PDP
      await clickToPDP.click();
      await this.page.waitForTimeout(1000);
    } else {
      throw new Error('Produk tidak ditemukan.');
    }
  }

  async cartFromHomepage() {
    // Hover ke cart button untuk menampilkan tombol "Lihat Keranjang"
    await this.cartHomepageButton.hover();
    await this.page.waitForLoadState('networkidle'); // Menunggu halaman stabil

    // Klik tombol "Lihat Keranjang" setelah tampil
    await this.viewCartButton.click();
    await this.page.waitForLoadState('networkidle'); // Menunggu halaman stabil setelah klik
  }

  async addToCartfromPDP() {
    await this.page.waitForTimeout(3000);
    await this.pdp_addToCartButton.click();
    await this.page.waitForTimeout(3000);
    await this.pdp_lihatKeranjangButton.click();
  }

  async cartPage() {
    await this.cartAllCheckBox.click();
    await this.checkoutButton.click();
  }

  async deletecartPage() {
    await this.cartAllCheckBox.click();
    await this.deleteButton.click();
  }

  async isCartEmpty() {
    // Cek apakah badge cart muncul
    return await this.badgeCart.isVisible();
  }

  async deleteCartBeforeAdd() {
    // Implementasi penghapusan produk di keranjang
    const itemsCount = await this.cartItems.count();
    for (let i = 0; i < itemsCount; i++) {
      await this.cartItems.nth(0).locator('button:has-text("Delete")').click();
      await this.page.waitForTimeout(500); // Tambahkan jeda jika diperlukan
    }
  }

  async selectCourier() {
    await this.pengirimanButton.click();
  }

  async selectPayment() {
    await this.paymentButton.click();
  }

  async selectCourierSAP() {
    await this.pengirimanButton.click();
    await this.page.waitForTimeout(1000);
    await this.sap_regButton.click();
  }

  async selectPaymentShopee() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.emoney_shopeeButton.click();
    await this.page.waitForTimeout(1000);
    await this.bayarButton.click();
    await this.page.waitForTimeout(30000);
  }
  
  async selectPaymentGopay() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.emoney_gopayButton.click();
    await this.bayarButton.click();
  }  

  async selectPaymentMotionpay() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.emoney_motionpayButton.click();

    await this.bayarButton.click();
  }

  async selectPaymentOvo(phonenumber) {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.emoney_ovoButton.click();
    await this.phonenumberInput.fill(phonenumber);
    await this.bayarButton.click();
  }  

  async selectPaymentBCA() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.va_bcaButton.click();
    await this.bayarButton.click();
  }  
  async selectPaymentMNC() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.va_mncButton.click();
    await this.bayarButton.click();
  }  

  async selectPaymentBRI() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.va_briButton.click();
    await this.bayarButton.click();
  }  

  async selectPaymentPermata() {
    await this.paymentButton.click();
    await this.page.waitForTimeout(1000);
    await this.va_permataButton.click();
    await this.bayarButton.click();
  }  
}

module.exports = HomePage;
