function getForm(e) {
  console.log(e);
  var t = new Object;
  t.req_merchant_code = e.req_merchant_code, t.req_transaction_id = e.req_transaction_id, t.req_payment_channel = e.req_payment_channel, t.req_chain_merchant = e.req_chain_merchant, t.req_amount = e.req_amount, t.req_currency = e.req_currency, t.req_words = e.req_words, t.req_form_type = e.req_form_type, t.req_domain_valid = document.location.origin, t.req_timeout = e.req_timeout, t.req_device_info = getDeviceInfo(), void 0 != e.req_ref_account_id && "" != e.req_ref_account_id && (t.req_ref_account_id = e.req_ref_account_id, t.req_access_type = "W", t.req_session_id = e.req_session_id), void 0 != e.req_customer_id && "" != e.req_customer_id && (t.req_customer_id = e.req_customer_id), void 0 != e.req_token_payment && "" != e.req_token_payment && (t.req_token_payment = e.req_token_payment);
  var r = $("#formPayment").html();
  doku_timeout = setTimeout(function() {
      $("#formPayment").html("<br><center><span id='doku-loader-text'>TIMEOUT</span><br><br><a id='doku-retry-button' href='#' onclick='getForm(" + JSON.stringify(e) + ")'>Try again</a></center><br>"), doku_ajax.abort()
  }, 5000), doku_ajax = $.ajax({
      url: requestURL + "getRequestCode",
      data: {
          data: JSON.stringify(t)
      },
      dataType: "json",
      type: "POST",
      beforeSend: function() {
          $("#formPayment").html("<br><center><img src='" + loadingUrl + "' class='doku-loader-image'></center><br>")
      }
  }).success(function(t) {
      if (console.log(t), clearTimeout(doku_timeout), $("#formPayment").html(r), "0000" == t.res_response_code) {
          if ("inline" == e.req_form_type)
              if (pageTimeout = "<center>We are sorry your session has been expired. Please start a new payment request. Thank you.</center>", data_obj = $.extend(e, t), void 0 == e.req_custom_form)
                  if (void 0 != e.req_mage && "" != e.req_mage)
                      for (i = 0; i < Object.size(t.res_form_payment); i++) $("#formPayment").append(t.res_form_payment[i]);
                  else
                      for (i = 0; i < Object.size(t.res_form_payment); i++) $("#formPayment").prepend(t.res_form_payment[i]);
          else {
              if ("15" == e.req_payment_channel) {
                  if (void 0 != e.req_mage && "" != e.req_mage)
                      for (i = 0; i < e.req_custom_form.length; i++) $("#" + e.req_custom_form[i]).append(t.res_form_payment[i]);
                  else
                      for (i = 0; i < e.req_custom_form.length; i++) $("#" + e.req_custom_form[i]).prepend(t.res_form_payment[i]);
                  e.req_custom_form.length < 5 && (frmSaveToken = t.res_form_payment[4]), "true" == t.res_service_two_click ? void 0 != e.req_token_payment && "" != e.req_token_payment && void 0 != t.res_tokenization ? (tokenization = $.parseJSON(t.res_tokenization), $("#doku-cc-number").val(tokenization.res_cc_number), $("#doku-cc-number").addClass("readonlycase"), $("#doku-cc-number").prop("disabled", "disabled"), $("#doku-cc-number").removeAttr("validation-rules"), $("#" + data_obj.req_custom_form[2]).remove(), $("#" + data_obj.req_custom_form[3]).remove(), $(".doku-cvc").payment("formatCardCVC")) : ($("#formPayment").append(frmSaveToken), $("#formPayment").after("<br>"), $(".doku-cc-number").payment("formatCardNumber"), $(".doku-cc-exp").payment("formatCardExpiry"), $(".doku-cvc").payment("formatCardCVC")) : ($(".doku-cc-number").payment("formatCardNumber"), $(".doku-cc-exp").payment("formatCardExpiry"), $(".doku-cvc").payment("formatCardCVC"))
              } else {
                  if (void 0 != e.req_mage && "" != e.req_mage)
                      for (i = 0; i < e.req_custom_form.length; i++) $("#" + e.req_custom_form[i]).append(t.res_form_payment[i]);
                  else
                      for (i = 0; i < e.req_custom_form.length; i++) $("#" + e.req_custom_form[i]).prepend(t.res_form_payment[i]);
                  if (void 0 != e.req_ref_account_id && "" != e.req_ref_account_id) {
                      var n = $.parseJSON(t.res_data_dw);
                      "0000" == n.responseCode && ($("#formPayment").html(formDw), $("#formPayment").find("img").attr("src", n.avatar), $(".info-dw-user").html(n.customerName + " - " + n.dokuId + "&nbsp;&nbsp;"), $(".info-dw-saldo").html("Rp " + n.listPaymentChannel[0].details.lastBalance.format(0, 3, ".", ",")), void 0 != e.req_wallet_fields && "" != e.req_wallet_fields && (void 0 != e.req_wallet_fields.name && "" != e.req_wallet_fields.name && $("#" + e.req_wallet_fields.name).val(n.customerName), void 0 != e.req_wallet_fields.phone && "" != e.req_wallet_fields.phone && $("#" + e.req_wallet_fields.phone).val(n.customerPhone), void 0 != e.req_wallet_fields.address && "" != e.req_wallet_fields.address && $("#" + e.req_wallet_fields.address).val(n.customerAddress), void 0 != e.req_wallet_fields.city && "" != e.req_wallet_fields.city && $("#" + e.req_wallet_fields.city).val(n.customerCity), void 0 != e.req_wallet_fields.country && "" != e.req_wallet_fields.country && $("#" + e.req_wallet_fields.country).val(n.customerCountry), void 0 != e.req_wallet_fields.email && "" != e.req_wallet_fields.email && $("#" + e.req_wallet_fields.email).val(n.customerEmail)))
                  }
              }
              btnOnBlur()
          } else if ("full" == e.req_form_type) {
              pageTimeout = t.res_timeout_page, e = $.extend(e, t), $("#formPayment").html(t.res_form_payment), $(".amount").text(parseInt(e.req_amount).format(0, 3, ".", ",")), "15" == e.req_payment_channel && ("true" == t.res_service_two_click ? void 0 != e.req_token_payment && "" != e.req_token_payment && void 0 != t.res_tokenization ? (tokenization = $.parseJSON(t.res_tokenization), console.log(tokenization), $("#doku-cc-number").val(tokenization.res_cc_number), $("#doku-cc-number").addClass("readonlycase"), $("#doku-cc-number").prop("disabled", "disabled"), $("#doku-cc-number").removeAttr("validation-rules"), $("#doku-li-save-cc").remove(), $("#dokuDiv-name-cc").remove(), $("#dokuDiv-cc-exp").remove()) : ($(".doku-cc-number").payment("formatCardNumber"), $(".doku-cc-exp").payment("formatCardExpiry"), $(".doku-cvc").payment("formatCardCVC")) : ($("#doku-li-save-cc").hide(), $(".doku-cc-number").payment("formatCardNumber"), $(".doku-cc-exp").payment("formatCardExpiry"), $(".doku-cvc").payment("formatCardCVC"))), btnOnBlur();
              var o = $("input[type='button']").map(function() {
                  return this.id
              }).get();
              for (i = 0; i < o.length; i++) $("#" + o[i]).click(function() {
                  delete e[0], formatForm($.extend($(this).parents("form"), $.extend(e, t)))
              })
          }
          setTimeoutPage(timeout = t.res_timeout, pageTimeout, e, !1)
      } else "5536" == t.res_response_code ? (pageTimeout = "inline" == e.req_form_type ? "<center>We are sorry your session has been expired. Please start a new payment request. Thank you.</center>" : t.res_timeout_page, $("#formPayment").html(pageTimeout), void 0 === t.res_redirect_url || null == t.res_redirect_url || "" == t.res_redirect_url ? $("#formPayment").find("a").remove() : $("#formPayment").find(".backtomerchant").attr("href", t.res_redirect_url)) : $("#formPayment").html("<br><center><span id='doku-loader-text'>Request failed... error code : " + t.res_response_code.replace(new RegExp("_", "g"), " ") + "</span><br><br><a id='doku-retry-button' href='#' onclick='getForm(" + JSON.stringify(e) + ")'>Try again</a></center><br>")
  })
}

function btnOnBlur() {
  var e = $("input").not("[type='button']").map(function() {
      return this.id
  }).get();
  for (i = 0; i < e.length; i++) $("#" + e[i]).blur(function() {
      if (void 0 != $(this).attr("validation-rules")) {
          var e = $(this).attr("validation-rules").split("|"),
              t = new Object;
          for (j = 0; j < e.length && 0 != (t = checkRules(this.id, e[j])).status; j++);
          0 == t.status ? ($(this).parent().addClass("has-error"), 0 == $(this).parent().children("font").length ? $(this).parent().append("<font color='red'>" + t.msg + "</font>") : $(this).parent().children("font").html(t.msg)) : ($(this).parent().removeClass("has-error"), $(this).parent().children("font").remove())
      }
  })
}

function formatForm(e) {
  var t = $("#" + e[0].id + " :input").not("[type='button']").map(function() {
      return this.id
  }).get();
  if (validateForm(t)) {
      var r = new Object;
      r.req_input_form = t, r.req_pairing_code = e.res_request_code, r.req_server_url = e.req_server_url, r.req_loading = e.res_form_loading, r.req_result = e.res_form_result, submitForm($.extend(e, r))
  }
}

function validateForm(e) {
  var t = !0;
  for (i = 0; i < e.length; i++)
      if (void 0 != $("#" + e[i]).attr("validation-rules")) {
          var r = $("#" + e[i]).attr("validation-rules").split("|"),
              n = new Object;
          for (j = 0; j < r.length && 0 != (n = checkRules(e[i], r[j])).status; j++);
          0 == n.status && ($("#" + e[i]).parent().addClass("has-error"), 0 == $("#" + e[i]).parent().children("font").length ? $("#" + e[i]).parent().append("<font color='red'>" + n.msg + "</font>") : $("#" + e[i]).parent().children("font").html(n.msg), t = !1)
      }
  return t
}

function checkRules(e, t) {
  var r = new Object,
      n = t;
  switch (n.indexOf("maxlength") > -1 && (n = "maxlength"), n) {
      case "required":
          "" == $("#" + e).val() && (r.status = !1, r.msg = "this field cannot be empty");
          break;
      case "maxlength":
          var o = t.split(":");
          $("#" + e).val().length > o[1] && (r.status = !1, r.msg = "this field cannot exceed " + o[1] + " characters");
          break;
      case "cc":
          $.payment.validateCardNumber($("#" + e).val()) || (r.status = !1, r.msg = "The card number is not a valid credit card number.");
          break;
      case "cc-cvc":
          $.payment.validateCardCVC($("#" + e).val()) || (r.status = !1, r.msg = "The card's security code is invalid.");
          break;
      case "cc-exp":
          if (void 0 != $("#" + e).val()) {
              var a = $("#" + e).val().split(" / ");
              2 == a[1].length && (a[1] = "20" + a[1]), $.payment.validateCardExpiry(a[0], a[1]) || (r.status = !1, r.msg = "The card's expiration date is invalid.")
          }
          break;
      case "number":
          1 == isNaN($("#" + e).val()) && (r.status = !1, r.msg = "Only numbers allowed");
          break;
      case "email":
          var i = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          r.status = i.test($("#" + e).val()), r.msg = "Please input your correct email."
  }
  return r
}

function receiveMessage(e) {
  e.origin == originUrl && (threeDResponse = e.data, $.fancybox.close())
}

function submitForm(e) {
  var t = processForm(e);
  $("#formPayment").html(e.req_loading), doku_timeout = setTimeout(function() {
      e.form_req_result_note = "Timeout", showResult(e), doku_ajax.abort()
  }, 65e3), doku_ajax = $.ajax({
      url: requestURL + "getToken",
      data: {
          data: JSON.stringify(t)
      },
      dataType: "json",
      type: "POST"
  }).success(function(r) {
      clearTimeout(doku_timeout), console.log("submitForm"), console.log(r), clearTimeout(doku_timeout_page), "0000" == r.res_response_code ? "04" == e.req_payment_channel ? initiateFormWallet($.extend(e, $.extend(t, r))) : void 0 != r.res_result_3D ? (obj3D = JSON.parse(r.res_result_3D), window.addEventListener("message", receiveMessage, !1), $.fancybox.open([{
          closeClick: !1,
          type: "iframe",
          openEffect: "fade",
          closeEffect: "fade",
          openSpeed: "slow",
          closeSpeed: "slow",
          content: form3D,
          closeBtn: !1,
          autoResize: !0,
          helpers: {
              overlay: {
                  closeClick: !1
              }
          },
          afterClose: function() {
              obj3dResponse = $.parseJSON(threeDResponse), "0000" == obj3dResponse.res_response_code ? backToMerchant($.extend(e, $.extend(t, r))) : (e.form_req_result_note = obj3dResponse.res_response_code, showResult(e))
          }
      }]), $("#doku-form-3d").find("#PaReq").val(obj3D.PAREQ), $("#doku-form-3d").find("#MD").val(obj3D.MD), $("#doku-form-3d").find("#TermUrl").val(obj3D.TERMURL), $("#doku-form-3d").attr("action", obj3D.ACSURL), $("#doku-form-3d").submit()) : backToMerchant($.extend(e, $.extend(t, r))) : (e.form_req_result_note = r.res_response_code, showResult(e))
  })
}

function processForm(e) {
  var t = new Object;
  if (t.req_merchant_code = e.req_merchant_code, t.req_payment_channel = e.req_payment_channel, t.req_transaction_id = e.req_transaction_id, t.req_amount = e.req_amount, t.req_currency = e.req_currency, t.req_pairing_code = e.req_pairing_code, t.req_access_type = "W", t.req_domain_valid = document.location.origin, "15" == e.req_payment_channel) {
      if (void 0 != e.req_customer_id && "" != e.req_customer_id) void 0 == e.res_tokenization && (e.form_req_date = $("#doku-cc-exp").val(), e.form_req_number = $("#doku-cc-number").val(), 2 == (r = e.form_req_date.split(" / "))[1].length && (r[1] = "20" + r[1]), t.req_date = r[1].substring(2, 4) + r[0], t.req_number = e.form_req_number.replace(/ - /g, ""), t.req_name = $("#doku-name-cc").val()), 1 == $("#doku-save-cc").prop("checked") ? t.req_save_customer = "SAVE" : t.req_save_customer = "UNSAVE";
      else {
          e.form_req_date = $("#" + e.req_input_form[3]).val(), e.form_req_number = $("#" + e.req_input_form[0]).val();
          var r = e.form_req_date.split(" / ");
          2 == r[1].length && (r[1] = "20" + r[1]), t.req_date = r[1].substring(2, 4) + r[0], t.req_number = e.form_req_number.replace(/ - /g, ""), t.req_name = $("#" + e.req_input_form[2]).val()
      }
      t.req_secret = $("#doku-cvc").val()
  } else "04" == e.req_payment_channel && (t.req_doku_id = $("#" + e.req_input_form[0]).val(), t.req_doku_pass = $("#" + e.req_input_form[1]).val(), t.req_session_id = e.req_session_id, t.req_chain_merchant = e.req_chain_merchant);
  return t
}

