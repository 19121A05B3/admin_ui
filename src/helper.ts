import { message } from "antd";

export const dp = (args: any) => console.log(args);

export const processingPopUp = (msg?: any) =>
  message.loading(msg ?? "Processing request, Please wait", 0);
