(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {
  load: function load(userInfo, apiKey, integrations) {
    var analytics = this.setup(apiKey);

    analytics.identify(userInfo.user_id, {
      email: userInfo.email,
      username: userInfo.username,
      "package": userInfo.pkg
    }, { integrations: integrations });

    // always track initial page visit
    analytics.page(undefined, undefined, undefined, { integrations: integrations });

    analytics.ready(function () {
      if (!window._weq) return; // make sure webengage is enabled

      // http://docs.webengage.com/sdks/web/older_v4_docs/readme.html
      window._weq["webengage.onReady"] = function () {
        window._weq["webengage.customData"] = {
          user_id: userInfo.user_id,
          "package": userInfo.pkg
        };
      };
    });
  },

  // from https://segment.com/docs/libraries/analytics.js/quickstart/#step-1-copy-the-snippet
  //
  // segment.io's analytics library works best when the `analytics` object
  // is treated as a global object (i.e. `window.analytics`). Therefore,
  // this library won't return anything. It just sets up the global object.
  setup: function setup(apiKey) {
    // Create a queue, but don't obliterate an existing one!
    var analytics = window.analytics = window.analytics || [];

    // If the real analytics.js is already on the page return.
    if (analytics.initialize) {
      return;
    } // If the snippet was invoked already show an error.
    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error("Segment snippet included twice.");
      }
      return;
    }

    // Invoked flag, to make sure the snippet
    // is never invoked twice.
    analytics.invoked = true;

    // A list of the methods in Analytics.js to stub.
    analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "group", "track", "ready", "alias", "page", "once", "off", "on"];

    // Define a factory to create stubs. These are placeholders
    // for methods in Analytics.js so that you never have to wait
    // for it to load to actually record data. The `method` is
    // stored as the first argument, so we can replay the data.
    analytics.factory = function (method) {
      return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        analytics.push(args);
        return analytics;
      };
    };

    // For each of our methods, generate a queueing stub.
    for (var i = 0; i < analytics.methods.length; i++) {
      var key = analytics.methods[i];
      analytics[key] = analytics.factory(key);
    }

    // Define a method to load Analytics.js from our CDN
    analytics.load = function (key) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = script.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";

      // Insert our script next to the first script element.
      var first = document.getElementsByTagName("script")[0];
      first.parentNode.insertBefore(script, first);
    };

    // Add a version to keep track of what's in the wild.
    analytics.SNIPPET_VERSION = "3.0.1";

    // Load Analytics.js with correct key for environment
    analytics.load(apiKey);

    return analytics;
  }
};

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

