import packageJson from "../../../package.json";

const values = {
  cdn: process.env.NEXT_PUBLIC_CDN,
  version: packageJson.version,
};

export default values;
