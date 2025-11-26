import React from "react";

export function CameraRow({ cam, onDelete, onUpdateStatus }) {
  const isInactive = cam.status === "Inactive";

  const statusClasses = isInactive
    ? "bg-red-100 text-red-600 hover:bg-red-200"
    : "bg-green-100 text-green-600 hover:bg-green-200";

  const actionClasses =
    "px-3 py-1 text-xs font-medium rounded-md transition duration-150 ease-in-out";

  return (
    <tr className="bg-white hover:bg-gray-50">
      <td className="px-4 py-3 font-mono text-sm text-gray-900">{cam.id}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        {cam.name || "-"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{cam.location || "-"}</td>
      <td className="px-4 py-3">
        <button
          onClick={() => onUpdateStatus(cam.id, cam.status)}
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusClasses}`}
          aria-label={`Toggle status for ${cam.name}`}
        >
          {cam.status}
        </button>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{cam.lastSeen || "-"}</td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onDelete(cam.id)}
          className={`${actionClasses} bg-red-50 text-red-700 hover:bg-red-100 border border-red-200`}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
