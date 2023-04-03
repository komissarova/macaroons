const loaderBackground = $('.loader-background');
const loaderWrapper = $('.loader-wrapper');
const infoBox = $('.info-box');
const closeIcon = $('#close-icon');
const strawberry = $('.strawberry-big');
const order = $('#order');
const productInput = $('#product');
const nameInput = $('#name');
const phoneInput = $('#phone');
const errorInfo = $('.error-box');
const submitBtn = $('#submitBtn');

submitBtn.on('click', (ev) => {
      ev.preventDefault();
      if(!productInput.val()) {
            errorInfo.eq(0).show();
            productInput.css('border-color', 'red');
      } else {
            errorInfo.eq(0).hide();
            if(order.css('background-color') === 'rgb(255, 239, 239)')  {
                  productInput.css('border-color', 'rgb(130, 19, 40)');
            } else {
                  productInput.css('border-color', 'rgb(137, 170, 22)');
            }     
      }
      if(!nameInput.val()) {
            errorInfo.eq(1).show();
            nameInput.css('border-color', 'red');
      } else {
            errorInfo.eq(1).hide();
            if(order.css('background-color') === 'rgb(255, 239, 239)')  {
                  nameInput.css('border-color', 'rgb(130, 19, 40)');
            } else {
                  nameInput.css('border-color', 'rgb(137, 170, 22)');
            }
      }
      if(!phoneInput.val()) {
            errorInfo.eq(2).show();
            phoneInput.css('border-color', 'red');
      } else {
            errorInfo.eq(2).hide();
            if(order.css('background-color') === 'rgb(255, 239, 239)')  {
                  phoneInput.css('border-color', 'rgb(130, 19, 40)');
            } else {
                  phoneInput.css('border-color', 'rgb(137, 170, 22)');
            }
      }

      if((!productInput.val() || !nameInput.val() || !phoneInput.val()) && window.screen.width <= 767) {
            strawberry.hide();
      } else {
            strawberry.show();
      }

      if(productInput.val()  && nameInput.val() && phoneInput.val()) {
            $.ajax({
                  method: 'POST',
                  url: 'https://testologia.site/checkout',
                  data: {
                        product: productInput.val(),
                        name: nameInput.val(),
                        phone: phoneInput.val()
                  },
                  beforeSend: function() {
                        loaderBackground.show();
                        loaderWrapper.show();
                  },
                  complete: function() {
                        loaderBackground.hide();
                        loaderWrapper.hide();
                  }
            })
                .done((res) => {
                      if(res && res.success === 1) {
                              order.hide();
                              infoBox.show();
                              closeIcon.on('click', () => {
                                    infoBox.hide();
                                    order.show();
                              });
                      } else {
                            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                      }
                });
            $('input').val('');
      }
});