function backToMerchant(e) {
  var t = {
      doku_token: e.res_token_id,
      doku_pairing_code: e.req_pairing_code,
      doku_invoice_no: e.req_transaction_id,
      doku_amount: e.req_amount,
      doku_chain_merchant: e.req_chain_merchant,
      doku_currency: e.req_currency,
      doku_mall_id: e.req_merchant_code
  };
  console.log(e.req_server_url), console.log(t), $.ajax({
      url: e.req_server_url,
      data: t,
      type: "POST"
  }).success(function(t) {
      console.log(t);
      var r = JSON.parse(t);
      "15" == e.req_payment_channel ? "0000" != r.res_response_code ? (e.form_req_result_note = r.res_response_code, showResult(e)) : 1 == r.res_show_doku_page ? ($("#formPayment").html(e.req_result), $(".success").show(), $(".fail").remove(), $("doku-approval-code").html(r.res_approval_code), $("doku-card-number").html(r.res_mcn), $("doku-invoice-number").html(r.res_trans_id_merchant), $("doku-amount").html(r.res_amount), void 0 != r.res_redirect_url ? ($("div.detail-result").children("a").attr("href", "#"), $("div.detail-result").children("a").attr("onclick", "window.location = '" + r.res_redirect_url + "';")) : $("div.detail-result").children("a").remove()) : window.location = r.res_redirect_url : "04" == e.req_payment_channel && ("0000" != r.res_response_code ? (e.form_req_result_note = r.res_response_code, showResult(e)) : 1 == r.res_show_doku_page ? ($("#formPayment").html(e.req_result), $(".success").show(), $(".fail").remove(), $("doku-approval-code").html(r.res_approval_code), $("doku-invoice-number").html(e.req_transaction_id), void 0 != r.res_card_number ? $("doku-card-number").html(r.res_card_number) : $("doku-card-number").parent().parent().remove(), void 0 != r.res_promotion && ($("doku-discount").html(parseInt(r.res_promotion.amount).format(0, 3, ".", ",")), parseInt(e.req_amount) - parseInt(r.res_promotion.amount) < 0 ? $("doku-total").html(parseInt(0).format(0, 3, ".", ",")) : $("doku-total").html(parseInt(parseInt(e.req_amount) - parseInt(r.res_promotion.amount)).format(0, 3, ".", ",")), $("#doku-discount").show(), $("#doku-total").show()), $("doku-amount").html(parseInt(e.req_amount).format(0, 3, ".", ",")), void 0 != r.res_redirect_url ? ($("div.detail-result").children("a").attr("href", "#"), $("div.detail-result").children("a").attr("onclick", "window.location = '" + r.res_redirect_url + "';")) : $("div.detail-result").children("a").remove()) : window.location = r.res_redirect_url)
  })
}

function initiateFormWallet(e) {
  if ("0000" == e.res_response_code) {
      $("#formPayment").html(e.res_form_payment_dw), $("#respTabs").responsiveTabs(), $(".resp-tabDrop").wrap("<div class='selectdw'><div class='wrapper-select'></div></div>"), $("input[name$='optdw']").click(function() {
          var e = $(this).val();
          $("div.promocontent-dw").hide(), $("#" + e).show()
      }), $(".amount").text(parseInt(e.req_amount).format(0, 3, ".", ","));
      JSON.parse(e.res_data_dw);
      formatWalletCash(e), formatWalletCc(e), btnOnBlur(), inquiryPromoCode(e);
      var t = $("input[type='button']").map(function() {
          return this.id
      }).get();
      for (i = 0; i < t.length; i++) $("#" + t[i]).click(function() {
          delete e[0], formatFormWallet($.extend($(this).parents("form"), e))
      });
      var r = !1;
      timeout = e.res_timeout, "inline" == e.req_form_type ? (r = !0, pageTimeout = "<center>We are sorry your session has been expired. Please start a new payment request. Thank you.</center>") : pageTimeout = e.res_timeout_page, setTimeoutPage(timeout, pageTimeout, e, r)
  } else e.form_req_result_note = e.res_response_code, showResult(e)
}

function inquiryPromoCode(e) {
  $(".redeempromocode").on("click", function() {
      var t = $("#promo-code").val(),
          r = e.req_doku_id,
          n = e.req_amount,
          o = e.req_merchant_code,
          a = e.req_chain_merchant;
      $.ajax({
          url: requestURL + "InquiryPromoCodeDW",
          data: {
              req_merchant_code: o,
              req_chain_merchant: a,
              req_amount: n,
              req_doku_id: r,
              req_promo_code: t
          },
          dataType: "json",
          type: "POST"
      }).success(function(e) {
          console.log("response inquiry"), console.log(e);
          var t = JSON.parse(e.res_inquiry_promo_code);
          console.log("res_promo_code"), console.log(t);
          var r = "";
          null != t && "" != t ? (console.log("responseCode"), console.log(t.responseCode), r = "0000" == t.responseCode ? "Anda mendapat potongan sebesar Rp. " + t.amount : t.responseMsg) : r = "Promo Code yang Anda Masukkan Tidak Valid", $(".promo-code-message").html(r)
      }).error(function() {
          console.log("error inquiry promo code")
      })
  })
}

function formatWalletCash(e) {
  var t = JSON.parse(e.res_data_dw);
  if ($(".nameuser").text(t.customerName), $(".saldo").text(t.listPaymentChannel[0].details.lastBalance.format(0, 3, ".", ",")), $(".amount-payment").text(parseInt(e.req_amount).format(0, 3, ".", ",")), $(".amount-discount").text(parseInt("0").format(0, 3, ".", ",")), $(".amount-total").text(parseInt(e.req_amount).format(0, 3, ".", ",")), void 0 != t.listPromotion && t.listPromotion.length > 0) {
      for (i = 0; i < t.listPromotion.length; i++) $("#doku-voucher").append('<option value="' + t.listPromotion[i].id + '">' + t.listPromotion[i].amount + "</option>");
      $("#doku-voucher").change(function() {
          $(".amount-discount").text(parseInt("0").format(0, 3, ".", ","))
      }), $("#doku-voucher").change(function() {
          "" != $("option:selected", this).val() && ($(".amount-discount").text(parseInt($("option:selected", this).text()).format(0, 3, ".", ",")), parseInt(e.req_amount) - parseInt($("option:selected", this).text()) < 0 ? $(".amount-total").text(0) : $(".amount-total").text(parseInt(parseInt(e.req_amount) - parseInt($("option:selected", this).text())).format(0, 3, ".", ",")))
      }), $("#voucher_check").change(function() {
          1 == $(this).prop("checked") ? "" != $("#doku-voucher :selected").val() && ($(".amount-discount").text(parseInt($("#doku-voucher :selected").text()).format(0, 3, ".", ",")), $(".amount-total").text(parseInt(parseInt(e.req_amount) - parseInt($("#doku-voucher :selected").text())).format(0, 3, ".", ","))) : ($(".amount-discount").text(parseInt("0").format(0, 3, ".", ",")), $(".amount-total").text(parseInt(e.req_amount).format(0, 3, ".", ",")))
      })
  } else $("#doku-voucher-div").remove(), $("#doku-voucher-value").remove(), $("#doku-total-payment").remove()
}

function formatWalletCc(e) {
  var t = JSON.parse(e.res_data_dw);
  if (console.log(t), void 0 == t.listPaymentChannel[1]) $("#tablistItem2").remove(), $("#cc-tabs").remove();
  else if (void 0 == t.listPaymentChannel[1].details) $("#frmcc").remove(), $(".doku-cc-number").payment("formatCardNumber"), $(".doku-cc-exp").payment("formatCardExpiry"), $(".doku-cvc").payment("formatCardCVC");
  else {
      $("#frmcc-manual").remove();
      var r = "";
      for (i = 0; i < t.listPaymentChannel[1].details.length; i++) 0 == i ? (r = document.getElementById("listcard" + i).outerHTML, $("#r0").attr("checked", !0)) : $("#listcard" + (i - 1)).after(r.replace(new RegExp("0", "g"), i)), "4" == t.listPaymentChannel[1].details[i].cardNoMasked.substring(0, 1) ? $("#type-cc" + i).addClass("visa") : "5" == t.listPaymentChannel[1].details[i].cardNoMasked.substring(0, 1) && $("#type-cc" + i).addClass("mastercard"), $("#doku-cc-number" + i).text(t.listPaymentChannel[1].details[i].cardNoMasked)
  }
}

function formatFormWallet(e) {
  var t = $("#" + e[0].id + " :input").not("[type='button']").map(function() {
      return this.id
  }).get();
  if (validateForm(t))
      if ("frmcash" == e[0].id) e.req_promo_code = $("#" + t[t.length - 2]).val(), e.req_pin = $("#" + t[t.length - 1]).val(), submitFormWallet(e);
      else if ("frmcc" == e[0].id) e.req_cvv = $("#" + t[t.length - 1]).val(), e.req_cc_id = $("#" + e[0].id + " :input[type='radio']").map(function() {
      if (1 == $(this).prop("checked")) return this.id
  }).get()[0], submitFormWallet(e);
  else {
      var r = $("#" + t[1]).val().split(" / ");
      2 == r[1].length && (r[1] = "20" + r[1]), e.req_wallet_form = {
          CC_NAME: $("#" + t[2]).val(),
          CC_CARDNUMBER: $("#" + t[0]).val().replace(/ - /g, ""),
          CC_EXPIRYDATE: r[1].substring(2, 4) + r[0],
          CC_MOBILEPHONE: $("#" + t[3]).val(),
          CC_EMAIL: $("#" + t[4]).val(),
          CC_CVV: $("#" + t[t.length - 1]).val()
      }, submitFormWallet(e)
  }
}

function submitFormWallet(e) {
  var t = JSON.parse(e.res_data_dw),
      r = new Object;
  r.req_token_id = e.res_token_id, r.req_pairing_code = e.req_pairing_code, r.req_words = e.req_words, r.req_domain_valid = document.location.origin, "frmcash" == e[0].id ? (r.req_dokuwallet = {
      req_channel_code: t.listPaymentChannel[0].channelCode,
      req_customer_pin: e.req_pin,
      req_inquiry_code: t.inquiryCode,
      req_customer_name: t.customerName,
      req_customer_email: t.customerEmail,
      req_doku_id: t.dokuId,
      req_promo_code: e.req_promo_code
  }, 1 == $("#voucher_check").prop("checked") && "" != $("#doku-voucher :selected").val() && (r.req_dokuwallet.req_promotion_id = $("#doku-voucher :selected").val())) : "frmcc" == e[0].id ? r.req_dokuwallet = {
      req_channel_code: t.listPaymentChannel[1].channelCode,
      req_inquiry_code: t.inquiryCode,
      req_doku_id: t.dokuId,
      req_link_id: t.listPaymentChannel[1].details[e.req_cc_id.substring(1, 2)].linkId,
      req_number: t.listPaymentChannel[1].details[e.req_cc_id.substring(1, 2)].cardNoEncrypt,
      req_date: t.listPaymentChannel[1].details[e.req_cc_id.substring(1, 2)].cardExpiryDateEncrypt,
      req_cvv: e.req_cvv
  } : (r.req_dokuwallet = e.req_wallet_form, r.req_dokuwallet.req_channel_code = t.listPaymentChannel[1].channelCode, r.req_dokuwallet.req_inquiry_code = t.inquiryCode, r.req_dokuwallet.req_doku_id = t.dokuId), console.log(r), $("#formPayment").html(e.req_loading), doku_timeout = setTimeout(function() {
      e.form_req_result_note = "Timeout", showResult(e), doku_ajax.abort()
  }, 65e3), doku_ajax = $.ajax({
      url: requestURL + "PrePayment",
      data: {
          data: JSON.stringify(r)
      },
      dataType: "json",
      type: "POST"
  }).success(function(t) {
      clearTimeout(doku_timeout), "0000" == t.res_response_code ? void 0 != t.res_result_3D ? (obj3D = JSON.parse(t.res_result_3D), window.addEventListener("message", receiveMessage, !1), $.fancybox.open([{
          closeClick: !1,
          type: "iframe",
          openEffect: "fade",
          closeEffect: "fade",
          openSpeed: "slow",
          closeSpeed: "slow",
          content: form3D,
          closeBtn: !1,
          autoResize: !0,
          helpers: {
              overlay: {
                  closeClick: !1
              }
          },
          afterClose: function() {
              obj3dResponse = $.parseJSON(threeDResponse), "0000" == obj3dResponse.res_response_code ? backToMerchant($.extend(e, $.extend(r, t))) : (e.form_req_result_note = obj3dResponse.res_response_code, showResult(e))
          }
      }]), $("#doku-form-3d").find("#PaReq").val(obj3D.PAREQ), $("#doku-form-3d").find("#MD").val(obj3D.MD), $("#doku-form-3d").find("#TermUrl").val(obj3D.TERMURL), $("#doku-form-3d").attr("action", obj3D.ACSURL), $("#doku-form-3d").submit()) : backToMerchant($.extend(e, $.extend(r, t))) : (e.form_req_result_note = t.res_response_code, showResult(e))
  })
}

function showResult(e) {
  $("#formPayment").html(e.req_result), $(".fail").show(), $(".success").remove(), $("doku-approval-code").parent().parent().remove(), $("doku-card-number").parent().parent().remove(), $("doku-invoice-number").html(e.req_transaction_id), $("doku-amount").html(e.req_amount), $("doku-message").html("Error code : " + e.form_req_result_note.replace(new RegExp("_", "g"), " ")), $("div.detail-result").children("a").attr("href", "#"), $("div.detail-result").children("a").html("Try Again"), e.retry = 1, $("div.detail-result").children("a").attr("onclick", "getForm(" + JSON.stringify(e) + ")")
}

function DokuToken(e) {
  var t = new Object;
  if (void 0 == data_obj.res_data_dw ? t.responseCode = "9999" : (data_obj.req_doku_id = $("#doku-username").val(), console.log("data_obj.req_doku_id == " + data_obj.req_doku_id), void 0 !== data_obj.res_data_dw && (t = $.parseJSON(data_obj.res_data_dw))), "0000" == t.responseCode && void 0 != data_obj.req_ref_account_id && "" != data_obj.req_ref_account_id) processInlineForm(data_obj);
  else {
      if ("15" == data_obj.req_payment_channel) r = ["doku-cc-exp", "doku-cc-number", "doku-name-cc", "doku-cvc"];
      else if ("04" == data_obj.req_payment_channel) var r = ["doku-username", "doku-password"];
      if (validateFormInline(r)) {
          $.fancybox.open([{
              closeClick: !1,
              type: "html",
              openEffect: "fade",
              closeEffect: "fade",
              openSpeed: "slow",
              closeSpeed: "slow",
              content: "<center><br><img src='" + loadingUrl + "' class='doku-loader-logo'><br><br><span class='doku-loader-text'>Please wait... your request is being processed</span></center>",
              closeBtn: !1,
              helpers: {
                  overlay: {
                      closeClick: !1
                  }
              }
          }]);
          var n = formatFormInline();
          doku_timeout = setTimeout(function() {
              $.fancybox.open([{
                  closeClick: !1,
                  type: "html",
                  openEffect: "fade",
                  closeEffect: "fade",
                  openSpeed: "slow",
                  closeSpeed: "slow",
                  content: "<center><br><img width='10%' src='" + failedUrl + "' class='doku-failed-logo'><br><br><span class='doku-loader-text'>Request failed... Timeout</span><br><br><a href='#' class='doku-btn-retry' onclick='closePopup(); $(\"#" + r[0] + "\").focus();'>Try Again</a></center>",
                  closeBtn: !1,
                  helpers: {
                      overlay: {
                          closeClick: !1
                      }
                  }
              }]), doku_ajax.abort()
          }, 65e3), doku_ajax = $.ajax({
              url: requestURL + "getToken",
              data: {
                  data: JSON.stringify(n)
              },
              dataType: "json",
              type: "POST"
          }).success(function(e) {
              for (clearTimeout(doku_timeout), i = 0; i < r.length; i++) $("#" + r[i]).val("");
              "0000" == e.res_response_code ? processInlineForm(e) : (console.log(e), $.fancybox.open([{
                  closeClick: !1,
                  type: "html",
                  openEffect: "fade",
                  closeEffect: "fade",
                  openSpeed: "slow",
                  closeSpeed: "slow",
                  content: "<center><br><img width='10%' src='" + failedUrl + "' class='doku-failed-logo'><br><br><span class='doku-loader-text'>Request failed... error code : " + e.res_response_code.replace(new RegExp("_", "g"), " ") + "</span><br><br><a href='#' class='doku-btn-retry' onclick='closePopup(); $(\"#" + r[0] + "\").focus();'>Try Again</a></center>",
                  closeBtn: !1,
                  helpers: {
                      overlay: {
                          closeClick: !1
                      }
                  }
              }]))
          }), pageTimeout = "<center>We are sorry your session has been expired. Please start a new payment request. Thank you.</center>", setTimeoutPage(data_obj.res_timeout, pageTimeout, data_obj, !0)
      }
  }
}

