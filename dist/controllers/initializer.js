"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;

var fs_1 = require("fs");
var latest_version_1 = require("latest-version");
var whatsapp_1 = require("../api/whatsapp");
var create_config_1 = require("../config/create-config");
var semver_1 = require("../utils/semver");
var auth_1 = require("./auth");
var browser_1 = require("./browser");
var chalk = require("chalk");
var boxen = require("boxen");
var Spinnies = require("spinnies");
var path = require("path");
var version = require('../../package.json').version;
var helpers_1 = require("../api/helpers");
// Global
var updatesChecked = false;
/**
 * Start the bot
 * @param session, You must pass a string type parameter, this parameter will be the name of the client's session. If the parameter is not passed, the section name will be "session".
 * @param catchQR, A callback will be received, informing the status of the qrcode
 * @param statusFind, A callback will be received, informing the customer's status
 * @param options, Pass an object with the bot settings
 * @param browserSessionToken, Pass the session token information you can receive this token with the await client.getSessionTokenBrowser () function
 * @returns Whatsapp page, with this parameter you will be able to access the bot functions
 */
function create(session, catchQR, statusFind, options, browserSessionToken) {
    if (session === void 0) { session = 'session'; }
    return __awaiter(this, void 0, void 0, function () {
        var _fail, browser_check, closeBrowser, attempt, browserToken, Session, clientCheck, Session, DelFileCheck, spinnies, mergedOptions, browser, waPage, authenticated_1, tipo_qr_1, result_1, url_1, IsLog, localStorage_1, _a, _b, WABrowserId_1, WASecretBundle_1, WAToken1_1, WAToken2_1, debugURL;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    attempt = 0, Session = session, DelFileCheck = false;
                    spinnies = new Spinnies({
                        disableSpins: options ? options.disableSpins : '',
                    });
                    mergedOptions = __assign(__assign({}, create_config_1.defaultOptions), options);
                    if (!mergedOptions.disableWelcome) {
                        //console.log("\n     \n    \u2590\u2588  \u2588\u2588  \u2588\u2591\u2590\u2588\u2580\u2580\u2580\u2591\u2590\u2588     \u2584\u2588\u2580\u2580\u2588\u2584 \u2584\u2588\u2580\u2580\u2588\u2584 \u2590\u2588\u2588   \u2588\u2588\u258C \u2593\u2588\u2580\u2580\u2580\u2591\n     \u2588\u258C\u2590\u2588\u2588\u2584\u2593\u2588 \u2590\u2588\u2584\u2584\u2584 \u2590\u2588    \u2590\u2588      \u2588\u2592  \u2590\u2588\u2584\u2590\u2588\u2580\u258C \u2590\u258C\u2588\u258C \u2593\u2588\u2584\u2584\u2584\n     \u2590\u2588\u2588 \u2590\u2588\u2588\u2591 \u2590\u2588    \u2590\u2588    \u2590\u2588\u2584  \u2584\u2580 \u2588\u258C  \u2590\u2588 \u2590\u2588 \u2588\u2593\u2588 \u2588\u258C \u2588\u2588\n      \u2580\u2580  \u2580\u2580  \u2580\u2580\u2580\u2580\u2580\u2591\u2590\u2580\u2580\u2580\u2580\u2580  \u2580\u2580\u2580\u2580   \u2580\u2580\u2580\u2580  \u2590\u2580  \u2580  \u2580\u2580 \u2580\u2580\u2580\u2580\u2580\n                                   \u2584\n      \u2584\u2584\u2591          \u2584 \u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584 \u2588\u2588         \u2584\u2584       \u2584\u2584\u2584\u2584      \u2591\n      \u2591\u2588\u2588\u2584        \u2588\u2588 \u2588\u2588\u2588\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2588\u258C \u2588\u2588\u2588\u258C       \u2588\u2588\u2584  \u2584\u2584\u2588\u2580\u2580\u2580\u2580\u2580\u2580\u2588\u2584   \u2593\u2588\u2584           \u2584\u2588\u2591\n       \u2591\u2588\u2588\u2584     \u2591\u2588\u2588\u2580 \u2588\u2588\u2588           \u2588\u2588\u2580\u2588\u2588\u2584     \u2588\u2588\u2584 \u2584\u2588\u2591        \u2580\u2588\u2584 \u2593\u2588\u2588\u2588\u2584      \u2591\u2588\u2588\u2588\u2588\u2591\n         \u2588\u2588\u258C   \u2584\u2588\u2588\u2591 \u2584\u2588\u2588\u2588\u2584\u2584\u2584\u2584       \u2588\u2588  \u2593\u2588\u2588\u2584   \u2588\u2588\u2584\u2590\u2588           \u2590\u2588 \u2593\u2588\u258C\u2580\u2588\u2588\u2584  \u2584\u2588\u2588\u2588\u2591\u2588\u2588\u2591\n          \u2588\u2588\u258C \u2584\u2588\u2588\u2591  \u2580\u2588\u2588\u2588\u2580\u2580\u2580\u2580       \u2588\u2588   \u2590\u2588\u2588\u258C  \u2588\u2588\u2584\u2590\u2588           \u2590\u2588\u2591\u2593\u2588\u258C  \u2580\u2588\u2588\u2588\u2588\u2588\u2591  \u2588\u2588\u2591\n           \u2593\u2588\u2588\u2588\u2588     \u2588\u2588\u2588           \u2588\u2588     \u2580\u2588\u2588\u2584\u2588\u2588\u2584 \u2588\u258C          \u2588\u2588 \u2593\u2588\u258C    \u2580\u2588\u2591    \u2588\u2588\u2591\n            \u2580\u2588\u2588      \u2588\u2588\u2588        \u2588\u258C \u2588\u2588       \u2580\u2588\u2588\u2588\u2584  \u2580\u2588\u2584     \u2584\u2584\u2588\u2580  \u2593\u2588\u258C           \u2588\u2588\u2591\n             \u2580       \u2580\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u258C \u2588\u2588        \u2591\u2588\u2588\u2584    \u2580\u2580\u2588\u2588\u2588\u2580\u2580\u2591    \u2580\u2588\u258C           \u2593\u2588\u2591\n                                              \u2580\u2591                                   \n");
                    }
                    // Check for updates if needed
                    if (!updatesChecked && mergedOptions.updatesLog) {
                        spinnies.add('venom-version-spinner', {
                            text: 'Checking for updates',
                        });
                        checkVenomVersion(spinnies);
                        updatesChecked = true;
                    }
                    // Initialize whatsapp
                    spinnies.add(Session + "-auth", {
                        text: 'Waiting...',
                    });
                    return [4 /*yield*/, browser_1.initBrowser(Session, mergedOptions)];
                case 1:
                    browser = _c.sent();
                    if (browser === 'connect') {
                        spinnies.fail(Session + "-auth", {
                            text: "Error when try to connect " + mergedOptions.browserWS,
                        });
                        browser = null;
                        throw "Error when try to connect " + mergedOptions.browserWS;
                    }
                    if (browser === 'launch') {
                        spinnies.fail(Session + "-auth", {
                            text: "Error no open browser",
                        });
                        browser = null;
                        throw "Error no open browser";
                    }
                    if (!(browser !== null)) return [3 /*break*/, 11];
                    spinnies.add("browser", {
                        text: 'check headless',
                    });
                    if (mergedOptions.headless) {
                        spinnies.succeed("browser", {
                            text: 'headless option is active, browser hidden',
                        });
                    }
                    else {
                        spinnies.succeed("browser", {
                            text: 'headless option is disabled, browser visible',
                        });
                    }
                    if (!mergedOptions.browserWS) {
                        browser['_process'].once('close', function () {
                            browser['isClose'] = true;
                        });
                    }
                    ///disconnect || close
                    _fail = setInterval(function () {
                        if (mergedOptions.browserWS) {
                            if (browser.isConnected() === false) {
                                spinnies.add(Session + "-auths", {
                                    text: '....',
                                });
                                spinnies.fail(Session + "-auths", {
                                    text: "The server is closed " + Session,
                                });
                                if (statusFind) {
                                    statusFind('serverClose', Session);
                                }
                                browser.close();
                                clearTimeout(closeBrowser);
                                clearInterval(browser_check);
                                clearInterval(_fail);
                            }
                        }
                        if (browser['isClose'] != undefined && !mergedOptions.browserWS) {
                            spinnies.add(Session + "-auths", {
                                text: '....',
                            });
                            spinnies.fail(Session + "-auths", {
                                text: 'The browser is closed',
                            });
                            if (statusFind) {
                                statusFind('browserClose', Session);
                            }
                            clearTimeout(closeBrowser);
                            clearInterval(clientCheck);
                            clearInterval(_fail);
                        }
                    }, 1000);
                    if (auth_1.SessionTokenCkeck(browserSessionToken)) {
                        browserToken = browserSessionToken;
                    }
                    return [4 /*yield*/, browser_1.initWhatsapp(Session, mergedOptions, browser, browserToken)];
                case 2:
                    waPage = _c.sent();
                    if (!waPage) return [3 /*break*/, 11];
                    spinnies.update(Session + "-auth", { text: 'Authenticating...' });
                    authenticated_1 = null;
                    clientCheck = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var DeleteToken, clientInput, clientExit;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, helpers_1.scrapeDeleteToken(waPage).catch(function () { })];
                                case 1:
                                    DeleteToken = _a.sent();
                                    if (!DelFileCheck && DeleteToken === true) {
                                        helpers_1.deleteFiles(mergedOptions, Session, spinnies);
                                        if (statusFind) {
                                            statusFind('deleteToken', Session);
                                        }
                                        DelFileCheck = true;
                                    }
                                    return [4 /*yield*/, helpers_1.scrapeLogin(waPage).catch(function () { })];
                                case 2:
                                    clientInput = _a.sent();
                                    return [4 /*yield*/, helpers_1.scrapeDesconnected(waPage).catch(function () { })];
                                case 3:
                                    clientExit = _a.sent();
                                    if (clientInput === true || clientExit === true) {
                                        spinnies.add(Session + "-authS", { text: '...' });
                                        spinnies.fail(Session + "-authS", {
                                            text: 'client has desconnected in to mobile',
                                        });
                                        if (statusFind) {
                                            statusFind('desconnectedMobile', Session);
                                        }
                                        helpers_1.deleteFiles(mergedOptions, Session, spinnies);
                                        browser.close();
                                        browser.disconnect();
                                        clearInterval(_fail);
                                        clearInterval(browser_check);
                                        clearTimeout(closeBrowser);
                                        clearInterval(clientCheck);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    //session authenticated
                    return [4 /*yield*/, auth_1.isAuthenticated(waPage)
                            .then(function (e) {
                            authenticated_1 = e;
                        })
                            .catch(function () { })];
                case 3:
                    //session authenticated
                    _c.sent();
                    if (!(authenticated_1 != null)) return [3 /*break*/, 11];
                    if (!authenticated_1) return [3 /*break*/, 5];
                    // Wait til inside chat
                    if (statusFind) {
                        statusFind('isLogged', Session);
                    }
                    return [4 /*yield*/, auth_1.isInsideChat(waPage).toPromise()];
                case 4:
                    _c.sent();
                    spinnies.succeed(Session + "-auth", { text: 'Authenticated' });
                    return [3 /*break*/, 7];
                case 5:
                    if (statusFind) {
                        statusFind('notLogged', Session);
                    }
                    spinnies.add("autoclose", { text: 'check autoClose' });
                    if (mergedOptions.autoClose > 0) {
                        spinnies.succeed("autoclose", {
                            text: 'the autoClose function is on',
                        });
                        ////on autoclose
                        closeBrowser = setTimeout(function () {
                            browser.disconnect();
                            browser.close();
                            if (statusFind) {
                                statusFind('autocloseCalled', Session);
                            }
                            spinnies.add(Session + "-auths", {
                                text: "....",
                            });
                            spinnies.fail(Session + "-auths", {
                                text: "Session Autoclose Called",
                            });
                            clearInterval(_fail);
                            clearInterval(browser_check);
                            clearTimeout(closeBrowser);
                        }, mergedOptions.autoClose);
                    }
                    else {
                        spinnies.succeed("autoclose", {
                            text: 'the autoClose function is off ',
                        });
                    }
                    tipo_qr_1 = 0, result_1 = undefined, url_1 = null;
                    ///scraper qrcode
                    browser_check = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, retri, data, asciiQR, re, retri, data, asciiQR;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(browser['isClose'] != undefined ||
                                        browser.isConnected() === false)) return [3 /*break*/, 1];
                                    if (statusFind) {
                                        statusFind('qrReadFail', Session);
                                    }
                                    clearTimeout(closeBrowser);
                                    clearInterval(_fail);
                                    clearInterval(browser_check);
                                    return [3 /*break*/, 13];
                                case 1:
                                    _a = tipo_qr_1;
                                    switch (_a) {
                                        case 0: return [3 /*break*/, 2];
                                        case 1: return [3 /*break*/, 7];
                                    }
                                    return [3 /*break*/, 13];
                                case 2: return [4 /*yield*/, helpers_1.scrapeImg(waPage).catch(function () { })];
                                case 3:
                                    result_1 = _b.sent();
                                    if (!(result_1 != undefined)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, auth_1.retrieveQR(waPage).catch(function () { })];
                                case 4:
                                    retri = _b.sent();
                                    if (!retri) return [3 /*break*/, 6];
                                    data = retri.data, asciiQR = retri.asciiQR;
                                    if (catchQR) {
                                        catchQR(data, asciiQR, attempt++);
                                    }
                                    return [4 /*yield*/, auth_1.asciiQr(result_1['url'])
                                            .then(function (qr) {
                                            if (mergedOptions.logQR) {
                                                spinnies.update(Session + "-auth", {
                                                    text: 'Scan QR for Session: ' + Session,
                                                });
                                                console.log(qr);
                                            }
                                            tipo_qr_1++;
                                        })
                                            .catch(function () { })];
                                case 5:
                                    _b.sent();
                                    _b.label = 6;
                                case 6: return [3 /*break*/, 13];
                                case 7: return [4 /*yield*/, helpers_1.scrapeImgReload(waPage, url_1).catch(function () { })];
                                case 8:
                                    result_1 = _b.sent();
                                    if (typeof result_1 === 'object') {
                                        url_1 = result_1.url;
                                    }
                                    if (!(typeof result_1 === 'object' && result_1.status === true)) return [3 /*break*/, 12];
                                    return [4 /*yield*/, helpers_1.scrapeImg(waPage).catch(function () { })];
                                case 9:
                                    re = _b.sent();
                                    if (!(re != undefined)) return [3 /*break*/, 12];
                                    return [4 /*yield*/, auth_1.retrieveQR(waPage).catch(function () { })];
                                case 10:
                                    retri = _b.sent();
                                    if (!retri) return [3 /*break*/, 12];
                                    data = retri.data, asciiQR = retri.asciiQR;
                                    if (catchQR) {
                                        catchQR(data, asciiQR, attempt++);
                                    }
                                    return [4 /*yield*/, auth_1.asciiQr(re['url'])
                                            .then(function (qr) {
                                            if (mergedOptions.logQR) {
                                                spinnies.update(Session + "-auth", {
                                                    text: 'Scan QR for Session: ' + Session,
                                                });
                                                console.log(qr);
                                            }
                                        })
                                            .catch(function () { })];
                                case 11:
                                    _b.sent();
                                    _b.label = 12;
                                case 12: return [3 /*break*/, 13];
                                case 13: return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [4 /*yield*/, auth_1.isInsideChat(waPage).toPromise()];
                case 6:
                    IsLog = _c.sent();
                    if (IsLog == false) {
                        spinnies.fail(Session + "-auth", {
                            text: 'Not Login',
                        });
                        throw 'Error in login';
                    }
                    if (statusFind) {
                        statusFind('qrReadSuccess', Session);
                    }
                    spinnies.succeed(Session + "-auth", {
                        text: 'Compilation Mutation',
                    });
                    _c.label = 7;
                case 7:
                    clearInterval(browser_check);
                    clearTimeout(closeBrowser);
                    spinnies.add(Session + "-inject", { text: 'Injecting Sibionte...' });
                    return [4 /*yield*/, browser_1.injectApi(waPage)];
                case 8:
                    waPage = _c.sent();
                    spinnies.succeed(Session + "-inject", {
                        text: 'Starting With Success!',
                    });
                    // Saving Token
                    spinnies.add(Session + "-inject", { text: 'Saving Token...' });
                    if (!(true || (browserToken && !mergedOptions.createPathFileToken))) return [3 /*break*/, 10];
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, waPage.evaluate(function () {
                            return JSON.stringify(window.localStorage);
                        })];
                case 9:
                    localStorage_1 = _b.apply(_a, [_c.sent()]);
                    WABrowserId_1 = localStorage_1.WABrowserId, WASecretBundle_1 = localStorage_1.WASecretBundle, WAToken1_1 = localStorage_1.WAToken1, WAToken2_1 = localStorage_1.WAToken2;
                    try {
                        setTimeout(function () {
                            fs_1.mkdir(path.join(path.resolve(process.cwd() + mergedOptions.mkdirFolderToken, mergedOptions.folderNameToken)), { recursive: true }, function (err) {
                                if (err) {
                                    spinnies.fail(Session + "-inject", {
                                        text: 'Failed to create folder tokens...',
                                    });
                                }
                            });
                        }, 200);
                        setTimeout(function () {
                            fs_1.writeFileSync(path.join(path.resolve(process.cwd() + mergedOptions.mkdirFolderToken, mergedOptions.folderNameToken), Session + ".data.json"), JSON.stringify({
                                WABrowserId: WABrowserId_1,
                                WASecretBundle: WASecretBundle_1,
                                WAToken1: WAToken1_1,
                                WAToken2: WAToken2_1,
                            }));
                            spinnies.succeed(Session + "-inject", {
                                text: 'Token saved successfully...',
                            });
                        }, 500);
                    }
                    catch (error) {
                        spinnies.fail(Session + "-inject", {
                            text: 'Failed to save token...',
                        });
                    }
                    _c.label = 10;
                case 10:
                    if (mergedOptions.debug) {
                        debugURL = "http://localhost:" + fs_1.readFileSync("./" + Session + "/DevToolsActivePort").slice(0, -54);
                        console.log("\nDebug: \u001B[34m" + debugURL + "\u001B[0m");
                    }
                    return [2 /*return*/, new whatsapp_1.Whatsapp(waPage)];
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
/**
 * Checs for a new versoin of venom and logs
 */
function checkVenomVersion(spinnies) {
    latest_version_1.default('whatsapp_elmenoufi').then(function (latest) {
        if (!semver_1.upToDate(version, latest)) {
            logUpdateAvailable(version, latest);
        }
        spinnies.succeed('venom-version-spinner', { text: 'Checking for updates' });
    });
}
/**
 * Logs a boxen of instructions to update
 * @param current
 * @param latest
 */
function logUpdateAvailable(current, latest) {
    // prettier-ignore
    var newVersionLog = "There is a new version of " + chalk.bold("Venom") + " " + chalk.gray(current) + " \u279C  " + chalk.bold.green(latest) + "\n" +
        "Update your package by running:\n\n" +
        (chalk.bold('\>') + " " + chalk.blueBright('npm update whatsapp_elmenoufi'));
    console.log(boxen(newVersionLog, { padding: 1 }));
    console.log("For more info visit: " + chalk.underline('https://github.com/orkestral/venom/blob/master/Update.md') + "\n");
}
