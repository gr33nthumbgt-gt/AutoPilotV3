const API = import.meta.env.VITE_API_URL;

export async function getManagers() {
  const res = await fetch(`${API}/api/managers`);
  return res.json();
}

export async function createManager(data: any) {
  const res = await fetch(`${API}/api/managers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateManager(id: number, data: any) {
  const res = await fetch(`${API}/api/managers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteManager(id: number) {
  await fetch(`${API}/api/managers/${id}`, {
    method: "DELETE",
  });
}