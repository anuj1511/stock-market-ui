// Type guard to check if a value is a non-null string
export const isString = (value: FormDataEntryValue | null): value is string => {
	return typeof value === "string";
};