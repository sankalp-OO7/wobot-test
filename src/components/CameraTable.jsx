import React from "react";
import {
  ClockIcon,
  DeviceIcon,
  WarningIcon,
  CloudIcon,
  XActionIcon,
} from "../assets/svg.jsx";

const CameraTable = (props) => {
  const { pageItems, onUpdateStatus, onDelete } = props;

  return (
    <div>
      <div className="overflow-x-auto border border-gray-200 rounded bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">NAME</th>
              <th className="px-4 py-3 font-medium">HEALTH</th>
              <th className="px-4 py-3 font-medium">LOCATION</th>
              <th className="px-4 py-3 font-medium">RECORDER</th>
              <th className="px-4 py-3 font-medium">TASKS</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {pageItems.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No cameras found
                </td>
              </tr>
            )}

            {pageItems.map((cam) => (
              <tr key={cam.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        cam.current_status === "Online"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></span>

                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                      {cam.name}
                    </span>

                    {cam.hasWarning && (
                      <svg
                        className="w-4 h-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {CloudIcon}

                    {DeviceIcon}

                    {ClockIcon}

                    {cam.hasWarning && WarningIcon}
                  </div>
                </td>

                <td className="px-4 py-3 text-gray-700">{cam.location}</td>

                <td className="px-4 py-3 text-gray-700">
                  {cam.recorder || "N/A"}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {cam.tasks ? `${cam.tasks} Tasks` : "N/A"}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => onUpdateStatus(cam)}
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      cam.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cam.status}
                  </button>
                </td>

                <td className="px-4 py-3" onClick={() => onDelete(cam.id)}>
                  <div className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 cursor-pointer">
                    {XActionIcon}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CameraTable;
