import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useApplications } from "../context/ApplicationContext";

function ApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { applications, deleteApplication } = useApplications();

  const application = applications.find(
    (item) => String(item.id) === String(id)
  );

  if (!application) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Application Not Found
        </h1>

        <p className="mt-2 text-slate-500">
          The application you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/applications")}
          className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Applications
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${application.company}?`
    );

    if (!confirmed) return;

    deleteApplication(application.id);

    toast.success("Application deleted");

    navigate("/applications");
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
    <div className="mx-auto max-w-4xl">
      {/* Back button */}
      <button
        onClick={() => navigate("/applications")}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Applications
      </button>

      {/* Main card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {application.role}
            </h1>

            <p className="mt-1 text-lg text-slate-500">
              {application.company}
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
              application.status
            )}`}
          >
            {application.status}
          </span>
        </div>

        {/* Details */}
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-400">
              Company
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.company}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">
              Position
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.role}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">
              Location
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.location || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">
              Salary
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.salary || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">
              Applied Date
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.appliedDate || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-400">
              Status
            </p>

            <p className="mt-1 font-semibold text-slate-800">
              {application.status}
            </p>
          </div>
        </div>

        {/* Job URL */}
        {application.jobUrl && (
          <div className="border-t border-slate-200 p-6">
            <p className="text-sm font-medium text-slate-400">
              Job Posting
            </p>

            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block break-all font-medium text-blue-600 hover:underline"
            >
              {application.jobUrl}
            </a>
          </div>
        )}

        {/* Notes */}
        <div className="border-t border-slate-200 p-6">
          <p className="text-sm font-medium text-slate-400">
            Notes
          </p>

          <p className="mt-2 whitespace-pre-wrap text-slate-700">
            {application.notes || "No notes added."}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-slate-200 p-6 sm:flex-row">
          <button
            onClick={() =>
              navigate(`/applications/${application.id}/edit`)
            }
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            <Edit size={18} />
            Edit Application
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-5 py-3 font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetails;