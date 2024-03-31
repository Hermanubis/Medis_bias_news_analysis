export default async function getData (info, filter) {
    let url = `http://localhost:8081/endpoint?
    keyword=${info}&filter=${filter}`
    url = url.replace(/\s+/g, '');
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data));
    return data;
  };