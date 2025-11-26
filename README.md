# Wobot Camera Management – Frontend Assignment

A React-based camera management dashboard built as part of the Wobot Intelligence Frontend Developer Assignment.  
The application fetches camera data from the provided staging API and allows pagination, search, filtering, and status updates using a Bearer-authenticated API request.

---

## 🚀 Live Demo

🔗 **Hosted Link:** <YOUR_DEPLOY_URL>

📦 **GitHub Repository:** https://github.com/sankalp-OO7/wobot-test

---

## 📌 Features

### **1. Camera Table**

- Displays camera list in a clean, modern UI (matches provided Wobot screenshot)
- Columns: Name, Health, Location, Recorder, Tasks, Status, Actions
- Icons for health, online/offline status, and warnings
- Checkbox support for each row

### **2. Search & Filters**

- Search by **name, location, or id**
- Filter by **status (Active / Inactive)**
- Filter by **location** (UI only)

### **3. Pagination**

- Fully frontend pagination
- Page size selector (10 / 20 / 50)
- Next / Previous / First / Last page controls

### **4. Status Toggle (PUT API)**

Each camera row includes an **Active/Inactive** toggle.

- Uses **PUT request** with **Bearer token**
- Optimistic UI update for instant feedback
- Reverts UI if API fails
- Error alert for non-existing backend records

### **5. Delete Row (Frontend Only)**

Removes the camera from UI only (no backend delete API provided).

---

## 📡 API Details

### **Base URL**

https://api-app-staging.wobot.ai/app/v1

makefile
Copy code

### **1. Fetch Cameras (GET)**

Endpoint:
GET /fetch/cameras

css
Copy code

Example:

```js
axios.get("https://api-app-staging.wobot.ai/app/v1/fetch/cameras", {
  headers: { Authorization: `Bearer ${TOKEN}` }
});
2. Update Status (PUT)
Endpoint:

bash
Copy code
PUT /update/camera/status
Payload:

json
Copy code
{
  "id": 3,
  "status": "Active"
}
Authentication:

makefile
Copy code
Authorization: Bearer 4ApVMIn5sTxeW7GQ5VWeWiy
Working example:

js
Copy code
axios.put(
  "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
  { id, status },
  {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    }
  }
);
```
