import {
  BriefcaseBusiness,
  CalendarCheck,
  CircleCheck,
  XCircle,
} from "lucide-react";

import Loading from "../components/common/Loading.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import { useApplications } from "../context/ApplicationContext.jsx";

function Dashboard() {
  const {
    applications,
    loading,
    error,
    retryLoadApplications,
  } = useApplications();

  // Loading state
  if (loading) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={retryLoadApplications}
      />
    );
  }

  // Dynamic statistics
  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const offers = applications.filter(
    (application) => application.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Applications",
      value: totalApplications,
      icon: BriefcaseBusiness,
    },
    {
      title: "Interviews",
      value: interviews,
      icon: CalendarCheck,
    },
    {
      title: "Offers",
      value: offers,
      icon: CircleCheck,
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
    },
  ];

  // Latest 5 applications
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedDate) -
        new Date(a.appliedDate)
    )
    .slice(0, 5);

  // Dynamic chart data
  const statusData = [
    {
      label: "Applied",
      value: applications.filter(
        (application) =>
          application.status === "Applied"
      ).length,
    },
    {
      label: "Interview",
      value: interviews,
    },
    {
      label: "Offer",
      value: offers,
    },
    {
      label: "Rejected",
      value: rejected,
    },
  ];

  const maxValue = Math.max(
    ...statusData.map((item) => item.value),
    1
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Good morning 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your job
          applications.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview + Recent Applications */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Application Overview */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Application Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Applications grouped by status
          </p>

          <div className="mt-8 flex h-64 items-end justify-around gap-6">
            {statusData.map((item) => {
              const height =
                (item.value / maxValue) * 100;

              return (
                <div
                  key={item.label}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  {/* Number */}
                  <span className="mb-2 text-sm font-semibold text-slate-700">
                    {item.value}
                  </span>

                  {/* Bar */}
                  <div
                    className="w-full max-w-12 rounded-t-md bg-blue-500 transition-all duration-500"
                    style={{
                      height: `${Math.max(height, 4)}%`,
                    }}
                  />

                  {/* Label */}
                  <span className="mt-3 text-xs text-slate-500">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Recent Applications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest job applications
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {recentApplications.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-slate-500">
                  No applications yet.
                </p>
              </div>
            ) : (
              recentApplications.map((application) => (
                <Application
                  key={application.id}
                  company={application.company}
                  role={application.role}
                  status={application.status}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Application({
  company,
  role,
  status,
}) {
  const getStatusClass = () => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-blue-600";

      case "Interview":
        return "bg-yellow-50 text-yellow-600";

      case "Offer":
        return "bg-green-50 text-green-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0">
      <div>
        <p className="font-semibold text-slate-800">
          {company}
        </p>

        <p className="text-sm text-slate-500">
          {role}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass()}`}
      >
        {status}
      </span>
    </div>
  );
}

export default Dashboard;