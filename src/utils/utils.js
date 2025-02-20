export const initError = (message,code) =>
{
  const error = new Error(message);
  error.code = code;
  throw error;
}

export const setDate = (d) => {
    
  const date = new Date(d);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Dec","Jan"];
  return `${date.getUTCDate(date)}-${months[date.getUTCMonth()]}-${date.getUTCFullYear()}`;
};

export const setTime = (t) =>
{    
  const timeArr = t.split(":");
  return `${
    Number(timeArr[0]) % 12 === 0 ? 12 : Number(timeArr[0]) % 12
  }:${timeArr[1]}${Number(timeArr[0]) >= 12 ? " PM" : " AM"}`;
}