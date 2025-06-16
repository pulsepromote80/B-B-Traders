import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "@/app/constants/constant";

const isLoggedIn = () => {
  return Cookies.get("data") !== undefined;
};

export const doLogin = (data) => {
  if (data?.data === undefined) return false;

  const userData = data.data;
  const userId = userData?.Id;
  Cookies.set("data", JSON.stringify(userData), {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
  if (userId) {
    setUserId(userId); // This uses your existing helper function
  }

  window.dispatchEvent(new Event("userLoggedIn"));
  return true;
};

export const doLogout = () => {
  localStorage.clear(); 
  Object.keys(Cookies.get()).forEach(cookieName => {
    Cookies.remove(cookieName, { path: '/', domain: window.location.hostname });
  });
  
};

export const setToken = (token) => {
  if (token) {
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  }
};

export const getToken = () => {
  const token = Cookies.get("token");
  return token ? token : null;
};

export const setUserId = (UserId) => {
  if (UserId) {
    Cookies.set("UserId", UserId, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  }
};

export const getUserDetails = () => {
  if (isLoggedIn()) {
    const userName = localStorage.getItem("userName");
    return userName;
  }
  return null;
};

export const setCookie = (name, value, options = {}) => {
  const defaultOptions = {
    expires: 7, 
    path: '/',  
    ...options
  };
  
  Cookies.set(name, value, defaultOptions);
};

export const getCookie = (name) => {
  return Cookies.get(name);
};

export const removeCookie = (name) => {
  Cookies.remove(name);
};

export const setCookies = (categoryId,  subCategoryId = null, subCategoryTypeId = null) => {
  if (categoryId) {
    setCookie('categoryId', categoryId);
  }
  
  if (subCategoryId) {
    setCookie('subCategoryId', subCategoryId);
  } else {
    removeCookie('subCategoryId');
  }
  
  if (subCategoryTypeId) {
    setCookie('subCategoryTypeId', subCategoryTypeId);
  } else {
    removeCookie('subCategoryTypeId');
  }
};

export const setUserDetails = (user) => {
  if (user) {
    Cookies.set("userDetails", user, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  }
};

export const getUserId = () => {
  const userId = Cookies.get("UserId");
  return userId ? userId : null;
};

export const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error);
    throw error;
  }
};

export const getRequestUserId = async (endpoint) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      `${BASE_URL}${endpoint}?userId=${getUserId()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error);
    throw error;
  }
};

export const getRequestWithToken = async (endpoint) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error);
    throw error;
  }
};

export const postCreate = async (endpoint, data) => {
  const dataWithCreatedBy = {
    ...data,
    createdBy: getUserId(),
  };

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWithCreatedBy
  );

  return response.data;
};

export const postCreateWithUpdatedBy = async (endpoint, data) => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }

  const dataWithCreatedBy = {
    ...data,
    updatedBy: getUserId(),
  };

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWithCreatedBy,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const postCreateWithUserId = async (endpoint, data) => {
  const userId = getUserId();
  const dataWithCreatedBy = {
    ...data,
    userId,
    createdBy: getUserId(),
  };

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWithCreatedBy
  );
  return response.data;
};

export const postCreateWithUserIdAndToken = async (endpoint, data) => {
  const token = getToken();
  const userId = getUserId();
  const dataWithCreatedBy = {
    ...data,
    userId,
    createdBy: getUserId(),
  };

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await axios.post(
    `${BASE_URL}${endpoint}`,
    dataWithCreatedBy,
    {
      headers,
    }
  );
  return response.data;
};

export const postRequest = async (endpoint) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};

export const postRequestWithData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};

export const postRequestWithParams = async (endpoint, data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${endpoint}?age=${data.age}&name=${data.name}&gender=${data.gender}&skintype=${data.skintype}&skinSensitive=${data.skinSensitive}}`
    );
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};

export const postRequestWithToken = async (endpoint, data) => {
  try {
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers,
    });
    console.log("Response:", response);
    return response.data;
  } catch (error) {
    console.error(" API Call Failed:", error.response?.data || error.message);
    throw error;
  }
};

export const postformRequest = async (endpoint, data) => {
  try {
    const token = getToken()
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers,
    })

    return response.data
  } catch (error) {
    console.error('API Call Failed:', error.response?.data || error.message)
    throw error
  }
}