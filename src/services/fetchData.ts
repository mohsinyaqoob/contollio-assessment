export const fetchData = async () => {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
