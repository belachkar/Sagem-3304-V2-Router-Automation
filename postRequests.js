url = 'http://192.168.1.1/cache/1625965135/index.cgi';
// 1625965135
let pgNbr = 'f.action="/cache/1924512985/index.cgi"';
let session_id = 'name="session_id" value="1432955196"';
let transaction_id = 'name="transaction_id" value="6"';
let auth_key = 'name="auth_key" value="1450010206"';

const page_titles = {
  login: 'Login',
  networkView: 'Network view',
  maintenance: 'Maintenance'
};
const mimic_button_fields = {
  loginSubmit: 'submit_button_login_submit: ..',
  basicMain: 'sidebar: lb_sidebar_basic_main..',
  basicEreaseReboot: 'sidebar: lb_sidebar_basic_erase_reboot..',
  reinitADSL: 'submit_button_reinit_adsl: ..',
  submit: 'submit_button_submit: ..'
};

// Overture de session
const sended = {
  active_page: 9097,
  session_id: 1432955196,
  prev_page: 0,
  page_title: 'Login',
  nav_stack_0: 9097,
  mimic_button_field: 'submit_button_login_submit: ..',
  button_value: '',
  transaction_id: 6,
  lang: 0,
  user_name: 'Menara',
  password_1432955196: '',
  md5_pass: '94fb65b4eb076b7ce9c8fcd108803f61',
  auth_key: 1450010206
};

// Menu Basique
sended = {
  active_page: 9067,
  session_id: 1432955196,
  prev_page: 9097,
  page_title: 'Network view',
  nav_stack_0: 9067,
  nav_9067_button_value: '',
  mimic_button_field: 'sidebar: lb_sidebar_basic_main..',
  button_value: '',
  transaction_id: 3
};

// Maintenance
sended = {
  active_page: 9067,
  session_id: 1432955196,
  prev_page: 9067,
  page_title: 'Network view',
  nav_stack_0: 9067,
  nav_9066_button_value: 'lb_sidebar_basic_main',
  mimic_button_field: 'sidebar: lb_sidebar_basic_erase_reboot..',
  button_value: 'lb_sidebar_basic_main',
  transaction_id: 3
};

// Réinitialisation ADSL, Actualiser l'adresse IP
sended = {
  active_page: 9059,
  session_id: 1432955196,
  prev_page: 9067,
  page_title: 'Maintenance',
  nav_stack_0: 9059,
  nav_9059_button_value: 'lb_sidebar_basic_erase_reboot',
  mimic_button_field: 'submit_button_reinit_adsl: ..',
  button_value: 'lb_sidebar_basic_erase_reboot',
  transaction_id: 2
};

// Confirmation Réinitialisation ADSL, Button OK
sended = {
  page_title: 'Maintenance',
  confirm_mimic_button_field: 'submit_button_reinit_adsl ..',
  active_page: 801,
  session_id: 1650306267,
  prev_page: 9059,
  nav_stack_0: 9059,
  nav_stack_1: 801,
  nav_9059_active_page: 9059,
  nav_9059_prev_page: 9067,
  nav_9059_page_title: 'Maintenance',
  nav_9059_button_value: 'lb_sidebar_basic_erase_reboot',
  nav_9059_mimic_button_field: 'submit_button_reinit_adsl ..',
  nav_9059_transaction_id: 2,
  nav_801_button_value: 'lb_sidebar_basic_erase_reboot',
  mimic_button_field: 'submit_button_submit: ..',
  button_value: 'lb_sidebar_basic_erase_reboot',
  transaction_id: 2
};
