/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AxiosErrorData {
  timestamp: string;
  status: number;
  error: string;
  trace?: string;
  message: string;
  errors?: ValidationError[];
  path: string;
}

interface ValidationError {
  codes: string[];
  arguments?: ValidationErrorArgument[];
  defaultMessage: string;
  objectName: string;
  field: string;
  rejectedValue: any;
  bindingFailure: boolean;
  code: string;
}

interface ValidationErrorArgument {
  codes: string[];
  arguments?: any;
  defaultMessage: string;
  code: string;
}
