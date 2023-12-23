import { cancellableRequest } from "../helper/request";

export const createUser = async (value: TForm) => {
  return cancellableRequest("create-user", `/users/create`, {
    method: "POST",
    data: value,
  }).then((res: any) => {
    if (!res.success) {
      throw new Error(res.data.message);
    }
    return res;
  });
};
