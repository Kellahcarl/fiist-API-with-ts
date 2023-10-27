import { sqlConfig } from "../config/config";
import mssql from "mssql";

const connection = async () => {
  let pool = null;

  try {
    pool = await mssql.connect(sqlConfig);
  } catch (error) {
    pool = null;
    console.log(error);
  }

  return pool;
};

export const createRequest = async (
  request: any,
  params: Record<string, any> = {}
): Promise<any> => {
  const keys = Object.keys(params);

  keys.map((keyName: string) => {
    const keyValue = params[keyName];
    request.input(keyName, keyValue);
  });
  return request;
};

export const execute = async (procedureName: "string", params: object = {}) => {
  const requestProc = await connection();
  let request = requestProc?.request();
  request = await createRequest(request, params);

  const results = await request?.execute(procedureName);
  return results;
};

export const query = async (query: string): Promise<any> => {
  const requestQuery = await connection();
  const results = await requestQuery?.request().query(query);
  return results;
};
