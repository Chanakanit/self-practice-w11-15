// CRUD any items

// GET
async function getItems(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data ?? [];
  } catch (error) {
    throw new Error(error.message ?? "Unknown fetch error");
  }
}

// POST DECLARE PLAN
async function addDeclare(url, item) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      if (res.status === 409) {
        throw new Error('You may have declared a study plan already. Please check again.');
      } else {
        throw new Error('There is a problem. Please try again later.');
      }
    }

    // ถ้ามี response body ควร return
    try {
      return await res.json();
    } catch {
      return null; // กรณี backend ไม่ส่ง body มา
    }

  } catch (error) {
    throw new Error(error.message ?? "Unknown POST error");
  }
}

export { getItems, addDeclare };