function closePopup() {
  $.fancybox.close()
}

function validateFormInline(e) {
  var t = !0;
  for (i = 0; i < e.length; i++)
      if (void 0 != $("#" + e[i]).attr("validation-rules")) {
          var r = $("#" + e[i]).attr("validation-rules").split("|"),
              n = new Object;
          for (j = 0; j < r.length && 0 != (n = checkRules(e[i], r[j])).status; j++);
          0 == n.status && ($("#" + e[i]).parent().addClass("has-error"), 0 == $("#" + e[i]).parent().children("font").length ? $("#" + e[i]).parent().append("<font color='red'>" + n.msg + "</font>") : $("#" + e[i]).parent().children("font").html(n.msg), t = !1)
      }
  return t
}

function formatFormInline() {
  var e = new Object;
  if (e.req_merchant_code = data_obj.req_merchant_code, e.req_payment_channel = data_obj.req_payment_channel, e.req_transaction_id = data_obj.req_transaction_id, e.req_amount = data_obj.req_amount, e.req_currency = data_obj.req_currency, e.req_pairing_code = data_obj.res_request_code, e.req_access_type = "W", e.req_domain_valid = document.location.origin, "15" == data_obj.req_payment_channel) {
      if (void 0 != data_obj.req_customer_id && "" != data_obj.req_customer_id) {
          if (void 0 == data_obj.res_tokenization) {
              var t = $("#doku-cc-exp").val(),
                  r = $("#doku-cc-number").val();
              2 == (n = t.split(" / "))[1].length && (n[1] = "20" + n[1]), e.req_date = n[1].substring(2, 4) + n[0], e.req_number = r.replace(/ - /g, ""), e.req_name = $("#doku-name-cc").val()
          }
          1 == $("#doku-save-cc").prop("checked") ? e.req_save_customer = "SAVE" : e.req_save_customer = "UNSAVE"
      } else {
          var t = $("#doku-cc-exp").val(),
              r = $("#doku-cc-number").val(),
              n = t.split(" / ");
          2 == n[1].length && (n[1] = "20" + n[1]), e.req_date = n[1].substring(2, 4) + n[0], e.req_number = r.replace(/ - /g, ""), e.req_name = $("#doku-name-cc").val()
      }
      e.req_secret = $("#doku-cvc").val()
  } else "04" == data_obj.req_payment_channel && (e.req_doku_id = $("#doku-username").val(), e.req_doku_pass = $("#doku-password").val(), e.req_session_id = data_obj.req_session_id, e.req_chain_merchant = data_obj.req_chain_merchant);
  return e
}

function processInlineForm(e) {
  if (console.log("processInlineForm"), console.log(e), "15" == data_obj.req_payment_channel)
      if (e.res_pairing_code = data_obj.res_request_code, e.res_invoice_no = data_obj.req_transaction_id, e.res_amount = data_obj.req_amount, e.res_chain_merchant = data_obj.req_chain_merchant, e.res_currency = data_obj.req_currency, e.res_mall_id = data_obj.req_merchant_code, $("#doku-cc-exp").val(""), $("#doku-cc-number").val(""), $("#doku-name-cc").val(""), $("#doku-cvc").val(""), void 0 != e.res_result_3D) obj3D = JSON.parse(e.res_result_3D), window.addEventListener("message", receiveMessage, !1), $.fancybox.open([{
          closeClick: !1,
          type: "iframe",
          content: form3D,
          closeBtn: !1,
          autoResize: !0,
          helpers: {
              overlay: {
                  closeClick: !1
              }
          },
          afterClose: function() {
              obj3dResponse = $.parseJSON(threeDResponse);
              var t = e = $.extend(e, obj3dResponse);
              getToken(t)
          }
      }]), $("#doku-form-3d").find("#PaReq").val(obj3D.PAREQ), $("#doku-form-3d").find("#MD").val(obj3D.MD), $("#doku-form-3d").find("#TermUrl").val(obj3D.TERMURL), $("#doku-form-3d").attr("action", obj3D.ACSURL), $("#doku-form-3d").submit();
      else {
          var t = e;
          getToken(t)
      }
  else "04" == data_obj.req_payment_channel && formatInlineFormDW(e)
}

function formatInlineFormDW(e) {
  if ("0000" == e.res_response_code) {
      console.log($.parseJSON(e.res_data_dw)), $.fancybox.open([{
          closeClick: !1,
          type: "html",
          openEffect: "fade",
          closeEffect: "fade",
          openSpeed: "slow",
          closeSpeed: "slow",
          wrapCSS: "doku-wrap",
          content: e.res_form_payment_dw,
          helpers: {
              overlay: {
                  closeClick: !1
              }
          }
      }]), $("#respTabs").responsiveTabs(), $(".resp-tabDrop").wrap("<div class='selectdw'><div class='wrapper-select'></div></div>"), $("input[name$='optdw']").click(function() {
          var e = $(this).val();
          $("div.promocontent-dw").hide(), $("#" + e).show()
      }), formatWalletCashInline(JSON.parse(e.res_data_dw)), formatWalletCcInline(JSON.parse(e.res_data_dw)), btnOnBlur();
      var t = $(".fancybox-wrap").find("input[type='button']").map(function() {
          return this.id
      }).get();
      for (i = 0; i < t.length; i++) $("#" + t[i]).click(function() {
          formatFormWalletInline($.extend($(this).parents("form"), e))
      })
  } else {
      var r = e;
      getToken(r)
  }
}

function formatWalletCashInline(e) {
  if ($(".nameuser").text(e.customerName), $(".saldo").text(e.listPaymentChannel[0].details.lastBalance.format(0, 3, ".", ",")), $(".amount-payment").text(parseInt(data_obj.req_amount).format(0, 3, ".", ",")), $(".amount-discount").text(parseInt("0").format(0, 3, ".", ",")), $(".amount-total").text(parseInt(data_obj.req_amount).format(0, 3, ".", ",")), void 0 != e.listPromotion && e.listPromotion.length > 0) {
      for (i = 0; i < e.listPromotion.length; i++) $("#doku-voucher").append('<option value="' + e.listPromotion[i].id + '">' + e.listPromotion[i].amount + "</option>");
      $("#doku-voucher").change(function() {
          $(".amount-discount").text(parseInt("0").format(0))
      }), $("#doku-voucher").change(function() {
          "" != $("option:selected", this).val() && ($(".amount-discount").text(parseInt($("option:selected", this).text()).format(0, 3, ".", ",")), parseInt(data_obj.req_amount) - parseInt($("option:selected", this).text()) < 0 ? $(".amount-total").text(0) : $(".amount-total").text(parseInt(parseInt(data_obj.req_amount) - parseInt($("option:selected", this).text())).format(0, 3, ".", ",")))
      }), $("#voucher_check").change(function() {
          1 == $(this).prop("checked") ? "" != $("#doku-voucher :selected").val() && ($(".amount-discount").text(parseInt($("#doku-voucher :selected").text()).format(0, 3, ".", ",")), $(".amount-total").text(parseInt(parseInt(data_obj.req_amount) - parseInt($("#doku-voucher :selected").text())).format(0, 3, ".", ","))) : ($(".amount-discount").text(parseInt("0").format(0, 3, ".", ",")), $(".amount-total").text(parseInt(data_obj.req_amount).format(0, 3, ".", ",")))
      })
  } else $("#doku-voucher-div").remove(), $("#doku-voucher-value").remove(), $("#doku-total-payment").remove();
  inquiryPromoCode(data_obj)
}

function formatWalletCcInline(e) {
  if (console.log(e), void 0 == e.listPaymentChannel[1]) $("#tablistItem2").remove(), $("#cc-tabs").remove();
  else if (void 0 == e.listPaymentChannel[1].details) $("#frmcc").remove(), $(".doku-cc-number").payment("formatCardNumber"), $(".doku-cc-exp").payment("formatCardExpiry"), $(".doku-cvc").payment("formatCardCVC");
  else {
      $("#frmcc-manual").remove();
      var t = "";
      for (i = 0; i < e.listPaymentChannel[1].details.length; i++) 0 == i ? (t = document.getElementById("listcard" + i).outerHTML, $("#r0").attr("checked", !0)) : $("#listcard" + (i - 1)).after(t.replace(new RegExp("0", "g"), i)), "4" == e.listPaymentChannel[1].details[i].cardNoMasked.substring(0, 1) ? $("#type-cc" + i).addClass("visa") : "5" == e.listPaymentChannel[1].details[i].cardNoMasked.substring(0, 1) && $("#type-cc" + i).addClass("mastercard"), $("#doku-cc-number" + i).text(e.listPaymentChannel[1].details[i].cardNoMasked)
  }
}

function formatFormWalletInline(e) {
  var t = $("#" + e[0].id + " :input").not("[type='button']").map(function() {
          return this.id
      }).get(),
      r = validateForm(t);
  if (console.log(r), r)
      if ("frmcash" == e[0].id) e.req_promo_code = $("#" + t[t.length - 2]).val(), e.req_pin = $("#" + t[t.length - 1]).val(), submitFormWalletInline(e);
      else if ("frmcc" == e[0].id) e.req_cvv = $("#" + t[t.length - 1]).val(), e.req_cc_id = $("#" + e[0].id + " :input[type='radio']").map(function() {
      if (1 == $(this).prop("checked")) return this.id
  }).get()[0], submitFormWalletInline(e);
  else {
      var n = $("#" + t[1]).val().split(" / ");
      2 == n[1].length && (n[1] = "20" + n[1]), e.req_wallet_form = {
          CC_NAME: $("#" + t[2]).val(),
          CC_CARDNUMBER: $("#" + t[0]).val().replace(/ - /g, ""),
          CC_EXPIRYDATE: n[1].substring(2, 4) + n[0],
          CC_MOBILEPHONE: $("#" + t[3]).val(),
          CC_EMAIL: $("#" + t[4]).val(),
          CC_CVV: $("#" + t[t.length - 1]).val()
      }, submitFormWalletInline(e)
  }
}

function submitFormWalletInline(e) {
  var t = JSON.parse(e.res_data_dw),
      r = new Object;
  r.req_token_id = e.res_token_id, r.req_pairing_code = data_obj.res_request_code, r.req_words = data_obj.req_words, r.req_domain_valid = document.location.origin, "frmcash" == e[0].id ? (r.req_dokuwallet = {
      req_channel_code: t.listPaymentChannel[0].channelCode,
      req_customer_pin: e.req_pin,
      req_inquiry_code: t.inquiryCode,
      req_customer_name: t.customerName,
      req_customer_email: t.customerEmail,
      req_doku_id: t.dokuId,
      req_promo_code: e.req_promo_code
  }, 1 == $("#voucher_check").prop("checked") && "" != $("#doku-voucher :selected").val() && (r.req_dokuwallet.req_promotion_id = $("#doku-voucher :selected").val())) : "frmcc" == e[0].id ? r.req_dokuwallet = {
      req_channel_code: t.listPaymentChannel[1].channelCode,
      req_inquiry_code: t.inquiryCode,
      req_doku_id: t.dokuId,
      req_link_id: t.listPaymentChannel[1].details[e.req_cc_id.substring(1, 2)].linkId,
      req_number: t.listPaymentChannel[1].details[e.req_cc_id.substring(1, 2)].cardNoEncrypt,
      req_date: t.listPaymentChannel[1].details[e.req_cc_id.substring(1, 2)].cardExpiryDateEncrypt,
      req_cvv: e.req_cvv
  } : (r.req_dokuwallet = e.req_wallet_form, r.req_dokuwallet.req_channel_code = t.listPaymentChannel[1].channelCode, r.req_dokuwallet.req_inquiry_code = t.inquiryCode, r.req_dokuwallet.req_doku_id = t.dokuId), console.log(r), doku_timeout = setTimeout(function() {
      $.fancybox.open([{
          closeClick: !1,
          type: "html",
          openEffect: "fade",
          closeEffect: "fade",
          openSpeed: "slow",
          closeSpeed: "slow",
          content: "<center><br><img width='10%' src='" + failedUrl + "' class='doku-failed-logo'><br><br><span class='doku-loader-text'>Request failed... Timeout</span><br><br><a href='#' class='doku-btn-retry' onclick='closePopup();'>Try Again</a></center>",
          closeBtn: !1,
          helpers: {
              overlay: {
                  closeClick: !1
              }
          }
      }]), doku_ajax.abort()
  }, 65e3), doku_ajax = $.ajax({
      url: requestURL + "PrePayment",
      data: {
          data: JSON.stringify(r)
      },
      dataType: "json",
      type: "POST",
      beforeSend: function() {
          $.fancybox.open([{
              closeClick: !1,
              type: "html",
              openEffect: "fade",
              closeEffect: "fade",
              openSpeed: "slow",
              closeSpeed: "slow",
              content: "<center><br><img src='" + loadingUrl + "' class='doku-loader-logo'><br><br><span class='doku-loader-text'>Please wait... your request is being processed</span></center>",
              closeBtn: !1,
              helpers: {
                  overlay: {
                      closeClick: !1
                  }
              }
          }])
      }
  }).success(function(t) {
      if (clearTimeout(doku_timeout), console.log("submitFormWalletInline"), console.log(t), "0000" == t.res_response_code)
          if (void 0 != t.res_result_3D) obj3D = JSON.parse(t.res_result_3D), window.addEventListener("message", receiveMessage, !1), $.fancybox.open([{
              closeClick: !1,
              type: "iframe",
              content: form3D,
              closeBtn: !1,
              autoResize: !0,
              helpers: {
                  overlay: {
                      closeClick: !1
                  }
              },
              afterClose: function() {
                  obj3dResponse = $.parseJSON(threeDResponse), t.res_token_id = e.res_token_id, t.res_pairing_code = data_obj.res_request_code, t.res_invoice_no = data_obj.req_transaction_id, t.res_amount = data_obj.req_amount, t.res_chain_merchant = data_obj.req_chain_merchant, t.res_currency = data_obj.req_currency, t.res_mall_id = data_obj.req_merchant_code, delete t.res_result_3D, obj = $.extend(t, obj3dResponse), console.log("prepayment 3d"), console.log(obj);
                  var r = obj;
                  getToken(r)
              }
          }]), $("#doku-form-3d").find("#PaReq").val(obj3D.PAREQ), $("#doku-form-3d").find("#MD").val(obj3D.MD), $("#doku-form-3d").find("#TermUrl").val(obj3D.TERMURL), $("#doku-form-3d").attr("action", obj3D.ACSURL), $("#doku-form-3d").submit();
          else {
              t.res_token_id = e.res_token_id, t.res_pairing_code = data_obj.res_request_code, t.res_invoice_no = data_obj.req_transaction_id, t.res_amount = data_obj.req_amount, t.res_chain_merchant = data_obj.req_chain_merchant, t.res_currency = data_obj.req_currency, t.res_mall_id = data_obj.req_merchant_code;
              var r = t;
              $.fancybox.close(), getToken(r)
          }
      else $.fancybox.open([{
          closeClick: !1,
          type: "html",
          openEffect: "fade",
          closeEffect: "fade",
          openSpeed: "slow",
          closeSpeed: "slow",
          content: "<center><br><img width='10%' src='" + failedUrl + "' class='doku-failed-logo'><br><br><span class='doku-loader-text'>Request failed... error code : " + t.res_response_code + "</span><br><br><a href='#' class='doku-btn-retry' onclick='closePopup();'>Try Again</a></center>",
          closeBtn: !1,
          helpers: {
              overlay: {
                  closeClick: !1
              }
          }
      }])
  })
}

function dokuMandiriInitiate(e) {
  $("#" + e.req_cc_field).focusout(function() {
      for (var t = $("#cc_number").val(), r = "", n = !1, o = 0; o < t.length; o++) t.charAt(o) >= "0" && t.charAt(o) <= "9" && (r += t.charAt(o));
      for (var a = 0, i = 1; i <= r.length; i++) {
          var s = r.charAt(r.length - i);
          if (i % 2 == 0) {
              var l = 2 * s;
              l > 9 ? (a += 1, a += l % 10 - 0) : a += l - 0
          } else a += s - 0
      }
      a % 10 || (n = !0), n && ($("#" + e.req_cc_field).removeClass("error"), $("#" + e.req_challenge_field).val($("#cc_number").val().replace(/ - /g, "").substr(6, 16)))
  })
}

