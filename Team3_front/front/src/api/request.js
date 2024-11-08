// 인증 토큰을 가져오는 함수 (여기서는 예시로 localStorage를 사용)

// export const getAuthToken = () => localStorage.getItem('accessToken');

// API 공통 요청 처리기
export const sendRequest = async (instance, method, url, data = {}) => {
  try {
    const response = await instance[method](url, data);
    console.log(`✅${instance.defaults.baseURL} -[${method}] success :`, response);
    return response;
  } catch (error) {
    console.error(
      `❌${url}-[${method}] error_response:`,
      error.response,
      `error_status : `,
      error.response.status,
      `error_status_text: `,
      error.response.statusText
    );
    window.location.href = '/error';
    throw error;
  }
};
s;

// 동적 URL 생성
export const createUrl = (path, params = {}) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return `${path}${query ? `?${query}` : ''}`;
};
