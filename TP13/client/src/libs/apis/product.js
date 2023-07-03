var product = {
  async create({ title, category, item, imageUrl, desc }) {
    const res = await fetch("http://localhost:3001/product/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, category, item, imageUrl, desc }),
    });

    const result = await res.json();
    return result;
  },
  async all() {
    const res = await fetch("http://localhost:3001/product/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Origin: "http://localhost:3000",
      },
    });

    const result = await res.json();
    if (!result?.length) return [];

    return result;
  },
  async delete(id) {
    const res = await fetch("http://localhost:3001/product/delete/" + id, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Origin: "http://localhost:3000",
      },
    });

    const result = await res.json();
    if (!result?.length) return [];

    return result;
  },
  async update(updateProduct) {
    const res = await fetch("http://localhost:3001/product/update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Origin: "http://localhost:3000",
      },
      body:JSON.stringify(updateProduct)
    });

    const result = await res.json();

    return result;
  },
};

export default product;
