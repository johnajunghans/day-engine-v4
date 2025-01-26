export const isDev = process.env.NODE_ENV === "development";

export const domain = isDev ? "http://localhost:3000" : "https://www.dayengine.com"