module.exports = (function () {
  function Banner(selector, makoHost) {
    _classCallCheck(this, Banner);

    this.selector = selector;
    this.makoHost = makoHost;

    this.billingLink = "" + this.makoHost + "/settings/billing";
    this.guideLink = "" + this.makoHost + "/guide";
  }

  _createClass(Banner, {
    showAwsDeactivated: {
      value: function showAwsDeactivated() {
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      <strong>Your account has been deactivated.</strong>\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Reactivate</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showComplianceSuspended: {
      value: function showComplianceSuspended() {
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      <strong>Your account has been suspended.</strong>\n      Please contact Support to regain access.\n      <a href=\"https://support.sendgrid.com\" target=\"_blank\" class=\"btn btn-small btn-primary\">Contact Support</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showComplianceBillingTerminated: {
      value: function showComplianceBillingTerminated() {
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      <strong>Your account was terminated due to unpaid invoices.</strong>\n      Please contact us to re-enable your account.\n      <a href=\"mailto:billing@sendgrid.com\" class=\"btn btn-small btn-primary\">Contact Us</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showComplianceBillingWarned: {
      value: function showComplianceBillingWarned() {
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      <strong>You have unpaid invoices.</strong>\n      Please update your payment details or retry payment.\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Update</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showComplianceBillingFrozen: {
      value: function showComplianceBillingFrozen() {
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      <strong>Your account was frozen due to unpaid invoices.</strong>\n      Please update your payment details or retry payment.\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Update</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showVerificationStart: {
      value: function showVerificationStart() {
        var html = "<div class=\"alert alert-verification\"><p>\n      Unverified accounts are limited to 100 emails per day.\n      Verify your account to send more.\n      <a href=\"" + this.guideLink + "\" class=\"sonar-pinging btn btn-small btn-primary\">Verify My Account</a>\n    </p></div>";
        $(this.selector).prepend(html);
        $(this.selector).find(".sonar-pinging").hover(function () {
          $(this).removeClass("sonar-pinging");
        });
      }
    },
    showVerificationContinue: {
      value: function showVerificationContinue(params) {
        var s2sState = params.s2s_state;
        var stepText = undefined,
            stepLink = undefined;

        if (s2sState.email_required && !s2sState.email_complete) {
          stepText = "Confirm Your Email Address";
          stepLink = "" + this.guideLink + "?step=email";
        } else if (s2sState.mfa_required && !s2sState.mfa_complete) {
          stepText = "Add Two-Factor Authentication";
          stepLink = "" + this.guideLink + "?step=mfa";
        } else if (s2sState.whitelabel_required && !s2sState.whitelabel_complete) {
          stepText = "Add a Domain Whitelabel";
          stepLink = "" + this.guideLink + "?step=whitelabel";
        } else {
          console.error("Called showVerificationStart with invalid params:", params);
          return;
        }

        var html = "<div class=\"alert alert-verification\">\n      <p class=\"step\">Verify your account</p>\n      <p><a href=\"" + stepLink + "\">Next: " + stepText + "</a></p>\n      <p class=\"all-steps\"><a href=\"" + this.guideLink + "\">View all steps</a></p>\n    </div>";
        $(this.selector).prepend(html);
      }
    },
    showOverlimitUpgrade: {
      value: function showOverlimitUpgrade(params) {
        var is_cutoff_trial = arguments[1] === undefined ? false : arguments[1];

        var credits = params.credits;
        var creditsTotal = credits.total.toLocaleString();
        var frequency = credits.reset_frequency.toLocaleString();
        var text = {
          "default": "<strong>You have used all " + creditsTotal + " " + frequency + " emails.</strong>\n                Upgrade to send more.",
          cutoff: "<strong>You have used all 40,000 monthly emails.</strong> Upgrade to send more."
        };
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      " + (is_cutoff_trial ? text.cutoff : text["default"]) + "\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Upgrade</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showOverlimitVerify: {
      value: function showOverlimitVerify(params) {
        var is_cutoff_trial = arguments[1] === undefined ? false : arguments[1];

        var credits = params.credits;
        var creditsTotal = credits.total.toLocaleString();
        var frequency = credits.reset_frequency.toLocaleString();
        var text = {
          "default": "<strong>You have used all " + creditsTotal + " " + frequency + " emails.</strong>\n                Verify your account to send more.",
          cutoff: "<strong>You have used all 100 daily emails.</strong>\n                Verify your account to send more." };

        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      " + (is_cutoff_trial ? text.cutoff : text["default"]) + "\n      <a href=\"" + this.guideLink + "\" class=\"btn btn-small btn-primary\">Verify Account</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showPassiveTrialExpired: {
      value: function showPassiveTrialExpired() {
        var is_cutoff_trial = arguments[0] === undefined ? false : arguments[0];

        var text = {
          "default": "You may still send up to 100 emails per day for testing purposes.",
          cutoff: "You will need to upgrade to send email."
        };
        var html = "<div class=\"alert alert-trial\"><p>\n      <i class=\"sg-icon sg-icon-clock\"></i>\n      <strong>Your trial expired.</strong>\n      " + (is_cutoff_trial ? text.cutoff : text["default"]) + "\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Upgrade</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showAggressiveTrialExpired: {
      value: function showAggressiveTrialExpired() {
        var is_cutoff_trial = arguments[0] === undefined ? false : arguments[0];

        var text = {
          "default": "<strong>Your trial expired.</strong>\n      You may still send up to 100 emails per day for testing purposes.",
          cutoff: "<strong>Your trial expired.</strong>\n      You will need to upgrade to send email."
        };
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      " + (is_cutoff_trial ? text.cutoff : text["default"]) + "\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Upgrade</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    },
    showTrialExpiring: {
      value: function showTrialExpiring(params) {
        var is_cutoff_trial = arguments[1] === undefined ? false : arguments[1];

        var daysRemaining = params.days_remaining;
        var expireInString = undefined;
        if (daysRemaining === 1) {
          expireInString = "1 day";
        } else {
          expireInString = "" + daysRemaining + " days";
        }
        var text = {
          "default": "After that, you may only send up to 100 emails per day for testing purposes.",
          cutoff: "After that, you will need to upgrade to send email."
        };
        var html = "<div class=\"alert alert-danger\"><p>\n      <i class=\"sg-icon sg-icon-warning\"></i>\n      <strong>Your trial will expire in " + expireInString + ".</strong>\n      " + (is_cutoff_trial ? text.cutoff : text["default"]) + "\n      <a href=\"" + this.billingLink + "\" class=\"btn btn-small btn-primary\">Upgrade</a>\n    </p></div>";
        $(this.selector).prepend(html);
      }
    }
  });

  return Banner;
})();

},{}],3:[function(require,module,exports){
"use strict";

var Tiara = require("../tiara");

Tiara.run({
  api_key: "PxxE6QRKENlnTEG9w75maGwrGs8z3Ug1", // https://segment.com/sendgrid/mako-front-end
  labs_url: "https://labs.sendgrid.com"
});

},{"../tiara":10}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Analytics = require("./analytics");
var Templates = require("./templates");

module.exports = (function () {
  function DeferredHandlers(defs, helpers, banner, revealAllLinks) {
    _classCallCheck(this, DeferredHandlers);

    this.defs = defs;
    this.helpers = helpers;
    this.banner = banner;
    this.revealAllLinks = revealAllLinks;
    this.preventImpersonation = false;
  }

  _createClass(DeferredHandlers, {
    preventImpersonationIfNecessary: {
      value: function preventImpersonationIfNecessary() {
        var _this = this;

        $.when(this.defs.scopes).done(function (data) {
          if (!data.scopes.includes("teammates.create")) {
            _this.preventImpersonation = true;
            $("[data-account-toggle-submenu]").hide();
          }
        });
      }
    },
    revealPagesViaFeatureTogglesAndScopes: {
      value: function revealPagesViaFeatureTogglesAndScopes() {
        var _this = this;

        // In case the scopes request fails, isolate the logic that needs both scope and feature toggles down here -
        // the above callback should still run if the scopes request fails.
        $.when(this.defs.feature_toggles, this.defs.scopes).done(function (featureToggles, scopes) {
          featureToggles = featureToggles[0];
          scopes = scopes[0].scopes;

          if (!_this.revealAllLinks) {
            // reveal links by feature toggles
            _this.helpers.revealLinksViaFeatureToggles(featureToggles);

            // reveal links by scopes
            _this.helpers.revealLinksViaScopes(scopes);
          }

          if (_this.helpers.hasScope("^marketing_campaigns\\.create$", scopes)) {
            $("[role=nlvx]").parent().addBack().show();
          }
        }).fail(function () {
          console.error("NO FEATURE TOGGLES OR NO SCOPES");
        });
      }
    },
    revealPagesViaAccount: {
      value: function revealPagesViaAccount() {
        var _this = this;

        $.when(this.defs.account).done(function (account) {
          var $link = $("[data-tiara-nav] [data-subuser-restricted=true]");
          if (!_this.revealAllLinks) {
            if (account.type !== "subuser") {
              // show whitelabel ips and subuser management
              $link.removeClass(Templates.subuserHiddenClass);
            } else {
              $link.addClass(Templates.subuserHiddenClass);
            }
          }
        }).fail(function () {
          console.error("NO ACCOUNT");
        });
      }
    },
    renderPages: {

      // After toggles and scopes have been fetched, show the markup.
      // Note: We're not waiting on defs.ips, since it's an unusually lengthy call

      value: function renderPages() {
        var _this = this;

        return $.when(this.defs.feature_toggles, this.defs.scopes).always(function () {
          if (_this.revealAllLinks) {
            _this.helpers.revealAllLinks();
          }
          $("[role=show-after-fetched]").show();
        });
      }
    },
    showReputationBar: {
      value: function showReputationBar() {
        var _this = this;

        $.when(this.defs.account).done(function (account) {
          _this.helpers.showReputation(account.reputation);
        }).fail(function () {
          console.error("Could not render reputation meter");
        });
      }
    },
    showCreditsBar: {
      value: function showCreditsBar() {
        var _this = this;

        $.whenAll([this.defs.credits, this.defs.pkg, this.defs.signup_status]).done(function (creditsDef, pkgDef, signupStatusDef) {
          var credits = undefined,
              pkg = undefined,
              signupStatus = undefined,
              isExpired = undefined,
              isUnverified = undefined;

          credits = !(creditsDef == null) && creditsDef[1] === "success" ? creditsDef[0] : {};
          pkg = !(pkgDef == null) && pkgDef[1] === "success" ? pkgDef[0] : null;
          signupStatus = !(signupStatusDef == null) && signupStatusDef[1] === "success" ? signupStatusDef[0] : null;

          // get isExpired
          if (pkg && pkg.trial_expiration_date) {
            var expirationTimestamp = Date.parse(pkg.trial_expiration_date);
            var todayTimestamp = Date.now();
            isExpired = todayTimestamp > expirationTimestamp;
          }

          // get isUnverified
          if (signupStatus) {
            var progress = _this.signupProgress(signupStatus);
            isUnverified = progress !== "complete";
          }

          _this.helpers.showCredits(credits.used, credits.total, isExpired, isUnverified);
        }).fail(function () {
          console.error("Could not render credits bar");
        });
      }
    },
    showUsage: {
      value: function showUsage() {
        var _this = this;

        $.when(this.defs.usage_stats, this.defs.scopes).done(function (usageStats, scopes) {
          var mayHaveSubusers = _this.helpers.hasScope(/^subusers\./, scopes[0].scopes);
          var usage = usageStats[0].used;
          var creditsResetFrequency = usageStats[0].reset_frequency;
          _this.helpers.showUsage(usage);
          _this.helpers.showUsageLabels(creditsResetFrequency, mayHaveSubusers);
        }).fail(function () {
          console.error("Could not render emails sent monthly");
        });
      }
    },
    showAccountName: {
      value: function showAccountName() {
        var _this = this;

        $.when(this.defs.profile, this.defs.username).done(function (profile, username) {
          var fullName = undefined;
          profile = profile[0];
          username = username[0].username;

          if (profile.first_name || profile.last_name) {
            fullName = "" + (profile.first_name || "") + " " + (profile.last_name || "");
          } else {
            fullName = username;
          }
          _this.helpers.showAccount(fullName);
        }).fail(function () {
          console.error("Could not render account menu");
        });
      }
    },
    loadAnalytics: {
      value: function loadAnalytics(apiKey, integrations) {
        // Even if some of these fail, we want to load analytics with as much data as possible
        // Inspired by http://stackoverflow.com/a/5825233

        var email = {};
        var username = {};
        var pkg = {};
        var defEmail = $.Deferred();
        var defUsername = $.Deferred();
        var defPkg = $.Deferred();

        $.when(this.defs.email).done(function (data) {
          email = data;
        }).always(defEmail.resolve);
        $.when(this.defs.username).done(function (data) {
          username = data;
        }).always(defUsername.resolve);
        $.when(this.defs.pkg).done(function (data) {
          pkg = data;
        }).always(defPkg.resolve);

        $.when(defEmail, defUsername, defPkg).done(function () {
          Analytics.load({
            email: email.email,
            user_id: username.user_id,
            username: username.username,
            pkg: pkg.name
          }, apiKey, integrations);
        }).fail(function () {
          console.error("Could not load analytics");
        });
      }
    },
    showSubusers: {
      value: function showSubusers(subusersHelper, fetcher, parentFetcher, impersonating, impersonateCallback) {
        var _this = this;

        if (impersonating) {
          $.when(this.defs.parent_subusers).done(function (subusers) {
            if (subusers.length > 1) {
              // can't re-impersonate as same subuser
              $("[data-impersonation-banner-switch-subuser-container]").addClass("is-active");
            }
            subusersHelper.bindSubusers({
              subusers: subusers,
              fetcher: parentFetcher,
              impersonate_callback: impersonateCallback,
              currently_impersonating: impersonating });
          });
        } else {
          $.when(this.defs.subusers, this.defs.feature_toggles).done(function (subusers, feature_toggles) {
            subusers = subusers[0];
            feature_toggles = feature_toggles[0];

            if (_this.preventImpersonation) {
              return;
            }

            if (subusers.length > 0) {
              $("[data-account-toggle-submenu]").show();
            }
            subusersHelper.bindSubusers({
              subusers: subusers,
              fetcher: fetcher,
              impersonate_callback: impersonateCallback });
          }).fail(function () {
            console.error("Could not render subusers");
          });
        }
      }
    },
    showLegacyNewsletterLink: {

      // only show the legacy newsletter link if a user has both newsletter scopes and access

      value: function showLegacyNewsletterLink() {
        var self = this;
        $.when(self.defs.scopes, self.defs.nlv3).done(function (scopes, legacy_access) {
          var scopes = scopes[0].scopes;
          var has_legacy_newsletter_access = legacy_access[0].valid;

          if (self.helpers.hasScope(/^newsletter\./, scopes) && has_legacy_newsletter_access) {
            self.helpers.showLegacyNewsletterLink();
          }
        }).fail(function () {
          console.error("Could not render legacy section");
        });
      }
    },
    hideLoadingScreen: {

      // hide the loading screen once we get back at least one 20x OR all requests have been resolved/rejected

      value: function hideLoadingScreen() {
        var _this = this;

        var defArray = [];
        Object.keys(this.defs).forEach(function (key) {
          var def = _this.defs[key];
          defArray.push(def);
          def.done(function (data, success, xhr) {
            if (xhr && xhr.status >= 200 && xhr.status < 300) {
              $("[data-role=main-loader]").fadeOut();
            }
          });
        });

        $.whenAll(defArray).done(function () {
          $("[data-role=main-loader]").fadeOut();
        });
      }
    },
    isAwsDeactivated: {
      value: function isAwsDeactivated(userType) {
        if (!userType) {
          return false;
        }

        var type = userType.type;
        var reseller_username = userType.reseller_username;

        var awsDeactivatedUser = {
          type: "reseller_customer_free",
          resellerUsername: "reseller@aws.com"
        };

        // user must be a reseller customer, and the
        // reseller's username must be reseller@aws.com
        return type === awsDeactivatedUser.type && reseller_username === awsDeactivatedUser.resellerUsername;
      }
    },
    renderBanner: {

      // see https://docs.google.com/drawings/d/1D2H84rS57RMF46_ialNgN-LOPTPdoXf3W_oOkiQvz0Q/edit

      value: function renderBanner() {
        var _this = this;

        $.whenAll([this.defs.user_status, this.defs.user_type]).done(function (userStatusDef, userTypeDef) {
          var userStatus = !(userStatusDef == null) && userStatusDef[1] === "success" ? userStatusDef[0] : {};
          var userType = !(userTypeDef == null) && userTypeDef[1] === "success" ? userTypeDef[0] : {};

          if (_this.isAwsDeactivated(userType)) {
            _this.banner.showAwsDeactivated();
            return;
          }

          // Show banners for inactive user status
          switch (userStatus.status) {
            case "suspended":
              _this.banner.showComplianceSuspended();
              return;
            case "billing terminated":
              _this.banner.showComplianceBillingTerminated();
              return;
            case "billing warned":
              _this.banner.showComplianceBillingWarned();
              return;
            case "billing frozen":
              _this.banner.showComplianceBillingFrozen();
              return;
          }

          $.when(_this.defs.pkg).done(function (pkg) {
            var _pkg$is_cutoff_trial = pkg.is_cutoff_trial;
            var is_cutoff_trial = _pkg$is_cutoff_trial === undefined ? false : _pkg$is_cutoff_trial;
            var base_price = pkg.base_price;
            var is_signup_to_send = pkg.is_signup_to_send;
            var trial_expiration_date = pkg.trial_expiration_date;

            if (is_signup_to_send) {
              if (base_price > 0) {
                // on a paid package
                $.when(_this.defs.signup_status).done(function (signup_status) {
                  var progress = _this.signupProgress(signup_status);
                  switch (progress) {
                    case "not_started":
                      _this.banner.showVerificationStart();
                      return;
                    case "started":
                      _this.banner.showVerificationContinue({
                        s2s_state: signup_status
                      });
                      return;
                  }
                });
              } else {
                // on a trial/testing package
                $.when(_this.defs.credits).done(function (credits) {
                  if (credits.remain > 0) {
                    var expirationTimestamp = Date.parse(trial_expiration_date);
                    var todayTimestamp = Date.now();
                    var daysRemaining = Math.floor((expirationTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24)) + 1;
                    if (daysRemaining < -5) {
                      _this.banner.showPassiveTrialExpired(is_cutoff_trial);
                    } else if (daysRemaining <= 0) {
                      _this.banner.showAggressiveTrialExpired(is_cutoff_trial);
                    } else if (daysRemaining <= 5) {
                      _this.banner.showTrialExpiring({
                        days_remaining: daysRemaining
                      }, is_cutoff_trial);
                    } else {
                      $.when(_this.defs.signup_status).done(function (signup_status) {
                        var progress = _this.signupProgress(signup_status);
                        switch (progress) {
                          case "not_started":
                            _this.banner.showVerificationStart();
                            break;
                          case "started":
                            _this.banner.showVerificationContinue({
                              s2s_state: signup_status
                            });
                            break;
                        }
                      });
                    }
                  } else {
                    $.when(_this.defs.signup_status).done(function (signup_status) {
                      if (_this.signupProgress(signup_status) === "complete") {
                        _this.banner.showOverlimitUpgrade({
                          credits: credits
                        }, is_cutoff_trial);
                      } else {
                        _this.banner.showOverlimitVerify({
                          credits: credits
                        }, is_cutoff_trial);
                      }
                    });
                  }
                });
              }
            }
          });
        }).fail(function () {
          console.error("No banner deferreds retrieved.");
        });
      }
    },
    signupProgress: {
      value: function signupProgress(status) {
        if (!status) {
          // 'complete' status can also be represented by 404
          return "complete";
        }
        if (!status.email_complete && !status.mfa_complete && !status.whitelabel_complete) {
          return "not_started";
        } else if ((status.email_complete || !status.email_required) && (status.mfa_complete || !status.mfa_required) && (status.whitelabel_complete || !status.whitelabel_required)) {
          return "complete";
        } else {
          return "started";
        }
      }
    },
    revealExperiments: {
      value: function revealExperiments(isReseller) {
        if (!isReseller) {
          var self = this;
          $.when(self.defs.feature_toggles).done(function (feature_toggles) {
            if (self.helpers.hasFeatureEnabled("tiara", "labs", feature_toggles)) {
              $("[data-role=experiments-container]").removeClass("hidden");
            }
          });
        }
      }
    },
    revealEmailsRemaining: {
      value: function revealEmailsRemaining() {
        $.when(this.defs.pkg).done(function (pkg) {
          var _pkg$is_cutoff_trial = pkg.is_cutoff_trial;
          var is_cutoff_trial = _pkg$is_cutoff_trial === undefined ? false : _pkg$is_cutoff_trial;
          var _pkg$trial_expiration_date = pkg.trial_expiration_date;
          var trial_expiration_date = _pkg$trial_expiration_date === undefined ? "" : _pkg$trial_expiration_date;

          // show "Emails Remaining" unless user is on expired cutoff trial
          if (!(is_cutoff_trial && Date.parse(trial_expiration_date) <= Date.now())) {
            $("[data-role=emails-remaining]").removeClass("hidden");
          }
        }).fail(function () {
          // optimistically reveal, since resellers return 403
          $("[data-role=emails-remaining]").removeClass("hidden");
        });
      }
    }
  });

  return DeferredHandlers;
})();

},{"./analytics":1,"./templates":9}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

module.exports = (function () {
  function Fetcher($, token, options) {
    _classCallCheck(this, Fetcher);

    options = options || {};
    this.$ = $;
    this.token = token;
    this.api_host = options.api_host;
    this.impersonatingUsername = options.impersonating;

    // Optional option.  This will be a no-op unless configured to logout on auth failure
    this.logoutCallback = options.logoutCallback || function () {};
  }

  _createClass(Fetcher, {
    fetchProfile: {

      // Example response: {"first_name": "Pat", "last_name":  "Pattington"}

      value: function fetchProfile() {
        return this.authorizedAjax("user/profile");
      }
    },
    fetchEmail: {

      // Example response: {"email": "me@example.com"}

      value: function fetchEmail() {
        return this.authorizedAjax("user/email");
      }
    },
    fetchAccount: {

      // Example response: {"reputation": 99, "type": "paid"}

      value: function fetchAccount() {
        return this.authorizedAjax("user/account");
      }
    },
    fetchCredits: {

      /* Example response:
      {
        "last_reset": "2015-03-01",
        "next_reset": "2015-04-01",
        "overage": 0,
        "remain": 99997,
        "reset_frequency": "monthly",
        "total": 100000,
        "used": 3
      } */

      value: function fetchCredits() {
        return this.authorizedAjax("user/credits");
      }
    },
    fetchCreditsIncludingSubusers: {

      /* Example response:
      {
        "last_reset": "2015-03-01",
        "next_reset": "2015-04-01",
        "overage": 0,
        "remain": 99997,
        "reset_frequency": "monthly",
        "total": 100000,
        "used": 3
      } */

      value: function fetchCreditsIncludingSubusers() {
        return this.authorizedAjax("user/credits?include_subusers=true");
      }
    },
    fetchMonthlyEmailStats: {

      /* Example response:
         [{
           "date": "2015-03-03",
           "stats": [{
             "metrics": {
               "blocks": 0,
               "bounce_drops": 0,
               "bounces": 0,
               "clicks": 0,
               "deferred": 0,
               "delivered": 0,
               "invalid_emails": 0,
               "opens": 0,
               "processed": 0,
               "requests": 0,
               "spam_report_drops": 0,
               "spam_reports": 0,
               "unique_clicks": 0,
               "unique_opens": 0,
               "unsubscribe_drops": 0,
               "unsubscribes": 0
             }
           }]
         }]
       */

      value: function fetchMonthlyEmailStats() {
        var monthStart = monthStartDateString();
        var today = todayDateString();
        return this.authorizedAjax("stats?aggregated_by=month&start_date=" + monthStart + "&end_date=" + today);
      }
    },
    fetchSubusers: {

      /* Example response:
        [{
         "id": 100,
         "username": "subby1",
         "email": "subby1@example.com"
        }, {
         "id": 101,
         "username": "subby2",
         "email": "subby2@example.com"
        ]
      */

      value: function fetchSubusers(userParams) {
        var params = { limit: 20 };
        if (userParams) {
          this.$.extend(params, userParams);
        }
        return this.authorizedAjax("subusers?" + this.$.param(params));
      }
    },
    fetchFeatureToggles: {

      /* Example response:
      [
        {feature_name:'signup', app_name:'mako'},
        {feature_name:'subuser_mgmt', app_name:'mako'},
        {feature_name:'subusers', app_name:'mako'},
        {feature_name:'api_keys', app_name:'mako'},
        {feature_name:'parse', app_name:'mako'},
        {feature_name:'mail_settings', app_name:'mako'},
        {feature_name:'alerts', app_name:'mako'},
        {feature_name:'package_and_billing', app_name:'mako'},
        {feature_name:'multifactor_auth', app_name:'mako'},
        {feature_name:'edit_profile', app_name:'mako'},
        {feature_name:'whitelabel', app_name:'mako'},
        {feature_name:'ip_access_mgmt', app_name:'mako'},
        {feature_name:'teammates', app_name:'mako'},
        {feature_name:'multifactor_authentication', app_name:'mako'},
        {feature_name:'ips_self_service', app_name:'mako'},
        {feature_name:'reactive_troubleshooting', app_name:'mako'},
      ]
      */

      value: function fetchFeatureToggles() {
        return this.authorizedAjax("feature_toggles");
      }
    },
    fetchLegacyNewsletterAccess: {

      /* Example response:
        {
          "valid": true
        }
      */

      value: function fetchLegacyNewsletterAccess() {
        return this.authorizedAjax("legacy_newsletter");
      }
    },
    fetchScopes: {

      /* Example response:
        {
          "scopes": [
            "alerts.create",
            "alerts.read",
            "alerts.update",
            "alerts.delete"
          ]
        }
      */

      value: function fetchScopes() {
        return this.authorizedAjax("scopes");
      }
    },
    fetchUsername: {

      /* Example response:
        {
          "user_id": 180,
          "username": "my_username"
        }
      */

      value: function fetchUsername() {
        return this.authorizedAjax("user/username");
      }
    },
    fetchPackage: {

      /* Example response:
        {
          name: "Silver Package",
          description: "Silver Package includes 100,000 email credits per month, $0.00085 per email thereafter.",
          base_price: 79.95,
          overage_price: 0.00085,
          newsletter_price: 0,
          campaign_price: 0,
          is_hv: false,
          package_id: "8b8403b0-ce8a-11e4-b4e5-5fcde71ee009",
          package_status: "Active",
          downgrade_package_id: ""
        }
      */

      value: function fetchPackage() {
        return this.authorizedAjax("user/package");
      }
    },
    fetchSignupStatus: {

      /* Example repsonse:
        {
          email_complete:      false,
          email_required:      true,
          mfa_complete:        false,
          mfa_required:        true,
          profile_complete:    true,
          profile_required:    true,
          whitelabel_complete: false,
          whitelabel_required: false,
        }
        HOWEVER, this 404s on users who are not currently
        in the signup-to-send process. Therefore, we must
        wrap it in a Deferred so it'll return null instead
        of a 404 error.
      */

      value: function fetchSignupStatus() {
        var deferred = $.Deferred();

        this.authorizedAjax("s2s/signup/status").done(function (data, textStatus, jqXHR) {
          deferred.resolve(data, textStatus, jqXHR);
        }).fail(function (jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 404) {
            deferred.resolve(null, "success", jqXHR);
          } else {
            deferred.reject(jqXHR, textStatus, errorThrown);
          }
        });

        return deferred;
      }
    },
    fetchUserStatus: {

      /* Example response:
        {
          status: "active"
        }
      */

      value: function fetchUserStatus() {
        return this.authorizedAjax("user/status");
      }
    },
    fetchUserType: {

      /* Example response:
        {
          type: "reseller",
          reseller_username: "reseller@aws.com"
        }
      */

      value: function fetchUserType() {
        return this.authorizedAjax("user/type");
      }
    },
    authorizedAjax: {
      value: function authorizedAjax(route) {
        var headers = { authorization: "token " + this.token };
        var skipImpersonation = false;

        if (this.impersonatingUsername) {
          headers["On-Behalf-Of"] = this.impersonatingUsername;
        } else {
          // if you use $.ajaxPrefilter in your client code,
          // check options to avoid applying "On-Behalf-Of"
          skipImpersonation = true;
        }
        return this.$.ajax({
          url: "" + this.api_host + "" + route,
          headers: headers,
          skipImpersonation: skipImpersonation,
          statusCode: {
            401: (function (response) {
              this.logoutCallback();
            }).bind(this)
          }
        });
      }
    }
  });

  return Fetcher;
})();

// return today's date formatted, ex: "2015-02-28"
function todayDateString() {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth() + 1; // months are 0-indexed
  var year = today.getFullYear();

  if (date < 10) {
    date = "0" + date;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return [year, month, date].join("-");
}

function monthStartDateString() {
  var monthStart = new Date();
  var monthStartDate = "01"; // First of the current month with an appended '0'
  var monthStartMonth = monthStart.getMonth() + 1; // months are 0-indexed
  var monthStartYear = monthStart.getFullYear();

  if (monthStartMonth < 10) {
    monthStartMonth = "0" + monthStartMonth;
  }

  return [monthStartYear, monthStartMonth, monthStartDate].join("-");
}

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Templates = require("./templates");

module.exports = (function () {
  function Helpers($, _, $container) {
    _classCallCheck(this, Helpers);

    this.$ = $;
    this._ = _;
    this.$container = $container;
  }

  _createClass(Helpers, {
    revealLinksViaFeatureToggles: {
      value: function revealLinksViaFeatureToggles(featureToggles) {
        var $ = this.$;
        var self = this;
        this.$container.find("[data-ft-app][data-ft-feature]").each(function (i, link) {
          var $link = $(link);
          var appName = $link.data("ft-app");
          var featureName = $link.data("ft-feature");
          if (self.hasFeatureEnabled(appName, featureName, featureToggles)) {
            $link.removeClass(Templates.featureToggleHiddenClass);
          } else {
            $link.addClass(Templates.featureToggleHiddenClass);
          }
        });
      }
    },
    revealLinksViaScopes: {
      value: function revealLinksViaScopes(scopes) {
        var $ = this.$;
        var self = this;
        this.$container.find("[data-scope]").each(function (i, link) {
          var $link = $(link);
          var scope = $link.data("scope");
          var teammatesIgnoreScope = !!$link.data("teammates-ignore-scope");

          if (teammatesIgnoreScope || self.hasScope(new RegExp(scope), scopes)) {
            $link.removeClass(Templates.scopeHiddenClass);
          } else {
            $link.addClass(Templates.scopeHiddenClass);
          }
        });
      }
    },
    revealAllLinks: {
      value: function revealAllLinks() {
        this.$container.find("[data-ft-app][data-ft-feature], [data-scope], [data-subuser-restricted]").each(function (i, link) {
          var $link = $(link).show();
        });
      }
    },
    hasFeatureEnabled: {
      value: function hasFeatureEnabled(appName, featureName, featureToggles) {
        for (var i in featureToggles) {
          var ftAppName = featureToggles[i].app_name;
          var ftFeatureName = featureToggles[i].feature_name;
          if (appName == ftAppName && featureName == ftFeatureName) {
            return true;
          }
        }
        return false;
      }
    },
    hasScope: {
      value: function hasScope(scopeRegex, scopes) {
        for (var i in scopes) {
          var scope = scopes[i];
          if (scope.match(scopeRegex)) {
            return true;
          }
        }
        return false;
      }
    },
    bindNav: {
      value: function bindNav() {
        var $ = this.$;
        var $pageLinks = this.$container.find("[role=page] > a");
        var $allSubpages = this.$container.find("[role=subpages]");
        var speed = "fast";
        $pageLinks.click(function (e) {
          var $parent = $(e.currentTarget).parent();
          var $subpages = $parent.find("[role=subpages]");

          if ($subpages.length > 0) {
            if ($subpages.is(":visible")) {
              // if the subpages are already visible, toggle it off
              $allSubpages.slideUp(speed);
              $parent.removeClass("is-active");
            } else {
              // if the subpages aren't visible, toggle it on
              $allSubpages.slideUp(speed);
              $subpages.slideDown(speed);
              $pageLinks.parent().removeClass("is-active");
              $parent.addClass("is-active");
            }
            return false;
          } else {
            $pageLinks.parent().removeClass("is-active");
            $parent.addClass("is-active");
            $allSubpages.slideUp(speed);
            // if there were no subpages, just navigate like normal
            return true;
          }
        });
      }
    },
    bindAccount: {
      value: function bindAccount(logoutCallback) {
        var _this = this;

        var $ = this.$;

        // TODO This block can eventually be generalized with
        // https://github.com/sendgrid/style-guide/blob/master/app/assets/javascripts/style-guide/_dropdown.js
        // Isolating behavior to just tiara elements for now
        $(document).click(function (event) {
          var $target = $(event.target);
          var $dropdowns = _this.$container.find("[data-dropdown-toggle]");

          // if a dropdown is already active, close all dropdown-menus
          if ($dropdowns.hasClass("is-active")) {
            // don't close when clicking a menu item like 'search'
            if ($target.closest("[data-dropdown-no-close]").length == 0) {
              $dropdowns.removeClass("is-active");
            }
          } else {
            // if they're clicking an inactive dropdown in tiara, open it
            if ($target.closest(_this.$container).length > 0) {
              $target.closest("[data-dropdown-toggle]").addClass("is-active");
            }
          }
        });

        this.$container.find("[data-account-toggle-submenu]").click(function () {
          _this.$container.find("[data-account-submenu=\"account\"]").toggleClass("is-active");
          _this.$container.find("[data-account-submenu=\"subusers\"]").toggleClass("is-active");
        });

        this.$container.find("[data-logout]").click(function () {
          logoutCallback(true);
        });
      }
    },
    showReputation: {
      value: function showReputation(reputation) {
        this.$container.find("[role=reputation]").text(reputation + "%");
        this.$container.find("[role=reputation-progress-bar]").addClass(this.barClass(reputation)).css("width", reputation + "%");
        this.$container.show();
      }
    },
    showLegacyNewsletterLink: {
      value: function showLegacyNewsletterLink() {
        this.$container.find("[role=nlv3]").show();
      }
    },
    showCredits: {
      value: function showCredits(used, total, isExpired, isUnverified) {
        var creditsPercentage = undefined,
            creditsTitle = undefined,
            creditsClass = undefined;
        if (total > 0) {
          // normal user
          // only show "per day" when user has 100 total credits
          var perDay = total === 100 ? " per day" : "";

          if (used > total) {
            // overage!
            creditsPercentage = 0;
            creditsTitle = "0 / " + this.prettyNumber(total) + "" + perDay + " (" + this.prettyNumber(used) + " total used)";
            creditsClass = "overage";
          } else {
            var remaining = total - used;
            creditsPercentage = 100 * remaining / total;
            creditsTitle = "" + this.prettyNumber(remaining) + " / " + this.prettyNumber(total) + "" + perDay;
          }
        } else {
          // unlimited user
          creditsPercentage = 100; // default to nice full bar
          creditsTitle = "";
        }

        this.$container.find("[role=credits-fraction]").text(creditsTitle).addClass(creditsClass);
        this.$container.find("[role=credits-progress-bar]").addClass(this.barClass(creditsPercentage)).css("width", creditsPercentage + "%");

        // begin tooltip logic

        var tooltipTitle;
        if (isUnverified && isExpired) {
          tooltipTitle = "You may only send up to 100 emails per day until you verify and upgrade your account.";
        } else if (isUnverified) {
          tooltipTitle = "You may only send up to 100 emails per day until you verify your account.";
        } else if (isExpired) {
          tooltipTitle = "You may only send up to 100 emails per day until you upgrade your account.";
        }

        if (tooltipTitle) {
          this.$container.find("[role=credits-tooltip-container]").attr("data-balloon", tooltipTitle).attr("data-balloon-pos", "right").attr("data-balloon-length", "large").removeClass("hidden");
        }
        this.$container.show();
      }
    },
    showUsage: {
      value: function showUsage(usage) {
        this.$container.find("[role=usage-metric]").text(this.prettyNumber(usage));
      }
    },
    showUsageLabels: {
      value: function showUsageLabels(frequency, mayHaveSubusers) {
        var usageTooltip = "The total number of requests ";
        var usageLabel = "Emails this month";

        if (mayHaveSubusers) {
          usageTooltip += "you and your subusers ";
        } else {
          usageTooltip += "you ";
        }

        if (frequency === "daily") {
          usageTooltip += "have made to send email today.";
          usageLabel = "Emails today";
        } else {
          usageTooltip += "have made to send email this month.";
          usageLabel = "Emails this month";
        }

        this.$container.find("[role=credits-reset-frequency-label]").text(usageLabel);
        this.$container.find("[role=credits-reset-frequency]").attr("data-tooltip", usageTooltip);
      }
    },
    showAccount: {
      value: function showAccount(name) {
        if (name.trim()) {
          this.$container.find("[data-account-name]").text(name);
        }
      }
    },
    barClass: {

      // private

      value: function barClass(percentage) {
        switch (true) {
          case percentage > 50:
            return "is-above-50";
          case percentage > 25:
            return "is-below-50";
          default:
            return "is-below-25";
        }
      }
    },
    prettyNumber: {
      value: function prettyNumber(num) {
        if (isNaN(num)) {
          return "N/A";
        } else {
          return this.abbrNum(num, 2);
        }
      }
    },
    abbrNum: {

      // from http://stackoverflow.com/a/2686098

      value: function abbrNum(number, decPlaces) {
        decPlaces = Math.pow(10, decPlaces);

        var abbrev = ["k", "m", "b", "t"];

        // Go through the array backwards, so we do the largest first
        for (var i = abbrev.length - 1; i >= 0; i--) {

          // Convert array index to "1000", "1000000", etc
          var size = Math.pow(10, (i + 1) * 3);

          // If the number is bigger or equal do the abbreviation
          if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number * decPlaces / size) / decPlaces;

            // Handle special case where we round up to the next abbreviation
            if (number == 1000 && i < abbrev.length - 1) {
              number = 1;
              i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
          }
        }

        return number;
      }
    },
    activateNav: {
      value: function activateNav(path, $list) {
        var $matchingA = undefined,
            matchingHref = "";
        $list.find("a").each(function (index, a) {
          var href = a.pathname;

          // path starts with link's href
          if (path.indexOf(href) == 0) {
            // link is more specific
            if (href.length > matchingHref.length) {
              $matchingA = $(a);
              matchingHref = href;
            }
          }
        });

        if ($matchingA) {
          var $mainLink = $matchingA.parents(".page");
          var parentAlreadyExpanded = $mainLink.hasClass("is-active");

          // clear all 'active' subpages
          $list.find(".subpages li").removeClass("is-active");

          $matchingA.parent("li").addClass("is-active");

          // simulate a click if page isn't already expanded
          if (!parentAlreadyExpanded) {
            // simulate opening subpages by clicking main link
            $mainLink.find("a:first").click();
          }
        };
      }
    }
  });

  return Helpers;
})();

},{"./templates":9}],7:[function(require,module,exports){
// sidebar svgs
"use strict";

var dashboardSvg = require("../style-guide/app/img/icons/sidebar/dashboard.svg");
var marketingSvg = require("../style-guide/app/img/icons/sidebar/marketing.svg");
var templatesSvg = require("../style-guide/app/img/icons/sidebar/templates.svg");
var statsSvg = require("../style-guide/app/img/icons/sidebar/stats.svg");
var activitySvg = require("../style-guide/app/img/icons/sidebar/activity.svg");
var reportsSvg = require("../style-guide/app/img/icons/sidebar/reports.svg");
var settingsSvg = require("../style-guide/app/img/icons/sidebar/settings.svg");

module.exports = {
  getPageData: function getPageData(params) {
    var makoHost = params.makoHost;
    var nlvxHost = params.nlvxHost;
    var sgHost = params.sgHost;
    return [{
      title: "Dashboard",
      img: dashboardSvg,
      href: makoHost,
      mako_route: "/"
    }, {
      title: "Marketing",
      img: marketingSvg,
      subpages: [{
        title: "Marketing Campaigns",
        href: "" + nlvxHost + "/",
        role: "nlvx" }, {
        title: "Tour",
        href: "" + nlvxHost + "/ui/tour",
        is_indented: true }, {
        title: "Overview",
        href: "" + nlvxHost + "/ui/overview",
        is_indented: true }, {
        title: "Campaigns",
        href: "" + nlvxHost + "/ui/campaigns",
        is_indented: true }, {
        title: "Contacts",
        href: "" + nlvxHost + "/contacts",
        is_indented: true }, {
        title: "Custom Fields",
        href: "" + nlvxHost + "/ui/custom_fields",
        is_indented: true }, {
        title: "Templates",
        href: "" + nlvxHost + "/ui/marketing_templates",
        is_indented: true }, {
        title: "Senders",
        href: "" + nlvxHost + "/ui/senders",
        is_indented: true }, {
        title: "Notifications",
        href: "" + nlvxHost + "/ui/notifications",
        is_indented: true }, {
        title: "User Guide",
        href: "" + sgHost + "/docs/User_Guide/Marketing_Campaigns/index.html",
        is_indented: true }, {
        title: "Legacy Newsletter",
        href: "" + sgHost + "/newsletter/dashboard", // legacy page
        scope: "^newsletter\\.read$",
        teammates_ignore_scope: true,
        role: "nlv3"
      }]
    }, {
      title: "Templates",
      img: templatesSvg,
      subpages: [{
        title: "Transactional",
        href: "" + sgHost + "/templates"
      }, {
        title: "Marketing",
        href: "" + nlvxHost + "/ui/marketing_templates" }]
    }, {
      title: "Stats",
      img: statsSvg,
      subpages: [{
        title: "Overview",
        href: "" + makoHost + "/statistics",
        mako_route: "statistics",
        scope: "^stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Global Stats",
        href: "" + makoHost + "/statistics/global",
        mako_route: "statistics/global",
        scope: "^stats\\.global\\.read",
        teammates_ignore_scope: true }, {
        title: "Category Stats",
        href: "" + makoHost + "/statistics/category",
        mako_route: "statistics/category",
        scope: "^categories\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Category Comparison",
        href: "" + makoHost + "/statistics/category/compare",
        mako_route: "statistics/category/compare",
        scope: "^categories\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Subuser Stats",
        href: "" + makoHost + "/statistics/subuser",
        mako_route: "statistics/subuser",
        scope: "^subusers\\.stats\\.",
        teammates_ignore_scope: true,
        subuser_restricted: true }, {
        title: "Subuser Comparison",
        href: "" + makoHost + "/statistics/subuser/compare",
        mako_route: "statistics/subuser/compare",
        scope: "^subusers\\.stats\\.",
        teammates_ignore_scope: true,
        subuser_restricted: true }, {
        title: "Geographical",
        href: "" + makoHost + "/statistics/geo",
        mako_route: "statistics/geo",
        scope: "^geo\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Email Clients & Devices",
        href: "" + makoHost + "/statistics/device",
        mako_route: "statistics/device",
        scope: "^clients\\.stats\\.read|^devices\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Mailbox Provider Stats",
        href: "" + makoHost + "/statistics/mailbox_provider",
        mako_route: "statistics/mailbox_provider",
        scope: "^mailbox_providers\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Mailbox Provider Comparison",
        href: "" + makoHost + "/statistics/mailbox_provider/compare",
        mako_route: "statistics/mailbox_provider/compare",
        scope: "^mailbox_providers\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Browser Stats",
        href: "" + makoHost + "/statistics/browser",
        mako_route: "statistics/browser",
        scope: "^clients\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Browser Comparison",
        href: "" + makoHost + "/statistics/browser/compare",
        mako_route: "statistics/browser/compare",
        scope: "^clients\\.stats\\.read",
        teammates_ignore_scope: true }, {
        title: "Parse Webhook",
        href: "" + makoHost + "/statistics/parse_webhook",
        mako_route: "statistics/parse_webhook",
        scope: "^user\\.webhooks\\.parse\\.settings\\.read",
        teammates_ignore_scope: true }]
    }, {
      title: "Activity",
      img: activitySvg,
      href: "" + makoHost + "/email_activity",
      mako_route: "email_activity",
      scope: "^email_activity\\.read$",
      teammates_ignore_scope: true }, {
      title: "Suppressions",
      img: reportsSvg,
      scope: "^suppression\\.read$|^asm\\.groups\\.read$",
      teammates_ignore_scope: true,
      subpages: [{
        title: "Global Unsubscribes",
        href: "" + makoHost + "/suppressions/global_unsubscribes",
        mako_route: "suppressions/global_unsubscribes",
        scope: "^suppression\\.read$",
        teammates_ignore_scope: true }, {
        title: "Group Unsubscribes",
        href: "" + makoHost + "/suppressions/group_unsubscribes",
        mako_route: "suppressions/group_unsubscribes",
        scope: "^suppression\\.read$",
        teammates_ignore_scope: true }, {
        title: "Bounces",
        href: "" + makoHost + "/suppressions/bounces",
        mako_route: "suppressions/bounces",
        scope: "^suppression\\.read$",
        teammates_ignore_scope: true }, {
        title: "Spam Reports",
        href: "" + makoHost + "/suppressions/spam_reports",
        mako_route: "suppressions/spam_reports",
        scope: "^suppression\\.read$",
        teammates_ignore_scope: true }, {
        title: "Blocks",
        href: "" + makoHost + "/suppressions/blocks",
        mako_route: "suppressions/blocks",
        scope: "^suppression\\.read$",
        teammates_ignore_scope: true }, {
        title: "Invalid",
        href: "" + makoHost + "/suppressions/invalid_emails",
        mako_route: "suppressions/invalid_emails",
        scope: "^suppression\\.read$",
        teammates_ignore_scope: true }, {
        title: "Unsubscribe Groups",
        href: "" + makoHost + "/suppressions/advanced_suppression_manager",
        mako_route: "suppressions/advanced_suppression_manager",
        scope: "^asm\\.groups\\.read$",
        teammates_ignore_scope: true }]
    }, {
      title: "Settings",
      img: settingsSvg,
      subpages: [{
        title: "Account Details",
        href: "" + makoHost + "/settings/account",
        mako_route: "settings/account" }, {
        title: "Alert Settings",
        href: "" + makoHost + "/settings/alerts",
        mako_route: "settings/alerts",
        scope: "^alerts\\.read$",
        teammates_ignore_scope: true }, {
        title: "API Keys",
        href: "" + makoHost + "/settings/api_keys",
        mako_route: "settings/api_keys",
        scope: "^api_keys\\.read",
        teammates_ignore_scope: true }, {
        title: "Inbound Parse",
        href: "" + makoHost + "/settings/parse",
        mako_route: "settings/parse",
        scope: "^user\\.webhooks\\.parse\\.settings\\.read",
        teammates_ignore_scope: true }, {
        title: "IP Access Management",
        href: "" + makoHost + "/settings/access",
        mako_route: "settings/access",
        feature_toggle: ["mako", "ip_access_mgmt"] }, {
        title: "IP Addresses",
        href: "" + makoHost + "/settings/ip_addresses",
        mako_route: "settings/ip_addresses",
        scope: "^ips\\.read$",
        teammates_ignore_scope: true,
        subuser_restricted: true,
        feature_toggle: ["mako", "ips_self_service"] }, {
        title: "Mail Settings",
        href: "" + makoHost + "/settings/mail_settings",
        mako_route: "settings/mail_settings",
        scope: "^mail_settings\\.read$",
        teammates_ignore_scope: true }, {
        title: "Partners",
        href: "" + makoHost + "/settings/partners",
        mako_route: "settings/partners",
        scope: "^partner_settings\\.read$",
        teammates_ignore_scope: true }, {
        title: "Plan & Billing Details",
        href: "" + makoHost + "/settings/billing",
        mako_route: "settings/billing",
        scope: "^billing\\.read$",
        teammates_ignore_scope: true,
        subuser_restricted: true }, {
        title: "Subuser Management",
        href: "" + makoHost + "/settings/subusers",
        mako_route: "settings/subusers",
        scope: "^subusers\\.read$",
        teammates_ignore_scope: true,
        subuser_restricted: true }, {
        title: "Teammates",
        href: "" + makoHost + "/settings/teammates",
        mako_route: "settings/teammates",
        scope: "^teammates\\.",
        role: "teammates" }, {
        title: "Tracking",
        href: "" + makoHost + "/settings/tracking",
        mako_route: "settings/tracking",
        scope: "^tracking_settings\\.read$",
        teammates_ignore_scope: true }, {
        title: "Two-Factor Authentication",
        href: "" + makoHost + "/settings/auth",
        mako_route: "settings/auth",
        scope: "^user\\.multifactor_authentication\\.",
        role: "two_factor_auth" }, {
        title: "Whitelabels",
        href: "" + makoHost + "/settings/whitelabel",
        mako_route: "settings/whitelabel",
        scope: "^whitelabel\\.read$",
        teammates_ignore_scope: true }, {
        title: "Overview",
        href: "" + makoHost + "/settings/whitelabel",
        mako_route: "settings/whitelabel",
        is_indented: true,
        scope: "^whitelabel\\.read$",
        teammates_ignore_scope: true }, {
        title: "Domains",
        href: "" + makoHost + "/settings/whitelabel/domains",
        mako_route: "settings/whitelabel/domains",
        is_indented: true,
        scope: "^whitelabel\\.read$",
        teammates_ignore_scope: true }, {
        title: "Email Links",
        href: "" + makoHost + "/settings/whitelabel/links",
        mako_route: "settings/whitelabel/links",
        is_indented: true,
        scope: "^whitelabel\\.read$",
        teammates_ignore_scope: true }, {
        title: "IPs",
        href: "" + makoHost + "/settings/whitelabel/ips",
        mako_route: "settings/whitelabel/ips",
        role: "whitelabel_ips",
        scope: "^ips\\.read$",
        teammates_ignore_scope: true,
        is_indented: true,
        subuser_restricted: true }]
    }];
  }
};

},{"../style-guide/app/img/icons/sidebar/activity.svg":12,"../style-guide/app/img/icons/sidebar/dashboard.svg":13,"../style-guide/app/img/icons/sidebar/marketing.svg":15,"../style-guide/app/img/icons/sidebar/reports.svg":16,"../style-guide/app/img/icons/sidebar/settings.svg":17,"../style-guide/app/img/icons/sidebar/stats.svg":18,"../style-guide/app/img/icons/sidebar/templates.svg":19}],8:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Templates = require("./templates");

module.exports = (function () {
  function Subusers(params) {
    _classCallCheck(this, Subusers);

    this.$ = params.$;
    this._ = params._;

    this.$container = $(params.container_selector);
    this.$search = this.$container.find("[data-account-search-subusers]");
    this.$subusersContainer = this.$container.find("[data-account-subusers-list]");
    this.$subusersError = this.$container.find("[data-account-subusers-error]");
  }

  _createClass(Subusers, {
    bindSubusers: {
      value: function bindSubusers(params) {
        var $ = this.$;
        var _ = this._;
        var subusers = params.subusers;
        var fetcher = params.fetcher;
        var impersonatingUsername = params.currently_impersonating;
        var impersonateCallback = params.impersonate_callback;
        this.populateSubusers(subusers, impersonatingUsername);

        var self = this;
        var throttledFetch = _.throttle(function () {
          var _this = this;

          fetcher.fetchSubusers({ username: $(this).val().trim() }).done(function (subusers) {
            self.populateSubusers(subusers, impersonatingUsername);
          }).error(function () {
            _this.$subusersContainer.addClass("hidden");
            _this.$subusersError.text("Error: Unable to retrieve subuser list").removeClass("hidden");
          });
        }, 200);

        this.$search.keyup(throttledFetch);
        this.$subusersContainer.on("click", "[role=subuser]", function () {
          var $subuser = $(this);
          impersonateCallback($subuser.data("id"), $subuser.data("username"));
        });
      }
    },
    populateSubusers: {
      value: function populateSubusers(subusers, impersonatingUsername) {
        var $ = this.$;
        var _ = this._;
        subusers = _.reject(subusers, function (subuser) {
          return subuser.username === impersonatingUsername;
        });
        if (subusers.length > 0) {
          this.$subusersContainer.html(Templates.subusersHtml(subusers)).removeClass("hidden");
          this.$subusersError.addClass("hidden");
        } else {
          this.$subusersError.text("No subusers found").removeClass("hidden");
          this.$subusersContainer.addClass("hidden");
        }
      }
    }
  });

  return Subusers;
})();

},{"./templates":9}],9:[function(require,module,exports){
"use strict";

var Pages = require("./pages.js");
var logoSvg = require("../style-guide/app/img/logo-tiara.svg");
var experimentsSvg = require("../style-guide/app/img/icons/sidebar/experiments.svg");

module.exports = {
  sidebarHtml: function sidebarHtml(params) {
    var html = "\n    <nav data-tiara-nav=\"true\" data-tiara-generated=\"true\" class=\"navbar\">\n      <div role=\"show-after-fetched\" style=\"display: none\">\n        " + this.account(params.makoHost) + "\n        " + this.pages(params) + "\n        " + this.stats() + "\n        " + this.modals() + "\n        " + this.experiments(params.labsUrl) + "\n      </div>\n    </nav>";
    return html;
  },

  subusersHtml: function subusersHtml(subusers) {
    var html = "";
    for (var i in subusers) {
      var subuser = subusers[i];
      html += "<li role=\"subuser\" class=\"dropdown-link\" data-username=\"" + subuser.username + "\", data-id=\"" + subuser.id + "\">\n        " + subuser.username + "\n      </li>";
    }
    return html;
  },

  // private

  account: function account(makoHost) {
    return "<div class=\"account dropdown\" data-dropdown-toggle=\"true\">\n      <div class=\"account-title\">\n        <div class=\"account-logo\" style=\"top: -8px; left: -5px\">" + logoSvg + "</div>\n        <span class=\"account-name\" data-account-name=\"name\">&nbsp;</span>\n        <div class=\"account-name-fader\"></div>\n        <span class=\"account-expand-icon\">\n          <i class=\"sg-icon sg-icon-caret\"></i>\n        </span>\n      </div>\n\n      <div class=\"dropdown-menu dropdown-menu-account\" data-dropdown-menu=\"true\">\n        <ul class=\"account-submenu is-active\" data-account-submenu=\"account\">\n          <li>\n            <a class=\"dropdown-link\" href=\"" + makoHost + "/settings/account\" data-mako-route=\"settings/account\">Account Details</a>\n          </li>\n          <li>\n            <a class=\"dropdown-link\" href=\"" + makoHost + "/guide\" data-mako-route=\"guide\">Setup Guide</a>\n          </li>\n          <li>\n            <a class=\"dropdown-link\" target=\"_blank\" href=\"https://support.sendgrid.com/hc/en-us\">Help &amp; Support</a>\n          </li>\n          <li data-account-toggle-submenu=\"true\" data-dropdown-no-close=\"true\" style=\"display: none\">\n            <a class=\"dropdown-link\">Switch User</a>\n          </li>\n          <li data-logout=\"logout\">\n            <a class=\"dropdown-link\">Sign Out of Account</a>\n          </li>\n        </ul>\n        <ul class=\"account-submenu\" data-account-submenu=\"subusers\">\n          <li class=\"account-subusers-previous\" data-account-toggle-submenu=\"true\" data-dropdown-no-close=\"true\">\n            <a class=\"dropdown-link\">&lt; Previous</a>\n          </li>\n\n          <li class=\"dropdown-item\">\n            <input class=\"dropdown-input\" data-account-search-subusers=\"true\" data-dropdown-no-close=\"true\" placeholder=\"Search Users\">\n          </li>\n\n          <li class=\"account-subusers-list-container\">\n            <ul data-account-subusers-list=\"true\"></ul>\n          </li>\n\n          <div class=\"dropdown-text error hidden\" data-account-subusers-error=\"true\"></div>\n        </ul>\n      </div>\n    </div>";
  },

  pages: (function (_pages) {
    var _pagesWrapper = function pages(_x) {
      return _pages.apply(this, arguments);
    };

    _pagesWrapper.toString = function () {
      return _pages.toString();
    };

    return _pagesWrapper;
  })(function (params) {
    var html = "<ul class=\"pages\">";
    var pages = Pages.getPageData(params);
    for (var i in pages) {
      html += this.pageHtml(pages[i]);
    }
    return html + "</ul>";
  }),

  pageHtml: function pageHtml(page) {
    var liClass = "";
    var featureToggleAttributes = this.getFeatureToggleAttributes(page);
    var scopeAttributes = this.getScopeAttributes(page);
    var expandIcon = "";
    if (featureToggleAttributes) {
      liClass += " " + this.featureToggleHiddenClass;
    }
    if (scopeAttributes) {
      liClass += " " + this.scopeHiddenClass;
    }
    if (page.subpages) {
      expandIcon = "<span class=\"page-expand-icon\">\n        <i class=\"sg-icon sg-icon-caret\"></i>\n      </span>";
    }

    return "<li " + featureToggleAttributes + " " + scopeAttributes + " role=\"page\" class=\"page " + liClass + "\">\n      " + this.aTagStartHtml(page) + "\n        <div class=\"page-icon\">\n          " + page.img + "\n        </div>\n        <span class=\"page-title\">" + page.title + "</span>\n        " + expandIcon + "\n      </a>\n      " + this.subpagesHtml(page.subpages) + "\n    </li>";
  },

  subpagesHtml: function subpagesHtml(subpages) {
    if (!subpages) {
      return "";
    }

    var html = "<ul role=\"subpages\" class=\"subpages\">";
    for (var i in subpages) {
      html += this.subpageHtml(subpages[i]);
    }
    return html + "</ul>";
  },

  subpageHtml: function subpageHtml(subpage) {
    var html = undefined;
    var featureToggleAttributes = this.getFeatureToggleAttributes(subpage);
    var scopeAttributes = this.getScopeAttributes(subpage);
    var subuserRestrictedAttributes = this.getSubuserRestrictedAttributes(subpage);
    var classes = "subpage";
    if (featureToggleAttributes) {
      classes += " " + this.featureToggleHiddenClass;
    }
    if (scopeAttributes) {
      classes += " " + this.scopeHiddenClass;
    }
    if (subuserRestrictedAttributes) {
      classes += " " + this.subuserHiddenClass;
    }
    var spanClasses = "subpage-title";
    if (subpage.is_indented) {
      spanClasses += " is-indented";
    }

    html = "<li " + featureToggleAttributes + " " + scopeAttributes + " " + subuserRestrictedAttributes + " class=\"" + classes + "\">\n      " + this.aTagStartHtml(subpage, true) + "\n        <span class=\"" + spanClasses + "\">\n          " + subpage.title + "\n        </span>\n      </a>";
    return html + "</li>";
  },

  getFeatureToggleAttributes: function getFeatureToggleAttributes(page) {
    if (page.feature_toggle) {
      return "data-ft-app=\"" + page.feature_toggle[0] + "\" data-ft-feature=\"" + page.feature_toggle[1] + "\"";
    }
    return "";
  },

  getScopeAttributes: function getScopeAttributes(page) {
    var result = "";
    if (page.scope) {
      result += "data-scope=\"" + page.scope + "\" ";
    }

    if (page.teammates_ignore_scope) {
      result += "data-teammates-ignore-scope=\"" + page.teammates_ignore_scope + "\" ";
    }
    return result;
  },

  getSubuserRestrictedAttributes: function getSubuserRestrictedAttributes(page) {
    if (page.subuser_restricted) {
      return "data-subuser-restricted=\"" + page.subuser_restricted + "\" ";
    }
    return "";
  },

  featureToggleHiddenClass: "feature-toggle-hidden",
  scopeHiddenClass: "scope-hidden",
  subuserHiddenClass: "subuser-hidden",

  aTagStartHtml: function aTagStartHtml(page, isSubpage) {
    var klass = isSubpage ? "subpage-link" : "page-link";
    var html = "<a class=\"" + klass + "\"";
    if (page.href !== undefined) {
      html += " href=\"" + page.href + "\"";
    }
    if (page.role) {
      html += " role=\"" + page.role + "\"";
    }
    if (page.hidden) {
      html += " style=\"display: none\"";
    }
    if (page.title) {
      html += " data-nav-title=\"" + page.title.toLowerCase() + "\" ";
    }
    if (page.mako_route) {
      html += " data-mako-route=\"" + page.mako_route + "\"";
    }
    return html + ">";
  },

  stats: function stats() {
    return "<div class=\"navbar-stats\">\n      <div class=\"meter-container\">\n        <span class=\"meter-title has-underline\" data-tooltip=\"Your SendGrid reputation reflects the last 30 days and is updated daily. It goes up for every delivered email, and down for every bounce or spam report. It does not represent your inboxing percentage at mailbox providers.\" data-tooltip-pos=\"right\" data-tooltip-length=\"large\"><abbr>Reputation</abbr></span>\n        <span class=\"meter-value\" role=\"reputation\"></span>\n\n        <div class=\"meter-bar\">\n          <div class=\"meter-bar-fill\" role=\"reputation-progress-bar\"></div>\n        </div>\n      </div>\n\n      <div class=\"meter-container\">\n        <span role=\"credits-reset-frequency\" class=\"meter-title has-underline\" data-tooltip=\"The total number of emails you've requested this month.\" data-tooltip-pos=\"right\" data-tooltip-length=\"large\"><abbr role=\"credits-reset-frequency-label\">Emails this month</abbr></span>\n        <div class=\"emails-sent-today\" role=\"usage-metric\"></div>\n      </div>\n    </div>";
  },

  impersonationBanner: function impersonationBanner(impersonatingUsername) {
    return "<div class=\"impersonation-banner\">\n      <div role=\"back-to-parent-account\" class=\"impersonation-banner-back\">\n        &larr; Back to Parent Account\n      </div>\n\n      <div class=\"impersonation-banner-title\">You're currently logged in as <span class=\"impersonation-banner-username\" role=\"subuser-username\">" + impersonatingUsername + "</span></div>\n\n      <div class=\"impersonation-banner-switch-container\" data-impersonation-banner-switch-subuser-container=\"true\">\n        <div class=\"impersonation-banner-switch dropdown\" data-dropdown-toggle=\"true\">\n          <span class=\"impersonation-banner-switch-title\">Switch Subuser</span>\n\n          <div class=\"dropdown-menu dropdown-menu-right-aligned dropdown-menu-spaced dropdown-menu-account\" data-dropdown-menu=\"true\">\n            <div class=\"dropdown-item\">\n              <input class=\"dropdown-input\" data-account-search-subusers=\"true\" data-dropdown-no-close=\"true\" placeholder=\"Search Users\">\n            </div>\n            <ul data-account-subusers-list=\"true\"></ul>\n            <div class=\"dropdown-text error hidden\" data-account-subusers-error=\"true\"></div>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>";
  },

  modals: function modals() {
    return "<div class=\"hidden conf-alert conf-alert-old-sg-warning\" data-conf-alert-old-sg-warning=\"true\">\n      <h2 class=\"conf-alert-header\">\n        Please note that you will be taken to the old SendGrid interface where you will be logged in as the parent user. You will need to reselect the subuser on the next page.\n      </h2>\n      <div class=\"conf-alert-actions\">\n        <a class=\"btn btn-small btn-secondary\" data-old-sg-warning-cancel-btn=\"true\">Cancel</a>\n        <a class=\"btn btn-small btn-primary\" data-old-sg-warning-ok-btn=\"true\">OK</a>\n      </div>\n    </div>\n    ";
  },

  barClass: function barClass(percentage) {
    switch (true) {
      case percentage > 50:
        return "is-above-50";
      case percentage > 25:
        return "is-below-50";
      default:
        return "is-below-25";
    }
  },

  prettyNumber: function prettyNumber(num) {
    if (isNaN(num)) {
      return "N/A";
    } else {
      return this.abbrNum(num, 2);
    }
  },

  // from http://stackoverflow.com/a/2686098
  abbrNum: function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);

    var abbrev = ["k", "m", "b", "t"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {

      // Convert array index to "1000", "1000000", etc
      var size = Math.pow(10, (i + 1) * 3);

      // If the number is bigger or equal do the abbreviation
      if (size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round(number * decPlaces / size) / decPlaces;

        // Handle special case where we round up to the next abbreviation
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        // We are done... stop
        break;
      }
    }

    return number;
  },

  experiments: function experiments(labsUrl) {
    return "\n      <div data-role=\"experiments-container\" class=\"hidden experiments-container\">\n        <a href=\"" + labsUrl + "\" data-role=\"experiments-link\" class=\"experiments-link\">\n          <div class=\"experiments-logo\">\n            " + experimentsSvg + "\n          </div>\n          <div class=\"experiments-title\">\n            Experiments\n          </div>\n        </a>\n      </div>\n    ";
  }
};

},{"../style-guide/app/img/icons/sidebar/experiments.svg":14,"../style-guide/app/img/logo-tiara.svg":20,"./pages.js":7}],10:[function(require,module,exports){
"use strict";

var Helpers = require("./helpers");
var Templates = require("./templates");
var Fetcher = require("./fetcher");
var Subusers = require("./subusers");
var Pages = require("./pages");
var Banner = require("./banner");
var DeferredHandlers = require("./deferred_handlers");
var whenAll = require("./when_all");

var _ = undefined,
    $ = undefined;
var RESELLER_BANNER_COOKIE = "mako-reseller-header";
var READ_TOOLTIPS_COOKIE = "read-tooltips";
var IMPERSONATING_USERNAME_COOKIE = "sendgrid-impersonating-username";
var ADMIN_IMPERSONATION_COOKIE = "sendgrid-admin-impersonation";
var MAKO_AUTH_TOKEN_COOKIE = "mako_auth_token";
var SITE_COOKIE = "sendgrid_frontend";
var EMAIL_CONFIRMED_COOKIE = "mako_email_confirmed";

// See https://segment.com/docs/libraries/analytics.js/#selecting-integrations
var VISUAL_SEGMENT_INTEGRATIONS = {
  All: true
};

var NON_VISUAL_SEGMENT_INTEGRATIONS = {
  All: true,
  Intercom: false,
  WebEngage: false
};

module.exports = {
  run: function run(config) {
    window.SendGridTiara = {
      init: function init(params) {
        var _this = this;

        $ = params.jQuery;
        _ = params.underscore;
        this.auth_token = params.auth_token || $.cookie(MAKO_AUTH_TOKEN_COOKIE);
        this.target = params.target || "[role=tiara-target]";
        this.render = params.render || function () {};
        this.api_host = params.api_host || "https://api.sendgrid.com/v3/";
        this.sg_host = params.sg_host === undefined ? "https://sendgrid.com" : params.sg_host;
        this.logoutCallback = params.logoutCallback || this.defaultLogout.bind(this);
        this.readTooltips = params.read_tooltips || this._getReadTooltips();
        this.resellerHeader = params.reseller_header || this._getResellerHeader($);
        this.nlvxHost = params.nlvxHost === undefined ? "https://sendgrid.com/marketing_campaigns" : params.nlvxHost;
        this.makoHost = params.makoHost ? params.makoHost : "https://app.sendgrid.com";
        this.revealAllLinks = params.revealAllLinks;
        this.shouldLogoutOnAuthFail = params.shouldLogoutOnAuthFail;
        this.shouldHideSidebar = params.shouldHideSidebar;
        this.segmentIntegrations = params.shouldHideSegmentIntegrations ? NON_VISUAL_SEGMENT_INTEGRATIONS : VISUAL_SEGMENT_INTEGRATIONS;
        this.shouldMakeRequests = params.shouldMakeRequests === undefined ? true : params.shouldMakeRequests;
        this.labsUrl = params.labsUrl || (config.labs_url || "https://labs.sendgrid.com");
        this.segmentKey = params.segmentKey || config.api_key;

        // expose default segment integration options just in case the client
        // needs them to do more advanced tracking
        this.VISUAL_SEGMENT_INTEGRATIONS = VISUAL_SEGMENT_INTEGRATIONS;
        this.NON_VISUAL_SEGMENT_INTEGRATIONS = NON_VISUAL_SEGMENT_INTEGRATIONS;

        whenAll.load($); // attach $.whenAll function
        var banner = new Banner(".tiara-headers", this.makoHost);

        // subuser impersonation params
        this.disableImpersonation = params.disable_impersonation;
        if (!this.disableImpersonation) {
          this.impersonating = params.impersonating || $.cookie(IMPERSONATING_USERNAME_COOKIE);
          this.impersonateCallback = params.impersonate_callback || this._defaultImpersonateCallback;
          this.backToParentCallback = params.back_to_parent_callback || this._defaultBackToParentCallback;
        }

        // Log out if auth token is missing
        if (!this.auth_token && this.shouldLogoutOnAuthFail) this.logoutCallback();

        if (this.shouldHideSidebar) {
          // skip all dom manipulation, just set up deferreds and analytics
          this.helpers = new Helpers($, _, $(""));
          this.render();
          this.hasInitialized = true;

          var _defs = this._createDeferreds();
          var _deferredHandlers = new DeferredHandlers(_defs, this.helpers, banner);
          if (this.segmentKey) {
            _deferredHandlers.loadAnalytics(this.segmentKey, this.segmentIntegrations);
          } else {
            console.error("Could not find a Segment API key for this environment.");
          }
          _deferredHandlers.hideLoadingScreen();
          return _defs;
        }

        // find target
        var $target = $(this.target);
        if ($target.length == 0) {
          console.error("Could not find element matching " + targetSelector);
          $("[data-role=main-loader]").fadeOut();
          return;
        }

        this._wrapTarget($target);

        this.helpers = new Helpers($, _, $("[data-tiara-generated]"));
        this.helpers.bindNav();
        this.helpers.bindAccount(this.logoutCallback);
        this.render();
        this.hasInitialized = true;

        // set up impersonation and subuser helpers
        if (this.impersonating) {
          (function () {
            _this.subusersHelper = new Subusers({ $: $, _: _,
              container_selector: "[data-impersonation-banner-switch-subuser-container]"
            });

            // show warning modal if navigating to nlv3 while impersonating
            var $modal = $("[data-conf-alert-old-sg-warning]");
            $("[role=nlv3]").click(function (e) {
              $modal.removeClass("hidden");
              return false;
            });
            $("[data-old-sg-warning-cancel-btn]").click(function () {
              $modal.addClass("hidden");
            });
            $("[data-old-sg-warning-ok-btn]").prop("href", "https://sendgrid.com/subuser");
          })();
        } else {
          this.subusersHelper = new Subusers({ $: $, _: _,
            container_selector: "[data-account-submenu=subusers]"
          });
        }

        var defs = this._createDeferreds();

        // now that we've set up our fetchers and deferred user data, bind to them
        var deferredHandlers = new DeferredHandlers(defs, this.helpers, banner, this.revealAllLinks);
        deferredHandlers.revealPagesViaFeatureTogglesAndScopes();
        deferredHandlers.revealPagesViaAccount();
        deferredHandlers.renderPages().always(function () {
          return _this.updateNav();
        });
        deferredHandlers.showReputationBar();
        deferredHandlers.showCreditsBar();
        deferredHandlers.showUsage();
        deferredHandlers.showAccountName();
        deferredHandlers.showLegacyNewsletterLink();
        deferredHandlers.hideLoadingScreen();
        deferredHandlers.revealExperiments(this.resellerHeader);
        if (this.segmentKey) {
          deferredHandlers.loadAnalytics(this.segmentKey, this.segmentIntegrations);
        } else {
          console.error("Could not find a Segment API key for this environment.");
        }
        deferredHandlers.renderBanner();
        deferredHandlers.revealEmailsRemaining();

        if (!this.disableImpersonation) {
          deferredHandlers.showSubusers(this.subusersHelper, this.fetcher, this.parentFetcher, this.impersonating, this.impersonateCallback);
        }

        deferredHandlers.preventImpersonationIfNecessary();

        // return deferred userdata
        return defs;
      },

      updateNav: function updateNav() {
        if (this.hasInitialized) {
          if (window.analytics) {
            this.analyticsPage();
          }

          this.helpers.activateNav(document.location.pathname.toLowerCase(), $("[data-tiara-nav] .pages"));
          this._updateContactsPageForBeta();
        }
      },

      updateName: function updateName(name) {
        if (this.hasInitialized) {
          this.helpers.showAccount(name);
        }
      },

      refreshHiddenLinks: function refreshHiddenLinks() {
        var _this = this;

        if (this.hasInitialized) {
          this.fetcher.fetchFeatureToggles().done(function (data) {
            _this.helpers.revealLinksViaFeatureToggles(data);
          });
          this.fetcher.fetchScopes().done(function (data) {
            _this.helpers.revealLinksViaScopes(data.scopes);
          });
        }
      },

      updateSubusers: function updateSubusers() {
        var _this = this;

        if (this.hasInitialized) {
          if (this.impersonating) {
            this.parentFetcher.fetchSubusers().done(function (subusers) {
              if (subusers.length > 1) {
                // can't re-impersonate as same subuser
                $("[role=switch-menu]").css("opacity", 1);
              } else {
                $("[role=switch-menu]").css("opacity", 0);
              }
              _this.subusersHelper.populateSubusers(subusers, _this.impersonating);
            });
          } else {
            this.fetcher.fetchSubusers().done(function (subusers) {
              if (subusers.length === 0) {
                $("[role=switch-subuser]").hide();
              }
              _this.subusersHelper.populateSubusers(subusers);
            });
          }
        }
      },

      defaultLogout: function defaultLogout(clickedLogOut) {
        // Delete session server-side redirect after completion
        var self = this;
        $.ajax({
          url: "" + self.api_host + "tokens",
          method: "DELETE",
          contentType: "application/json",
          data: JSON.stringify({ token: $.cookie(MAKO_AUTH_TOKEN_COOKIE) }),
          complete: function complete() {

            // Since site needs to read in the cookie, a cross-domain ajax call won't work.
            // This frame won't render due to CSP, but that's fine, since site will still
            // process the iframe request and delete the cookie server-side.
            $("<iframe src=\"" + self.sg_host + "/user/logout?session=true\"></iframe>").appendTo($("body"));

            // Delete cookies
            $.removeCookie(MAKO_AUTH_TOKEN_COOKIE);
            $.removeCookie(RESELLER_BANNER_COOKIE);
            $.removeCookie(ADMIN_IMPERSONATION_COOKIE);
            $.removeCookie(IMPERSONATING_USERNAME_COOKIE);
            $.removeCookie(SITE_COOKIE);
            $.removeCookie(EMAIL_CONFIRMED_COOKIE);

            // Redirect to login or logged-out page
            var destination = undefined;
            if (clickedLogOut) {
              destination = "" + self.sg_host + "/logged-out";
            } else {
              var redirect_to = encodeURIComponent(window.location.pathname + window.location.search);

              //Remove /'s in the path so /login/ and /login are the same
              if (window.location.pathname.replace(/\//g, "") === "login") {
                redirect_to = "";
              } else {
                redirect_to = "?redirect_to=" + redirect_to;
              }

              destination = "" + self.makoHost + "/login" + redirect_to;
            }
            window.location.href = destination;
          }
        });
      },

      getImpersonatingUsername: function getImpersonatingUsername() {
        return $.cookie(IMPERSONATING_USERNAME_COOKIE);
      },

      analytics: function analytics() {
        return window.analytics;
      },

      analyticsTrack: function analyticsTrack(event, properties, options, callback) {
        if (window.analytics) {
          var defaultOptions = { integrations: this.segmentIntegrations };

          // properties, options, and callback are all optional
          // https://segment.com/docs/sources/website/analytics.js/#track
          if (_.isFunction(options)) {
            callback = options;
            options = defaultOptions;
          } else if (_.isFunction(properties)) {
            callback = properties;
            properties = {};
            options = defaultOptions;
          } else {
            options = options || {};
            properties = properties || {};
            options = _.extend(defaultOptions, options);
          }

          window.analytics.track.call(window.analytics, event, properties, options, callback);
        }
      },

      analyticsPage: function analyticsPage() {
        if (window.analytics) {
          window.analytics.page(undefined, undefined, undefined, {
            integrations: this.segmentIntegrations
          });
        }
      },

      // private

      _defaultImpersonateCallback: function _defaultImpersonateCallback(subuserId, subuserUsername) {
        $.cookie(IMPERSONATING_USERNAME_COOKIE, subuserUsername);
        window.location.reload();
      },

      _defaultBackToParentCallback: function _defaultBackToParentCallback() {
        $.removeCookie(IMPERSONATING_USERNAME_COOKIE);
        window.location.reload();
      },

      _wrapTarget: function _wrapTarget($target) {
        var _this = this;

        var $tiaraContentContainer = $("<div class=\"tiara-content-container\"></div>");
        $target.wrap($tiaraContentContainer);
        $(".tiara-content-container").wrap("<div class=\"tiara-container\"></div>");
        $(".tiara-container").prepend(Templates.sidebarHtml({
          nlvxHost: this.nlvxHost,
          makoHost: this.makoHost,
          sgHost: this.sg_host,
          labsUrl: this.labsUrl }));
        $(".tiara-container").prepend("<header class=\"tiara-headers\" data-tiara-generated=\"true\"></header>");
        if (this.disableImpersonation) {
          $("[role=switch-subuser]").hide();
        }
        // hide Legacy Newsletter link by default
        $("[role=nlv3]").hide();
        if (this.impersonating) {
          $(".tiara-headers").prepend(Templates.impersonationBanner(this.impersonating));
          $("[role=back-to-parent-account]").click(this.backToParentCallback);
        }
        if (this.resellerHeader) {
          if (this.resellerHeader.reseller_boomerang_header) {
            (function () {
              var self = _this;
              $.getScript(_this.resellerHeader.reseller_boomerang_header, function () {
                Boomerang.init({
                  app: self.resellerHeader.reseller_heroku_app,
                  addon: "SendGrid"
                });
              });
            })();
          }
        }
      },

      _getReadTooltips: function _getReadTooltips() {
        try {
          return JSON.parse($.cookie(READ_TOOLTIPS_COOKIE));
        } catch (err) {
          return null;
        }
      },

      _hasReadTooltip: function _hasReadTooltip(tooltip) {
        if (this.readTooltips) {
          return this.readTooltips[tooltip] || false;
        } else {
          return false;
        }
      },

      _setReadTooltip: function _setReadTooltip(tooltip) {
        if (!this.readTooltips) {
          this.readTooltips = {};
        }
        this.readTooltips[tooltip] = true;
        $.cookie(READ_TOOLTIPS_COOKIE, JSON.stringify(this.readTooltips), { expires: 365500 });
      },

      _createDeferreds: function _createDeferreds() {
        var defs = {};

        // Use a no-op if we don't want to log them out when auth token is expired
        var logoutCallback = this.shouldLogoutOnAuthFail ? this.logoutCallback : function () {};

        if (this.auth_token && this.shouldMakeRequests) {
          if (this.impersonating) {
            this.fetcher = new Fetcher($, this.auth_token, {
              api_host: this.api_host,
              impersonating: this.impersonating,
              logoutCallback: logoutCallback
            });
            this.parentFetcher = new Fetcher($, this.auth_token, { api_host: this.api_host });

            defs.account = this.fetcher.fetchAccount();
            defs.credits = this.fetcher.fetchCredits();
            defs.usage_stats = this.fetcher.fetchCreditsIncludingSubusers();
            defs.profile = this.fetcher.fetchProfile();
            defs.feature_toggles = this.fetcher.fetchFeatureToggles();
            defs.scopes = this.fetcher.fetchScopes();
            defs.username = this.fetcher.fetchUsername();
            defs.email = this.fetcher.fetchEmail();
            defs.pkg = this.fetcher.fetchPackage();
            defs.signup_status = $.Deferred().resolve([]); // subusers never have s2s status
            defs.user_status = this.fetcher.fetchUserStatus();
            defs.user_type = this.fetcher.fetchUserType();
            defs.subusers = $.Deferred().resolve([]); // subusers never have subusers
            defs.parent_subusers = this.parentFetcher.fetchSubusers();
            defs.nlv3 = this.fetcher.fetchLegacyNewsletterAccess();
          } else {
            this.fetcher = new Fetcher($, this.auth_token, {
              api_host: this.api_host,
              logoutCallback: logoutCallback
            });

            defs.account = this.fetcher.fetchAccount();
            defs.credits = this.fetcher.fetchCredits();
            defs.usage_stats = this.fetcher.fetchCreditsIncludingSubusers();
            defs.profile = this.fetcher.fetchProfile();
            defs.feature_toggles = this.fetcher.fetchFeatureToggles();
            defs.scopes = this.fetcher.fetchScopes();
            defs.username = this.fetcher.fetchUsername();
            defs.email = this.fetcher.fetchEmail();
            defs.pkg = this.fetcher.fetchPackage();
            defs.signup_status = this.fetcher.fetchSignupStatus();
            defs.user_status = this.fetcher.fetchUserStatus();
            defs.user_type = this.fetcher.fetchUserType();
            defs.subusers = this.fetcher.fetchSubusers();
            defs.parent_subusers = $.Deferred().reject();
            defs.nlv3 = this.fetcher.fetchLegacyNewsletterAccess();
          }
        } else {
          defs.account = $.Deferred().reject();
          defs.credits = $.Deferred().reject();
          defs.usage_stats = $.Deferred().reject();
          defs.profile = $.Deferred().reject();
          defs.feature_toggles = $.Deferred().reject();
          defs.scopes = $.Deferred().reject();
          defs.username = $.Deferred().reject();
          defs.email = $.Deferred().reject();
          defs.pkg = $.Deferred().reject();
          defs.subusers = $.Deferred().reject();
          defs.signup_status = $.Deferred().reject();
          defs.user_status = $.Deferred().reject();
          defs.user_type = $.Deferred().reject();
          defs.parent_subusers = $.Deferred().reject();
          defs.nlv3 = $.Deferred().reject();
        }

        return this.defs = defs;
      },

      _getAllRoutes: function _getAllRoutes(makoHost, nlvxHost) {
        var routes = [];
        var pageData = Pages.getPageData({
          makoHost: this.makoHost,
          nlvxHost: this.nlvxHost,
          sgHost: this.sg_host
        });
        for (var i in pageData) {
          routes.push(this._getSubpages(pageData[i]));
        }
        routes = _.flatten(routes);
        routes = _.sortBy(routes, "length");
        return routes;
      },

      _getSubpages: function _getSubpages(page) {
        var hrefs = page.href ? [page.href] : [];
        if (page.subpages) {
          for (var i in page.subpages) {
            hrefs.push(this._getSubpages(page.subpages[i]));
          }
        }
        return hrefs;
      },

      _getResellerHeader: function _getResellerHeader() {
        try {
          return JSON.parse(atob($.cookie(RESELLER_BANNER_COOKIE)));
        } catch (err) {
          return null;
        }
      },

      _updateContactsPageForBeta: function _updateContactsPageForBeta() {
        // Remove on 2017-11-01
        this.defs.username.then(function (username) {
          var userId = username.user_id;
          function isEven(n) {
            return !(n % 2);
          }
          if (isEven(userId)) {
            var contactsLink = $("[data-nav-title=\"contacts\"]");
            contactsLink.attr("href", "/marketing_campaigns/ui/contacts");
          }
        }).fail(function (error) {
          // This isn't mission critical. So, fail mostly silently.
          console.error("Error loading username for Contacts A/B Beta Split", error);
        });
      }
    };
  }
};

},{"./banner":2,"./deferred_handlers":4,"./fetcher":5,"./helpers":6,"./pages":7,"./subusers":8,"./templates":9,"./when_all":11}],11:[function(require,module,exports){
"use strict";

module.exports = {
  load: function load($) {
    // from http://stackoverflow.com/a/30381148
    $.whenAll = function (deferreds) {
      var lastResolved = 0;
      var wrappedDeferreds = [];

      for (var i = 0; i < deferreds.length; i++) {
        wrappedDeferreds.push($.Deferred());
        if (deferreds[i] && deferreds[i].always) {
          deferreds[i].always(wrappedDeferreds[lastResolved++].resolve);
        } else {
          wrappedDeferreds[lastResolved++].resolve(deferreds[i]);
        }
      }

      return $.when.apply($, wrappedDeferreds).promise();
    };
  }
};

},{}],12:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"\r\n\t xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-290 382 30 30\"\r\n\t style=\"enable-background:new -290 382 30 30;\" xml:space=\"preserve\">\r\n<g>\r\n\t<path style=\"fill:#FF9900\" d=\"M-264.8,405.2l-2.7-2.7c0.5-0.6,0.8-1.4,0.8-2.3c0-2.1-1.7-3.8-3.8-3.8c-2.1,0-3.8,1.7-3.8,3.8\r\n\t\ts1.7,3.8,3.8,3.8c0.9,0,1.6-0.3,2.3-0.8l2.7,2.7L-264.8,405.2z M-270.5,403c-1.5,0-2.8-1.2-2.8-2.8c0-1.5,1.2-2.8,2.8-2.8\r\n\t\tc1.5,0,2.8,1.2,2.8,2.8C-267.6,401.8-268.9,403-270.5,403z\"/>\r\n\t<path style=\"fill:#284661\" d=\"M-266.2,389.5v6.5h1v-6.5c0-0.7-0.8-1.5-1.5-1.5h-17c-0.7,0-1.5,0.8-1.5,1.5v11c0,0.7,0.8,1.5,1.5,1.5h7.5v-1\r\n\t\th-7.5c-0.1,0-0.5-0.4-0.5-0.5v-11l0,0l8.8,5.1c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1L-266.2,389.5L-266.2,389.5z\r\n\t\t M-275.1,393.8l-8-4.6h15.7L-275.1,393.8z\"/>\r\n</g>\r\n</svg>\r\n";

},{}],13:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"\r\n\t xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-290 382 30 30\"\r\n\t style=\"enable-background:new -290 382 30 30;\" xml:space=\"preserve\">\r\n<g id=\"Page-1\" sketch:type=\"MSPage\">\r\n\t<g id=\"Icon\" transform=\"translate(1.000000, 1.000000)\" sketch:type=\"MSLayerGroup\">\r\n\t\t<circle id=\"Oval\" sketch:type=\"MSShapeGroup\" style=\"fill:#1A82E2\" cx=\"-276\" cy=\"399\" r=\"1\"> </circle>\r\n\t\t<path style=\"fill:#284661;\" d=\"M-265.5,403.5h-21v-4.8c0-5.6,4.9-10.2,11-10.2c5.3,0,10,4.8,10,10.2V403.5z M-285.5,402.5h19v-3.8\r\n\t\t\tc0-4.9-4.2-9.2-9-9.2c-5.5,0-10,4.1-10,9.2V402.5z\"/>\r\n\t\t<path id=\"Rectangle\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-283,399L-283,399c0.6,0,1,0.2,1,0.5l0,0c0,0.3-0.4,0.5-1,0.5\r\n\t\t\tl0,0c-0.6,0-1-0.2-1-0.5l0,0C-284,399.2-283.6,399-283,399z\"/>\r\n\t\t<path id=\"Rectangle_1_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-282.5,396L-282.5,396c0.3,0,0.5,0.2,0.5,0.5l0,0\r\n\t\t\tc0,0.3-0.2,0.5-0.5,0.5l0,0c-0.3,0-0.5-0.2-0.5-0.5l0,0C-283,396.2-282.8,396-282.5,396z\"/>\r\n\t\t<path id=\"Rectangle_2_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-280.5,394L-280.5,394c0.3,0,0.5,0.2,0.5,0.5l0,0\r\n\t\t\tc0,0.3-0.2,0.5-0.5,0.5l0,0c-0.3,0-0.5-0.2-0.5-0.5l0,0C-281,394.2-280.8,394-280.5,394z\"/>\r\n\t\t<path id=\"Rectangle_3_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-278.5,392L-278.5,392c0.3,0,0.5,0.2,0.5,0.5l0,0\r\n\t\t\tc0,0.3-0.2,0.5-0.5,0.5l0,0c-0.3,0-0.5-0.2-0.5-0.5l0,0C-279,392.2-278.8,392-278.5,392z\"/>\r\n\t\t<path id=\"Rectangle_4_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-273.5,392L-273.5,392c0.3,0,0.5,0.2,0.5,0.5l0,0\r\n\t\t\tc0,0.3-0.2,0.5-0.5,0.5l0,0c-0.3,0-0.5-0.2-0.5-0.5l0,0C-274,392.2-273.8,392-273.5,392z\"/>\r\n\t\t<path id=\"Rectangle_6_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-269.5,396L-269.5,396c0.3,0,0.5,0.2,0.5,0.5l0,0\r\n\t\t\tc0,0.3-0.2,0.5-0.5,0.5l0,0c-0.3,0-0.5-0.2-0.5-0.5l0,0C-270,396.2-269.8,396-269.5,396z\"/>\r\n\t\t<path id=\"Rectangle_7_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-269,399L-269,399c0.6,0,1,0.2,1,0.5l0,0c0,0.3-0.4,0.5-1,0.5\r\n\t\t\tl0,0c-0.6,0-1-0.2-1-0.5l0,0C-270,399.2-269.6,399-269,399z\"/>\r\n\t\t<path id=\"Rectangle_8_\" sketch:type=\"MSShapeGroup\" style=\"fill:#FDD835\" d=\"M-276,391L-276,391c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1l0,0\r\n\t\t\tc-0.6,0-1-0.4-1-1l0,0C-277,391.4-276.6,391-276,391z\"/>\r\n\t\t\r\n\t\t\t<rect x=\"-273.6\" y=\"393.1\" transform=\"matrix(-0.7069 -0.7074 0.7074 -0.7069 -746.2077 482.7252)\" style=\"fill:#FF5722\" width=\"1\" height=\"5.8\"/>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";

},{}],14:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"19px\" height=\"22px\" viewBox=\"0 0 19 22\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->\n    <title>experiments-icon</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"Icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"experiments-icon\" transform=\"translate(-5.000000, -4.000000)\">\n            <rect id=\"Icon-Background\" x=\"0\" y=\"0\" width=\"30\" height=\"30\"></rect>\n            <g id=\"science-lightbulb\" transform=\"translate(6.000000, 5.000000)\">\n                <polyline id=\"Shape\" stroke=\"#7F90A0\" stroke-linejoin=\"round\" points=\"6.28676471 14.1666667 6.28676471 16.25 11.3161765 16.25 11.3161765 14.1666667\"></polyline>\n                <rect id=\"Rectangle-path\" stroke=\"#7F90A0\" stroke-linejoin=\"round\" x=\"7.125\" y=\"16.25\" width=\"3.35294118\" height=\"1.66666667\"></rect>\n                <path d=\"M8.80147059,17.9166667 L8.80147059,19.5833333\" id=\"Shape\" stroke=\"#7F90A0\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M9.22058824,14.1666667 L10.2893382,9.5625 C10.3999853,9.0875 10.8258088,8.75 11.3161765,8.75 C11.7797206,8.75 12.1544118,9.1225 12.1544118,9.58333333 C12.1544118,10.0441667 11.7797206,10.4166667 11.3161765,10.4166667 L8.80147059,10.4166667 L6.28676471,10.4166667 C5.82322059,10.4166667 5.44852941,10.0441667 5.44852941,9.58333333 C5.44852941,9.1225 5.82322059,8.75 6.28676471,8.75 C6.77713235,8.75 7.20295588,9.08666667 7.31360294,9.5625 L8.38235294,14.1666667\" id=\"Shape\" stroke=\"#FDD835\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <ellipse id=\"Oval\" stroke=\"#FF9900\" cx=\"8.80147059\" cy=\"8.75\" rx=\"5.86764706\" ry=\"5.83333333\"></ellipse>\n                <path d=\"M8.80147059,0.416666667 L8.80147059,1.25\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M14.7286324,2.8575 L14.136,3.44666667\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M17.1838235,8.75 L16.3455882,8.75\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M14.7286324,14.6425 L14.136,14.0533333\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M2.87430882,2.8575 L3.46694118,3.44666667\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M0.419117647,8.75 L1.25735294,8.75\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M2.87430882,14.6425 L3.46694118,14.0533333\" id=\"Shape\" stroke=\"#FF9900\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n            </g>\n        </g>\n    </g>\n</svg>";

},{}],15:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg viewBox=\"0 0 30 30\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n    <defs></defs>\n    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Icon\" sketch:type=\"MSLayerGroup\">\n            <path d=\"M8,18.4389205 C8,20.6648519 9.24949612,22.5309386 11.2968616,23.44125 C11.5491867,23.5534403 11.8446848,23.4398385 11.956875,23.1875134 C12.0690653,22.9351883 11.9554635,22.6396902 11.7031384,22.5275 C10.0119925,21.7755729 9,20.2641911 9,18.4389205 L9,12.984375 C9,12.7082326 8.77614237,12.484375 8.5,12.484375 C8.22385763,12.484375 8,12.7082326 8,12.984375 L8,18.4389205 Z\" id=\"Shape\" fill=\"#B71C1C\" sketch:type=\"MSShapeGroup\"></path>\n            <path d=\"M19,15.875 C19,16.496 18.328,17 17.5,17 L17,17 L17,14 L17.5,14 C18.328,14 19,14.504 19,15.125 L19,15.875 L19,15.875 Z\" id=\"Stroke\" fill=\"#2196F3\" sketch:type=\"MSShapeGroup\"></path>\n            <path d=\"M7,12 C5.99993896,12 5,12.6733125 5,14 L5,16 C5,17.3266875 5.93743896,18 7,18 L8,18 C14.2335714,18.25 13.85,20.62225 17,22 L17,9 C13.8564286,10.375 14.2371429,11.75 8,12 L7,12 Z\" id=\"Stroke\" stroke=\"#284661\" stroke-linecap=\"round\" stroke-linejoin=\"round\" sketch:type=\"MSShapeGroup\"></path>\n            <path d=\"M18.828125,10.03125 C20.185125,11.38825 21.025125,13.26325 21.025125,15.33425 C21.025125,17.40525 20.185125,19.28025 18.828125,20.63725\" id=\"Stroke\" stroke=\"#7B1FA2\" stroke-linecap=\"round\" sketch:type=\"MSShapeGroup\"></path>\n            <path d=\"M21.140625,7.015625 C23.221625,9.096625 24.508625,11.971625 24.508625,15.147625 C24.508625,18.323625 23.221625,21.198625 21.140625,23.279625\" id=\"Stroke\" stroke=\"#DEA7E8\" stroke-linecap=\"round\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n    </g>\n</svg>\n";

},{}],16:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"\r\n\t xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-290 382 30 30\"\r\n\t style=\"enable-background:new -290 382 30 30;\" xml:space=\"preserve\">\r\n<g>\r\n\t<path style=\"fill:#E3471B\" d=\"M-269.6,395.9c-2.5,0-4.6,2.1-4.6,4.6s2.1,4.6,4.6,4.6s4.6-2.1,4.6-4.6S-267.1,395.9-269.6,395.9z\r\n\t\t M-273.2,400.5c0-2,1.6-3.6,3.6-3.6c0.8,0,1.5,0.3,2.1,0.7l-5,5C-272.9,402-273.2,401.3-273.2,400.5z M-269.6,404.1\r\n\t\tc-0.8,0-1.5-0.3-2.1-0.7l5-5c0.5,0.6,0.7,1.3,0.7,2.1C-266.1,402.5-267.8,404.1-269.6,404.1z\"/>\r\n\t<path style=\"fill:#284661\" d=\"M-266.5,388.9h-17c-0.7,0-1.5,0.8-1.5,1.5v11c0,0.7,0.8,1.5,1.5,1.5h7.5v-1h-7.5c-0.1,0-0.5-0.4-0.5-0.5v-11\r\n\t\tl0,0l8.8,5.1c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.2,0,0.3-0.1l8.7-5.2l0,0v4.5h1v-4.5C-265,389.8-265.8,388.9-266.5,388.9z\r\n\t\t M-274.9,394.6l-8-4.6h15.7L-274.9,394.6z\"/>\r\n</g>\r\n</svg>\r\n";

},{}],17:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"\r\n\t xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-290 382 30 30\"\r\n\t style=\"enable-background:new -290 382 30 30;\" xml:space=\"preserve\">\r\n<g>\r\n\t<path style=\"fill:#284661\" d=\"M-266,387.5h-18c-0.3,0-0.5,0.2-0.5,0.5v18c0,0.3,0.2,0.5,0.5,0.5h18c0.3,0,0.5-0.2,0.5-0.5v-18\r\n\t\tC-265.5,387.7-265.7,387.5-266,387.5z M-266.5,405.5h-17v-17h17V405.5z\"/>\r\n\t<rect x=\"-270\" y=\"390\" style=\"fill:#284661\" width=\"1\" height=\"6\"/>\r\n\t<rect x=\"-270\" y=\"398\" style=\"fill:#284661\" width=\"1\" height=\"1\"/>\r\n\t<rect x=\"-280\" y=\"390\" style=\"fill:#284661\" width=\"1\" height=\"4\"/>\r\n\t<rect x=\"-280\" y=\"396\" style=\"fill:#284661\" width=\"1\" height=\"3\"/>\r\n\t<rect x=\"-275\" y=\"390\" style=\"fill:#284661\" width=\"1\" height=\"1\"/>\r\n\t<rect x=\"-275\" y=\"393\" style=\"fill:#284661\" width=\"1\" height=\"6\"/>\r\n\t<polygon style=\"fill:#4CB04F\" points=\"-279,396 -277,396 -277,394 -279,394 -280,394 -282,394 -282,396 -280,396 \t\"/>\r\n\t<polygon style=\"fill:#8AC24A\" points=\"-274,393 -272,393 -272,391 -274,391 -275,391 -277,391 -277,393 -275,393 \t\"/>\r\n\t<polygon style=\"fill:#CBDB39\" points=\"-272,396 -272,398 -270,398 -269,398 -267,398 -267,396 -269,396 -270,396 \t\"/>\r\n\t<path style=\"fill:#00BCD4\" d=\"M-269.4,401.1c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8s1.8-0.8,1.8-1.8S-268.4,401.1-269.4,401.1z M-269.4,403.7\r\n\t\tc-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8S-269,403.7-269.4,403.7z\"/>\r\n\t<path style=\"fill:#2196F3\" d=\"M-274.4,401.1c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8s1.7-0.8,1.7-1.8S-273.5,401.1-274.4,401.1z M-274.4,403.7\r\n\t\tc-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.7,0.3,0.7,0.8S-274,403.7-274.4,403.7z\"/>\r\n\t<path style=\"fill:#303F9F\" d=\"M-279.4,401.1c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8s1.8-0.8,1.8-1.8S-278.5,401.1-279.4,401.1z M-279.4,403.7\r\n\t\tc-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8S-279,403.7-279.4,403.7z\"/>\r\n</g>\r\n</svg>\r\n";

},{}],18:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"\r\n\t xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-300 382 30 30\"\r\n\t style=\"enable-background:new -300 382 30 30;\" xml:space=\"preserve\">\r\n<g id=\"Barbershop-UI-Guide\" sketch:type=\"MSPage\">\r\n\t<g id=\"Nav_1_\" transform=\"translate(-30.000000, -475.000000)\" sketch:type=\"MSArtboardGroup\">\r\n\t\t<g id=\"Navbar\" sketch:type=\"MSLayerGroup\">\r\n\t\t\t<g id=\"Nav\" transform=\"translate(0.000000, 115.000000)\" sketch:type=\"MSShapeGroup\">\r\n\t\t\t\t<g id=\"Stats\" transform=\"translate(0.000000, 350.000000)\">\r\n\t\t\t\t\t<g id=\"Icon\" transform=\"translate(30.000000, 10.000000)\">\r\n\t\t\t\t\t\t<path id=\"Stroke\" style=\"fill:#FF4081\" d=\"M-292,402h-2v4h2V402z\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_1_\" style=\"fill:#DEA7E8\" d=\"M-287,398h-2v8h2V398z\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_2_\" style=\"fill:#7C4DFF\" d=\"M-282,400h-2v6h2V400z\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_3_\" style=\"fill:#7B1FA2\" d=\"M-277,394h-2v12h2V394z\"/>\r\n\t\t\t\t\t\t<rect id=\"Rectangle\" x=\"-295\" y=\"406\" style=\"fill:#284661\" width=\"20\" height=\"1\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_4_\" style=\"fill:#284561\" d=\"M-291,396c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1s0.4-1,1-1C-291.4,395-291,395.4-291,396\r\n\t\t\t\t\t\t\tL-291,396z\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_5_\" style=\"fill:#284561\" d=\"M-287,392c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1s0.4-1,1-1C-287.4,391-287,391.4-287,392\r\n\t\t\t\t\t\t\tL-287,392z\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_6_\" style=\"fill:#284561\" d=\"M-282,394c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1s0.4-1,1-1C-282.4,393-282,393.4-282,394\r\n\t\t\t\t\t\t\tL-282,394z\"/>\r\n\t\t\t\t\t\t<path id=\"Stroke_7_\" style=\"fill:#284561\" d=\"M-277,388c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1s0.4-1,1-1C-277.4,387-277,387.4-277,388\r\n\t\t\t\t\t\t\tL-277,388z\"/>\r\n\t\t\t\t\t</g>\r\n\t\t\t\t</g>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";

},{}],19:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\"\r\n\t xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"-300 381.5 30 30\"\r\n\t style=\"enable-background:new -300 381.5 30 30;\" xml:space=\"preserve\">\r\n<g id=\"Barbershop-UI-Guide\" sketch:type=\"MSPage\">\r\n\t<g id=\"Nav_1_\" transform=\"translate(-30.000000, -415.000000)\" sketch:type=\"MSArtboardGroup\">\r\n\t\t<g id=\"Navbar\" sketch:type=\"MSLayerGroup\">\r\n\t\t\t<g id=\"Nav\" transform=\"translate(0.000000, 115.000000)\" sketch:type=\"MSShapeGroup\">\r\n\t\t\t\t<g id=\"Templates\" transform=\"translate(0.000000, 290.000000)\">\r\n\t\t\t\t\t<g id=\"Icon\" transform=\"translate(30.000000, 10.000000)\">\r\n\t\t\t\t\t\t<path style=\"fill:#4CB04F\" d=\"M-274.5,391.5h-21v-5h21V391.5z M-294.5,390.5h19v-3h-19V390.5z\"/>\r\n\t\t\t\t\t\t<path style=\"fill:#284661\" d=\"M-274.5,406.5h-21v-5h21V406.5z M-294.5,405.5h19v-3h-19V405.5z\"/>\r\n\t\t\t\t\t\t<path style=\"fill:#00BCD4\" d=\"M-286.5,399.5h-9v-5h9V399.5z M-294.5,398.5h7v-3h-7V398.5z\"/>\r\n\t\t\t\t\t\t<path style=\"fill:#00BCD4\" d=\"M-274.5,399.5h-9v-5h9V399.5z M-282.5,398.5h7v-3h-7V398.5z\"/>\r\n\t\t\t\t\t</g>\r\n\t\t\t\t</g>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";

},{}],20:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg width=\"40px\" height=\"40px\" viewBox=\"0 0 40 40\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <!-- Generator: Sketch 3.7.2 (28276) - http://www.bohemiancoding.com/sketch -->\n    <title>Tiara Logo</title>\n    <desc>Created with Sketch.</desc>\n    <defs></defs>\n    <g id=\"SendGrid\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Tiara-Logo\">\n            <g id=\"tiara-logo\" transform=\"translate(8.000000, 8.000000)\">\n                <rect id=\"99E1F4\" fill=\"#99E1F4\" x=\"8\" y=\"16\" width=\"8\" height=\"8\"></rect>\n                <rect id=\"99E1F4\" fill=\"#99E1F4\" x=\"0\" y=\"8\" width=\"8\" height=\"8\"></rect>\n                <rect id=\"009DD9\" fill=\"#009DD9\" x=\"8\" y=\"8\" width=\"8\" height=\"8\"></rect>\n                <rect id=\"00B3E3\" fill=\"#00B3E3\" x=\"16\" y=\"8\" width=\"8\" height=\"8\"></rect>\n                <rect id=\"00B3E3\" fill=\"#00B3E3\" x=\"8\" y=\"0\" width=\"8\" height=\"8\"></rect>\n                <rect id=\"1a82e2\" fill=\"#1A82E2\" x=\"0\" y=\"16\" width=\"8\" height=\"8\"></rect>\n                <rect id=\"1a82e2\" fill=\"#1A82E2\" x=\"16\" y=\"0\" width=\"8\" height=\"8\"></rect>\n            </g>\n        </g>\n    </g>\n</svg>";

},{}]},{},[3])