function setTimeoutPage(e, t, r, n) {
  e = parseInt(e), e *= 60, console.log("timeout==" + e), doku_timeout_page = setTimeout(function() {
      console.log("isPopup === " + n), n && closePopup(), updatePreTransactionTimeout(t, r), doku_ajax.abort()
  }, 1e3 * e)
}

function updatePreTransactionTimeout(e, t) {
  $.ajax({
      url: requestURL + "timeout",
      data: {
          req_merchant_code: t.req_merchant_code,
          req_chain_merchant: t.req_chain_merchant,
          req_transaction_id: t.req_transaction_id
      },
      dataType: "json",
      type: "POST"
  }).success(function(t) {
      $("#formPayment").html(e), void 0 === t.res_redirect_url || null == t.res_redirect_url || "" == t.res_redirect_url ? $("#formPayment").find("a").remove() : $("#formPayment").find(".backtomerchant").attr("href", t.res_redirect_url)
  }).error(function() {
      $("#formPayment").html(e), void 0 === data.res_redirect_url || null == data.res_redirect_url || "" == data.res_redirect_url ? $("#formPayment").find("a").remove() : $("#formPayment").find(".backtomerchant").attr("href", data.res_redirect_url)
  })
}

function getDeviceInfo() {
  var e = new ClientJS,
      t = e.getFingerprint(),
      r = e.getFonts(),
      n = e.getMimeTypes(),
      o = e.getBrowser(),
      a = e.getOS(),
      i = e.getOSVersion(),
      s = e.getCPU(),
      l = e.getUserAgentLowerCase(),
      c = e.getScreenPrint(),
      d = e.getCurrentResolution(),
      u = e.getAvailableResolution(),
      m = e.getColorDepth(),
      p = e.getBrowserVersion(),
      h = e.getBrowserMajorVersion(),
      f = e.getEngine(),
      v = e.getEngineVersion(),
      g = e.getPlugins(),
      _ = e.getDevice(),
      b = e.getDeviceType(),
      y = e.getDeviceVendor(),
      w = e.getTimeZone(),
      k = e.isSessionStorage(),
      $ = e.isLocalStorage(),
      q = e.getCPU(),
      C = new Object;
  return C.fingerprint = t, C.fonts = r, C.mimeTypes = n, C.browser = o, C.os = a, C.osVersion = i, C.cpu = s, C.userAgentLowerCase = l, C.screenPrint = c, C.currentResolution = d, C.availableResolution = u, C.colorDepth = m, C.browserVersion = p, C.browserMajorVersion = h, C.engine = f, C.engineVersion = v, C.plugins = g, C.device = _, C.deviceType = b, C.deviceVendor = y, C.timezone_offset = w, C.session_storage = k, C.local_storage = $, C.cpu_class = q, JSON.stringify(C)
}

function murmurhash3_32_gc(e, t) {
  var r, n, o, a, i;
  for (r = 3 & e.length, n = e.length - r, o = t, i = 0; i < n;) a = 255 & e.charCodeAt(i) | (255 & e.charCodeAt(++i)) << 8 | (255 & e.charCodeAt(++i)) << 16 | (255 & e.charCodeAt(++i)) << 24, ++i, a = 3432918353 * (65535 & a) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295, a = a << 15 | a >>> 17, a = 461845907 * (65535 & a) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295, o ^= a, o = o << 13 | o >>> 19, o = 5 * (65535 & o) + ((5 * (o >>> 16) & 65535) << 16) & 4294967295, o = 27492 + (65535 & o) + ((58964 + (o >>> 16) & 65535) << 16);
  switch (a = 0, r) {
      case 3:
          a ^= (255 & e.charCodeAt(i + 2)) << 16;
      case 2:
          a ^= (255 & e.charCodeAt(i + 1)) << 8;
      case 1:
          o ^= 461845907 * (65535 & (a = (a = 3432918353 * (65535 & (a ^= 255 & e.charCodeAt(i))) + ((3432918353 * (a >>> 16) & 65535) << 16) & 4294967295) << 15 | a >>> 17)) + ((461845907 * (a >>> 16) & 65535) << 16) & 4294967295
  }
  return o ^= e.length, o ^= o >>> 16, o = 2246822507 * (65535 & o) + ((2246822507 * (o >>> 16) & 65535) << 16) & 4294967295, o ^= o >>> 13, ((o = 3266489909 * (65535 & o) + ((3266489909 * (o >>> 16) & 65535) << 16) & 4294967295) ^ o >>> 16) >>> 0
}
var $ = jQuery.noConflict(),
  requestURL = "https://staging.doku.com/api/payment/",
  originUrl = "https://staging.doku.com",
  loadingUrl = "https://staging.doku.com/doku-js/assets/images/loading.gif",
  failedUrl = "https://staging.doku.com/doku-js/assets/images/failed.png",
  form3D = '<form method="post" name="doku-form-3d" id="doku-form-3d" target=\'doku-iframe\'><input name="PaReq" type="hidden" id="PaReq"/><input name="MD" type="hidden" id="MD"/><input name="TermUrl" type="hidden" id="TermUrl"/>' + "</form><iframe name='doku-iframe' height='500' width='500' style='z-index: 1'></iframe>",
  formDw = '<div style="" class="dw-acc-exist"><div style="" class="ava-dw-exist"><img src="" alt="ava-image"></div><div style="" class="info-dw"><div class="info-dw-user" style=""></div><div class="info-dw-label" style="">Saldo saya</div><div class="info-dw-saldo" style="" class=""></div></div><div class="clear"></div></div>',
  threeDResponse, data_obj, doku_timeout, doku_timeout_page, doku_ajax, frmSaveToken, pageTimeout = "",
  timeout = 15;
Number.prototype.format = function(e, t, r, n) {
      var o = "\\d(?=(\\d{" + (t || 3) + "})+" + (e > 0 ? "\\D" : "$") + ")",
          a = this.toFixed(Math.max(0, ~~e));
      return (n ? a.replace(".", n) : a).replace(new RegExp(o, "g"), "$&" + (r || ","))
  }, Object.size = function(e) {
      var t, r = 0;
      for (t in e) e.hasOwnProperty(t) && r++;
      return r
  },
  function(e) {
      var t, r, n = function() {
          return t = (new(window.UAParser || exports.UAParser)).getResult(), r = new Detector, this
      };
      n.prototype = {
          getSoftwareVersion: function() {
              return "0.1.11"
          },
          getBrowserData: function() {
              return t
          },
          getFingerprint: function() {
              return murmurhash3_32_gc(t.ua + "|" + this.getScreenPrint() + "|" + this.getPlugins() + "|" + this.getFonts() + "|" + this.isLocalStorage() + "|" + this.isSessionStorage() + "|" + this.getTimeZone() + "|" + this.getLanguage() + "|" + this.getSystemLanguage() + "|" + this.isCookie() + "|" + this.getCanvasPrint(), 256)
          },
          getCustomFingerprint: function() {
              for (var e = "", t = 0; t < arguments.length; t++) e += arguments[t] + "|";
              return murmurhash3_32_gc(e, 256)
          },
          getUserAgent: function() {
              return t.ua
          },
          getUserAgentLowerCase: function() {
              return t.ua.toLowerCase()
          },
          getBrowser: function() {
              return t.browser.name
          },
          getBrowserVersion: function() {
              return t.browser.version
          },
          getBrowserMajorVersion: function() {
              return t.browser.major
          },
          isIE: function() {
              return /IE/i.test(t.browser.name)
          },
          isChrome: function() {
              return /Chrome/i.test(t.browser.name)
          },
          isFirefox: function() {
              return /Firefox/i.test(t.browser.name)
          },
          isSafari: function() {
              return /Safari/i.test(t.browser.name)
          },
          isMobileSafari: function() {
              return /Mobile\sSafari/i.test(t.browser.name)
          },
          isOpera: function() {
              return /Opera/i.test(t.browser.name)
          },
          getEngine: function() {
              return t.engine.name
          },
          getEngineVersion: function() {
              return t.engine.version
          },
          getOS: function() {
              return t.os.name
          },
          getOSVersion: function() {
              return t.os.version
          },
          isWindows: function() {
              return /Windows/i.test(t.os.name)
          },
          isMac: function() {
              return /Mac/i.test(t.os.name)
          },
          isLinux: function() {
              return /Linux/i.test(t.os.name)
          },
          isUbuntu: function() {
              return /Ubuntu/i.test(t.os.name)
          },
          isSolaris: function() {
              return /Solaris/i.test(t.os.name)
          },
          getDevice: function() {
              return t.device.model
          },
          getDeviceType: function() {
              return t.device.type
          },
          getDeviceVendor: function() {
              return t.device.vendor
          },
          getCPU: function() {
              return t.cpu.architecture
          },
          isMobile: function() {
              var e = t.ua || navigator.vendor || window.opera;
              return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
          },
          isMobileMajor: function() {
              return this.isMobileAndroid() || this.isMobileBlackBerry() || this.isMobileIOS() || this.isMobileOpera() || this.isMobileWindows()
          },
          isMobileAndroid: function() {
              return !!t.ua.match(/Android/i)
          },
          isMobileOpera: function() {
              return !!t.ua.match(/Opera Mini/i)
          },
          isMobileWindows: function() {
              return !!t.ua.match(/IEMobile/i)
          },
          isMobileBlackBerry: function() {
              return !!t.ua.match(/BlackBerry/i)
          },
          isMobileIOS: function() {
              return !!t.ua.match(/iPhone|iPad|iPod/i)
          },
          isIphone: function() {
              return !!t.ua.match(/iPhone/i)
          },
          isIpad: function() {
              return !!t.ua.match(/iPad/i)
          },
          isIpod: function() {
              return !!t.ua.match(/iPod/i)
          },
          getScreenPrint: function() {
              return "Current Resolution: " + this.getCurrentResolution() + ", Available Resolution: " + this.getAvailableResolution() + ", Color Depth: " + this.getColorDepth() + ", Device XDPI: " + this.getDeviceXDPI() + ", Device YDPI: " + this.getDeviceYDPI()
          },
          getColorDepth: function() {
              return screen.colorDepth
          },
          getCurrentResolution: function() {
              return screen.width + "x" + screen.height
          },
          getAvailableResolution: function() {
              return screen.availWidth + "x" + screen.availHeight
          },
          getDeviceXDPI: function() {
              return screen.deviceXDPI
          },
          getDeviceYDPI: function() {
              return screen.deviceYDPI
          },
          getPlugins: function() {
              for (var e = "", t = 0; t < navigator.plugins.length; t++) e = t == navigator.plugins.length - 1 ? e + navigator.plugins[t].name : e + (navigator.plugins[t].name + ", ");
              return e
          },
          isJava: function() {
              return navigator.javaEnabled()
          },
          getJavaVersion: function() {
              return deployJava.getJREs().toString()
          },
          isFlash: function() {
              return !!navigator.plugins["Shockwave Flash"]
          },
          getFlashVersion: function() {
              return this.isFlash() ? (objPlayerVersion = swfobject.getFlashPlayerVersion(), objPlayerVersion.major + "." + objPlayerVersion.minor + "." + objPlayerVersion.release) : ""
          },
          isSilverlight: function() {
              return !!navigator.plugins["Silverlight Plug-In"]
          },
          getSilverlightVersion: function() {
              return this.isSilverlight() ? navigator.plugins["Silverlight Plug-In"].description : ""
          },
          isMimeTypes: function() {
              return !!navigator.mimeTypes.length
          },
          getMimeTypes: function() {
              for (var e = "", t = 0; t < navigator.mimeTypes.length; t++) e = t == navigator.mimeTypes.length - 1 ? e + navigator.mimeTypes[t].description : e + (navigator.mimeTypes[t].description + ", ");
              return e
          },
          isFont: function(e) {
              return r.detect(e)
          },
          getFonts: function() {
              for (var e = "Abadi MT Condensed Light;Adobe Fangsong Std;Adobe Hebrew;Adobe Ming Std;Agency FB;Aharoni;Andalus;Angsana New;AngsanaUPC;Aparajita;Arab;Arabic Transparent;Arabic Typesetting;Arial Baltic;Arial Black;Arial CE;Arial CYR;Arial Greek;Arial TUR;Arial;Batang;BatangChe;Bauhaus 93;Bell MT;Bitstream Vera Serif;Bodoni MT;Bookman Old Style;Braggadocio;Broadway;Browallia New;BrowalliaUPC;Calibri Light;Calibri;Californian FB;Cambria Math;Cambria;Candara;Castellar;Casual;Centaur;Century Gothic;Chalkduster;Colonna MT;Comic Sans MS;Consolas;Constantia;Copperplate Gothic Light;Corbel;Cordia New;CordiaUPC;Courier New Baltic;Courier New CE;Courier New CYR;Courier New Greek;Courier New TUR;Courier New;DFKai-SB;DaunPenh;David;DejaVu LGC Sans Mono;Desdemona;DilleniaUPC;DokChampa;Dotum;DotumChe;Ebrima;Engravers MT;Eras Bold ITC;Estrangelo Edessa;EucrosiaUPC;Euphemia;Eurostile;FangSong;Forte;FrankRuehl;Franklin Gothic Heavy;Franklin Gothic Medium;FreesiaUPC;French Script MT;Gabriola;Gautami;Georgia;Gigi;Gisha;Goudy Old Style;Gulim;GulimChe;GungSeo;Gungsuh;GungsuhChe;Haettenschweiler;Harrington;Hei S;HeiT;Heisei Kaku Gothic;Hiragino Sans GB;Impact;Informal Roman;IrisUPC;Iskoola Pota;JasmineUPC;KacstOne;KaiTi;Kalinga;Kartika;Khmer UI;Kino MT;KodchiangUPC;Kokila;Kozuka Gothic Pr6N;Lao UI;Latha;Leelawadee;Levenim MT;LilyUPC;Lohit Gujarati;Loma;Lucida Bright;Lucida Console;Lucida Fax;Lucida Sans Unicode;MS Gothic;MS Mincho;MS PGothic;MS PMincho;MS Reference Sans Serif;MS UI Gothic;MV Boli;Magneto;Malgun Gothic;Mangal;Marlett;Matura MT Script Capitals;Meiryo UI;Meiryo;Menlo;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Sans Serif;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU-ExtB;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;Miriam Fixed;Miriam;Mongolian Baiti;MoolBoran;NSimSun;Narkisim;News Gothic MT;Niagara Solid;Nyala;PMingLiU;PMingLiU-ExtB;Palace Script MT;Palatino Linotype;Papyrus;Perpetua;Plantagenet Cherokee;Playbill;Prelude Bold;Prelude Condensed Bold;Prelude Condensed Medium;Prelude Medium;PreludeCompressedWGL Black;PreludeCompressedWGL Bold;PreludeCompressedWGL Light;PreludeCompressedWGL Medium;PreludeCondensedWGL Black;PreludeCondensedWGL Bold;PreludeCondensedWGL Light;PreludeCondensedWGL Medium;PreludeWGL Black;PreludeWGL Bold;PreludeWGL Light;PreludeWGL Medium;Raavi;Rachana;Rockwell;Rod;Sakkal Majalla;Sawasdee;Script MT Bold;Segoe Print;Segoe Script;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Segoe UI;Shonar Bangla;Showcard Gothic;Shruti;SimHei;SimSun;SimSun-ExtB;Simplified Arabic Fixed;Simplified Arabic;Snap ITC;Sylfaen;Symbol;Tahoma;Times New Roman Baltic;Times New Roman CE;Times New Roman CYR;Times New Roman Greek;Times New Roman TUR;Times New Roman;TlwgMono;Traditional Arabic;Trebuchet MS;Tunga;Tw Cen MT Condensed Extra Bold;Ubuntu;Umpush;Univers;Utopia;Utsaah;Vani;Verdana;Vijaya;Vladimir Script;Vrinda;Webdings;Wide Latin;Wingdings".split(";"), t = "", n = 0; n < e.length; n++) r.detect(e[n]) && (t = n == e.length - 1 ? t + e[n] : t + (e[n] + ", "));
              return t
          },
          isLocalStorage: function() {
              try {
                  return !!e.localStorage
              } catch (e) {
                  return !0
              }
          },
          isSessionStorage: function() {
              try {
                  return !!e.sessionStorage
              } catch (e) {
                  return !0
              }
          },
          isCookie: function() {
              return navigator.cookieEnabled
          },
          getTimeZone: function() {
              return String(String(new Date).split("(")[1]).split(")")[0]
          },
          getLanguage: function() {
              return navigator.language
          },
          getSystemLanguage: function() {
              return navigator.systemLanguage
          },
          isCanvas: function() {
              var e = document.createElement("canvas");
              try {
                  return !(!e.getContext || !e.getContext("2d"))
              } catch (e) {
                  return !1
              }
          },
          getCanvasPrint: function() {
              var e, t = document.createElement("canvas");
              try {
                  e = t.getContext("2d")
              } catch (e) {
                  return ""
              }
              return e.textBaseline = "top", e.font = "14px 'Arial'", e.textBaseline = "alphabetic", e.fillStyle = "#f60", e.fillRect(125, 1, 62, 20), e.fillStyle = "#069", e.fillText("ClientJS,org <canvas> 1.0", 2, 15), e.fillStyle = "rgba(102, 204, 0, 0.7)", e.fillText("ClientJS,org <canvas> 1.0", 4, 17), t.toDataURL()
          }
      }, "object" == typeof module && "undefined" != typeof exports && (module.exports = n), e.ClientJS = n
  }(window);
