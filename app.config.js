import 'dotenv/config';

export default{
  "expo": {
    "name": "Mec App",
    "slug": "MecApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.luisbt96.MecApp"
    },
    "extra":{
      apiKey: process.env.API_KEY,
      apiUrl: process.env.API_URL,
      apiUrlApi: process.env.API_URL_API,
      apiUrlAut: process.env.API_URL_AUT,    
      apiUrlAso: process.env.API_URL_ASO,
      apiUrlPdf: process.env.API_URL_PDF, 
      apiUrlAso: process.env.API_URL_ASO, 
      apiUrlIntAso: process.env.API_URL_INT_ASOC,    
      apiUrlNot: process.env.API_URL_NOT, 
      apiUrlEsc: process.env.url_escuela1,  
      apigetNews: process.env.getNews,
      UrlSlider: process.env.url_slider,    
      UrlLogos: process.env.url_logos,
      "eas": {
        "projectId": "0b5dd692-debb-4cc8-b215-a5a8b6da2546"
      }
    }
  }
}

