const hostname = '192.168.1.1';
const baseUrl = `http://${hostname}`;

const user_name = 'Menara';
const pass = 'Menara';

const pages = {
  welcome: 'welcome',
  login: 'login',
  basicMain: 'basicMain',
  maintenance: 'maintenance',
  reinitADSL: 'reinitADSL',
  submit: 'submit'
};

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

// export { pages, btns, user_name, pass, baseUrl };