var deployJava = function() {
      function e(e) {
          a.debug && (console.log ? console.log(e) : alert(e))
      }

      function t(e) {
          return null == e || 0 == e.length ? "http://java.com/dt-redirect" : ("&" == e.charAt(0) && (e = e.substring(1, e.length)), "http://java.com/dt-redirect?" + e)
      }
      var r = ["id", "class", "title", "style"];
      "classid codebase codetype data type archive declare standby height width usemap name tabindex align border hspace vspace".split(" ").concat(r, ["lang", "dir"], "onclick ondblclick onmousedown onmouseup onmouseover onmousemove onmouseout onkeypress onkeydown onkeyup".split(" "));
      var n, o = "codebase code name archive object width height alt align hspace vspace".split(" ").concat(r);
      try {
          n = -1 != document.location.protocol.indexOf("http") ? "//java.com/js/webstart.png" : "http://java.com/js/webstart.png"
      } catch (e) {
          n = "http://java.com/js/webstart.png"
      }
      var a = {
          debug: null,
          version: "20120801",
          firefoxJavaVersion: null,
          myInterval: null,
          preInstallJREList: null,
          returnPage: null,
          brand: null,
          locale: null,
          installType: null,
          EAInstallEnabled: !1,
          EarlyAccessURL: null,
          oldMimeType: "application/npruntime-scriptable-plugin;DeploymentToolkit",
          mimeType: "application/java-deployment-toolkit",
          launchButtonPNG: n,
          browserName: null,
          browserName2: null,
          getJREs: function() {
              var t = [];
              if (this.isPluginInstalled())
                  for (var r = this.getPlugin().jvms, n = 0; n < r.getLength(); n++) t[n] = r.get(n).version;
              else r = this.getBrowser(), "MSIE" == r ? this.testUsingActiveX("1.7.0") ? t[0] = "1.7.0" : this.testUsingActiveX("1.6.0") ? t[0] = "1.6.0" : this.testUsingActiveX("1.5.0") ? t[0] = "1.5.0" : this.testUsingActiveX("1.4.2") ? t[0] = "1.4.2" : this.testForMSVM() && (t[0] = "1.1") : "Netscape Family" == r && (this.getJPIVersionUsingMimeType(), null != this.firefoxJavaVersion ? t[0] = this.firefoxJavaVersion : this.testUsingMimeTypes("1.7") ? t[0] = "1.7.0" : this.testUsingMimeTypes("1.6") ? t[0] = "1.6.0" : this.testUsingMimeTypes("1.5") ? t[0] = "1.5.0" : this.testUsingMimeTypes("1.4.2") ? t[0] = "1.4.2" : "Safari" == this.browserName2 && (this.testUsingPluginsArray("1.7.0") ? t[0] = "1.7.0" : this.testUsingPluginsArray("1.6") ? t[0] = "1.6.0" : this.testUsingPluginsArray("1.5") ? t[0] = "1.5.0" : this.testUsingPluginsArray("1.4.2") && (t[0] = "1.4.2")));
              if (this.debug)
                  for (n = 0; n < t.length; ++n) e("[getJREs()] We claim to have detected Java SE " + t[n]);
              return t
          },
          installJRE: function(e, t) {
              if (this.isPluginInstalled() && this.isAutoInstallEnabled(e)) {
                  var r = !1;
                  return (r = this.isCallbackSupported() ? this.getPlugin().installJRE(e, t) : this.getPlugin().installJRE(e)) && (this.refresh(), null != this.returnPage && (document.location = this.returnPage)), r
              }
              return this.installLatestJRE()
          },
          isAutoInstallEnabled: function(e) {
              if (!this.isPluginInstalled()) return !1;
              if (void 0 === e && (e = null), "MSIE" != deployJava.browserName || deployJava.compareVersionToPattern(deployJava.getPlugin().version, ["10", "0", "0"], !1, !0)) e = !0;
              else if (null == e) e = !1;
              else {
                  var t = "1.6.0_33+";
                  if (null == t || 0 == t.length) e = !0;
                  else {
                      var r = t.charAt(t.length - 1);
                      if ("+" != r && "*" != r && -1 != t.indexOf("_") && "_" != r && (t += "*", r = "*"), 0 < (t = t.substring(0, t.length - 1)).length) {
                          var n = t.charAt(t.length - 1);
                          "." != n && "_" != n || (t = t.substring(0, t.length - 1))
                      }
                      e = "*" == r ? 0 == e.indexOf(t) : "+" == r && t <= e
                  }
                  e = !e
              }
              return e
          },
          isCallbackSupported: function() {
              return this.isPluginInstalled() && this.compareVersionToPattern(this.getPlugin().version, ["10", "2", "0"], !1, !0)
          },
          installLatestJRE: function(e) {
              if (this.isPluginInstalled() && this.isAutoInstallEnabled()) {
                  var r = !1;
                  return (r = this.isCallbackSupported() ? this.getPlugin().installLatestJRE(e) : this.getPlugin().installLatestJRE()) && (this.refresh(), null != this.returnPage && (document.location = this.returnPage)), r
              }
              if (e = this.getBrowser(), r = navigator.platform.toLowerCase(), "true" == this.EAInstallEnabled && -1 != r.indexOf("win") && null != this.EarlyAccessURL) this.preInstallJREList = this.getJREs(), null != this.returnPage && (this.myInterval = setInterval("deployJava.poll()", 3e3)), location.href = this.EarlyAccessURL;
              else {
                  if ("MSIE" == e) return this.IEInstall();
                  if ("Netscape Family" == e && -1 != r.indexOf("win32")) return this.FFInstall();
                  location.href = t((null != this.returnPage ? "&returnPage=" + this.returnPage : "") + (null != this.locale ? "&locale=" + this.locale : "") + (null != this.brand ? "&brand=" + this.brand : ""))
              }
              return !1
          },
          runApplet: function(t, r, n) {
              "undefined" != n && null != n || (n = "1.1");
              var o = n.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");
              null == this.returnPage && (this.returnPage = document.location), null != o ? "?" != this.getBrowser() ? this.versionCheck(n + "+") ? this.writeAppletTag(t, r) : this.installJRE(n + "+") && (this.refresh(), location.href = document.location, this.writeAppletTag(t, r)) : this.writeAppletTag(t, r) : e("[runApplet()] Invalid minimumVersion argument to runApplet():" + n)
          },
          writeAppletTag: function(e, t) {
              var r = "<applet ",
                  n = "",
                  a = !0;
              null != t && "object" == typeof t || (t = {});
              for (var i in e) {
                  var s;
                  e: {
                      s = i.toLowerCase();
                      for (var l = o.length, c = 0; c < l; c++)
                          if (o[c] === s) {
                              s = !0;
                              break e
                          }
                      s = !1
                  }
                  s ? (r += " " + i + '="' + e[i] + '"', "code" == i && (a = !1)) : t[i] = e[i]
              }
              i = !1;
              for (var d in t) "codebase_lookup" == d && (i = !0), "object" != d && "java_object" != d && "java_code" != d || (a = !1), n += '<param name="' + d + '" value="' + t[d] + '"/>';
              i || (n += '<param name="codebase_lookup" value="false"/>'), a && (r += ' code="dummy"'), document.write(r + ">\n" + n + "\n</applet>")
          },
          versionCheck: function(t) {
              var r = 0,
                  n = t.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?(\\*|\\+)?$");
              if (null != n) {
                  for (var o = t = !1, a = [], i = 1; i < n.length; ++i) "string" == typeof n[i] && "" != n[i] && (a[r] = n[i], r++);
                  for ("+" == a[a.length - 1] ? (o = !0, t = !1, a.length--) : "*" == a[a.length - 1] ? (o = !1, t = !0, a.length--) : 4 > a.length && (o = !1, t = !0), r = this.getJREs(), i = 0; i < r.length; ++i)
                      if (this.compareVersionToPattern(r[i], a, t, o)) return !0
              } else r = "Invalid versionPattern passed to versionCheck: " + t, e("[versionCheck()] " + r), alert(r);
              return !1
          },
          isWebStartInstalled: function(t) {
              if ("?" == this.getBrowser()) return !0;
              "undefined" != t && null != t || (t = "1.4.2");
              var r = !1;
              return null != t.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$") ? r = this.versionCheck(t + "+") : (e("[isWebStartInstaller()] Invalid minimumVersion argument to isWebStartInstalled(): " + t), r = this.versionCheck("1.4.2+")), r
          },
          getJPIVersionUsingMimeType: function() {
              for (var e = 0; e < navigator.mimeTypes.length; ++e) {
                  var t = navigator.mimeTypes[e].type.match(/^application\/x-java-applet;jpi-version=(.*)$/);
                  if (null != t && (this.firefoxJavaVersion = t[1], "Opera" != this.browserName2)) break
              }
          },
          launchWebStartApplication: function(e) {
              if (navigator.userAgent.toLowerCase(), this.getJPIVersionUsingMimeType(), 0 == this.isWebStartInstalled("1.7.0") && (0 == this.installJRE("1.7.0+") || 0 == this.isWebStartInstalled("1.7.0"))) return !1;
              var t = null;
              document.documentURI && (t = document.documentURI), null == t && (t = document.URL);
              var r, n = this.getBrowser();
              "MSIE" == n ? r = '<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" width="0" height="0"><PARAM name="launchjnlp" value="' + e + '"><PARAM name="docbase" value="' + t + '"></object>' : "Netscape Family" == n && (r = '<embed type="application/x-java-applet;jpi-version=' + this.firefoxJavaVersion + '" width="0" height="0" launchjnlp="' + e + '"docbase="' + t + '" />'), "undefined" == document.body || null == document.body ? (document.write(r), document.location = t) : (e = document.createElement("div"), e.id = "div1", e.style.position = "relative", e.style.left = "-10000px", e.style.margin = "0px auto", e.className = "dynamicDiv", e.innerHTML = r, document.body.appendChild(e))
          },
          createWebStartLaunchButtonEx: function(e, t) {
              null == this.returnPage && (this.returnPage = e), document.write("<a href=\"javascript:deployJava.launchWebStartApplication('" + e + '\');" onMouseOver="window.status=\'\'; return true;"><img src="' + this.launchButtonPNG + '" border="0" /></a>')
          },
          createWebStartLaunchButton: function(e, t) {
              null == this.returnPage && (this.returnPage = e), document.write('<a href="javascript:if (!deployJava.isWebStartInstalled(&quot;' + t + "&quot;)) {if (deployJava.installLatestJRE()) {if (deployJava.launch(&quot;" + e + "&quot;)) {}}} else {if (deployJava.launch(&quot;" + e + '&quot;)) {}}" onMouseOver="window.status=\'\'; return true;"><img src="' + this.launchButtonPNG + '" border="0" /></a>')
          },
          launch: function(e) {
              return document.location = e, !0
          },
          isPluginInstalled: function() {
              var e = this.getPlugin();
              return !(!e || !e.jvms)
          },
          isAutoUpdateEnabled: function() {
              return !!this.isPluginInstalled() && this.getPlugin().isAutoUpdateEnabled()
          },
          setAutoUpdateEnabled: function() {
              return !!this.isPluginInstalled() && this.getPlugin().setAutoUpdateEnabled()
          },
          setInstallerType: function(e) {
              return this.installType = e, !!this.isPluginInstalled() && this.getPlugin().setInstallerType(e)
          },
          setAdditionalPackages: function(e) {
              return !!this.isPluginInstalled() && this.getPlugin().setAdditionalPackages(e)
          },
          setEarlyAccess: function(e) {
              this.EAInstallEnabled = e
          },
          isPlugin2: function() {
              if (this.isPluginInstalled() && this.versionCheck("1.6.0_10+")) try {
                  return this.getPlugin().isPlugin2()
              } catch (e) {}
              return !1
          },
          allowPlugin: function() {
              return this.getBrowser(), "Safari" != this.browserName2 && "Opera" != this.browserName2
          },
          getPlugin: function() {
              this.refresh();
              var e = null;
              return this.allowPlugin() && (e = document.getElementById("deployJavaPlugin")), e
          },
          compareVersionToPattern: function(e, t, r, n) {
              if (void 0 == e || void 0 == t) return !1;
              var o = e.match("^(\\d+)(?:\\.(\\d+)(?:\\.(\\d+)(?:_(\\d+))?)?)?$");
              if (null != o) {
                  var a = 0;
                  e = [];
                  for (var i = 1; i < o.length; ++i) "string" == typeof o[i] && "" != o[i] && (e[a] = o[i], a++);
                  if (o = Math.min(e.length, t.length), n) {
                      for (i = 0; i < o; ++i) {
                          if (e[i] < t[i]) return !1;
                          if (e[i] > t[i]) break
                      }
                      return !0
                  }
                  for (i = 0; i < o; ++i)
                      if (e[i] != t[i]) return !1;
                  return !!r || e.length == t.length
              }
              return !1
          },
          getBrowser: function() {
              if (null == this.browserName) {
                  var t = navigator.userAgent.toLowerCase();
                  e("[getBrowser()] navigator.userAgent.toLowerCase() -> " + t), -1 != t.indexOf("msie") && -1 == t.indexOf("opera") ? this.browserName2 = this.browserName = "MSIE" : -1 != t.indexOf("iphone") ? (this.browserName = "Netscape Family", this.browserName2 = "iPhone") : -1 != t.indexOf("firefox") && -1 == t.indexOf("opera") ? (this.browserName = "Netscape Family", this.browserName2 = "Firefox") : -1 != t.indexOf("chrome") ? (this.browserName = "Netscape Family", this.browserName2 = "Chrome") : -1 != t.indexOf("safari") ? (this.browserName = "Netscape Family", this.browserName2 = "Safari") : -1 != t.indexOf("mozilla") && -1 == t.indexOf("opera") ? (this.browserName = "Netscape Family", this.browserName2 = "Other") : -1 != t.indexOf("opera") ? (this.browserName = "Netscape Family", this.browserName2 = "Opera") : (this.browserName = "?", this.browserName2 = "unknown"), e("[getBrowser()] Detected browser name:" + this.browserName + ", " + this.browserName2)
              }
              return this.browserName
          },
          testUsingActiveX: function(t) {
              if (t = "JavaWebStart.isInstalled." + t + ".0", "undefined" == typeof ActiveXObject || !ActiveXObject) return e("[testUsingActiveX()] Browser claims to be IE, but no ActiveXObject object?"), !1;
              try {
                  return null != new ActiveXObject(t)
              } catch (e) {
                  return !1
              }
          },
          testForMSVM: function() {
              if ("undefined" != typeof oClientCaps) {
                  var e = oClientCaps.getComponentVersion("{08B0E5C0-4FCB-11CF-AAA5-00401C608500}", "ComponentID");
                  return "" != e && "5,0,5000,0" != e
              }
              return !1
          },
          testUsingMimeTypes: function(t) {
              if (!navigator.mimeTypes) return e("[testUsingMimeTypes()] Browser claims to be Netscape family, but no mimeTypes[] array?"), !1;
              for (var r = 0; r < navigator.mimeTypes.length; ++r) {
                  s = navigator.mimeTypes[r].type;
                  var n = s.match(/^application\/x-java-applet\x3Bversion=(1\.8|1\.7|1\.6|1\.5|1\.4\.2)$/);
                  if (null != n && this.compareVersions(n[1], t)) return !0
              }
              return !1
          },
          testUsingPluginsArray: function(e) {
              if (!navigator.plugins || !navigator.plugins.length) return !1;
              for (var t = navigator.platform.toLowerCase(), r = 0; r < navigator.plugins.length; ++r)
                  if (s = navigator.plugins[r].description, -1 != s.search(/^Java Switchable Plug-in (Cocoa)/)) {
                      if (this.compareVersions("1.5.0", e)) return !0
                  } else if (-1 != s.search(/^Java/) && -1 != t.indexOf("win") && (this.compareVersions("1.5.0", e) || this.compareVersions("1.6.0", e))) return !0;
              return !!this.compareVersions("1.5.0", e)
          },
          IEInstall: function() {
              return location.href = t((null != this.returnPage ? "&returnPage=" + this.returnPage : "") + (null != this.locale ? "&locale=" + this.locale : "") + (null != this.brand ? "&brand=" + this.brand : "")), !1
          },
          done: function(e, t) {},
          FFInstall: function() {
              return location.href = t((null != this.returnPage ? "&returnPage=" + this.returnPage : "") + (null != this.locale ? "&locale=" + this.locale : "") + (null != this.brand ? "&brand=" + this.brand : "") + (null != this.installType ? "&type=" + this.installType : "")), !1
          },
          compareVersions: function(e, t) {
              for (var r = e.split("."), n = t.split("."), o = 0; o < r.length; ++o) r[o] = Number(r[o]);
              for (o = 0; o < n.length; ++o) n[o] = Number(n[o]);
              return 2 == r.length && (r[2] = 0), r[0] > n[0] || !(r[0] < n[0]) && (r[1] > n[1] || !(r[1] < n[1]) && (r[2] > n[2] || !(r[2] < n[2])))
          },
          enableAlerts: function() {
              this.browserName = null, this.debug = !0
          },
          poll: function() {
              this.refresh();
              var e = this.getJREs();
              0 == this.preInstallJREList.length && 0 != e.length && (clearInterval(this.myInterval), null != this.returnPage && (location.href = this.returnPage)), 0 != this.preInstallJREList.length && 0 != e.length && this.preInstallJREList[0] != e[0] && (clearInterval(this.myInterval), null != this.returnPage && (location.href = this.returnPage))
          },
          writePluginTag: function() {
              var e = this.getBrowser();
              "MSIE" == e ? document.write('<object classid="clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA" id="deployJavaPlugin" width="0" height="0"></object>') : "Netscape Family" == e && this.allowPlugin() && this.writeEmbedTag()
          },
          refresh: function() {
              navigator.plugins.refresh(!1), "Netscape Family" == this.getBrowser() && this.allowPlugin() && null == document.getElementById("deployJavaPlugin") && this.writeEmbedTag()
          },
          writeEmbedTag: function() {
              var e = !1;
              if (null != navigator.mimeTypes) {
                  for (var t = 0; t < navigator.mimeTypes.length; t++) navigator.mimeTypes[t].type == this.mimeType && navigator.mimeTypes[t].enabledPlugin && (document.write('<embed id="deployJavaPlugin" type="' + this.mimeType + '" hidden="true" />'), e = !0);
                  if (!e)
                      for (t = 0; t < navigator.mimeTypes.length; t++) navigator.mimeTypes[t].type == this.oldMimeType && navigator.mimeTypes[t].enabledPlugin && document.write('<embed id="deployJavaPlugin" type="' + this.oldMimeType + '" hidden="true" />')
              }
          }
      };
      if (a.writePluginTag(), null == a.locale) {
          if (null == (r = null)) try {
              r = navigator.userLanguage
          } catch (e) {}
          if (null == r) try {
              r = navigator.systemLanguage
          } catch (e) {}
          if (null == r) try {
              r = navigator.language
          } catch (e) {}
          null != r && (r.replace("-", "_"), a.locale = r)
      }
      return a
  }(),
  Detector = function() {
      var e = ["monospace", "sans-serif", "serif"],
          t = document.getElementsByTagName("body")[0],
          r = document.createElement("span");
      r.style.fontSize = "72px", r.innerHTML = "mmmmmmmmmmlli";
      var n, o = {},
          a = {};
      for (n in e) r.style.fontFamily = e[n], t.appendChild(r), o[e[n]] = r.offsetWidth, a[e[n]] = r.offsetHeight, t.removeChild(r);
      this.detect = function(n) {
          var i, s = !1;
          for (i in e) {
              r.style.fontFamily = n + "," + e[i], t.appendChild(r);
              var l = r.offsetWidth != o[e[i]] || r.offsetHeight != a[e[i]];
              t.removeChild(r), s = s || l
          }
          return s
      }
  },
  swfobject = function() {
      function e() {
          if (!I) {
              try {
                  (e = C.getElementsByTagName("body")[0].appendChild(C.createElement("span"))).parentNode.removeChild(e)
              } catch (e) {
                  return
              }
              I = !0;
              for (var e = S.length, t = 0; t < e; t++) S[t]()
          }
      }

      function t(e) {
          I ? e() : S[S.length] = e
      }

      function r(e) {
          if (void 0 !== q.addEventListener) q.addEventListener("load", e, !1);
          else if (void 0 !== C.addEventListener) C.addEventListener("load", e, !1);
          else if (void 0 !== q.attachEvent) p(q, "onload", e);
          else if ("function" == typeof q.onload) {
              var t = q.onload;
              q.onload = function() {
                  t(), e()
              }
          } else q.onload = e
      }

      function n() {
          var e = C.getElementsByTagName("body")[0],
              t = C.createElement("object");
          t.setAttribute("type", "application/x-shockwave-flash");
          var r = e.appendChild(t);
          if (r) {
              var n = 0;
              ! function() {
                  if (void 0 !== r.GetVariable) {
                      var a = r.GetVariable("$version");
                      a && (a = a.split(" ")[1].split(","), N.pv = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)])
                  } else if (10 > n) return n++, void setTimeout(arguments.callee, 10);
                  e.removeChild(t), r = null, o()
              }()
          } else o()
      }

      function o() {
          var e = P.length;
          if (0 < e)
              for (var t = 0; t < e; t++) {
                  var r = P[t].id,
                      n = P[t].callbackFn,
                      o = {
                          success: !1,
                          id: r
                      };
                  if (0 < N.pv[0]) {
                      var c = m(r);
                      if (c)
                          if (!h(P[t].swfVersion) || N.wk && 312 > N.wk)
                              if (P[t].expressInstall && i()) {
                                  (o = {}).data = P[t].expressInstall, o.width = c.getAttribute("width") || "0", o.height = c.getAttribute("height") || "0", c.getAttribute("class") && (o.styleclass = c.getAttribute("class")), c.getAttribute("align") && (o.align = c.getAttribute("align"));
                                  for (var d = {}, u = (c = c.getElementsByTagName("param")).length, p = 0; p < u; p++) "movie" != c[p].getAttribute("name").toLowerCase() && (d[c[p].getAttribute("name")] = c[p].getAttribute("value"));
                                  s(o, d, r, n)
                              } else l(c), n && n(o);
                      else v(r, !0), n && (o.success = !0, o.ref = a(r), n(o))
                  } else v(r, !0), n && ((r = a(r)) && void 0 !== r.SetVariable && (o.success = !0, o.ref = r), n(o))
              }
      }

      function a(e) {
          var t = null;
          return (e = m(e)) && "OBJECT" == e.nodeName && (void 0 !== e.SetVariable ? t = e : (e = e.getElementsByTagName("object")[0]) && (t = e)), t
      }

      function i() {
          return !A && h("6.0.65") && (N.win || N.mac) && !(N.wk && 312 > N.wk)
      }

      function s(e, t, r, n) {
          A = !0, y = n || null, w = {
              success: !1,
              id: r
          };
          var o = m(r);
          o && ("OBJECT" == o.nodeName ? (_ = c(o), b = null) : (_ = o, b = r), e.id = "SWFObjectExprInst", (void 0 === e.width || !/%$/.test(e.width) && 310 > parseInt(e.width, 10)) && (e.width = "310"), (void 0 === e.height || !/%$/.test(e.height) && 137 > parseInt(e.height, 10)) && (e.height = "137"), C.title = C.title.slice(0, 47) + " - Flash Player Installation", n = N.ie && N.win ? "ActiveX" : "PlugIn", n = "MMredirectURL=" + q.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + n + "&MMdoctitle=" + C.title, t.flashvars = void 0 !== t.flashvars ? t.flashvars + "&" + n : n, N.ie && N.win && 4 != o.readyState && (n = C.createElement("div"), r += "SWFObjectNew", n.setAttribute("id", r), o.parentNode.insertBefore(n, o), o.style.display = "none", function() {
              4 == o.readyState ? o.parentNode.removeChild(o) : setTimeout(arguments.callee, 10)
          }()), d(e, t, r))
      }

      function l(e) {
          if (N.ie && N.win && 4 != e.readyState) {
              var t = C.createElement("div");
              e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(c(e), t), e.style.display = "none",
                  function() {
                      4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                  }()
          } else e.parentNode.replaceChild(c(e), e)
      }

      function c(e) {
          var t = C.createElement("div");
          if (N.win && N.ie) t.innerHTML = e.innerHTML;
          else if ((e = e.getElementsByTagName("object")[0]) && (e = e.childNodes))
              for (var r = e.length, n = 0; n < r; n++) 1 == e[n].nodeType && "PARAM" == e[n].nodeName || 8 == e[n].nodeType || t.appendChild(e[n].cloneNode(!0));
          return t
      }

      function d(e, t, r) {
          var n, o = m(r);
          if (N.wk && 312 > N.wk) return n;
          if (o)
              if (void 0 === e.id && (e.id = r), N.ie && N.win) {
                  var a, i = "";
                  for (a in e) e[a] != Object.prototype[a] && ("data" == a.toLowerCase() ? t.movie = e[a] : "styleclass" == a.toLowerCase() ? i += ' class="' + e[a] + '"' : "classid" != a.toLowerCase() && (i += " " + a + '="' + e[a] + '"'));
                  a = "";
                  for (var s in t) t[s] != Object.prototype[s] && (a += '<param name="' + s + '" value="' + t[s] + '" />');
                  o.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + a + "</object>", j[j.length] = e.id, n = m(e.id)
              } else {
                  (s = C.createElement("object")).setAttribute("type", "application/x-shockwave-flash");
                  for (var l in e) e[l] != Object.prototype[l] && ("styleclass" == l.toLowerCase() ? s.setAttribute("class", e[l]) : "classid" != l.toLowerCase() && s.setAttribute(l, e[l]));
                  for (i in t) t[i] != Object.prototype[i] && "movie" != i.toLowerCase() && (e = s, a = i, l = t[i], (r = C.createElement("param")).setAttribute("name", a), r.setAttribute("value", l), e.appendChild(r));
                  o.parentNode.replaceChild(s, o), n = s
              }
          return n
      }

      function u(e) {
          var t = m(e);
          t && "OBJECT" == t.nodeName && (N.ie && N.win ? (t.style.display = "none", function() {
              if (4 == t.readyState) {
                  var r = m(e);
                  if (r) {
                      for (var n in r) "function" == typeof r[n] && (r[n] = null);
                      r.parentNode.removeChild(r)
                  }
              } else setTimeout(arguments.callee, 10)
          }()) : t.parentNode.removeChild(t))
      }

      function m(e) {
          var t = null;
          try {
              t = C.getElementById(e)
          } catch (e) {}
          return t
      }

      function p(e, t, r) {
          e.attachEvent(t, r), E[E.length] = [e, t, r]
      }

      function h(e) {
          var t = N.pv;
          return e = e.split("."), e[0] = parseInt(e[0], 10), e[1] = parseInt(e[1], 10) || 0, e[2] = parseInt(e[2], 10) || 0, t[0] > e[0] || t[0] == e[0] && t[1] > e[1] || t[0] == e[0] && t[1] == e[1] && t[2] >= e[2]
      }

      function f(e, t, r, n) {
          if (!N.ie || !N.mac) {
              var o = C.getElementsByTagName("head")[0];
              o && (r = r && "string" == typeof r ? r : "screen", n && ($ = k = null), k && $ == r || ((n = C.createElement("style")).setAttribute("type", "text/css"), n.setAttribute("media", r), k = o.appendChild(n), N.ie && N.win && void 0 !== C.styleSheets && 0 < C.styleSheets.length && (k = C.styleSheets[C.styleSheets.length - 1]), $ = r), N.ie && N.win ? k && "object" == typeof k.addRule && k.addRule(e, t) : k && void 0 !== C.createTextNode && k.appendChild(C.createTextNode(e + " {" + t + "}")))
          }
      }

      function v(e, t) {
          if (M) {
              var r = t ? "visible" : "hidden";
              I && m(e) ? m(e).style.visibility = r : f("#" + e, "visibility:" + r)
          }
      }

      function g(e) {
          return null != /[\\\"<>\.;]/.exec(e) && "undefined" != typeof encodeURIComponent ? encodeURIComponent(e) : e
      }
      var _, b, y, w, k, $, q = window,
          C = document,
          x = navigator,
          T = !1,
          S = [function() {
              T ? n() : o()
          }],
          P = [],
          j = [],
          E = [],
          I = !1,
          A = !1,
          M = !0,
          N = function() {
              var e = void 0 !== C.getElementById && void 0 !== C.getElementsByTagName && void 0 !== C.createElement,
                  t = x.userAgent.toLowerCase(),
                  r = x.platform.toLowerCase(),
                  n = /win/.test(r ? r : t),
                  r = /mac/.test(r ? r : t),
                  t = !!/webkit/.test(t) && parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
                  o = !1,
                  a = [0, 0, 0],
                  i = null;
              if (void 0 !== x.plugins && "object" == typeof x.plugins["Shockwave Flash"]) !(i = x.plugins["Shockwave Flash"].description) || void 0 !== x.mimeTypes && x.mimeTypes["application/x-shockwave-flash"] && !x.mimeTypes["application/x-shockwave-flash"].enabledPlugin || (T = !0, o = !1, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), a[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), a[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), a[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
              else if (void 0 !== q.ActiveXObject) try {
                  var s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                  s && (i = s.GetVariable("$version")) && (o = !0, i = i.split(" ")[1].split(","), a = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)])
              } catch (e) {}
              return {
                  w3: e,
                  pv: a,
                  wk: t,
                  ie: o,
                  win: n,
                  mac: r
              }
          }();
      return function() {
              N.w3 && ((void 0 !== C.readyState && "complete" == C.readyState || void 0 === C.readyState && (C.getElementsByTagName("body")[0] || C.body)) && e(), I || (void 0 !== C.addEventListener && C.addEventListener("DOMContentLoaded", e, !1), N.ie && N.win && (C.attachEvent("onreadystatechange", function() {
                  "complete" == C.readyState && (C.detachEvent("onreadystatechange", arguments.callee), e())
              }), q == top && function() {
                  if (!I) {
                      try {
                          C.documentElement.doScroll("left")
                      } catch (e) {
                          return void setTimeout(arguments.callee, 0)
                      }
                      e()
                  }
              }()), N.wk && function() {
                  I || (/loaded|complete/.test(C.readyState) ? e() : setTimeout(arguments.callee, 0))
              }(), r(e)))
          }(),
          function() {
              N.ie && N.win && window.attachEvent("onunload", function() {
                  for (var e = E.length, t = 0; t < e; t++) E[t][0].detachEvent(E[t][1], E[t][2]);
                  for (e = j.length, t = 0; t < e; t++) u(j[t]);
                  for (var r in N) N[r] = null;
                  N = null;
                  for (var n in swfobject) swfobject[n] = null;
                  swfobject = null
              })
          }(), {
              registerObject: function(e, t, r, n) {
                  if (N.w3 && e && t) {
                      var o = {};
                      o.id = e, o.swfVersion = t, o.expressInstall = r, o.callbackFn = n, P[P.length] = o, v(e, !1)
                  } else n && n({
                      success: !1,
                      id: e
                  })
              },
              getObjectById: function(e) {
                  if (N.w3) return a(e)
              },
              embedSWF: function(e, r, n, o, a, l, c, u, m, p) {
                  var f = {
                      success: !1,
                      id: r
                  };
                  N.w3 && !(N.wk && 312 > N.wk) && e && r && n && o && a ? (v(r, !1), t(function() {
                      n += "", o += "";
                      var t = {};
                      if (m && "object" == typeof m)
                          for (var g in m) t[g] = m[g];
                      if (t.data = e, t.width = n, t.height = o, g = {}, u && "object" == typeof u)
                          for (var _ in u) g[_] = u[_];
                      if (c && "object" == typeof c)
                          for (var b in c) g.flashvars = void 0 !== g.flashvars ? g.flashvars + "&" + b + "=" + c[b] : b + "=" + c[b];
                      if (h(a)) _ = d(t, g, r), t.id == r && v(r, !0), f.success = !0, f.ref = _;
                      else {
                          if (l && i()) return t.data = l, void s(t, g, r, p);
                          v(r, !0)
                      }
                      p && p(f)
                  })) : p && p(f)
              },
              switchOffAutoHideShow: function() {
                  M = !1
              },
              ua: N,
              getFlashPlayerVersion: function() {
                  return {
                      major: N.pv[0],
                      minor: N.pv[1],
                      release: N.pv[2]
                  }
              },
              hasFlashPlayerVersion: h,
              createSWF: function(e, t, r) {
                  if (N.w3) return d(e, t, r)
              },
              showExpressInstall: function(e, t, r, n) {
                  N.w3 && i() && s(e, t, r, n)
              },
              removeSWF: function(e) {
                  N.w3 && u(e)
              },
              createCSS: function(e, t, r, n) {
                  N.w3 && f(e, t, r, n)
              },
              addDomLoadEvent: t,
              addLoadEvent: r,
              getQueryParamValue: function(e) {
                  if (t = C.location.search || C.location.hash) {
                      if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return g(t);
                      for (var t = t.split("&"), r = 0; r < t.length; r++)
                          if (t[r].substring(0, t[r].indexOf("=")) == e) return g(t[r].substring(t[r].indexOf("=") + 1))
                  }
                  return ""
              },
              expressInstallCallback: function() {
                  if (A) {
                      var e = m("SWFObjectExprInst");
                      e && _ && (e.parentNode.replaceChild(_, e), b && (v(b, !0), N.ie && N.win && (_.style.display = "block")), y && y(w)), A = !1
                  }
              }
          }
  }();
