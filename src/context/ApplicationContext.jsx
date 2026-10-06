import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { applicationService } from "../services/applicationService";

const ApplicationContext = createContext();

const initialApplications = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    location: "Dhaka, Bangladesh",
    status: "Interview",
    appliedDate: "2026-09-20",
    salary: "$70,000",
    jobUrl: "https://google.com",
    notes: "Technical interview scheduled.",
  },
  {
    id: 2,
    company: "Samsung",
    role: "React Developer",
    location: "Dhaka, Bangladesh",
    status: "Applied",
    appliedDate: "2026-09-25",
    salary: "$55,000",
    jobUrl: "https://samsung.com",
    notes: "",
  },
  {
    id: 3,
    company: "Pathao",
    role: "Software Engineer",
    location: "Dhaka, Bangladesh",
    status: "Rejected",
    appliedDate: "2026-09-18",
    salary: "$35,000",
    jobUrl: "https://pathao.com",
    notes: "",
  },
  {
    id: 4,
    company: "Microsoft",
    role: "Frontend Engineer",
    location: "Remote",
    status: "Offer",
    appliedDate: "2026-09-10",
    salary: "$85,000",
    jobUrl: "https://microsoft.com",
    notes: "Offer received.",
  },
];

function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(
    initialApplications
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Load applications
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const saved =
          await applicationService.getApplications();

        if (saved.length > 0) {
          setApplications(saved);
        } else {
          setApplications(initialApplications);

          await applicationService.saveApplications(
            initialApplications
          );
        }
      } catch (error) {
        console.error(error);

        setError(
          "Failed to load applications. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Add
  const addApplication = async (application) => {
    const newApplication = {
      ...application,
      id: crypto.randomUUID(),
    };

    const updatedApplications = [
      ...applications,
      newApplication,
    ];

    setApplications(updatedApplications);

    await applicationService.saveApplications(
      updatedApplications
    );
  };

  // Delete
  const deleteApplication = async (id) => {
    const updatedApplications = applications.filter(
      (application) =>
        String(application.id) !== String(id)
    );

    setApplications(updatedApplications);

    await applicationService.saveApplications(
      updatedApplications
    );
  };

  // Update
  const updateApplication = async (
    id,
    updatedApplication
  ) => {
    const updatedApplications = applications.map(
      (application) =>
        String(application.id) === String(id)
          ? {
              ...application,
              ...updatedApplication,
            }
          : application
    );

    setApplications(updatedApplications);

    await applicationService.saveApplications(
      updatedApplications
    );
  };

  const retryLoadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const saved =
        await applicationService.getApplications();

      if (saved.length > 0) {
        setApplications(saved);
      } else {
        setApplications(initialApplications);
      }
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        error,
        addApplication,
        deleteApplication,
        updateApplication,
        retryLoadApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplications must be used inside ApplicationProvider"
    );
  }

  return context;
}

export default ApplicationProvider;