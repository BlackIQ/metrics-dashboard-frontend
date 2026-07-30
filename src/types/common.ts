export type Communication = "IPv4" | "DNS";

export interface HTTPValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}
