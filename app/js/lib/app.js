// import { hex_md5 } from './hashPass';
// import { querystring } from './utils';
// import { baseUrl, btns, pages, pass, user_name } from './variables';
if(typeof(SAGEM3304) === 'undefined') SAGEM3304 = {};

const app = {};

app.querystring = SAGEM3304.utils.querystring;
app.handleError = SAGEM3304.handlers.errors;
app.baseUrl = SAGEM3304.vars.baseUrl;
app.pages = SAGEM3304.vars.pages;
app.btns = SAGEM3304.vars.btns;
app.user_name = SAGEM3304.vars.user_name;
app.pass = SAGEM3304.vars.pass;
app.hex_md5 = SAGEM3304.hashPass.hex_md5;

app.isTryLogin = false;
app.isLoggedIn = false;
app.nextUrlCacheId = null;
app.hiddenInputsToSend = {};

app.getTempUrl = () => `${app.baseUrl}/cache/${app.nextUrlCacheId}/index.cgi`;

app.afterClickReinit = () => {
  app.isTryLogin = false;
};

app.getHiddenInputs = (body) => {
  const inputs = {};
  const regex = /"hidden" name="([\w]*)" value="([\w\s:.]*)"/g;
  let m = null;
  while ((m = regex.exec(body)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if (m && m.length > 1) {
      inputs[m[1]] = m[2];
    }
  }
  app.isLoggedIn = app.hiddenInputsToSend['session_id'] === inputs['session_id'] ? true : false;
  return inputs;
};

app.getPage = (page) => {
  console.log(`Getting "${page}" page...`);

  return new Promise((resolve, reject) => {
    app.updatePageParams(page);
    const tmpUrl = app.getTempUrl();
    let optionsPost = app.getRequestOptions();
    const onLoaded = (err, body) => {
      if (body) {
        app.getNextPageCacheId(body);
        app.hiddenInputsToSend = app.getHiddenInputs(body);
        if (!app.isTryLogin && (!app.isLoggedIn || !app.hiddenInputsToSend['session_id'])) {
          app.isTryLogin = true;
          console.log('Not logged In');
          app.login()
            .then(() => {
              if (app.isLoggedIn) {
                app.getPage(page).then(() => resolve()).catch(app.handleError);
              } else {
                reject({ message: 'Unable to loggin, retry later.' });
              }
            })
            .catch(app.handleError);
        } else if (app.isTryLogin || app.isLoggedIn) {
          console.log(`"${page.toUpperCase()}" page loaded successfully`);
          resolve();
        }  else {
          reject({ message: 'Unable to loggin, retry later.' });
        }
      } else {
        reject(err);
      }
    };
  
    switch (page) {
    case app.pages.welcome:
      app.downloadPage(app.baseUrl, app.getRequestOptions('GET'), (err, body) => {
        onLoaded(err, body);
      });
      break;
    default:
      app.downloadPage(tmpUrl, optionsPost, (err, body) => {
        onLoaded(err, body);
      });
      break;
    }
  });
};

app.getRequestOptions = (method = 'POST') => {
  const options = {};
  switch (method) {
  case 'GET':
    options.method = method;
    break;
  default:
    options.method = method;
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': app.hiddenInputsToSend.length
    };
    options.body = app.querystring.stringify(app.hiddenInputsToSend);
    break;
  }
  return options;
};

app.updatePageParams = (page) => {
  switch (page) {
  case app.pages.welcome:
    break;
  case app.pages.login:
    app.hiddenInputsToSend['mimic_button_field'] = app.btns.login_page.submit.value;
    app.hiddenInputsToSend['user_name'] = app.user_name;
    app.hiddenInputsToSend['md5_pass'] = app.hex_md5(`${app.pass}${app.hiddenInputsToSend['auth_key']}`);
    break;
  case app.pages.basicMain:
    app.hiddenInputsToSend['mimic_button_field'] = app.btns.basic_main.value;
    break;
  case app.pages.maintenance:
    app.hiddenInputsToSend['mimic_button_field'] = app.btns.basic_main.erase_reboot.value;
    break;
  case app.pages.reinitADSL:
    app.hiddenInputsToSend['mimic_button_field'] = app.btns.basic_main.erase_reboot.reinit_adsl.value;
    break;
  case app.pages.submit:
    app.hiddenInputsToSend['mimic_button_field'] = app.btns.basic_main.erase_reboot.reinit_adsl.submit.value;
    break;
  case app.pages.reboot:
    app.hiddenInputsToSend['mimic_button_field'] = app.btns.basic_main.erase_reboot.submit_button_reboot.value;
    break;
  default:
    console.error(`"${page}" pages doesn't exist!`);
    break;
  }
};

app.getNextPageCacheId = (body) => {
  let res = body.match(/cache\/([\d]*)\//);
  res = res && res[1] ? res[1] : '';
  app.nextUrlCacheId = res;
};

app.downloadPage = (url, options, callback) => {
  console.log(`${options['method']} request: ${url}`);
  fetch(url, options)
    .then(res => res.text())
    .then(res => callback(null, res))
    .catch(app.handleError);
};

app.login = () => {
  return new Promise((resolve) => {
    console.log('Start Login...');
    app.getPage(app.pages.welcome)
      .then(() => {
        console.log('Sending login credentials');
        app.getPage(app.pages.login)
          .then(() => resolve())
          .catch(app.handleError);
      })
      .catch(app.handleError);
  });
};

app.reinitADSL = () => {
  console.log('ADSL Reinitialization...');
  return new Promise((resolve) => {
    app.afterClickReinit();
    app.getPage(app.pages.maintenance)
      .then(() => {
        app.getPage(app.pages.reinitADSL)
          .then(() => {
            app.getPage(app.pages.submit)
              .then(() => {
                console.log('\n\tOperation succeed\n');
                resolve();
              })
              .catch(app.handleError);
          })
          .catch(app.handleError);
      })
      .catch(app.handleError);
  });
};

app.updateIPView = () => {
  console.log('Update View IP Adress');
  return new Promise((resolve) => {
    app.getPage(app.pages.maintenance)
      .then(() => {
        app.getPage(app.pages.reboot)
          .then(() => {
            console.log('\n\tOperation success\n');
            resolve();
          })
          .catch(app.handleError);
      })
      .catch(app.handleError);
  });
};

SAGEM3304.app = app;
