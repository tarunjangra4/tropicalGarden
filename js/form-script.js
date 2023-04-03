jQuery(
  (function ($) {
    "use strict";

    $(".bookSiteVisitForm").on("submit", function () {
      // alert('dsgfhdg');
      $(".bookingStatus").html(
        '<div class="alert alert-warning"><strong>We are Submitting your Details...</strong></div>',
      );
      var form = $(this);

      function fail_func(response) {
        $(".bookingStatus").html(
          '<div class="alert alert-success"><strong>Thank you for Submitting your Details. Our team will get in touch with you shortly.</strong></div>',
        );
        setTimeout(function () {
          $(".bookSiteVisitForm").trigger("reset");
        }, 3000);
        setTimeout(function () {
          $(".bookingStatus").fadeOut();
          location.reload();
        }, 4000);
      }

      function done_func(data) {
        $(".bookingStatus").html(
          '<div class="alert alert-danger"><strong>Error while Submitting your Details!</strong></div>',
        );
        setTimeout(function () {
          $(".bookSiteVisitForm").trigger("reset");
        }, 3000);
        setTimeout(function () {
          $(".bookingStatus").fadeOut();
          location.reload();
        }, 4000);
      }

      let [name, email, phone] = form.serializeArray();
      let body = {},
        utm_source,
        utm_campaign,
        utm_content,
        utm_medium,
        utm_terms;

      let emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (
        email?.value &&
        email?.value?.match(emailRegex) &&
        name?.value &&
        phone?.value
      ) {
        let url = window.location.href;
        let searchParams = new URLSearchParams(new URL(url).search);

        utm_source = searchParams.get("utm_source");
        utm_campaign = searchParams.get("utm_campaign");
        utm_medium = searchParams.get("utm_medium");
        utm_content = searchParams.get("utm_content");
        utm_terms = searchParams.get("utm_terms");

        const check =
          utm_campaign || utm_source || utm_content || utm_medium || utm_terms;

        let metaData = {
          utm_campaign: utm_campaign,
          utm_content: utm_content,
          utm_medium: utm_medium,
          utm_source: utm_source,
          utm_terms: utm_terms,
        };

        body = {
          phone: phone?.value,
          name: name?.value,
          projectId: 24,
          ...(utm_campaign != null && { campaignCode: utm_campaign }),
          email: email?.value,
          ...(check && {
            metaData: {
              utm_campaign: utm_campaign,
              utm_content: utm_content,
              utm_medium: utm_medium,
              utm_source: utm_source,
              utm_terms: utm_terms,
            },
          }),
        };
      }

      $.ajax({
        url: "https://api-dcrm.fincity.com/open/opportunity",
        method: form.attr("method"),
        data: JSON.stringify(body),
        contentType: "application/json",
      })
        .done(fail_func)
        .fail(done_func);
      return false;
    });

    $(".downloadBFPForm").on("submit", function () {
      $(".downloadBFPStatus").fadeIn();
      $(".downloadBFPStatus").html(
        '<div class="alert alert-warning"><strong>We are Submitting your Details...</strong></div>',
      );
      var form = $(this);

      function fail_func(response) {
        $(".downloadBFPStatus").fadeIn();
        $(".downloadBFPStatus").html(
          '<div class="alert alert-success"><strong>Thank you for Submitting your Details. Your Brochure & Floor Plan are ready to Download</strong></div>',
        );
        setTimeout(function () {
          $(".downloadBFPForm").trigger("reset");
        }, 4000);
        setTimeout(function () {
          $(".downloadBFPStatus").fadeOut();
          location.reload();
          $("#downloadBFP").addClass("d-none");
          $("#downloadBFPSuccess").removeClass("d-none");
          $("#DownloadFormModalTitle").html("files are ready to download");
        }, 5000);
      }

      function done_func(data) {
        $(".downloadBFPStatus").html(
          '<div class="alert alert-danger"><strong>Error while Submitting your Details!</strong></div>',
        );
        setTimeout(function () {
          $(".downloadBFPForm").trigger("reset");
        }, 3000);
        setTimeout(function () {
          $(".downloadBFPStatus").fadeOut();
          location.reload();
        }, 4000);
      }
      let [name, email, phone] = form.serializeArray();
      let body = {},
        utm_source,
        utm_campaign,
        utm_content,
        utm_medium,
        utm_terms;

      let emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (
        email?.value &&
        email?.value?.match(emailRegex) &&
        name?.value &&
        phone?.value
      ) {
        let url = window.location.href;
        let searchParams = new URLSearchParams(new URL(url).search);

        utm_source = searchParams.get("utm_source");
        utm_campaign = searchParams.get("utm_campaign");
        utm_medium = searchParams.get("utm_medium");
        utm_content = searchParams.get("utm_content");
        utm_terms = searchParams.get("utm_terms");

        const check =
          utm_campaign || utm_source || utm_content || utm_medium || utm_terms;

        let metaData = {
          utm_campaign: utm_campaign,
          utm_content: utm_content,
          utm_medium: utm_medium,
          utm_source: utm_source,
          utm_terms: utm_terms,
        };

        body = {
          phone: phone?.value,
          name: name?.value,
          projectId: 24,
          ...(utm_campaign != null && { campaignCode: utm_campaign }),
          email: email?.value,
          ...(check && {
            metaData: {
              utm_campaign: utm_campaign,
              utm_content: utm_content,
              utm_medium: utm_medium,
              utm_source: utm_source,
              utm_terms: utm_terms,
            },
          }),
        };
      }
      $.ajax({
        url: "https://api-dcrm.fincity.com/open/opportunity",
        method: "POST",
        data: JSON.stringify(body),
        contentType: "application/json",
      })
        .done(fail_func)
        .fail(done_func);
      return false;
    });
  })(jQuery),
);
