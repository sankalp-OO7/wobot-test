import React from "react";
import Shimmer from "./Shimmer.jsx";

export default function TableShimmer({ rows = 8 }) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {[
              "NAME",
              "HEALTH",
              "LOCATION",
              "RECORDER",
              "TASKS",
              "STATUS",
              "ACTIONS",
            ].map((head) => (
              <th key={head} className="px-4 py-3 font-medium">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Shimmer width="w-3" height="h-3" rounded="rounded-full" />
                  <Shimmer width="w-24" height="h-4" />
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Shimmer width="w-5" height="h-5" rounded="rounded" />
                  <Shimmer width="w-5" height="h-5" rounded="rounded" />
                  <Shimmer width="w-5" height="h-5" rounded="rounded" />
                </div>
              </td>

              <td className="px-4 py-3">
                <Shimmer width="w-28" />
              </td>

              <td className="px-4 py-3">
                <Shimmer width="w-24" />
              </td>

              <td className="px-4 py-3">
                <Shimmer width="w-16" />
              </td>

              <td className="px-4 py-3">
                <Shimmer width="w-16" height="h-6" rounded="rounded-full" />
              </td>

              <td className="px-4 py-3">
                <Shimmer width="w-7" height="h-7" rounded="rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
