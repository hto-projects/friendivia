declare var process : {
  env: {
    REACT_APP_BACK_END_URL: string,
    REACT_APP_TTS_API_KEY: string,
    REACT_APP_GOOGLE_TTS_API_KEY: string
  }
}

export const backEndUrl = process.env['REACT_APP_BACK_END_URL'];
export const ttsApiKey = process.env['REACT_APP_TTS_API_KEY'];
export const googleTtsApiKey = process.env['REACT_APP_GOOGLE_TTS_API_KEY'];
