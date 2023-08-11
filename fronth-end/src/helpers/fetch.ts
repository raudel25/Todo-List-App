const baseUrl: string | undefined = process.env.REACT_APP_API_URL;

export const fetchTodo = (
    endpoint: string,
    data: object,
    method: string = "GET"
  ): Promise<Response> => {
    const url = `${baseUrl}/${endpoint}`;
  
    if (method === "GET") {
      return fetch(url);
    } else {
      return fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  };