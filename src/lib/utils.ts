import bcryptjs from "bcryptjs";
export function toISO8601DateTime(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }
  return date.toISOString();
}

export const page = 10;

export const LastTimeCheckIn = (lastCheckIn: string): boolean => {
  const now = new Date();
  const lastTimeCheckIn = new Date(lastCheckIn);

  // Get the time difference in milliseconds
  const difference = now.getTime() - lastTimeCheckIn.getTime();
  console.error(difference, "difference");

  // Threshold for demo: 5 minutes (convert to milliseconds)
  const threshold = 3 * 60 * 1000;

  // Return true if within threshold, false otherwise
  return difference > threshold;
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const saltAndHashPassword = async (password: string) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcryptjs.compare(password, hashedPassword);
};
