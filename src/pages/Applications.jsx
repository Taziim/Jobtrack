import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { useApplications } from "../context/ApplicationContext";

function Applications() {
  const navigate = useNavigate();

const {
  applications,
  loading,
  error,
  deleteApplication,
  retryLoadApplications,
} = useApplications();


if (loading) {
  return <Loading />;
}

if (error) {
  return (
    <ErrorMessage
      message={error}
      onRetry={retryLoadApplications}
    />
  );
}

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredApplications = useMemo(() => {
    let result = [...applications];

    // Search
    if (search.trim()) {
      const searchTerm = search.toLowerCase();

      result = result.filter(
        (application) =>
          application.company
            ?.toLowerCase()
            .includes(searchTerm) ||
          application.role
            ?.toLowerCase()
            .includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter(
        (application) =>
          application.status === statusFilter
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return result;
  }, [applications, search, statusFilter, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSortOrder("newest");
  };

  const hasFilters =
    search !== "" ||
    statusFilter !== "All" ||
    sortOrder !== "newest";

  const handleDelete = (event, application) => {
    event.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${application.company}?`
    );

    if (!confirmed) return;

    deleteApplication(application.id);

    toast.success("Application deleted");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Offer":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Applications
          </h1>

          <p className="mt-1 text-slate-500">
            Manage and track all your job applications.
          </p>
        </div>

        <button
          onClick={() => navigate("/applications/new")}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search company or job role..."
              className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Sort */}
          <button
            onClick={() =>
              setSortOrder((current) =>
                current === "newest"
                  ? "oldest"
                  : "newest"
              )
            }
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-50"
          >
            <ArrowUpDown size={18} />

            {sortOrder === "newest"
              ? "Newest First"
              : "Oldest First"}
          </button>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50"
            >
              <X size={18} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredApplications.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {applications.length}
          </span>{" "}
          applications
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Search
              size={40}
              className="mb-4 text-slate-300"
            />

            <h2 className="text-lg font-semibold text-slate-700">
              No applications found
            </h2>

            <p className="mt-1 text-slate-500">
              Try changing your search or filters.
            </p>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Company
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Location
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Applied
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    onClick={() =>
                      navigate(
                        `/applications/${application.id}`
                      )
                    }
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">
                        {application.company}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {application.role}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {application.location || "—"}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {application.appliedDate || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td
                      className="px-6 py-4"
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/applications/${application.id}`
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/applications/${application.id}/edit`
                            )
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={(event) =>
                            handleDelete(event, application)
                          }
                          className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;