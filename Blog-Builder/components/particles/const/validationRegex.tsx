export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*()+=]).{8,20}$/;
export const spaceRegex = /^\S*$/;
export const emailRegex = /^^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
export const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|profile)\/[^/\s]+\/?$/;
export const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\/\S*)?$/;
