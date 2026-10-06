import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useApplications } from "../context/ApplicationContext";

function AddApplication() {
  const navigate = useNavigate();
  const { addApplication } = useApplications();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: "",
      role: "",
      location: "",
      salary: "",
      jobUrl: "",
      appliedDate: "",
      status: "Applied",
      notes: "",
    },
  });

const onSubmit = (data) => {
  addApplication(data);

  toast.success("Application added successfully!");

  navigate("/applications");
};

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/applications")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Applications
        </button>

        <h1 className="text-3xl font-bold text-slate-900">
          Add Application
        </h1>

        <p className="mt-2 text-slate-500">
          Add a new job application to your tracker.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Company */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Company *
            </label>

            <input
              {...register("company", {
                required: "Company name is required",
              })}
              placeholder="e.g. Google"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.company && (
              <p className="mt-1 text-sm text-red-500">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Job Title *
            </label>

            <input
              {...register("role", {
                required: "Job title is required",
              })}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location
            </label>

            <input
              {...register("location")}
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Salary
            </label>

            <input
              {...register("salary")}
              placeholder="e.g. $60,000"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Job URL */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Job URL
            </label>

            <input
              type="url"
              {...register("jobUrl", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/,
                  message: "Enter a valid URL",
                },
              })}
              placeholder="https://company.com/jobs/frontend-developer"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.jobUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.jobUrl.message}
              </p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Application Date *
            </label>

            <input
              type="date"
              {...register("appliedDate", {
                required: "Application date is required",
              })}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.appliedDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.appliedDate.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Notes
            </label>

            <textarea
              {...register("notes")}
              rows="5"
              placeholder="Add notes about this application..."
              className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={() => navigate("/applications")}
            className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Save Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddApplication;