// import { hex_md5 } from './hashPass';
// import { querystring } from './utils';
// import { baseUrl, btns, pages, pass, user_name } from './variables';

let isTryLogin = false;
let isLoggedIn = false;
let nextUrlCacheId = null;
let hiddenInputsToSend = {};

const handleError = (err) => console.error(err.message);
const getTempUrl = () => `${baseUrl}/cache/${nextUrlCacheId}/index.cgi`;

const afterClickReinit = () => {
  isTryLogin = false;
};

const getHiddenInputs = (body) => {
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
  isLoggedIn = hiddenInputsToSend['session_id'] === inputs['session_id'] ? true : false;
  return inputs;
};

const getWelcomePage = (callback) => {
  getPage(pages.welcome).then(callback).catch(handleError);
};
const getLoginPage = (callback) => {
  getPage(pages.login).then(callback).catch(handleError);
};
const getBasicMainPage = (callback) => {
  getPage(pages.basicMain).then(callback).catch(handleError);
};
const getMaintenancePage = (callback) => {
  getPage(pages.maintenance).then(callback).catch(handleError);
};
const getReinitADSLPage = (callback) => {
  getPage(pages.reinitADSL).then(callback).catch(handleError);
};
const getSubmitPage = (callback) => {
  getPage(pages.submit).then(callback).catch(handleError);
};
const getReboot = (callback) => {
  getPage(pages.reboot).then(callback).catch(handleError);
};

const getPage = (page) => {
  console.log(`Getting "${page}" page...`);

  return new Promise((resolve, reject) => {
    updatePageParams(page);
    const tmpUrl = getTempUrl();
    let optionsPost = getRequestOptions();
    const onLoaded = (err, body) => {
      if (body) {
        getNextPageCacheId(body);
        hiddenInputsToSend = getHiddenInputs(body);
        if (!isTryLogin && (!isLoggedIn || !hiddenInputsToSend['session_id'])) {
          isTryLogin = true;
          console.log('Not logged In');
          login()
            .then(() => {
              if (isLoggedIn) {
                getPage(page).then(() => resolve()).catch(handleError);
              } else {
                reject({ message: 'Unable to loggin, retry later.' });
              }
            })
            .catch(handleError);
        } else if (isTryLogin || isLoggedIn) {
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
    case pages.welcome:
      downloadPage(baseUrl, getRequestOptions('GET'), (err, body) => {
        onLoaded(err, body);
      });
      break;
    default:
      downloadPage(tmpUrl, optionsPost, (err, body) => {
        onLoaded(err, body);
      });
      break;
    }
  });
};

const getRequestOptions = (method = 'POST') => {
  const options = {};
  switch (method) {
  case 'GET':
    options.method = method;
    break;
  default:
    options.method = method;
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': hiddenInputsToSend.length
    };
    options.body = querystring.stringify(hiddenInputsToSend);
    break;
  }
  return options;
};

const updatePageParams = (page) => {
  switch (page) {
  case pages.welcome:
    break;
  case pages.login:
    hiddenInputsToSend['mimic_button_field'] = btns.login_page.submit.value;
    hiddenInputsToSend['user_name'] = user_name;
    hiddenInputsToSend['md5_pass'] = hex_md5(`${pass}${hiddenInputsToSend['auth_key']}`);
    break;
  case pages.basicMain:
    hiddenInputsToSend['mimic_button_field'] = btns.basic_main.value;
    break;
  case pages.maintenance:
    hiddenInputsToSend['mimic_button_field'] = btns.basic_main.erase_reboot.value;
    break;
  case pages.reinitADSL:
    hiddenInputsToSend['mimic_button_field'] = btns.basic_main.erase_reboot.reinit_adsl.value;
    break;
  case pages.submit:
    hiddenInputsToSend['mimic_button_field'] = btns.basic_main.erase_reboot.reinit_adsl.submit.value;
    break;
  case pages.reboot:
    hiddenInputsToSend['mimic_button_field'] = btns.basic_main.erase_reboot.submit_button_reboot.value;
    break;
  default:
    console.error(`"${page}" pages doesn't exist!`);
    break;
  }
};

const getNextPageCacheId = (body) => {
  let res = body.match(/cache\/([\d]*)\//);
  res = res && res[1] ? res[1] : '';
  nextUrlCacheId = res;
};

const downloadPage = (url, options, callback) => {
  console.log(`${options['method']} request: ${url}`);
  fetch(url, options)
    .then(res => res.text())
    .then(res => callback(null, res))
    .catch(handleError);
};

const login = () => {
  return new Promise((resolve) => {
    console.log('Start Login...');
    getWelcomePage(() => {
      console.log('Sending login credentials');
      getLoginPage(() => resolve());
    });
  });
};

const reinitADSL = () => {
  console.log('ADSL Reinitialization...');
  afterClickReinit();
  return new Promise((resolve) => {
    getMaintenancePage(() => {
      getReinitADSLPage(() => {
        getSubmitPage(() => {
          console.log('\n\tOperation succeed\n');
          resolve();
        });
      });
    });
  });
};

const rebootRouter = () => {
  console.log('Router Reboot...');
  return new Promise((resolve) => {
    getMaintenancePage(() => {
      getReboot(() => {
        console.log('\n\tOperation succeed\n');
        resolve();
      });
    });
  });
};
