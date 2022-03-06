export const maxLength = (max: number) => (value: string) => {
  return value && value.length > max
    ? `Должно быть не более ${max} симв.`
    : null;
};

export const minValue = (min: number) => (value: string) => {
  return value && value.length < min
    ? `Должен быть не менее ${min} симв.`
    : null;
};

export const required = (value: string) => (value ? null : "Обязательное поле");

export const login = [required, minValue(4), maxLength(16)];
export const password = [required, minValue(8), maxLength(16)];
