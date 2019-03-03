const http = require('http');
const querystring = require('querystring');
const hex_md5 = require('./hashPass');

const hostname = '192.168.1.1';
const baseUrl = 'http://192.168.1.1';
let isLoggedIn = false;

let hiddenInputsToSend = {};
let nextUrlCacheId = null;

const handleError = (err) => console.error(err.message);

const pages = {
  welcome: 'welcome',
  login: 'login',
  basicMain: 'basicMain',
  maintenance: 'maintenance',
  reinitADSL: 'reinitADSL',
  submit: 'submit'
};

// Buttons
const btns = {
  login_page: {
    submit: {
      value: 'submit_button_login_submit: ..',
    },
  },
  network_panel2_main: {
    value: 'sidebar: lb_sidebar_network_panel2_main..',
  },
  control_panel_main: {
    value: 'sidebar: lb_sidebar_control_panel_main..',
  },
  quick_setup_main: {
    value: 'sidebar: lb_sidebar_quick_setup_main..',
    PPP: {
      value: 'sidebar: lb_sidebar_quick_setup_quick-setup PPP..',
      submit_button_apply: {
        value: 'submit_button_apply: ..',
      },
      submit_button_cancel: {
        value: 'submit_button_cancel: ..',
      },
    },
    voip: {
      value: 'sidebar: lb_sidebar_quick_setup_quick-setup voip..',
      submit_button_apply: {
        value: 'submit_button_apply: ..',
      },
      submit_button_cancel: {
        value: 'submit_button_cancel: ..',
      },
    },
  },
  basic_main: {
    value: 'sidebar: lb_sidebar_basic_main..',
    access_control: {
      value: 'sidebar: lb_sidebar_basic_access_control..',
    },
    lan_servers: {
      value: 'sidebar: lb_sidebar_basic_lan_servers..',
    },
    wireless: {
      value: 'sidebar: lb_sidebar_basic_wireless..',
    },
    optional_service: {
      value: 'sidebar: lb_sidebar_basic_optional_service..',
    },
    erase_reboot: {
      value: 'sidebar: lb_sidebar_basic_erase_reboot..',
      reinit_adsl: {
        value: 'submit_button_reinit_adsl: ..',
        submit: {
          value: 'submit_button_submit: ..',
        },
      },
      submit_button_erase: {
        value: 'submit_button_erase: ..',
      },
      submit_button_reboot: {
        value: 'submit_button_reboot: ..',
      },
    },
    memory_sharing: {
      value: 'sidebar: lb_sidebar_basic_memory_sharing..',
    },
  },
  advanced_main: {
    value: 'sidebar: lb_sidebar_advanced_main..',
    firewall: {
      value: 'sidebar: lb_sidebar_advanced_firewall..',
    },
    network: {
      value: 'sidebar: lb_sidebar_advanced_network..',
    },
    statistics: {
      value: 'sidebar: lb_sidebar_advanced_statistics..',
    },
    tool_diagnosis: {
      value: 'sidebar: lb_sidebar_advanced_tool_diagnosis..',
    },
    memory_sharing: {
      value: 'sidebar: lb_sidebar_advanced_memory_sharing..'
    }
  }
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
  getPage(pages.welcome)
    .then(callback)
    .catch(handleError);
};
const getLoginPage = (callback) => {
  getPage(pages.login)
    .then(callback)
    .catch(handleError);
};
const getBasicMainPage = (callback) => {
  getPage(pages.basicMain)
    .then(callback)
    .catch(handleError);
};
const getMaintenancePage = (callback) => {
  getPage(pages.maintenance)
    .then(callback)
    .catch(handleError);
};
const getReinitADSLPage = (callback) => {
  getPage(pages.reinitADSL)
    .then(callback)
    .catch(handleError);
};
const getSubmitPage = (callback) => {
  getPage(pages.submit)
    .then(callback)
    .catch(handleError);
};

const getPage = (page) => {
  console.log(`Getting "${page}" page...`);

  getPageParams(page);
  const data = querystring.stringify(hiddenInputsToSend);
  const options = getRequestOptions(data.length);
  
  return new Promise((resolve, reject) => {
    const onComplete = (err, body) => {
      if (body) {
        hiddenInputsToSend = getHiddenInputs(body);
        getNextPage(body);
        console.log(`"${page.toUpperCase()}" page loaded successfully`);
        resolve();
      } else {
        reject(err);
      }
    };

    switch (page) {
    case pages.welcome:
      getPageData(baseUrl, 'get', null, null, (err, body) => {
        onComplete(err, body);
      });
      break;
    case pages.login:
      getPageData(baseUrl, 'post', options, data, (err, body) => {
        onComplete(err, body);
      });
      break;
    case pages.basicMain:
      getPageData(null, 'post', options, data, (err, body) => {
        onComplete(err, body);
      });
      break;
    case pages.maintenance:
      getPageData(null, 'post', options, data, (err, body) => {
        onComplete(err, body);
      });
      break;
    case pages.reinitADSL:
      getPageData(null, 'post', options, data, (err, body) => {
        onComplete(err, body);
      });
      break;
    case pages.submit:
      // params.active_page = params.nav_stack_0 = 801;
      getPageData(null, 'post', options, data, (err, body) => {
        onComplete(err, body);
      });
      break;
    default:
      reject({message: `The page name "${page}" doesn't exist!`});
      break;
    }
  });
};

const getRequestOptions = (length) => {
  const options = {
    hostname,
    path: `/cache/${nextUrlCacheId}/index.cgi`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': length
    }
  };
  return options;
};

const getPageParams = (page) => {
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
  default:
    console.error(`"${page}" pages doesn't exist!`);
    break;
  }
};

const getNextPage = ((body) => {
  let res = body.match(/cache\/([\d]*)\//);
  res = res && res[1] ? res[1] : '';
  nextUrlCacheId = res;
});

const getPageData = (url, method, options, data, callback) => {
  console.log(`${method.toUpperCase()} request`);
  let error = null;
  let body = null;
  if (method === 'post') {
    const request = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => (body += data));
      res.on('error', err => error = err);
      res.on('end', () => callback(error, body));
    });
    request.write(data);
    request.on('error', handleError);
    request.end();
  } else {
    http.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => (body += data));
      res.on('error', err => error = err);
      res.on('end', () => callback(error, body));
    });
  }
};

const login = () => {
  return new Promise((resolve) => {
    if (!isLoggedIn) {
      console.log('Start Login...');
      getWelcomePage(() => {
        console.log('Send login credentials');
        getLoginPage(() => resolve());
      });
    } else {
      resolve();
    }
  });
};

const reinitADSL = () => {
  console.log('ADSL Reinitialization...');
  if (!isLoggedIn) {
    login()
      .then(() => getBasicMainPage(() => {
        getMaintenancePage(() => {
          getReinitADSLPage(() => {
            getSubmitPage(() => {
              console.log('\n\tOperation succeed\n');
            });
          });
        });
      }))
      .then()
      .catch(handleError);
  }
};

reinitADSL();
