export default async function getPerrosFromAPI(url){
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("error");
    }
    return response.json();
  }