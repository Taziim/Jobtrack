import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useApplications } from "../context/ApplicationContext";

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { applications, updateApplication } = useApplications();

  const application = applications.find(
    (item) => String(item.id) === String(id)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: application || {},
  });

  if (!application) {
    return (
      <div className="rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">
          Application Not Found
        </h1>

        <p className="mt-2 text-slate-500">
          The application you are trying to edit does not exist.
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

  const onSubmit = (data) => {
    updateApplication(application.id, data);

    toast.success("Application updated successfully");

    navigate(`/applications/${application.id}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back */}
      <button
        onClick={() => navigate(`/applications/${application.id}`)}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Application
      </button>

      {/* Form card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Edit Application
          </h1>

          <p className="mt-1 text-slate-500">
            Update your job application information.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Company *
            </label>

            <input
              type="text"
              className="input"
              {...register("company", {
                required: "Company name is required",
              })}
            />

            {errors.company && (
              <p className="mt-1 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job Role *
            </label>

            <input
              type="text"
              className="input"
              {...register("role", {
                required: "Job role is required",
              })}
            />

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>

            <input
              type="text"
              className="input"
              placeholder="Dhaka, Bangladesh / Remote"
              {...register("location")}
            />
          </div>

          {/* Salary */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Salary
            </label>

            <input
              type="text"
              className="input"
              placeholder="$60,000"
              {...register("salary")}
            />
          </div>

          {/* Job URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Job URL
            </label>

            <input
              type="url"
              className="input"
              placeholder="https://company.com/jobs/frontend-developer"
              {...register("jobUrl", {
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/,
                  message: "Enter a valid URL",
                },
              })}
            />

            {errors.jobUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.jobUrl.message}
              </p>
            )}
          </div>

          {/* Applied Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Applied Date *
            </label>

            <input
              type="date"
              className="input"
              {...register("appliedDate", {
                required: "Applied date is required",
              })}
            />

            {errors.appliedDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.appliedDate.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>

            <select
              className="input"
              {...register("status")}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Notes
            </label>

            <textarea
              rows="5"
              className="input resize-none"
              placeholder="Add interview notes, recruiter information, etc."
              {...register("notes")}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(`/applications/${application.id}`)
              }
              className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplication;