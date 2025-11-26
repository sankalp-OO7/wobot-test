import React, { useEffect, useMemo, useState } from "react";
import { useFetchCameras } from "./hooks/useFetchCameras.jsx";
import { updateCameraStatus } from "./api/cameraApi.js";
import TableShimmer from "./components/TableShimmer.jsx";
import CameraTable from "./components/CameraTable.jsx";

export default function App() {
  const fetchCameras = useFetchCameras();

  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchCameras()
      .then((res) => {
        if (!mounted) return;
        const data = res.data;
        const items = Array.isArray(data)
          ? data
          : data?.cameras || data?.data || [];
        setAll(items);
      })
      .catch(() => setError("Failed to load camera list"))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  const locations = useMemo(() => {
    const unique = new Set(all.map((c) => c.location).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [all]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return all.filter((cam) => {
      if (locationFilter !== "All" && cam.location !== locationFilter)
        return false;

      if (
        statusFilter !== "All" &&
        cam.status?.toLowerCase() !== statusFilter.toLowerCase()
      )
        return false;

      if (!q) return true;

      return (
        cam.name?.toLowerCase().includes(q) ||
        cam.location?.toLowerCase().includes(q) ||
        String(cam.id).includes(q)
      );
    });
  }, [all, locationFilter, statusFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function toggleStatus(cam) {
    const newStatus = cam.status === "Active" ? "Inactive" : "Active";

    setAll((prev) =>
      prev.map((c) => (c.id === cam.id ? { ...c, status: newStatus } : c))
    );

    try {
      await updateCameraStatus(cam.id, newStatus);
    } catch (err) {
      setAll((prev) =>
        prev.map((c) => (c.id === cam.id ? { ...c, status: cam.status } : c))
      );
      alert("Failed to update status.");
    }
  }

  function deleteRow(id) {
    if (!window.confirm("Remove this camera? (UI only)")) return;
    setAll((prev) => prev.filter((c) => c.id !== id));
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 w-full max-w-full">
      {/* HEADER */}
      <div className="flex items-center justify-center mb-8">
        <img src="/logo.jpeg" className="w-12 h-12 mr-2" alt="logo" />
        <h1 className="text-3xl font-semibold text-blue-600">obot.ai</h1>
      </div>

      <h2 className="text-2xl font-semibold mb-1">Cameras</h2>
      <p className="text-gray-500 mb-6">Manage your cameras here.</p>

      <div
        className="
          flex flex-col sm:flex-row 
          sm:items-center 
          gap-3 sm:gap-4 
          mb-4 w-full
        "
      >
        <select
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
            setPage(1);
          }}
          className="
            border border-gray-300 rounded px-3 py-2 bg-white
            w-full sm:w-48
          "
        >
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="
            border border-gray-300 rounded px-3 py-2 bg-white
            w-full sm:w-48
          "
        >
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="relative w-full sm:w-auto sm:ml-auto">
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="search"
            className="
              border border-gray-300 rounded px-3 py-2 pr-10
              w-full sm:w-64
            "
          />
          <svg
            className="w-4 h-4 absolute right-3 top-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
      </div>

      {loading ? (
        <TableShimmer rows={pageSize} />
      ) : (
        <CameraTable
          pageItems={pageItems}
          onUpdateStatus={toggleStatus}
          onDelete={deleteRow}
        />
      )}

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 flex-wrap">
        <div>
          Showing {Math.min((page - 1) * pageSize + 1, filtered.length)}–
          {Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            ⏮
          </button>

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            ◀
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            ▶
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}
