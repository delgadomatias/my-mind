export const DEFAULT_NOTE_CONTENT = "<p></p>";

export const VALID_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const VALID_CLASSES_BY_TAG: {
  [key: string]: string;
} = {
  quote: "quote",
  code: "code",
  armata: "armata",
  atrament: "atrament",
};

export const AUTH_ROUTES = ["/auth/signup", "/auth/signin"];
export const SIGN_IN_ROUTE = "/auth/signin";
export const SIGN_UP_ROUTE = "/auth/signup";
export const PRIVATE_ROUTES = ["/", "/settings"];