! function(e, t) {
  var r = {
          extend: function(e, t) {
              for (var r in t) - 1 !== "browser cpu device engine os".indexOf(r) && 0 == t[r].length % 2 && (e[r] = t[r].concat(e[r]));
              return e
          },
          has: function(e, t) {
              return "string" == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase())
          },
          lowerize: function(e) {
              return e.toLowerCase()
          },
          major: function(e) {
              return "string" == typeof e ? e.split(".")[0] : t
          }
      },
      n = function() {
          for (var e, r, n, o, a, i, s, l = 0, c = arguments; l < c.length && !i;) {
              var d = c[l],
                  u = c[l + 1];
              if (void 0 === e)
                  for (o in e = {}, u) u.hasOwnProperty(o) && (a = u[o], "object" == typeof a ? e[a[0]] = t : e[a] = t);
              for (r = n = 0; r < d.length && !i;)
                  if (i = d[r++].exec(this.getUA()))
                      for (o = 0; o < u.length; o++) s = i[++n], a = u[o], "object" == typeof a && 0 < a.length ? 2 == a.length ? e[a[0]] = "function" == typeof a[1] ? a[1].call(this, s) : a[1] : 3 == a.length ? e[a[0]] = "function" != typeof a[1] || a[1].exec && a[1].test ? s ? s.replace(a[1], a[2]) : t : s ? a[1].call(this, s, a[2]) : t : 4 == a.length && (e[a[0]] = s ? a[3].call(this, s.replace(a[1], a[2])) : t) : e[a] = s || t;
              l += 2
          }
          return e
      },
      o = function(e, n) {
          for (var o in n)
              if ("object" == typeof n[o] && 0 < n[o].length) {
                  for (var a = 0; a < n[o].length; a++)
                      if (r.has(n[o][a], e)) return "?" === o ? t : o
              } else if (r.has(n[o], e)) return "?" === o ? t : o;
          return e
      },
      a = {
          ME: "4.90",
          "NT 3.11": "NT3.51",
          "NT 4.0": "NT4.0",
          2e3: "NT 5.0",
          XP: ["NT 5.1", "NT 5.2"],
          Vista: "NT 6.0",
          7: "NT 6.1",
          8: "NT 6.2",
          8.1: "NT 6.3",
          10: ["NT 6.4", "NT 10.0"],
          RT: "ARM"
      },
      i = {
          browser: [
              [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
              ["name", "version"],
              [/\s(opr)\/([\w\.]+)/i],
              [
                  ["name", "Opera"], "version"
              ],
              [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs)\/([\w\.-]+)/i],
              ["name", "version"],
              [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
              [
                  ["name", "IE"], "version"
              ],
              [/(edge)\/((\d+)?[\w\.]+)/i],
              ["name", "version"],
              [/(yabrowser)\/([\w\.]+)/i],
              [
                  ["name", "Yandex"], "version"
              ],
              [/(comodo_dragon)\/([\w\.]+)/i],
              [
                  ["name", /_/g, " "], "version"
              ],
              [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(qqbrowser)[\/\s]?([\w\.]+)/i],
              ["name", "version"],
              [/(uc\s?browser)[\/\s]?([\w\.]+)/i, /ucweb.+(ucbrowser)[\/\s]?([\w\.]+)/i, /JUC.+(ucweb)[\/\s]?([\w\.]+)/i],
              [
                  ["name", "UCBrowser"], "version"
              ],
              [/(dolfin)\/([\w\.]+)/i],
              [
                  ["name", "Dolphin"], "version"
              ],
              [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
              [
                  ["name", "Chrome"], "version"
              ],
              [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
              ["version", ["name", "MIUI Browser"]],
              [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
              ["version", ["name", "Android Browser"]],
              [/FBAV\/([\w\.]+);/i],
              ["version", ["name", "Facebook"]],
              [/fxios\/([\w\.-]+)/i],
              ["version", ["name", "Firefox"]],
              [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
              ["version", ["name", "Mobile Safari"]],
              [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
              ["version", "name"],
              [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
              ["name", ["version", o, {
                  "1.0": "/8",
                  1.2: "/1",
                  1.3: "/3",
                  "2.0": "/412",
                  "2.0.2": "/416",
                  "2.0.3": "/417",
                  "2.0.4": "/419",
                  "?": "/"
              }]],
              [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
              ["name", "version"],
              [/(navigator|netscape)\/([\w\.-]+)/i],
              [
                  ["name", "Netscape"], "version"
              ],
              [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
              ["name", "version"]
          ],
          cpu: [
              [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
              [
                  ["architecture", "amd64"]
              ],
              [/(ia32(?=;))/i],
              [
                  ["architecture", r.lowerize]
              ],
              [/((?:i[346]|x)86)[;\)]/i],
              [
                  ["architecture", "ia32"]
              ],
              [/windows\s(ce|mobile);\sppc;/i],
              [
                  ["architecture", "arm"]
              ],
              [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
              [
                  ["architecture", /ower/, "", r.lowerize]
              ],
              [/(sun4\w)[;\)]/i],
              [
                  ["architecture", "sparc"]
              ],
              [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
              [
                  ["architecture", r.lowerize]
              ]
          ],
          device: [
              [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
              ["model", "vendor", ["type", "tablet"]],
              [/applecoremedia\/[\w\.]+ \((ipad)/],
              ["model", ["vendor", "Apple"],
                  ["type", "tablet"]
              ],
              [/(apple\s{0,1}tv)/i],
              [
                  ["model", "Apple TV"],
                  ["vendor", "Apple"]
              ],
              [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
              ["vendor", "model", ["type", "tablet"]],
              [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
              ["model", ["vendor", "Amazon"],
                  ["type", "tablet"]
              ],
              [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
              [
                  ["model", o, {
                      "Fire Phone": ["SD", "KF"]
                  }],
                  ["vendor", "Amazon"],
                  ["type", "mobile"]
              ],
              [/\((ip[honed|\s\w*]+);.+(apple)/i],
              ["model", "vendor", ["type", "mobile"]],
              [/\((ip[honed|\s\w*]+);/i],
              ["model", ["vendor", "Apple"],
                  ["type", "mobile"]
              ],
              [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
              ["vendor", "model", ["type", "mobile"]],
              [/\(bb10;\s(\w+)/i],
              ["model", ["vendor", "BlackBerry"],
                  ["type", "mobile"]
              ],
              [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],
              ["model", ["vendor", "Asus"],
                  ["type", "tablet"]
              ],
              [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
              [
                  ["vendor", "Sony"],
                  ["model", "Xperia Tablet"],
                  ["type", "tablet"]
              ],
              [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
              [
                  ["vendor", "Sony"],
                  ["model", "Xperia Phone"],
                  ["type", "mobile"]
              ],
              [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
              ["vendor", "model", ["type", "console"]],
              [/android.+;\s(shield)\sbuild/i],
              ["model", ["vendor", "Nvidia"],
                  ["type", "console"]
              ],
              [/(playstation\s[34portablevi]+)/i],
              ["model", ["vendor", "Sony"],
                  ["type", "console"]
              ],
              [/(sprint\s(\w+))/i],
              [
                  ["vendor", o, {
                      HTC: "APA",
                      Sprint: "Sprint"
                  }],
                  ["model", o, {
                      "Evo Shift 4G": "7373KT"
                  }],
                  ["type", "mobile"]
              ],
              [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
              ["vendor", "model", ["type", "tablet"]],
              [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],
              ["vendor", ["model", /_/g, " "],
                  ["type", "mobile"]
              ],
              [/(nexus\s9)/i],
              ["model", ["vendor", "HTC"],
                  ["type", "tablet"]
              ],
              [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
              ["model", ["vendor", "Microsoft"],
                  ["type", "console"]
              ],
              [/(kin\.[onetw]{3})/i],
              [
                  ["model", /\./g, " "],
                  ["vendor", "Microsoft"],
                  ["type", "mobile"]
              ],
              [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i, /(nexus\s[6])/i],
              ["model", ["vendor", "Motorola"],
                  ["type", "mobile"]
              ],
              [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
              ["model", ["vendor", "Motorola"],
                  ["type", "tablet"]
              ],
              [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
              [
                  ["vendor", "Samsung"], "model", ["type", "tablet"]
              ],
              [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i],
              [
                  ["vendor", "Samsung"], "model", ["type", "mobile"]
              ],
              [/(samsung);smarttv/i],
              ["vendor", "model", ["type", "smarttv"]],
              [/\(dtv[\);].+(aquos)/i],
              ["model", ["vendor", "Sharp"],
                  ["type", "smarttv"]
              ],
              [/sie-(\w+)*/i],
              ["model", ["vendor", "Siemens"],
                  ["type", "mobile"]
              ],
              [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
              [
                  ["vendor", "Nokia"], "model", ["type", "mobile"]
              ],
              [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
              ["model", ["vendor", "Acer"],
                  ["type", "tablet"]
              ],
              [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
              [
                  ["vendor", "LG"], "model", ["type", "tablet"]
              ],
              [/(lg) netcast\.tv/i],
              ["vendor", "model", ["type", "smarttv"]],
              [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
              ["model", ["vendor", "LG"],
                  ["type", "mobile"]
              ],
              [/android.+(ideatab[a-z0-9\-\s]+)/i],
              ["model", ["vendor", "Lenovo"],
                  ["type", "tablet"]
              ],
              [/linux;.+((jolla));/i],
              ["vendor", "model", ["type", "mobile"]],
              [/((pebble))app\/[\d\.]+\s/i],
              ["vendor", "model", ["type", "wearable"]],
              [/android.+;\s(glass)\s\d/i],
              ["model", ["vendor", "Google"],
                  ["type", "wearable"]
              ],
              [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],
              [
                  ["model", /_/g, " "],
                  ["vendor", "Xiaomi"],
                  ["type", "mobile"]
              ],
              [/\s(tablet)[;\/\s]/i, /\s(mobile)[;\/\s]/i],
              [
                  ["type", r.lowerize], "vendor", "model"
              ]
          ],
          engine: [
              [/windows.+\sedge\/([\w\.]+)/i],
              ["version", ["name", "EdgeHTML"]],
              [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
              ["name", "version"],
              [/rv\:([\w\.]+).*(gecko)/i],
              ["version", "name"]
          ],
          os: [
              [/microsoft\s(windows)\s(vista|xp)/i],
              ["name", "version"],
              [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
              ["name", ["version", o, a]],
              [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
              [
                  ["name", "Windows"],
                  ["version", o, a]
              ],
              [/\((bb)(10);/i],
              [
                  ["name", "BlackBerry"], "version"
              ],
              [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
              ["name", "version"],
              [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
              [
                  ["name", "Symbian"], "version"
              ],
              [/\((series40);/i],
              ["name"],
              [/mozilla.+\(mobile;.+gecko.+firefox/i],
              [
                  ["name", "Firefox OS"], "version"
              ],
              [/(nintendo|playstation)\s([wids34portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
              ["name", "version"],
              [/(cros)\s[\w]+\s([\w\.]+\w)/i],
              [
                  ["name", "Chromium OS"], "version"
              ],
              [/(sunos)\s?([\w\.]+\d)*/i],
              [
                  ["name", "Solaris"], "version"
              ],
              [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
              ["name", "version"],
              [/(ip[honead]+)(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i],
              [
                  ["name", "iOS"],
                  ["version", /_/g, "."]
              ],
              [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
              [
                  ["name", "Mac OS"],
                  ["version", /_/g, "."]
              ],
              [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
              ["name", "version"]
          ]
      },
      s = function(t, o) {
          if (!(this instanceof s)) return new s(t, o).getResult();
          var a = t || (e && e.navigator && e.navigator.userAgent ? e.navigator.userAgent : ""),
              l = o ? r.extend(i, o) : i;
          return this.getBrowser = function() {
              var e = n.apply(this, l.browser);
              return e.major = r.major(e.version), e
          }, this.getCPU = function() {
              return n.apply(this, l.cpu)
          }, this.getDevice = function() {
              return n.apply(this, l.device)
          }, this.getEngine = function() {
              return n.apply(this, l.engine)
          }, this.getOS = function() {
              return n.apply(this, l.os)
          }, this.getResult = function() {
              return {
                  ua: this.getUA(),
                  browser: this.getBrowser(),
                  engine: this.getEngine(),
                  os: this.getOS(),
                  device: this.getDevice(),
                  cpu: this.getCPU()
              }
          }, this.getUA = function() {
              return a
          }, this.setUA = function(e) {
              return a = e, this
          }, this.setUA(a), this
      };
  s.VERSION = "0.7.10", s.BROWSER = {
      NAME: "name",
      MAJOR: "major",
      VERSION: "version"
  }, s.CPU = {
      ARCHITECTURE: "architecture"
  }, s.DEVICE = {
      MODEL: "model",
      VENDOR: "vendor",
      TYPE: "type",
      CONSOLE: "console",
      MOBILE: "mobile",
      SMARTTV: "smarttv",
      TABLET: "tablet",
      WEARABLE: "wearable",
      EMBEDDED: "embedded"
  }, s.ENGINE = {
      NAME: "name",
      VERSION: "version"
  }, s.OS = {
      NAME: "name",
      VERSION: "version"
  }, "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = s), exports.UAParser = s) : "function" == typeof define && define.amd ? define(function() {
      return s
  }) : e.UAParser = s;
  var l = e.jQuery || e.Zepto;
  if (void 0 !== l) {
      var c = new s;
      l.ua = c.getResult(), l.ua.get = function() {
          return c.getUA()
      }, l.ua.set = function(e) {
          c.setUA(e), e = c.getResult();
          for (var t in e) l.ua[t] = e[t]
      }
  }
}("object" == typeof window ? window : this);
var RespTabs = {};
! function(e) {
  "use strict";
  e.fn.responsiveTabs = function() {
      return this.each(function() {
          Object.create(RespTabs).init(this)
      })
  }
}(jQuery), RespTabs.init = function(e) {
      var t = $(e).children();
      $headers = t.children(":header"), $contents = t.children("div"), $headers.addClass("resp-headings"), $contents.addClass("resp-contents");
      var r = $('[resp-tab="default"]');
      r.length || (r = t.first()), r.children("div").addClass("resp-content__active").attr("aria-hidden", "false"), $contents.not(".resp-content__active").hide().attr("aria-hidden", "true"), r.children(":header").addClass("resp-heading__active");
      var n = $("<ul></ul>", {
              class: "resp-tablist"
          }),
          o = $("<select></select>", {
              class: "resp-tabDrop"
          }),
          a = 1;
      $headers.each(function() {
          var e = $(this),
              r = $(this).next(),
              i = $("<option></option>", {
                  class: "resp-tabDropOption",
                  id: "tabOption" + a,
                  text: e.text()
              }),
              s = $("<li></li>", {
                  class: "resp-tablistItem",
                  id: "tablistItem" + a,
                  text: e.text(),
                  click: function() {
                      t.find(".resp-content__active").toggle().removeClass("resp-content__active").attr("aria-hidden", "true").prev().removeClass("resp-heading__active"), r.toggle().addClass("resp-content__active").attr("aria-hidden", "false"), e.addClass("resp-heading__active"), n.find(".resp-tablistItem__active").removeClass("resp-tablistItem__active"), s.addClass("resp-tablistItem__active"), $(".resp-tabDropOption").removeAttr("selected"), $(".resp-tabDropOption").eq($(".resp-tablistItem__active").index()).attr("selected", "selected")
                  }
              });
          r.hasClass("resp-content__active") && s.addClass("resp-tablistItem__active"), n.append(s), o.append(i), o.change(function() {
              t.find(".resp-content__active").toggle().removeClass("resp-content__active").attr("aria-hidden", "true").prev().removeClass("resp-heading__active"), $(".resp-contents").eq($(".resp-tabDrop :selected").index()).toggle().addClass("resp-content__active").attr("aria-hidden", "false"), $(".resp-headings").eq($(".resp-tabDrop :selected").index()).addClass("resp-heading__active"), $(".resp-tablistItem").removeClass("resp-tablistItem__active"), $(".resp-tablistItem").eq($(".resp-tabDrop :selected").index()).addClass("resp-tablistItem__active")
          }), a++
      }), $(document).ready(function() {
          $(".resp-tabDropOption").eq(r.index()).attr("selected", "selected")
      }), t.parent().before(n), t.parent().before(o)
  },
  function() {
      var e, t, r, n, o, a, i, s, l, c, d, u, m, p, h, f, v, g, _, b, y, w, k, $, q = [].slice,
          C = [].indexOf || function(e) {
              for (var t = 0, r = this.length; r > t; t++)
                  if (t in this && this[t] === e) return t;
              return -1
          };
      (e = window.jQuery || window.Zepto || window.$).payment = {}, e.payment.fn = {}, e.fn.payment = function() {
          var t, r;
          return r = arguments[0], t = 2 <= arguments.length ? q.call(arguments, 1) : [], e.payment.fn[r].apply(this, t)
      }, o = /(\d{1,4})/g, e.payment.cards = n = [{
          type: "visaelectron",
          patterns: [4026, 417500, 4405, 4508, 4844, 4913, 4917],
          format: o,
          length: [16],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "maestro",
          patterns: [5018, 502, 503, 56, 58, 639, 6220, 67],
          format: o,
          length: [12, 13, 14, 15, 16, 17, 18, 19],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "forbrugsforeningen",
          patterns: [600],
          format: o,
          length: [16],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "dankort",
          patterns: [5019],
          format: o,
          length: [16],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "visa",
          patterns: [4],
          format: o,
          length: [13, 16],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "mastercard",
          patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
          format: o,
          length: [16],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "amex",
          patterns: [34, 37],
          format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
          length: [15],
          cvcLength: [3, 4],
          luhn: !0
      }, {
          type: "dinersclub",
          patterns: [30, 36, 38, 39],
          format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
          length: [14],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "discover",
          patterns: [60, 64, 65, 622],
          format: o,
          length: [16],
          cvcLength: [3],
          luhn: !0
      }, {
          type: "unionpay",
          patterns: [62, 88],
          format: o,
          length: [16, 17, 18, 19],
          cvcLength: [3],
          luhn: !1
      }, {
          type: "jcb",
          patterns: [35],
          format: o,
          length: [16],
          cvcLength: [3],
          luhn: !0
      }], t = function(e) {
          var t, r, o, a, i, s, l, c;
          for (e = (e + "").replace(/\D/g, ""), a = 0, s = n.length; s > a; a++)
              for (t = n[a], c = t.patterns, i = 0, l = c.length; l > i; i++)
                  if (o = c[i], r = o + "", e.substr(0, r.length) === r) return t
      }, r = function(e) {
          var t, r, o;
          for (r = 0, o = n.length; o > r; r++)
              if ((t = n[r]).type === e) return t
      }, m = function(e) {
          var t, r, n, o, a, i;
          for (n = !0, o = 0, a = 0, i = (r = (e + "").split("").reverse()).length; i > a; a++) t = r[a], t = parseInt(t, 10), (n = !n) && (t *= 2), t > 9 && (t -= 9), o += t;
          return o % 10 == 0
      }, u = function(e) {
          var t;
          return null != e.prop("selectionStart") && e.prop("selectionStart") !== e.prop("selectionEnd") || !(null == ("undefined" != typeof document && null !== document && null != (t = document.selection) ? t.createRange : void 0) || !document.selection.createRange().text)
      }, k = function(e, t) {
          var r, n;
          try {
              r = t.prop("selectionStart")
          } catch (e) {
              e,
              r = null
          }
          return n = t.val(), t.val(e), null !== r && t.is(":focus") ? (r === n.length && (r = e.length), t.prop("selectionStart", r), t.prop("selectionEnd", r)) : void 0
      }, g = function(e) {
          var t, r, n, o, a, i, s, l;
          for (null == e && (e = ""), n = "ï¼ï¼‘ï¼’ï¼“ï¼”ï¼•ï¼–ï¼—ï¼˜ï¼™", o = "0123456789", i = "", s = 0, l = (t = e.split("")).length; l > s; s++) r = t[s], (a = n.indexOf(r)) > -1 && (r = o[a]), i += r;
          return i
      }, v = function(t) {
          return setTimeout(function() {
              var r, n;
              return r = e(t.currentTarget), n = r.val(), n = g(n), n = n.replace(/\D/g, ""), k(n, r)
          })
      }, h = function(t) {
          return setTimeout(function() {
              var r, n;
              return r = e(t.currentTarget), n = r.val(), n = g(n), n = e.payment.formatCardNumber(n), k(n, r)
          })
      }, s = function(r) {
          var n, o, a, i, s, l, c;
          return a = String.fromCharCode(r.which), !/^\d+$/.test(a) || (n = e(r.currentTarget), c = n.val(), o = t(c + a), i = (c.replace(/\D/g, "") + a).length, l = 16, o && (l = o.length[o.length.length - 1]), i >= l || null != n.prop("selectionStart") && n.prop("selectionStart") !== c.length) ? void 0 : (s = o && "amex" === o.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/, s.test(c) ? (r.preventDefault(), setTimeout(function() {
              return n.val(c + " " + a)
          })) : s.test(c + a) ? (r.preventDefault(), setTimeout(function() {
              return n.val(c + a + " ")
          })) : void 0)
      }, a = function(t) {
          var r, n;
          return r = e(t.currentTarget), n = r.val(), 8 !== t.which || null != r.prop("selectionStart") && r.prop("selectionStart") !== n.length ? void 0 : /\d\s$/.test(n) ? (t.preventDefault(), setTimeout(function() {
              return r.val(n.replace(/\d\s$/, ""))
          })) : /\s\d?$/.test(n) ? (t.preventDefault(), setTimeout(function() {
              return r.val(n.replace(/\d$/, ""))
          })) : void 0
      }, f = function(t) {
          return setTimeout(function() {
              var r, n;
              return r = e(t.currentTarget), n = r.val(), n = g(n), n = e.payment.formatExpiry(n), k(n, r)
          })
      }, l = function(t) {
          var r, n, o;
          return n = String.fromCharCode(t.which), /^\d+$/.test(n) ? (r = e(t.currentTarget), o = r.val() + n, /^\d$/.test(o) && "0" !== o && "1" !== o ? (t.preventDefault(), setTimeout(function() {
              return r.val("0" + o + " / ")
          })) : /^\d\d$/.test(o) ? (t.preventDefault(), setTimeout(function() {
              var e, t;
              return e = parseInt(o[0], 10), t = parseInt(o[1], 10), t > 2 && 0 !== e ? r.val("0" + e + " / " + t) : r.val(o + " / ")
          })) : void 0) : void 0
      }, c = function(t) {
          var r, n, o;
          return n = String.fromCharCode(t.which), /^\d+$/.test(n) ? (r = e(t.currentTarget), o = r.val(), /^\d\d$/.test(o) ? r.val(o + " / ") : void 0) : void 0
      }, d = function(t) {
          var r, n, o;
          return o = String.fromCharCode(t.which), "/" === o || " " === o ? (r = e(t.currentTarget), n = r.val(), /^\d$/.test(n) && "0" !== n ? r.val("0" + n + " / ") : void 0) : void 0
      }, i = function(t) {
          var r, n;
          return r = e(t.currentTarget), n = r.val(), 8 !== t.which || null != r.prop("selectionStart") && r.prop("selectionStart") !== n.length ? void 0 : /\d\s\/\s$/.test(n) ? (t.preventDefault(), setTimeout(function() {
              return r.val(n.replace(/\d\s\/\s$/, ""))
          })) : void 0
      }, p = function(t) {
          return setTimeout(function() {
              var r, n;
              return r = e(t.currentTarget), n = r.val(), n = g(n), n = n.replace(/\D/g, "").slice(0, 4), k(n, r)
          })
      }, w = function(e) {
          var t;
          return !(!e.metaKey && !e.ctrlKey) || 32 !== e.which && (0 === e.which || (e.which < 33 || (t = String.fromCharCode(e.which), !!/[\d\s]/.test(t))))
      }, b = function(r) {
          var n, o, a, i;
          return n = e(r.currentTarget), a = String.fromCharCode(r.which), /^\d+$/.test(a) && !u(n) ? (i = (n.val() + a).replace(/\D/g, ""), o = t(i), o ? i.length <= o.length[o.length.length - 1] : i.length <= 16) : void 0
      }, y = function(t) {
          var r, n, o;
          return r = e(t.currentTarget), n = String.fromCharCode(t.which), /^\d+$/.test(n) && !u(r) ? (o = r.val() + n, !((o = o.replace(/\D/g, "")).length > 6) && void 0) : void 0
      }, _ = function(t) {
          var r, n;
          return r = e(t.currentTarget), n = String.fromCharCode(t.which), /^\d+$/.test(n) && !u(r) ? (r.val() + n).length <= 4 : void 0
      }, $ = function(t) {
          var r, o, a, i, s;
          return r = e(t.currentTarget), s = r.val(), i = e.payment.cardType(s) || "unknown", r.hasClass(i) ? void 0 : (o = function() {
              var e, t, r;
              for (r = [], e = 0, t = n.length; t > e; e++) a = n[e], r.push(a.type);
              return r
          }(), r.removeClass("unknown"), r.removeClass(o.join(" ")), r.addClass(i), r.toggleClass("identified", "unknown" !== i), r.trigger("payment.cardType", i))
      }, e.payment.fn.formatCardCVC = function() {
          return this.on("keypress", w), this.on("keypress", _), this.on("paste", p), this.on("change", p), this.on("input", p), this
      }, e.payment.fn.formatCardExpiry = function() {
          return this.on("keypress", w), this.on("keypress", y), this.on("keypress", l), this.on("keypress", d), this.on("keypress", c), this.on("keydown", i), this.on("change", f), this.on("input", f), this
      }, e.payment.fn.formatCardNumber = function() {
          return this.on("keypress", w), this.on("keypress", b), this.on("keypress", s), this.on("keydown", a), this.on("keyup", $), this.on("paste", h), this.on("change", h), this.on("input", h), this.on("input", $), this
      }, e.payment.fn.restrictNumeric = function() {
          return this.on("keypress", w), this.on("paste", v), this.on("change", v), this.on("input", v), this
      }, e.payment.fn.cardExpiryVal = function() {
          return e.payment.cardExpiryVal(e(this).val())
      }, e.payment.cardExpiryVal = function(e) {
          var t, r, n, o;
          return o = e.split(/[\s\/]+/, 2), t = o[0], n = o[1], 2 === (null != n ? n.length : void 0) && /^\d+$/.test(n) && (r = (new Date).getFullYear(), r = r.toString().slice(0, 2), n = r + n), t = parseInt(t, 10), n = parseInt(n, 10), {
              month: t,
              year: n
          }
      }, e.payment.validateCardNumber = function(e) {
          var r, n;
          return e = (e + "").replace(/\s+|-/g, ""), !!/^\d+$/.test(e) && (!!(r = t(e)) && (n = e.length, C.call(r.length, n) >= 0 && (!1 === r.luhn || m(e))))
      }, e.payment.validateCardExpiry = function(t, r) {
          var n, o, a;
          return "object" == typeof t && "month" in t && (a = t, t = a.month, r = a.year), !(!t || !r) && (t = e.trim(t), r = e.trim(r), !!(/^\d+$/.test(t) && /^\d+$/.test(r) && t >= 1 && 12 >= t) && (2 === r.length && (r = 70 > r ? "20" + r : "19" + r), 4 === r.length && (o = new Date(r, t), n = new Date, o.setMonth(o.getMonth() - 1), o.setMonth(o.getMonth() + 1, 1), o > n)))
      }, e.payment.validateCardCVC = function(t, n) {
          var o, a;
          return t = e.trim(t), !!/^\d+$/.test(t) && (o = r(n), null != o ? (a = t.length, C.call(o.cvcLength, a) >= 0) : t.length >= 3 && t.length <= 4)
      }, e.payment.cardType = function(e) {
          var r;
          return e ? (null != (r = t(e)) ? r.type : void 0) || null : null
      }, e.payment.formatCardNumber = function(r) {
          var n, o, a, i;
          return r = r.replace(/\D/g, ""), (n = t(r)) ? (a = n.length[n.length.length - 1], r = r.slice(0, a), n.format.global ? null != (i = r.match(n.format)) ? i.join(" - ") : void 0 : (o = n.format.exec(r), null != o ? (o.shift(), (o = e.grep(o, function(e) {
              return e
          })).join(" - ")) : void 0)) : r
      }, e.payment.formatExpiry = function(e) {
          var t, r, n, o;
          return (r = e.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/)) ? (t = r[1] || "", n = r[2] || "", o = r[3] || "", o.length > 0 ? n = " / " : " /" === n ? (t = t.substring(0, 1), n = "") : 2 === t.length || n.length > 0 ? n = " / " : 1 === t.length && "0" !== t && "1" !== t && (t = "0" + t, n = " / "), t + n + o) : ""
      }
  }.call(this);